import React, { useState, useEffect } from 'react'
import MainContainer from '../components/MainContainer';
import { useParams,useNavigate } from 'react-router-dom';
import {
  Container, Paper, Button, TextField,
  Stack, IconButton, Typography
} from '@mui/material';
import { toast } from 'react-toastify';
// #regionbrgin ---------------Icons-----------------
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
import EditIcon from '@mui/icons-material/Edit'
// #endregion

import { useBlog } from '../middleware/ContextHooks';

export default function BlogDetail() {
  const navigate=useNavigate();
  const { id } = useParams();
  const { blogs,currentBlog, getBlogById, toasts, clearErrors ,deleteBlog,updateBlog,getBlogs} = useBlog();
  const [edit, setEdit] = useState(false);
  const [blog, setBlog] = useState(null);
  const [temp, setTemp] = useState(null);

  useEffect(() => {

    if(!blogs){
      getBlogs();
    }

    if (!currentBlog || currentBlog?._id !== id) {
      getBlogById(id);
    }

    if(toasts) {
        toasts.forEach(ele => {
          toast(ele.message, { type: ele.type })
      });
      clearErrors();
    }

    if (currentBlog?._id === id) {
      setBlog(currentBlog);
    }
  }, [currentBlog, id, toasts, clearErrors, getBlogById,blogs,getBlogs])

  const handleDelete = () => {
    deleteBlog(blog._id);
    navigate('/blogs');
  }

  const handleEdit = () => {
    setEdit(true);
    setTemp(blog);
  }

  const handleCancel = () => {
    setEdit(false);
    setBlog(temp);
  }

  const handleUpdate = () => {
    updateBlog(blog);
    setEdit(false);
    setTemp(null);
  }

  const displayDisabled = () => {
    return (
      <Stack spacing={2}>
        <Stack spacing={2} direction='row'>
        <TextField value={blog?.title} disabled multiline label="Title" sx={{flexGrow:1}}/>
          <IconButton onClick={handleEdit}>
            <EditIcon />
          </IconButton>
          <IconButton onClick={handleDelete}>
            <DeleteForeverIcon />
          </IconButton>
        </Stack>
        <TextField value={blog?.content} disabled multiline label="Content"/>
      </Stack>
    )
  }

  return (
    <MainContainer>
      <Container maxWidth='md' sx={{ mt: 4, mb: 8 }}>
        <Paper>
          {!edit ? displayDisabled() :     
            <Stack spacing={2}>
              <TextField label='Title' name='title' value={blog?.title} onChange={(e) => setBlog({ ...blog, title: e.target.value })} />
              <TextField label='Content' name='content' value={blog?.content}
                onChange={(e) => setBlog({ ...blog, content: e.target.value })}
                multiline minRows={5} maxRows={20} />

              <Stack spacing={2} direction='row'>
                <Button variant='contained' onClick={handleUpdate}>Update</Button>
                <Button variant='outlined' sx={{color:'primary.main'}} onClick={handleCancel}>Cancel</Button>
              </Stack>
            </Stack>
          }
        </Paper>
      </Container>
    </MainContainer>
  )
}
