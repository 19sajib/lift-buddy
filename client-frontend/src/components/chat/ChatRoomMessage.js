import React from "react";
import Axios from "axios";
import { withRouter } from "react-router-dom";
import jwt_decode from "jwt-decode";
import moment from 'moment'
import ReactEmoji from 'react-emoji';
import {Box,  Button,  Card,  CardContent,  CardHeader,
    Divider, Grid, Input ,makeStyles } from '@material-ui/core';
import SendIcon from '@material-ui/icons/Send';
import { isAuthenticated } from '../../auth/auth'

import './chat.css'

const ChatRoomMessage = ({ match, socket }) => {
  const { token } = isAuthenticated()
  const chatroomId = match.params.id;
  const [messages, setMessages] = React.useState([]);
  const messageRef = React.useRef();
  const [userId, setUserId] = React.useState("");

  const sendMessage = () => {
    if (socket) {
      socket.emit("chatroomMessage", {
        chatroomId,
        message: messageRef.current.value,
      });
      
      messageRef.current.value = "";
    }
  };
  React.useEffect(() => {
    Axios.get(`http://localhost:8080/message/${chatroomId}`, {
    }).then((res) => setMessages(res.data));
  }, [chatroomId]);
  React.useEffect(() => {
    //const token = localStorage.getItem("CC_Token");
    if (token) {
      const payload = jwt_decode(token) //JSON.parse(atob(token.split(".")[1]));
      console.log(payload);
      setUserId(payload.id);
    }
    if (socket) {
      socket.on("newMessage", (message) => {
        const newMessages = [...messages, message];
        setMessages(newMessages);
      });
    }
    //eslint-disable-next-line
  }, [messages]);
  
  React.useEffect(() => {
    if (socket) {
      socket.emit("joinRoom", {
        chatroomId,
      });
    }
    
    return () => {
      //Component Unmount
      if (socket) {
        socket.emit("leaveRoom", {
          chatroomId,
        });
      }
    };
    //eslint-disable-next-line
  }, []);
  
  console.log(messages);

  return (
      <Card>
      <CardHeader
          subheader="The information of chatbox"
          title="Chatbox"
        />
        <Divider />
      <div className="chatroomSection">
        <div className="chatroomContent">
          {messages.map((message, i) => (
              userId === message.user ? (
                <div key={i} className="messageContainer justifyEnd">
                <p className="sentText pr-10">{message.name}</p>
                <div className="messageBox backgroundBlue">
                  <p className="messageText colorWhite">{ReactEmoji.emojify(message.message)}</p>
                  <p >{moment(message.createdAt).format('YYYY-MM-DD hh:mm A')}</p>
                </div>
              </div> ) : (
                <div key={i} className="messageContainer justifyStart">
                <div className="messageBox backgroundLight">
                  <p className="messageText colorDark">{ReactEmoji.emojify(message.message)}</p>
                  <p >{moment(message.createdAt).format('YYYY-MM-DD hh:mm A')}</p>
                </div>
                <p className="sentText pl-10 ">{message.name}</p>
              </div>
            )
          ))}
        </div>
        <div className="chatroomActions">
          <div>
            <input
              type="text"
              name="message"
              required
              placeholder="Say something!"
              ref={messageRef}
            />
          </div>
          <div>
            <Button variant="contained" endIcon={<SendIcon />} color="primary" className="join" onClick={sendMessage}>
              Send
            </Button>
          </div>
        </div>
      </div>
      </Card>
  );
};

export default withRouter(ChatRoomMessage);
