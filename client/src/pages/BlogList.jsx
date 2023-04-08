import React, { useState, useEffect } from 'react'
import MainContainer from '../components/MainContainer'
import { toast } from 'react-toastify';
import { useBlog } from '../middleware/ContextHooks'
import {
  Grid, Typography, Button,
  Container, Stack, Tooltip,
  Box, List, ListItem, ListItemText, Paper
} from '@mui/material'

import Mesonry from '@mui/lab/Masonry';

import BlogCard from '../components/BlogCard';

import { useNavigate, Link } from 'react-router-dom';
import Masonry from '@mui/lab/Masonry/Masonry';

export default function BlogList() {
  const { getBlogs, toasts, clearErrors, blogs ,clearCurrentBlog} = useBlog();
  const [myBlogs, setMyBlogs] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (!blogs) {
      getBlogs()
    } else {
      setMyBlogs(blogs)
    }

    if (toasts) {
      toasts.forEach(ele => {
        toast(ele.message, { type: ele.type })
      });
      clearErrors();
    }


  }, [toasts, clearErrors, blogs, getBlogs])


  const onCreateNewBlog=()=>{
    clearCurrentBlog();
    navigate('/newblog')
  }
  return (
    <MainContainer>
      <Container maxWidth="lg" sx={{ py: 1, my: 1 }}>
        <Grid container spacing={2}>
          <Grid item xs={false} md={3}>

            <List sx={{backgroundColor:'silver', borderRadius: 5, mt:3}}>
              {myBlogs.map(blog=>(
                <Link to={`/blogs/${blog._id}`} key={blog._id}>
                  <ListItem>
                    <Tooltip title={blog.title} placement='right'>
                      <ListItemText primary={blog.title}/>
                    </Tooltip>
                  </ListItem>
                </Link>
              ))}
            </List>
          </Grid>

          <Grid item xs={12} md={9}>
                <Box sx={{display: 'flex', justifyContent:'flex-end',mb:2}}>
                  <Button onClick={onCreateNewBlog}>Create Blog</Button>
                </Box>
                <Masonry columns={2}>
                  {myBlogs?.map(blog=>(
                    <BlogCard blog={blog} key={blog._id}/>
                  ))}
                </Masonry>
          </Grid>
        </Grid>
      </Container>
    </MainContainer>
  )
}
