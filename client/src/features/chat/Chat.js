import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import ScrollToBottom from "react-scroll-to-bottom";
import "./Chat.css";
import useWindowSize from "../../utils/useWindowSize";
import { useAddNewChatMutation, useUpdateChatMutation } from "./chatsApiSlice";

import {
  MDBBtn,
  MDBModal,
  MDBModalDialog,
  MDBModalContent,
  MDBModalHeader,
  MDBModalTitle,
  MDBModalBody,
  MDBModalFooter,
  MDBIcon,
} from "mdb-react-ui-kit";

import { socket } from "../../socket";

function Chat({ darkMode }) {
  const { width, height } = useWindowSize();
  const [socketConnection, setSocketConnection] = useState(false);

  const [addNewChat, { isLoading, isSuccess, isError, error }] =
    useAddNewChatMutation();

  const [
    updateChat,
    {
      isLoading: isLoadingUpdate,
      isSuccess: isSuccessUpdate,
      isError: isErrorUpdate,
      error: errorUpdate,
    },
  ] = useUpdateChatMutation();

  const location = useLocation();
  const navigate = useNavigate();

  // const { loading, chats } = useSelector((state) => state.chat);
  // const { userInfo } = useSelector((state) => state.user);

  const { username, room } = location.state;
  const [currentMessage, setCurrentMessage] = useState("");
  const [messageList, setMessageList] = useState([]);
  const [lastMessageData, setLastMessageData] = useState(undefined);
  const [newMessageData, setnewMessageData] = useState(undefined);
  const [fetchedList, setFetchedList] = useState([]);

  useEffect(() => {
    if (!socketConnection) {
      socket.connect();
      socket.emit("join_room", { room, username });
      setSocketConnection(true);

      console.log("socket connected");
    }

    // dispatch add user
    // dispatch(addUserToChat({ username, room_id: room }));
    //get chat data
    // dispatch(getChat({ room_id: room }));
  }, [username, room]);

  // useEffect(() => {
  //   if (messageList.length == 0 && chats != null) {
  //     var messages = chats?.messages?.map((message) => {
  //       return {
  //         _id: message._id,
  //         content: message.content,
  //         sender: message.sender.username,
  //         time_stamp: message.time_stamp,
  //       };
  //     });

  //     setFetchedList(messages);
  //   }
  // }, [chats]);

  // useEffect(() => {
  //   if (
  //     userInfo &&
  //     messageList.length > 1 &&
  //     messageList[messageList.length - 1].sender !=
  //       messageList[messageList.length - 2].sender
  //   ) {
  //     if (
  //       newMessageData &&
  //       messageList[messageList.length - 1] == newMessageData
  //     ) {
  //       console.log("updating ....");
  //       var slicedMessageList = [];

  //       // update all previous messages

  //       const indexOfNewMessageData = messageList.findIndex(
  //         (messageData) =>
  //           messageData.sender === newMessageData.sender &&
  //           messageData.content === newMessageData.content
  //       );

  //       slicedMessageList = messageList.slice(0, indexOfNewMessageData);

  //       // update from start
  //       if (
  //         lastMessageData == undefined &&
  //         !slicedMessageList.some((message) => message.sender == username)
  //       ) {
  //         slicedMessageList = messageList.slice(0, indexOfNewMessageData);
  //       }

  //       // first update for chat initiator
  //       else if (lastMessageData == undefined) {
  //         var firstOtherMessage = slicedMessageList.find(
  //           (message) => message.sender != username
  //         );

  //         const indexOfFirstOtherMessage = messageList.findIndex(
  //           (messageData) =>
  //             messageData.sender === firstOtherMessage.sender &&
  //             messageData.content === firstOtherMessage.content
  //         );

  //         slicedMessageList = messageList.slice(
  //           indexOfFirstOtherMessage,
  //           indexOfNewMessageData
  //         );
  //       }

  //       // update from my last message to new messsage
  //       else {
  //         const indexOfLastMessageData = messageList.findIndex(
  //           (messageData) =>
  //             messageData.sender === lastMessageData.sender &&
  //             messageData.content === lastMessageData.content
  //         );

  //         slicedMessageList = messageList.slice(
  //           indexOfLastMessageData + 1,
  //           indexOfNewMessageData
  //         );

  //         var firstOtherMessage = slicedMessageList.find(
  //           (message) => message.sender != username
  //         );
  //         const indexOfFirstOtherMessage = slicedMessageList.findIndex(
  //           (messageData) =>
  //             messageData.sender === firstOtherMessage.sender &&
  //             messageData.content === firstOtherMessage.content
  //         );

  //         slicedMessageList = slicedMessageList.slice(
  //           indexOfFirstOtherMessage,
  //           indexOfNewMessageData
  //         );
  //       }

  //       // update last message
  //       setLastMessageData(newMessageData);

  //       // call UPDATE Messages API
  //       dispatch(
  //         updateChat({
  //           messages: slicedMessageList,
  //           room_id: room,
  //         })
  //       );
  //     }
  //   }
  // }, [messageList]);

  const sendMessage = async () => {
    if (currentMessage !== "") {
      const messageData = {
        room: room,
        sender: username,
        content: currentMessage,
        time_stamp:
          new Date(Date.now()).getHours() +
          ":" +
          new Date(Date.now()).getMinutes(),
      };

      setnewMessageData(messageData);

      await socket.emit("send_message", messageData);
      setMessageList((list) => [...list, messageData]);
      setCurrentMessage("");
    }
  };

  useEffect(() => {
    socket.on("receive_message", (data) => {
      setMessageList((list) => [...list, data]);
    });
  }, [socket]);

  const [basicModal, setBasicModal] = useState(false);

  console.log("list", messageList);

  return (
    <div className="Chat-main">
      {width >= 769 ? (
        <div className="logo-image-section">
          <img
            src={"/img/female-chat-3d.png"}
            className="about-male-chat-illustration"
          />
        </div>
      ) : null}
      <MDBModal show={basicModal} setShow={setBasicModal} tabIndex="-1">
        <MDBModalDialog>
          <MDBModalContent>
            <MDBModalHeader>
              <MDBModalTitle>
                {}
                Exit Chat{" "}
                <i className="fas fa-exclamation-triangle text-danger"></i>
              </MDBModalTitle>
            </MDBModalHeader>

            <MDBModalBody>Are you sure to exit the chat?</MDBModalBody>

            <MDBModalFooter>
              <MDBBtn
                color="secondary"
                onClick={() => setBasicModal(!basicModal)}
              >
                Close
              </MDBBtn>
              <MDBBtn color="danger" onClick={() => navigate("/")}>
                Exit Chat
              </MDBBtn>
            </MDBModalFooter>
          </MDBModalContent>
        </MDBModalDialog>
      </MDBModal>
      <div className="chat-window">
        <div className="chat-header">
          <p>Live Chat</p>{" "}
          <MDBIcon
            icon="times-circle"
            color={darkMode ? "muted" : "danger"}
            size="2x"
            style={{
              marginRight: "2%",
            }}
            onClick={() => setBasicModal(!basicModal)}
          />
        </div>
        <div className={`chat-body ${darkMode ? "bg-black" : "bg-light"}`}>
          <ScrollToBottom className="message-container">
            {fetchedList.length != 0 &&
              fetchedList.map((messageContent) => {
                return (
                  <div
                    className="message"
                    id={username === messageContent.sender ? "you" : "other"}
                  >
                    <div>
                      <div className="message-content">
                        <p>{messageContent.content}</p>
                      </div>
                      <div className="message-meta">
                        <p
                          className={`${
                            darkMode ? "text-white" : "text-black"
                          }`}
                          id="time"
                        >
                          {messageContent.time_stamp}
                        </p>
                        <p
                          className={`${
                            darkMode ? "text-white" : "text-black"
                          }`}
                          id="author"
                        >
                          {messageContent.sender}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}

            {messageList.map((messageContent, index) => {
              return (
                <div
                  key={index}
                  className="message"
                  id={username === messageContent.sender ? "you" : "other"}
                >
                  <div>
                    <div className="message-content">
                      <p>{messageContent.content}</p>
                    </div>
                    <div className="message-meta">
                      <p
                        className={`${darkMode ? "text-white" : "text-black"}`}
                        id="time"
                      >
                        {messageContent.time_stamp}
                      </p>
                      <p
                        className={`${darkMode ? "text-white" : "text-black"}`}
                        id="author"
                      >
                        {messageContent.sender}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </ScrollToBottom>
        </div>
        <div className="chat-footer">
          <input
            className={`${
              darkMode ? "footer-input-white" : "footer-input-dark"
            }`}
            type="text"
            value={currentMessage}
            placeholder="Hey..."
            onChange={(event) => {
              setCurrentMessage(event.target.value);
            }}
            onKeyPress={(event) => {
              event.key === "Enter" && sendMessage();
            }}
          />
          <button onClick={sendMessage}>&#9658;</button>
        </div>
      </div>

      {width >= 1200 ? (
        <div className="logo-image-section">
          <img
            src={"/img/chat-bubble-down-left.png"}
            className="about-chat-bubble"
          />
          <img
            src={"/img/chat-bubble-up-right.png"}
            className="about-chat-bubble"
          />
        </div>
      ) : null}
    </div>
  );
}

export default Chat;
