import React from 'react'
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom'
import { Container } from '@material-ui/core'
import io from 'socket.io-client'


                //  --> Components <--
// import Navbar from './components/Navbar/Navbar'
// import NavbarNew from './components/Navbar/NavbarNew'
import Footer from './components/Footer/Index'
import NewNavbar from './components/Navbar/NewNavBar'


                //  --> Pages <--
import Auth from './pages/Auth/Auth'
import Home from './pages/Home/Home'
import Main from './pages/Main/Index'
import Account from './pages/Profile/Index'
import ChatRoom from './pages/Chat/ChatRoom'
import proHome from './pages/Home/proPostHome/Home'
import ChatDashboard from './pages/Chat/ChatDashboard'
import AccountActivation from './pages/Auth/ActiveAccount'
import ForgetPassword from './pages/Auth/ForgetPassword'
import ResetPassword from './pages/Auth/ResetPassword'
import Verify from './pages/Verification/ImageUpload'
import Shoutbox from './pages/Shoutbox/Shoutbox'
import Terms from './pages/Legal/terms'
import Report from './pages/Report/Report'
import Privacy from './pages/Legal/privacy'
import AboutMe from './pages/About-Me/Index'
import Feedback from './pages/Feedback/Index'
import ContactUs from './pages/Contact-Us/Index'

                //  --> Admin <--
import Trafic from './admin/Trafic/Index'
import AdminPanel from './admin/Admin/Index'
import FeedbackView from './admin/Feedback/Index'
import ViewProfile from './admin/ProfileView/View'
import ContactUsHelp from './admin/ContactHelp/Index'
import ReportResponse from './admin/ReportResponse/Index'
import UserVerification from './admin/UserVerification/Index'
import ReportProfileView from './admin/Report-Profile-View/Index'
 

import { isAuthenticated } from './auth/auth'

import { Bounce, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App () {

  const { token, user } = isAuthenticated()

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
              <Route path="/" exact component={Main }/>
              <Route path="/posts" exact component={Home}/>
              <Route path="/posts/search" exact component={Home} />
              <Route path="/terms-and-conditions" exact component={Terms}/>
              <Route path="/privacy-policy" exact component={Privacy}/>
              <Route path="/proHome" exact component={proHome}/>
              <Route path="/auth" exact component={Auth}/>
              <Route path="/trafic/update" exact component={Trafic}/>
              <Route path="/verification" exact component={Verify}/>
              <Route path="/contact-us" exact component={ContactUs}/>
              <Route path="/feedback-report-issue" exact component={Feedback}/>
              <Route path="/feedback-report-issue-view" exact component={FeedbackView}/>
              <Route path="/contact-us/view" exact component={ContactUsHelp}/>
              <Route path="/admin-dashboard" render={() => <AdminPanel />} exact />
              <Route path="/reported-profile-view" render={() => <ReportProfileView />} exact />
              <Route path="/user-verification" render={() => <UserVerification />} exact />
              <Route path="/profile" exact component={() => (user ? <Account /> : <Redirect to="/auth" />)}/>
              <Route path="/profile/:id" exact component={() => (user ? <ViewProfile /> : <Redirect to="/auth" />)}/>
              <Route path="/accountactivation/:token" component={AccountActivation}/>
              <Route path="/forget-password" exact component={ForgetPassword}/>
              <Route path="/reset-password/:token" component={ResetPassword}/>
              <Route path="/report/:id" exact component={Report}/>
              <Route path="/report-response" exact component={ReportResponse}/>
              <Route path="/chat-dashboard" render={() => <ChatDashboard socket={socket} />} exact />
              <Route path="/chatroom/:id" render={() => <ChatRoom socket={socket} />} exact />
              <Route path="/shoutbox" render={() => (user ? <Shoutbox socket={socket} /> : <Redirect to="/auth" />) } exact />
              <Route path="/about-me" exact component={AboutMe}/>
          </Switch>
          <Footer />
          <ToastContainer autoClose={3000} transition={Bounce}/>
      </Container>
  </BrowserRouter>
  )
   }
export default App;

