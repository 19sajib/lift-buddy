import React from 'react'
import Axios from 'axios'
import Help from './Help'
import { CircularProgress, Divider, Typography } from '@material-ui/core'

const Index = () => {
    const [empty, setEmpty] = React.useState(false)
    const [data, setData] = React.useState()
    const [sortData, setSortData] = React.useState([])

    React.useEffect(() => {
      Axios.post('http://localhost:8080/admin/dashboard/contact-us/view')
        .then(function (response) {
          setData(response.data.help);
          console.log(response.data.help);
        })
        .catch(function (error) {
          console.log(error);
        });
      }, [])
    
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
          { empty === true ? (<Typography color="secondary" variant="h6" align="center" >Currently No Help Pending!</Typography>)
           : 
        (<div>
          <Typography color="primary" variant="h5" align="center" >Help These People</Typography>
          <Divider variant="middle" />
          { !sortData.length ?  (
           !data ? <CircularProgress/>: (
             data.map(data => (
               <Help key={data._id} data={data} newValue={newValue} />
             ))
              )
          )   :   (
              sortData.map(data => (
                <Help key={data._id} data={data} newValue={newValue}/>
              ))
          )
} 
</div>)
}
</div>
    )
}

export default Index
