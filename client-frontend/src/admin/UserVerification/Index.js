import React from 'react'
import Axios from 'axios'
import {useHistory} from 'react-router-dom'
import Verify from './Verify'
import { Divider, Typography } from '@material-ui/core'

import { isAuthenticated } from '../../auth/auth'
import load from '../../assests/images/load-dot-unscreen.gif';

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
      Axios.post('http://localhost:8080/admin/dashboard/verify')
        .then(function (response) {
          setData(response.data.verify);
          setIsLoading(false)
          //console.log(response.data.verify);
        })
        .catch(function (error) {
          console.log(error);
        });
      }, [])
    
    const newValue = async userId => {
      console.log(userId);
      if (sortData.length) {
        const filterData = sortData.filter(obj => {
          return obj.userId !== userId
        })
        if(!filterData.length) {
         return setEmpty(true)
        }
       setSortData(filterData)
      }
        else {
          const filterData = data.filter(obj => {
            return obj.userId !== userId
      })
      if(!filterData.length) {
        return setEmpty(true)
       }
      console.log(filterData);
      setSortData(filterData)
      }
    }  

    if(!isLoading && !data?.length) {
      return <Typography variant="h4" color="secondary" align="center">No Pending Verification</Typography> 
    }
    return (
      <div>
          { empty === true ? (<Typography color="secondary" variant="h6" align="center" >Currently No Verification Pending!</Typography>)
           : 
        (<div>
          <Typography color="primary" variant="h5" align="center" >Verify These Profile!</Typography>
          <Divider variant="middle" />
          { !sortData.length ?  (
           isLoading ? <div align="center"> <img src={load} alt="loading"/> </div> : (
             data?.map(data => (
               <Verify key={data._id} data={data} newValue={newValue} />
             ))
              )
          )   :   (
              sortData.map(data => (
                <Verify key={data._id} data={data} newValue={newValue}/>
              ))
          )
} 
</div>)
}
</div>
    )
}

export default Index
