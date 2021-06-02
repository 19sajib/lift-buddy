import React from 'react'
import Axios from 'axios'
import { CircularProgress, Divider, Typography, Grid } from '@material-ui/core'
import {useHistory} from 'react-router-dom'

import Feedback from './Feedback'
import { isAuthenticated } from '../../auth/auth'

const Index = () => {

  const history = useHistory()
  const {user} = isAuthenticated()

  if(!user?.isAdmin) {
    history.push('/')
  }
    const [empty, setEmpty] = React.useState(false)
    const [data, setData] = React.useState()
    const [sortData, setSortData] = React.useState([])

    React.useEffect(() => {
      Axios.post('http://localhost:8080/admin/dashboard/feedback-view')
        .then(function (response) {
          setData(response.data.feedback);
          console.log(response.data.feedback);
        })
        .catch(function (error) {
          console.log(error);
        });
      }, [])
    console.log(data);
    const newValue = async id => {
      if (sortData.length) {
        const filterData = sortData.filter(obj => {
          return obj._id !== id
        })
        if(!filterData.length) {
         return setEmpty(true)
        }
       setSortData(filterData)
      }
        else {
          const filterData = data.filter(obj => {
            return obj._id !== id
      })
      if(!filterData.length) {
        return setEmpty(true)
       }
      setSortData(filterData)
      }
    }  
    return (
      <div>
          { empty === true ? (<Typography color="secondary" variant="h6" align="center" >Currently No Feedback and Issues Here!</Typography>)
           : 
        (<div>
          <Typography color="primary" variant="h5" align="center" >Here is all the feedback and reported issues.</Typography>
          <Divider variant="middle" /> 
          </div>
    )  }
{    !empty ? 
    <Grid  container alignItems="stretch" spacing={3}>

          { !sortData.length ?  (
              !data ? <CircularProgress/>: (
                  data.map(data =>  (
                <Grid key={data._id} item xs={12} sm={12} md={6} lg={6}> 
               <Feedback key={data._id} data={data} newValue={newValue} />
               </Grid> )
             )
              )
          )   :   (
              sortData.map(data => (
                <Grid key={data._id} item xs={12} sm={12} md={6} lg={6}> 
                <Feedback key={data._id} data={data} newValue={newValue}/>
                </Grid>
              )
              )
          )
} 
</Grid> : null}
</div>)
}

export default Index
