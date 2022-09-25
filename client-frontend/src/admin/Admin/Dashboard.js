import React from "react";
import { useHistory } from 'react-router-dom'
// @material-ui/core
import { makeStyles } from "@material-ui/core/styles";
// @material-ui/icons
import ReportIcon from '@material-ui/icons/Report';
import ContactSupportIcon from '@material-ui/icons/ContactSupport';
import VerifiedUserIcon from '@material-ui/icons/VerifiedUser';
import ReportProblemIcon from '@material-ui/icons/ReportProblem';
import FeedbackIcon from '@material-ui/icons/Feedback';
import EqualizerIcon from '@material-ui/icons/Equalizer';
import Warning from "@material-ui/icons/Warning";
import Update from "@material-ui/icons/Update";
import ListAltIcon from '@material-ui/icons/ListAlt';
import PersonAddDisabledIcon from '@material-ui/icons/PersonAddDisabled';
// core components
import GridItem from "../../components/Admin/Grid/GridItem.js";
import GridContainer from "../../components/Admin/Grid/GridContainer.js";
import Card from "../../components/Admin/Card/Card";
import CardHeader from "../../components/Admin/Card/CardHeader.js";
import CardIcon from "../../components/Admin/Card/CardIcon.js";
import CardFooter from "../../components/Admin/Card/CardFooter.js";

import styles from "./dashboardStyle.js";
import { LinearProgress, Typography } from "@material-ui/core";

import { isAuthenticated } from '../../auth/auth'

const useStyles = makeStyles(styles);

export default function Dashboard(admin) {
  const classes = useStyles();
  const history = useHistory()
  const { user } = isAuthenticated()

  if(!user?.isAdmin) {
    history.push('/')
  }

  return (
    <div>
      <GridContainer>
        <GridItem xs={12} sm={6} md={4}>
          <Card>
            <CardHeader color="warning" stats icon>
              <CardIcon color="warning">
                <VerifiedUserIcon />
              </CardIcon>
              <p className={classes.cardCategory}>Verification Asked</p>
              <h3 className={classes.cardTitle}>
              {!admin ? <LinearProgress/> : <Typography>{admin.admin?.pendingVerifiedUser} <small>Users</small></Typography> }
              </h3>
            </CardHeader>
            <CardFooter stats>
              <div className={classes.stats}>
                
                  <Warning color="error" />
                
                <a href="/user-verification">
                  Verify Now!
                </a>
              </div>
            </CardFooter>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={6} md={4}>
          <Card>
            <CardHeader color="danger" stats icon>
              <CardIcon color="danger">
                <ReportIcon />
              </CardIcon>
              <p className={classes.cardCategory}>Total Post Report</p>
              <h3 className={classes.cardTitle}>
              {!admin ? <LinearProgress/> : <Typography>{admin.admin?.totalReport}</Typography> }
              </h3>
            </CardHeader>
            <CardFooter stats>
              <div className={classes.stats}>
                <ReportProblemIcon color="error"/>
                <a href="/report-response" >
                 Resolve Them Now!
                </a>
              </div>
            </CardFooter>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={6} md={4}>
          <Card>
            <CardHeader color="warning" stats icon>
              <CardIcon color="warning">
                <ContactSupportIcon />
              </CardIcon>
              <p className={classes.cardCategory}>Total Help Asked</p>
              <h3 className={classes.cardTitle}>
              {!admin ? <LinearProgress/> : <Typography>{admin.admin?.totalHelp} <small>Mail</small> </Typography> }
              </h3>
            </CardHeader>
            <CardFooter stats>
              <div className={classes.stats}>
                
                  <Warning color="error" />
                
                <a href="/contact-us/view">
                  Pending Help Here!
                </a>
              </div>
            </CardFooter>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={6} md={4}>
          <Card>
            <CardHeader color="danger" stats icon>
              <CardIcon color="danger">
                <PersonAddDisabledIcon />
              </CardIcon>
              <p className={classes.cardCategory}>Total Reported Profile</p>
              <h3 className={classes.cardTitle}>
              {!admin ? <LinearProgress/> : <Typography>{admin.admin?.reportedUser} <small></small> </Typography> }
              </h3>
            </CardHeader>
            <CardFooter stats>
              <div className={classes.stats}>
                
              <Warning color="error" />
                
                <a href="/reported-profile-view">
                  Check Reported Profile Here!
                </a>
              </div>
            </CardFooter>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={6} md={4}>
          <Card>
            <CardHeader color="info" stats icon>
              <CardIcon color="info">
                <FeedbackIcon />
              </CardIcon>
              <p className={classes.cardCategory}>Total Feedback and Issues</p>
              <h3 className={classes.cardTitle}>
              {!admin ? <LinearProgress/> : <Typography>{admin.admin?.totalFeedback} <small></small> </Typography> }
              </h3>
            </CardHeader>
            <CardFooter stats>
              <div className={classes.stats}>
                
                  <ListAltIcon />
                
                <a href="/feedback-report-issue-view">
                  See Latest Feedback and Issues Here!
                </a>
              </div>
            </CardFooter>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={6} md={4}>
          <Card>
            <CardHeader color="primary" stats icon>
              <CardIcon color="primary">
                <EqualizerIcon />
              </CardIcon>
              <p className={classes.cardCategory}>Traffic</p>
              <h3 className={classes.cardTitle}>
              {!admin ? <LinearProgress/> : <Typography>+{admin.admin?.trafic}</Typography> }
              </h3>
            </CardHeader>
            <CardFooter stats>
              <div className={classes.stats}>
                <Update />
                <a href="/trafic/update">
                  Update Now!
                </a>
              </div>
            </CardFooter>
          </Card>
        </GridItem>
      </GridContainer>
    </div>
  );
}
