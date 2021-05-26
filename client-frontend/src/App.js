import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import { Container } from '@material-ui/core'
import io from 'socket.io-client'

// import Navbar from './components/Navbar/Navbar'
// import NavbarNew from './components/Navbar/NavbarNew'
import Auth from './components/Auth/Auth'
import Home from './components/Home/Home'
import proHome from './components/Home/proPostHome/Home'
import Account from './components/Profile/Index'
import AccountActivation from './components/Auth/ActiveAccount'
import ForgetPassword from './components/Auth/ForgetPassword'
import ResetPassword from './components/Auth/ResetPassword'
import ChatDashboard from './components/chat/ChatDashboard'
import ChatRoom from './components/chat/ChatRoom'
import Report from './components/Report/Report'
import Verify from './components/Verification/ImageUpload'
import Terms from './legal/terms'
import AdminPanel from './views/Admin/Index'
import UserVerification from './views/UserVerification/Index'
 

import { isAuthenticated } from './auth/auth'
import NewNavbar from './components/Navbar/NewNavBar'

import { Bounce, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App () {

  const { token } = isAuthenticated()

  const [socket, setSocket] = React.useState(null);

  const setupSocket = () => {
    
    if (token && !socket) {
      const newSocket = io("http://localhost:8080", {
        query: {
          token: token,
        },
      });

      newSocket.on("disconnect", () => {
        setSocket(null);
        setTimeout(setupSocket, 3000);
        console.log("error", "Socket Disconnected!");
      });

      newSocket.on("connect", () => {
        console.log("success", "Socket Connected!");
      });

      setSocket(newSocket);
    }
  };

  React.useEffect(() => {
    setupSocket();
    //eslint-disable-next-line
  }, []);

   return (
  <BrowserRouter>
      <Container maxidth="lg">
          {/* <Navbar />
          <NavbarNew /> */}
          <NewNavbar />
          <Switch>
              <Route path="/" exact component={Home}/>
              <Route path="/terms-and-conditions" exact component={Terms}/>
              <Route path="/proHome" exact component={proHome}/>
              <Route path="/auth" exact component={Auth}/>
              <Route path="/verification" exact component={Verify}/>
              <Route path="/admin-dashboard" render={() => <AdminPanel />} exact />
              <Route path="/user-verification" render={() => <UserVerification />} exact />
              <Route path="/profile" exact component={Account}/>
              <Route path="/accountactivation/:token" component={AccountActivation}/>
              <Route path="/forget-password" exact component={ForgetPassword}/>
              <Route path="/reset-password/:token" component={ResetPassword}/>
              <Route path="/report/:id" component={Report}/>
              <Route path="/chat-dashboard" render={() => <ChatDashboard socket={socket} />} exact />
              <Route path="/chatroom/:id" render={() => <ChatRoom socket={socket} />} exact />
          </Switch>
          <ToastContainer autoClose={3000} transition={Bounce}/>
      </Container>
  </BrowserRouter>
  )
   }
export default App;

