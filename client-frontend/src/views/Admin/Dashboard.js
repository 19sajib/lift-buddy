import React from "react";

// @material-ui/core
import { makeStyles } from "@material-ui/core/styles";
// @material-ui/icons
import ReportIcon from '@material-ui/icons/Report';
import ContactSupportIcon from '@material-ui/icons/ContactSupport';
import VerifiedUserIcon from '@material-ui/icons/VerifiedUser';
import ReportProblemIcon from '@material-ui/icons/ReportProblem';
import EqualizerIcon from '@material-ui/icons/Equalizer';
import Warning from "@material-ui/icons/Warning";
import Update from "@material-ui/icons/Update";
// core components
import GridItem from "../../components/Admin/Grid/GridItem.js";
import GridContainer from "../../components/Admin/Grid/GridContainer.js";
import Card from "../../components/Admin/Card/Card";
import CardHeader from "../../components/Admin/Card/CardHeader.js";
import CardIcon from "../../components/Admin/Card/CardIcon.js";
import CardFooter from "../../components/Admin/Card/CardFooter.js";

import styles from "./dashboardStyle.js";
import { LinearProgress, Typography } from "@material-ui/core";

const useStyles = makeStyles(styles);

export default function Dashboard(admin) {
  const classes = useStyles();

  return (
    <div>
      <GridContainer>
        <GridItem xs={12} sm={6} md={3}>
          <Card>
            <CardHeader color="warning" stats icon>
              <CardIcon color="warning">
                <VerifiedUserIcon />
              </CardIcon>
              <p className={classes.cardCategory}>Pending Verification</p>
              <h3 className={classes.cardTitle}>
              {!admin ? <LinearProgress/> : <Typography>{admin.admin?.pendingVerifiedUser} <small>Users</small></Typography> }
              </h3>
            </CardHeader>
            <CardFooter stats>
              <div className={classes.stats}>
                
                  <Warning color="error" />
                
                <a href="#pablo" onClick={(e) => e.preventDefault()}>
                  Verify Now!
                </a>
              </div>
            </CardFooter>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={6} md={3}>
          <Card>
            <CardHeader color="danger" stats icon>
              <CardIcon color="danger">
                <ReportIcon />
              </CardIcon>
              <p className={classes.cardCategory}>Total Report</p>
              <h3 className={classes.cardTitle}>
              {!admin ? <LinearProgress/> : <Typography>{admin.admin?.totalReport}</Typography> }
              </h3>
            </CardHeader>
            <CardFooter stats>
              <div className={classes.stats}>
                <ReportProblemIcon color="error"/>
                <a href="#pablo" onClick={(e) => e.preventDefault()}>
                 Resolve Them Now!
                </a>
              </div>
            </CardFooter>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={6} md={3}>
          <Card>
            <CardHeader color="warning" stats icon>
              <CardIcon color="warning">
                <ContactSupportIcon />
              </CardIcon>
              <p className={classes.cardCategory}>Pending Help</p>
              <h3 className={classes.cardTitle}>
              {!admin ? <LinearProgress/> : <Typography>{admin.admin?.totalHelp} <small>Mail</small> </Typography> }
              </h3>
            </CardHeader>
            <CardFooter stats>
              <div className={classes.stats}>
                
                  <Warning color="error" />
                
                <a href="#pablo" onClick={(e) => e.preventDefault()}>
                  Help Them Now!
                </a>
              </div>
            </CardFooter>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={6} md={3}>
          <Card>
            <CardHeader color="rose" stats icon>
              <CardIcon color="rose">
                <EqualizerIcon />
              </CardIcon>
              <p className={classes.cardCategory}>Traffic</p>
              <h3 className={classes.cardTitle}>
              {!admin ? <LinearProgress/> : <Typography>{admin.admin?.trafic}</Typography> }
              </h3>
            </CardHeader>
            <CardFooter stats>
              <div className={classes.stats}>
                <Update />
                Last Update 24 Hours Ago
              </div>
            </CardFooter>
          </Card>
        </GridItem>
      </GridContainer>
    </div>
  );
}
