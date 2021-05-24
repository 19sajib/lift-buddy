import {
    Avatar,
    Card,
    CardContent,
    Grid,
    Typography,
    LinearProgress
  } from '@material-ui/core';
  import { green } from '@material-ui/core/colors';
  import AccountBoxIcon from '@material-ui/icons/AccountBox';

  const VerifiedUser = ({props, user}) =>{ 
    
    return(
    <Card {...props}>
      <CardContent>
        <Grid style={{ justifyContent: 'space-between' }}
          container
          spacing={3}
        >
          <Grid item>
            <Typography
              color="textSecondary"
              gutterBottom
              variant="h6"
            >
              Verified User
            </Typography>
            {!user ? <LinearProgress /> :
            <Typography
              color="textPrimary"
              variant="h3"
            >
              {user.verifiedUser}
            </Typography>}
          </Grid>
          <Grid item>
            <Avatar style={{backgroundColor: green[600], height: 56, width: 56}}
            >
              <AccountBoxIcon />
            </Avatar>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  )};
  
  export default VerifiedUser;