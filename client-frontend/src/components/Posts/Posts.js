import React from 'react'
import { useSelector } from 'react-redux'
import { Grid, CircularProgress } from '@material-ui/core'


import Post from './Post/Post'
import useStyles from './styles'
import SortPost from './SortPost';


const Posts = ({ setCurrentId , page, postsPerPage }) => {
    const posts = useSelector((state) => state.posts)
    console.log('newPost',posts);
    const classes = useStyles();

    const [renderPost, setRenderPost] = React.useState([])

    const search = async destination => {
      if (renderPost.length) {
        const filterData = renderPost.filter(obj => {
          return obj.destination === destination
        })
       setRenderPost(filterData)
      }
        else {
        const filterData = posts.filter(obj => {
        return obj.destination === destination
      })
     setRenderPost(filterData)}
      }
      const search2 = async origin => {
        if(renderPost.length) {
          const filterData = renderPost.filter(obj => {
            return obj.source === origin
          })
         setRenderPost(filterData)
        } else {
        const filterData = posts.filter(obj => {
          return obj.source === origin
        })
       setRenderPost(filterData)
      }
        }
    console.log(renderPost);

      React.useEffect(() => {
        search()
      }, [])
    


    return (
        <div>
          <SortPost onSort={search} onSort2={search2} />
        <div>

          { !renderPost.length ?  (
    
    !posts.length ? <CircularProgress /> : (
           <Grid className={classes.container} container alignItems="stretch" spacing={3}>
               {posts
                .slice((page - 1) * postsPerPage, page * postsPerPage)
                .map(post => {
                    return (
                   <Grid key={post._id} item xs={12} sm={6}> 
                        <Post post={post} setCurrentId={setCurrentId} />
                   </Grid>
                    );
                    })}
               {/* {posts.map((post) => (
                   <Grid key={post._id} item xs={12} sm={6}> 
                   <Post post={post} setCurrentId={setCurrentId} />
                   </Grid>
               ))} */}
           </Grid>
       )

       ) : (
        <Grid className={classes.container} container alignItems="stretch" spacing={3}>
            {renderPost
             .slice((page - 1) * postsPerPage, page * postsPerPage)
             .map(post => {
                 return (
                <Grid key={post._id} item xs={12} sm={6}> 
                     <Post post={post} setCurrentId={setCurrentId} />
                </Grid>
                 )})}
        </Grid>
    )   }
       </div>
       </div>
    )
}
export default  Posts;
