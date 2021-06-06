import React from 'react'
import Axios from 'axios'
import { Container, Grid, Box } from '@material-ui/core'
import AllPost from './AllPost'
import Dashboard from './Dashboard'
import AllUser from './AllUser'
import ActivePosts from './ActivePosts'
import TrafficByDevice from './TraficByDevice'
import VerifiedUser from './VerifiedUser'
import DailyPost from './DailyPost'

const Index = (result) => {
    
  const [admin, setAdmin] = React.useState()
    React.useEffect(() => {
      Axios.post('http://localhost:8080/admin/dashboard')
        .then(function (response) {
          setAdmin(response.data.admin);
          console.log(response.data.admin);
        })
        .catch(function (error) {
          console.log(error);
        });
      }, [])


    return (
        <>    
        <Box backgroundcolor="background.default" minHeight="100%" py={3}
      sx={{
        backgroundColor: 'background.default',
        minHeight: '100%',
        py: 3
      }}
    >
        <Container maxWidth={false}>
        <Grid
          container
          spacing={3}
        >
          <Grid
            item
            lg={3}
            sm={6}
            xl={3}
            xs={12}
          >
            <ActivePosts />
            </Grid>
            <Grid
            item
            lg={3}
            sm={6}
            xl={3}
            xs={12}
          >  
            <AllPost post={admin?.totalPost} />
          </Grid>
          <Grid
            item
            lg={3}
            sm={6}
            xl={3}
            xs={12}
          >
            <VerifiedUser user={admin}/>
            </Grid>
            <Grid
            item
            lg={3}
            sm={6}
            xl={3}
            xs={12}
          >
            <AllUser user={admin?.user}/>
            </Grid>
          </Grid>
          </Container>
        </Box>
        <Dashboard admin={admin} />
        <Grid container spacing={3} >
        {/* <Grid
            item
            lg={8}
            md={12}
            xl={9}
            xs={12}
          >
            <DailyPost />
          </Grid> */}
          <Grid
            item
            lg={4}
            md={6}
            xl={3}
            xs={12}
          >
            <TrafficByDevice trafic={admin} style={{height: '100%'}}  />
          </Grid>
        </Grid>
        </>
    )
}

export default Index
