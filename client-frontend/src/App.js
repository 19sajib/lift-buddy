import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import { Container } from '@material-ui/core'

import Navbar from './components/Navbar/Navbar'
import NavbarNew from './components/Navbar/NavbarNew'
import Auth from './components/Auth/Auth'
import Home from './components/Home/Home'
import proHome from './components/Home/proPostHome/Home'
import Account from './components/Profile/Index'
import AccountActivation from './components/Auth/ActiveAccount'
import ForgetPassword from './components/Auth/ForgetPassword'
import ResetPassword from './components/Auth/ResetPassword'

const App = () => (
  <BrowserRouter>
      <Container maxidth="lg">
          <Navbar />
          <Switch>
              <Route path="/" exact component={Home}/>
              <Route path="/proHome" exact component={proHome}/>
              <Route path="/auth" exact component={Auth}/>
              <Route path="/profile" exact component={Account}/>
              <Route path="/accountactivation/:token" component={AccountActivation}/>
              <Route path="/forget-password" exact component={ForgetPassword}/>
              <Route path="/reset-password/:token" component={ResetPassword}/>
          </Switch>
      </Container>
  </BrowserRouter>
  )

export default App;

