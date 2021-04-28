import React, { useState, useEffect } from 'react'
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

import useStyles from './styles'

const SortPost = ({ onSort, onSort2 }) => {
    const classes = useStyles();
    const [destination, setDestination] = useState("")
    const [origin, setOrigin] = useState("")
    
//   const [open, setOpen] = useState(false);

  const handleDestinationChange = event => {
      setDestination(event.target.value)
      onSort(event.target.value)
    };
  const handleOriginChange = event => {
      setOrigin(event.target.value)
      onSort2(event.target.value)
    };


//   const handleClose = () => {
//     setOpen(false);
//   };
//   const handleOpen = () => {
//     setOpen(true);
//   };

    return (
        <div>

       <FormControl variant="outlined" className={classes.formControl}>
        <InputLabel htmlFor="outlined-age-native-simple">Filter By Destination</InputLabel>
        <Select
          native
          value={destination}
          onChange={handleDestinationChange}
          label="Destination"
          inputProps={{
            name: 'Filter By Destination',
            id: 'outlined-age-native-simple',
          }}
        >
          <option aria-label="None" value="" />
          <option value="Dhaka">Dhaka</option>
          <option value="Sajek">Sajek</option>
          <option value="Dinajpur">Dinajpur</option>
        </Select>
      </FormControl>

      <FormControl variant="outlined" className={classes.formControl}>
        <InputLabel htmlFor="outlined-age-native-simple">Filter By Origin</InputLabel>
        <Select
          native
          value={origin}
          onChange={handleOriginChange}
          label="Origin"
          inputProps={{
            name: 'Filter By Origin',
            id: 'outlined-age-native-simple',
          }}
        >
          <option aria-label="None" value="" />
          <option value="Dhaka">Dhaka</option>
          <option value="Sajek">Sajek</option>
          <option value="Dinajpur">Dinajpur</option>
        </Select>
      </FormControl>

      {/* <FormControl className={classes.formControl} >
      <InputLabel id="demo-simple-select-outlined-label">Filter By Destination</InputLabel>
        <Select
          labelId="demo-simple-select-outlined-label"
          id="demo-simple-select-outlined"
          open={open}
          onClose={handleClose}
          onOpen={handleOpen}
          value={destination}
          onChange={handleDestinationChange}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value="Dhaka">Dhaka</MenuItem>
          <MenuItem value="Sajek">Sajek</MenuItem>
          <MenuItem value="Dinajpur">Dinajpur</MenuItem>
        </Select>
      </FormControl> */}
        </div>
    )
}

export default SortPost
