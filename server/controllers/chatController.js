const User = require("../models/User.js");
const Chat = require("../models/Chat.js");

const getChat = async (req, res) => {
  let { room_id } = req.body;

  // check if chat exists in db
  var chat = await Chat.findOne({ room_ID: room_id })
    .populate({
      path: "messages.sender",
      model: "User",
    })
    .exec();

  if (!chat)
    return res.status(404).send({ message: "The chat doesn't exists!" });

  res.status(200).send(chat);
  res.end();
};

const updateChat = async (req, res) => {
  let { room_id, messages } = req.body;

  // check if chat exists in db
  var chat = await Chat.findOne({ room_ID: room_id });

  if (!chat)
    return res.status(404).send({ message: "The chat doesn't exists!" });

  await Promise.all(
    messages.map(async (message) => {
      // find sender from users
      var user = await User.findOne({ username: message.sender });
      message.sender = user._id;
      return message;
    })
  );

  try {
    chat = await Chat.findOneAndUpdate(
      { room_ID: room_id },
      {
        room_ID: room_id,
        $push: { messages },
        users: chat.users,
      },

      { returnOriginal: false, upsert: true }
    );

    res.send(chat);
    res.end();
  } catch (ex) {
    for (field in ex.errors) {
      res.status(400).send(ex.errors[field].message);
    }
    res.end();
    return;
  }
};

const addUser = async (req, res) => {
  let { username, room_id } = req.body;

  // check if user email exists in db
  var user = await User.findOne({ username });

  if (!user)
    return res.status(404).send({ message: "The user doesn't exists!" });
  // check if chat exists in db
  var chatAlreadyExists = await Chat.findOne({ room_ID: room_id });

  // check if user exists in chat
  var userInChatAlreadyExists = await Chat.findOne({
    $and: [
      { room_ID: room_id },
      {
        users: { $elemMatch: { _id: user._id } },
      },
    ],
  });
  if (userInChatAlreadyExists)
    return res
      .status(404)
      .send({ message: "The user already exists in the chat!" });

  if (chatAlreadyExists) {
    try {
      chatAlreadyExists = await Chat.findOneAndUpdate(
        { room_ID: room_id },
        {
          room_ID: room_id,
          messages: chatAlreadyExists.messages,
          $push: { users: user },
        },
        { returnOriginal: false }
      );
    } catch (ex) {
      for (field in ex.errors) {
        res.status(400).send(ex.errors[field].message);
      }
      res.end();
      return;
    }

    res.status(201).send(chatAlreadyExists);
    res.end();
  } else {
    try {
      var chat = new Chat({
        room_ID: room_id,
        messages: [],
        users: [user],
      });

      chat = await chat.save();
    } catch (ex) {
      for (field in ex.errors) {
        res.status(400).send(ex.errors[field].message);
      }
      res.end();
      return;
    }
    res.status(201).send(chat);
    res.end();
  }
};

const removeUser = async (req, res) => {
  let { username, room_id } = req.body;

  // check if user email exists in db
  var user = await User.findOne({ username });

  if (!user)
    return res.status(404).send({ message: "The user doesn't exists!" });
  // check if chat exists in db
  var chat = await Chat.findOne({ room_ID: room_id });

  if (!chat)
    return res.status(404).send({ message: "The chat doesn't exists!" });

  // check if user exists in chat
  var userInChatExists = await Chat.findOne({
    $and: [
      { room_ID: room_id },
      {
        users: { $elemMatch: { _id: user._id } },
      },
    ],
  });
  if (!userInChatExists)
    return res
      .status(404)
      .send({ message: "The user doesn't exists in the chat!" });

  try {
    chat = await Chat.findOneAndUpdate(
      { room_ID: room_id },
      {
        room_ID: room_id,
        messages: chat.messages,
        $pull: { users: { _id: user._id } },
      },
      { returnOriginal: false }
    );
  } catch (ex) {
    for (field in ex.errors) {
      res.status(400).send(ex.errors[field].message);
    }
    res.end();
    return;
  }

  res.status(201).send(chat);
  res.end();
};

const getChatRooms = async (req, res) => {
  let { username } = req.body;

  // check if user email exists in db
  var user = await User.findOne({ username });

  if (!user)
    return res.status(404).send({ message: "The user doesn't exists!" });

  // check if chat exists in db
  var chat = await Chat.find({ "users._id": user._id });

  chat = chat.map((chat) => {
    return { room_ID: chat.room_ID };
  });

  if (!chat)
    return res.status(404).send({ message: "The chat doesn't exists!" });

  res.status(200).send(chat);
  res.end();
};

module.exports = {
  updateChat,
  addUser,
  getChat,
  getChatRooms,
  removeUser,
};
