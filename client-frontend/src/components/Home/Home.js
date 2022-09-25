import React, { useState, useEffect } from 'react'
import { Container, Grid, Grow,  AppBar, TextField, Button, Paper } from '@material-ui/core'
import { useDispatch } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';


import { getPostsBySearch } from '../../actions/posts'
import { isAuthenticated } from '../../auth/auth'
import Pagination from '../Pagination/Pagination'
import Posts from '../Posts/Posts'
import Form from '../Form/Form'
import useStyles from './styles'


function useQuery() {
    return new URLSearchParams(useLocation().search);
  }

const Home = () => {

    const classes = useStyles();
    const { user } = isAuthenticated();
    const query = useQuery();
    const page = query.get('page') || 1;
    const searchQuery = query.get('searchQuery');

    const [search, setSearch] = useState('');
   
    const history = useHistory();
    const dispatch = useDispatch();
    
    const [currentId, setCurrentId] = useState(null);
    if(!user) {
      history.push('/auth')
    }


    const searchPost = () => {
        if (search.trim()) {
          dispatch(getPostsBySearch({ search}));
          history.push(`/posts/search?searchQuery=${search || 'none'}`);
        } else {
          history.push('/posts');
        }
      };
    
      const handleKeyPress = (e) => {
        if (e.keyCode === 13) {
          searchPost();
        }
      };

    return (
        <div>
        <Grow in>
                <Container>
                <Grid className={classes.gridContainer} container justify="space-between" alignItems="stretch" spacing={3}>
                {/* <HomeHelper page={page} postsPerPage={postsPerPage} setCurrentId={setCurrentId} /> */}
                    <Grid item xs={12} sm={6} md={8}>
                    <Posts setCurrentId={setCurrentId} />
                    </Grid>
                    <Grid item xs={12} sm={6} md={4}>
                    <AppBar className={classes.appBarSearch} position="static" color="inherit">
                        <TextField onKeyDown={handleKeyPress} 
                        name="search" variant="outlined" className={classes.textInput}
                        label="Search By Destination" fullWidth value={search} 
                        onChange={(e) => setSearch(e.target.value)} />

                        {/* <TextField onKeyDown={handleKeyPress} 
                        name="search" variant="outlined" className={classes.textInput}
                        label="Search By Origin" fullWidth value={searchOrigin} 
                        onChange={(e) => setSearchOrigin(e.target.value)} /> */}


              <Button onClick={searchPost} className={classes.textInput} variant="outlined" color="primary">Search</Button>
                    </AppBar>
                        <Form currentId={currentId} setCurrentId={setCurrentId} />
                        {(!searchQuery) && (
                    <Paper className={classes.pagination} elevation={6}>
                        <Pagination page={page} />
                    </Paper>
                    )}
                    </Grid>
                </Grid>
                </Container>  
            </Grow>
                </div>
    )
}

export default Home
