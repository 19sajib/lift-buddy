import React from 'react'
import Axios from 'axios'
import {useHistory} from 'react-router-dom'
import Verify from './Verify'
import { CircularProgress, Divider, Typography } from '@material-ui/core'

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
      Axios.post('http://localhost:8080/admin/dashboard/verify')
        .then(function (response) {
          setData(response.data.verify);
          console.log(response.data.verify);
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
    return (
      <div>
          { empty === true ? (<Typography color="secondary" variant="h6" align="center" >Currently No Verification Pending!</Typography>)
           : 
        (<div>
          <Typography color="primary" variant="h6" align="center" >Verify These Profile!</Typography>
          <Divider variant="middle" />
          { !sortData.length ?  (
           !data ? <CircularProgress/>: (
             data.map(data => (
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
