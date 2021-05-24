import React from "react";
// react plugin for creating charts
// @material-ui/core
import { makeStyles } from "@material-ui/core/styles";
// @material-ui/icons
import EqualizerIcon from '@material-ui/icons/Equalizer';
import StorageIcon from '@material-ui/icons/Storage';
import ContactSupportIcon from '@material-ui/icons/ContactSupport';
import DraftsIcon from '@material-ui/icons/Drafts';
import RecentActorsIcon from '@material-ui/icons/RecentActors';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import Warning from "@material-ui/icons/Warning";
import DateRange from "@material-ui/icons/DateRange";
import Update from "@material-ui/icons/Update";
import Accessibility from "@material-ui/icons/Accessibility";
// core components
import GridItem from "../../components/Admin/Grid/GridItem.js";
import GridContainer from "../../components/Admin/Grid/GridContainer.js";
import Card from "../../components/Admin/Card/Card";
import CardHeader from "../../components/Admin/Card/CardHeader.js";
import CardIcon from "../../components/Admin/Card/CardIcon.js";
import CardFooter from "../../components/Admin/Card/CardFooter.js";
import Danger from "../../components/Admin/Typography/Danger.js";

import { green } from '@material-ui/core/colors';
import styles from "./dashboardStyle.js";
import { Box, Typography } from "@material-ui/core";

const useStyles = makeStyles(styles);

export default function Dashboard() {
  const classes = useStyles();
  return (
    <div>
      <GridContainer>
        <GridItem xs={12} sm={6} md={3}>
          <Card>
            <CardHeader color="warning" stats icon>
              <CardIcon color="warning">
                <ContactSupportIcon />
              </CardIcon>
              <p className={classes.cardCategory}>Pending Help</p>
              <h3 className={classes.cardTitle}>
                12 <small>Mail</small>
              </h3>
            </CardHeader>
            <CardFooter stats>
              <div className={classes.stats}>
                <Danger>
                  <Warning />
                </Danger>
                <a href="#pablo" onClick={(e) => e.preventDefault()}>
                  Help Them Now!
                </a>
              </div>
            </CardFooter>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={6} md={3}>
          <Card>
            <CardHeader color="success" stats icon>
              <CardIcon color="success">
                <StorageIcon />
              </CardIcon>
              <p className={classes.cardCategory}>Storage</p>
              <h3 className={classes.cardTitle}>
              21/50 <small>GB</small>
              </h3>
            </CardHeader>
            <CardFooter stats>
              <div className={classes.stats}>
                <DateRange />
                Last 24 Hours
              </div>
            </CardFooter>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={6} md={3}>
          <Card>
            <CardHeader color="success" stats icon>
              <CardIcon color="success">
                <DraftsIcon />
              </CardIcon>
              <p className={classes.cardCategory}>Total Help Asked</p>
              <h3 className={classes.cardTitle}>
              21 <small>Times</small>
              </h3>
            </CardHeader>
            <CardFooter stats>
              <div className={classes.stats}>
                <DateRange />
                Last 24 Hours
              </div>
            </CardFooter>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={6} md={3}>
          <Card>
            <CardHeader color="primary" stats icon>
              <CardIcon color="primary">
                <RecentActorsIcon />
              </CardIcon>
              <p className={classes.cardCategory}>New user</p>
              <h3 className={classes.cardTitle}>15</h3>
            </CardHeader>
            <CardFooter stats>
        <Box pt={2} display="flex" alignItems="center"  >
          <ArrowUpwardIcon style={{color: green[900]}} />
          <Typography
            style={{color: green[900], margin: 1}}
            variant="body2"
          >
            12%
          </Typography>
          <Typography
            color="textSecondary"
            variant="caption"
          >
            Since last month
          </Typography>
        </Box>
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
              <h3 className={classes.cardTitle}>+245</h3>
            </CardHeader>
            <CardFooter stats>
              <div className={classes.stats}>
                <Update />
                Just Updated
              </div>
            </CardFooter>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={6} md={3}>
          <Card>
            <CardHeader color="info" stats icon>
              <CardIcon color="info">
                <Accessibility />
              </CardIcon>
              <p className={classes.cardCategory}>Number Of Users</p>
              <h3 className={classes.cardTitle}>+245</h3>
            </CardHeader>
            <CardFooter stats>
              <div className={classes.stats}>
                <Update />
                Just Updated
              </div>
            </CardFooter>
          </Card>
        </GridItem>
      </GridContainer>
    </div>
  );
}
