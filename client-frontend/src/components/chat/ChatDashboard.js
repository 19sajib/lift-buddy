import React from "react";
import axios from "axios";
import moment from 'moment'
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemText from "@material-ui/core/ListItemText";
import ListSubheader from "@material-ui/core/ListSubheader";
import Avatar from "@material-ui/core/Avatar";
import AvatarGroup from '@material-ui/lab/AvatarGroup';


import { isAuthenticated } from '../../auth/auth'


const useStyles = makeStyles((theme) => ({
  text: {
    padding: theme.spacing(2, 2, 0)
  },
  paper: {
    paddingBottom: 50
  },
  list: {
    marginBottom: theme.spacing(2)
  },
  subheader: {
    backgroundColor: theme.palette.background.paper
  },
  grow: {
    flexGrow: 1
  },
  fabButton: {
    position: "absolute",
    zIndex: 1,
    top: -30,
    left: 0,
    right: 0,
    margin: "0 auto"
  }
}));

const ChatDashboard = (props) => {
  const { user } = isAuthenticated()
  const userId = user._id

  const classes = useStyles();

  const [chatrooms, setChatrooms] = React.useState([]);
  const [chatroomName, setChatroomName] = React.useState("");

  const getChatrooms = () => {
    axios
      .get("http://localhost:8080/chatroom", {
      })
      .then((response) => {
        setChatrooms(response.data);
        console.log(response.data);
      })
      .catch((err) => {
        setTimeout(getChatrooms, 3000);
      });
  };

  const addNewChatroom = () => {
    axios
      .post(
        "http://localhost:8080/chatroom",
        { name: chatroomName, user },
      )
      .then((res) => {
        setChatroomName("");
        getChatrooms();
      })
      .catch((err) => {
        console.log("error", err.response);
      });
  };

  React.useEffect(() => {
    getChatrooms();
    // eslint-disable-next-line
  }, []);

  return (
    <React.Fragment>
      <CssBaseline />
      <Paper square className={classes.paper}>
        <Typography className={classes.text} variant="h5" gutterBottom>
          Inbox
        </Typography>
        <div className="cardBody">
        <div className="inputGroup">
          <label htmlFor="chatroomName">Chatroom Name</label>
          <input
            type="text"
            name="chatroomName"
            id="chatroomName"
            value={chatroomName}
            placeholder="Create Chat Room"
            onChange={(e) => setChatroomName(e.target.value)}
          />
        </div>
      </div>
      <button onClick={addNewChatroom}>Create Chatroom</button>
        <List className={classes.list}>
          {chatrooms.map((chatroom) => (
            <React.Fragment key={chatroom._id} >
              <ListItem button component={Link} to={"/chatroom/" + chatroom._id} >
                <ListItemAvatar>
                <AvatarGroup max={4}>
                  {chatroom?.userAvatar.map ((avatar) => 
                <Avatar alt="sajib" src={avatar} />
                  )}
              </AvatarGroup>
                </ListItemAvatar>
                <ListItemText primary={chatroom.name} secondary={moment(chatroom.createdAt).format('LLLL')} />
                <ListItemText primary={chatroom.name} secondary={moment(chatroom.createdAt).format('LLLL')} />
              </ListItem>
            </React.Fragment>
          ))}
        </List>
      </Paper>
    </React.Fragment>
  );
}

export default ChatDashboard;
