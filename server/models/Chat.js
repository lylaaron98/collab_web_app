const mongoose = require("mongoose");

const chatSchema = new mongoose.Schema({
  room_ID: {
    type: String,
    lowercase: true,
    unique: true,
    required: true,
    index: true,
  },
  users: [{ user: { type: mongoose.Schema.Types.ObjectId, ref: "User" } }],
  messages: [
    {
      sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },

      time_stamp: { type: String, required: true },
      content: { type: String, required: true },
    },
  ],
});

const Chat = new mongoose.model("Chat", chatSchema);

module.exports = Chat;
