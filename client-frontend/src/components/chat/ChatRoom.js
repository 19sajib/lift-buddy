import React from "react";
import Axios from "axios";
import { withRouter, useHistory } from "react-router-dom";
import jwt_decode from "jwt-decode";
import moment from 'moment'
import ReactEmoji from 'react-emoji';
import { Button,  Card,  CardContent,  CardHeader,
    Divider, Grid, Container , Typography } from '@material-ui/core';
import TelegramIcon from '@material-ui/icons/Telegram';
import { isAuthenticated } from '../../auth/auth'

import './chat.css'

const ChatRoom = ({ match, socket }) => {
  const { token, user } = isAuthenticated()
  const history = useHistory()
  if(!user) {
    history.push('/')
  }
  const chatroomId = match.params.id;
  const [chatRoomData, setChatRoomData] = React.useState();
  const [messages, setMessages] = React.useState([]);
  const [userId, setUserId] = React.useState("");
  const messageRef = React.useRef();
  const messagesEndRef = React.useRef();

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
        chatroomId, user
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

  //Scrolling to bottom
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  React.useEffect(() => {
    scrollToBottom()
  }, [messages]); 
  
  console.log(messages);

  // Chatroom info
  const getChatrooms = () => {
    Axios
      .post(`http://localhost:8080/chatroom/${chatroomId}`, {
      })
      .then((response) => {
        setChatRoomData(response.data[0]);
        console.log(response.data);
      })
      .catch((err) => {
        setTimeout(getChatrooms, 3000);
      });
  };
  React.useEffect(() => {
    getChatrooms()
  }, [messages]);
  console.log(chatRoomData);

  return (
      <Container maxWidth="lg">
          <Grid
          container
          spacing={3}
        >
          <Grid
            item
            lg={4}
            md={6}
            xs={12} >
          <Card>
          <CardContent>
        <Typography variant="h5" >{chatRoomData?.name}</Typography>
        <Divider />
        <Typography variant="body2" >Leaving At: {moment(chatRoomData?.leavingAt).format('LLLL')}</Typography>
        <br />
        <br />
        <Typography variant="h6" >Members Of This Chat Room:</Typography>
        <Divider />
        {chatRoomData?.userName.map((username, u) => 
        <Typography key={u} variant="body1">{username}</Typography>
        )}
        </CardContent>
      </Card>
      </Grid>
      <Grid
            item
            lg={8}
            md={6}
            xs={12} className="chatroomSection">
        <div className="chatroomContent" >
          {messages.map((message, i) => (
              userId === message.user ? (
                <div key={i} className="messageContainer justifyEnd">
                <p className="sentText pr-10">{message.name}</p>
                <div className="messageBox backgroundBlue">
                  <p className="messageText colorDark">{ReactEmoji.emojify(message.message)}</p>
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
          <div ref={messagesEndRef} />
        </div>
        <div className="chatroomActions">
          <div>
            <input
              className="input"
              type="text"
              name="message"
              placeholder="Type your message here...."
              ref={messageRef}
              required
            />
          </div>
          <div>
            <Button variant="contained" endIcon={<TelegramIcon />} color="primary" className="join" onClick={sendMessage}>
              Send
            </Button>
          </div>
        </div>
      </Grid>
      </Grid>
      </Container>
  );
};

export default withRouter(ChatRoom);
