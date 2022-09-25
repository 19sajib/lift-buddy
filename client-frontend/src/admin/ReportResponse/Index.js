import React from 'react'
import Axios from 'axios'
import {useHistory} from 'react-router-dom'
import Response from './Response'
import { CircularProgress, Divider, Typography } from '@material-ui/core'

import { isAuthenticated } from '../../auth/auth'
import load from '../../images/load-dot-unscreen.gif';



const Index = () => {
  const history = useHistory()
  const {user} = isAuthenticated()

  if(!user?.isAdmin) {
    history.push('/')
  }

    const [isLoading, setIsLoading] = React.useState(false)
    const [empty, setEmpty] = React.useState(false)
    const [data, setData] = React.useState()
    const [sortData, setSortData] = React.useState([])

    React.useEffect(() => {
      setIsLoading(true)
      Axios.post('http://localhost:8080/admin/dashboard/report')
        .then(function (response) {
          setData(response.data.reports);
          setIsLoading(false)
          //console.log(response.data.reports);
        })
        .catch(function (error) {
          console.log(error);
        });
      }, [])
    
    const newValue = async postId => {
      console.log(postId);
      if (sortData.length) {
        const filterData = sortData.filter(obj => {
          return obj.reportedPost !== postId
        })
        if(!filterData.length) {
         return setEmpty(true)
        }
       setSortData(filterData)
      }
        else {
          const filterData = data.filter(obj => {
            return obj.reportedPost !== postId
      })
      if(!filterData.length) {
        return setEmpty(true)
       }
      console.log(filterData);
      setSortData(filterData)
      }
    }  

    if(!isLoading && !data?.length) {
      return <Typography variant="h4" color="secondary" align="center">No Report!</Typography> 
    }

    return (
      <div>
          { empty === true ? (<Typography color="secondary" variant="h6" align="center" >Currently No Report Here!</Typography>)
           : 
        (<div>
          <Typography color="primary" variant="h6" align="center" >Resolve These Report!</Typography>
          <Divider variant="middle" />
          { !sortData.length ?  (
           isLoading ? <div align="center"> <img height="290px" src={load} alt="Loading" /> </div> : (
             data.map(data => (
               <Response key={data._id} data={data} newValue={newValue} />
             ))
              )
          )   :   (
              sortData.map(data => (
                <Response key={data._id} data={data} newValue={newValue}/>
              ))
          )
} 
</div>)
}
</div>
    )
}

export default Index

