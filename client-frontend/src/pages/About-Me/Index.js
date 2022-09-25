import React from 'react';
import HomeIcon from '@material-ui/icons/Home';
import MailIcon from '@material-ui/icons/Mail';
import CallIcon from '@material-ui/icons/Call';
import IconButton from '@material-ui/core/IconButton';
import GitHubIcon from '@material-ui/icons/GitHub';
import FacebookIcon from '@material-ui/icons/Facebook';
import TwitterIcon from '@material-ui/icons/Twitter';
import InstagramIcon from '@material-ui/icons/Instagram';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import {Avatar, Box, Divider,  Typography,  makeStyles, Grid, } from '@material-ui/core';
import { blue, pink } from "@material-ui/core/colors";

import pp from "../../assests/images/pp.jpg"


const useStyles = makeStyles((theme) => ({
  root: {
        flexGrow: 1,
      },
  avatar: {
    height: 300,
    width: 300,
    marginTop: '-120px',
    boxShadow: theme.shadows[13],
    marginBottom: '20px',
    border: "1px solid grey[900]"
},
  box: {
    alignItems: "center",
    display: "flex",
    flexDirection: "column",
  },
}));

const Profile = ({ className, ...rest }) => {

  const classes = useStyles();
  
  

  return ( 
    <Grid container spacing={3} 
      className={classes.root}
    >
          <Grid item xs={12} md={7} style={{marginTop: '150px', borderRadius: '5px', padding: "0 5px 0 5px",}}>
    <Box
          p={3}
          display="flex"
          flexDirection="column"
        >
          <Typography
            color="textPrimary"
            gutterBottom
            variant="h5"
          >
            About Me
          </Typography>
         <Typography
            color="textPrimary"
            gutterBottom
            variant="h6"
          >
            Hi there, I'm Md Abu Bakkar Siddiqe Sajib 👋
          </Typography>
          <Typography gutterBottom color="textPrimary" variant="subtitle1">
          👨‍🎓 I'm a student of RPSU(Ranada Prasad Shaha University), Department of CSE(Computer Science & Engineering).
          </Typography>
          <Typography variant="subtitle1" gutterBottom >
          🔭 Lift-Buddy is my final year project of B.Sc.(Bachelor of Science). I completed this project as a full-stack project. I made this by using MERN(MongoDB, Express, React, Node).
          </Typography>
          <Typography variant="subtitle1" gutterBottom>
          🌱 Feel free to open an account on Lift-Buddy & check out every feature. It's very simple & easy to use. If you think any changes required then leave feedback. Also, if you find any bug please report that bug.
          </Typography>
          {/* <Typography
            color="textPrimary"
            gutterBottom
            variant="body1"
          >
            ⬇️Important Languages and Tools Used In This Project⬇️

            </Typography>
            <div style={{
                display: 'flex',
                alignItems: 'center',
                flexWrap: 'wrap',
                marginTop: '5px',
                align: 'center'
            }}>
               <img align="left" alt="VSCode" width="26px" src="https://raw.githubusercontent.com/github/explore/80688e429a7d4ef2fca1e82350fe8e3517d3494d/topics/visual-studio-code/visual-studio-code.png" />
                <img align="left" alt="HTML5" width="26px" src="https://raw.githubusercontent.com/github/explore/80688e429a7d4ef2fca1e82350fe8e3517d3494d/topics/html/html.png" />
                <img align="left" alt="CSS3" width="26px" src="https://raw.githubusercontent.com/github/explore/80688e429a7d4ef2fca1e82350fe8e3517d3494d/topics/css/css.png" />
                <img align="left" alt="JavaScript" width="26px" src="https://raw.githubusercontent.com/github/explore/80688e429a7d4ef2fca1e82350fe8e3517d3494d/topics/javascript/javascript.png" />
                <img align="left" alt="React" width="26px" src="https://raw.githubusercontent.com/github/explore/80688e429a7d4ef2fca1e82350fe8e3517d3494d/topics/react/react.png" />
                <img align="left" alt="GraphQL" width="26px" src="https://raw.githubusercontent.com/github/explore/80688e429a7d4ef2fca1e82350fe8e3517d3494d/topics/graphql/graphql.png" />
                <img align="left" alt="Node.js" width="26px" src="https://raw.githubusercontent.com/github/explore/80688e429a7d4ef2fca1e82350fe8e3517d3494d/topics/nodejs/nodejs.png" />
                <img align="left" alt="MySQL" width="26px" src="https://raw.githubusercontent.com/github/explore/80688e429a7d4ef2fca1e82350fe8e3517d3494d/topics/mysql/mysql.png" />
                <img align="left" alt="MongoDB" width="26px" src="https://raw.githubusercontent.com/github/explore/80688e429a7d4ef2fca1e82350fe8e3517d3494d/topics/mongodb/mongodb.png" />
                <img align="left" alt="Git" width="26px" src="https://raw.githubusercontent.com/github/explore/80688e429a7d4ef2fca1e82350fe8e3517d3494d/topics/git/git.png" />
                <img align="left" alt="GitHub" width="26px" src="https://raw.githubusercontent.com/github/explore/78df643247d429f6cc873026c0622819ad797942/topics/github/github.png" />
                <img align="left" alt="Terminal" width="26px" src="https://raw.githubusercontent.com/github/explore/80688e429a7d4ef2fca1e82350fe8e3517d3494d/topics/terminal/terminal.png" />
            </div> */}
            <Typography align="center" variant="subtitle1" gutterBottom>
            ⚡ Have a nice day ⚡
          <br />
          🙏 Thank You 🙏
          </Typography>   
          </Box>
    </Grid>

      <Grid item xs={12} md={4} style={{border: "1px solid grey", marginTop: '150px', borderRadius: '5px', padding: "0 5px 5px 5px", boxShadow: "0 9px 18px rgba(0,0,0,0.10), 0 7px 6px rgba(0,0,0,0.7)"}}>
        <Box
          className={classes.box}
        >
          <Avatar
            className={classes.avatar}
            src={pp}
          />
          <Typography
            color="textPrimary"
            gutterBottom
            variant="h5"
          >
            Md Abu Bakkar Siddiqe Sajib
          </Typography>         
          
          <Typography
            color="textPrimary"
            gutterBottom
            variant="body1"
          >
            Contact

            </Typography>
            <Divider style={{width:'50%'}} variant="middle" />
            <div style={{
                display: 'flex',
                alignItems: 'center',
                flexWrap: 'wrap',
            }}>
                <CallIcon />
                    <Typography
                        variant="subtitle1"
                    >
                        (+880) 1681260826
                    </Typography>
            </div> 
            <div style={{
                display: 'flex',
                alignItems: 'center',
                flexWrap: 'wrap',
            }}>
                <MailIcon />
                    <Typography
                        variant="subtitle1"
                    >
                        contact2sajib@gmail.com
                    </Typography>
            </div> 

            <div style={{
                display: 'flex',
                alignItems: 'center',
                flexWrap: 'wrap',
            }}>
                <HomeIcon />
                    <Typography
                        variant="subtitle1"
                    >
                        Narayanganj, Bangladesh 
                    </Typography>
                    </div> 
                 <div style={{
                display: 'flex',
                alignItems: 'center',
                flexWrap: 'wrap',
                marginTop: '5px',
                align: 'center'
            }}>
                    <IconButton onClick={() => window.open('https://github.com/2sajib2')}>
                    <GitHubIcon fontSize="large" />
                    </IconButton>
                    <IconButton onClick={() => window.open('https://facebook.com/2sajib2')}>
                    <FacebookIcon color="primary" fontSize="large" />
                    </IconButton>
                    <IconButton onClick={() => window.open('https://instagram.com/2sajib2')}>
                    <InstagramIcon fontSize="large" style={{color: pink[500]}} />
                    </IconButton>
                    <IconButton onClick={() => window.open('https://twitter.com/2sajib2')}>
                    <TwitterIcon  fontSize="large" style={{color: blue[400]}} />
                    </IconButton>
                    <IconButton onClick={() => window.open('https://www.linkedin.com/in/abu-sajib-b3b031124')}>
                    <LinkedInIcon fontSize="large" style={{color: blue[800]}} />
                    </IconButton>            
                    
          </div> 
        </Box>
    </Grid>


    </Grid>
  );
};

export default Profile;