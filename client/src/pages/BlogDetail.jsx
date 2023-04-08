import React,{useState,useEffect} from 'react'
import MainContainer from '../components/MainContainer';
import { useParams } from 'react-router-dom';
import { Container, Paper,Button,TextField,
        Stack,IconButton } from '@mui/material';
import {toast} from 'react-toastify';
// #regionbrgin ---------------Icons-----------------
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
import EditIcon from '@mui/icons-material/Edit'
// #endregion

import { useBlog } from '../middleware/ContextHooks';

export default function BlogDetail() {
  const {id} =useParams();
  const {currentBlog,getBlogById,toasts,clearToasts}=useBlog();

  const [blog,setBlog]=useState(null);

  useEffect(()=>{
    if(!currentBlog || currentBlog?._id!==id){
      getBlogById(id);
    }

    if(toasts){
      toasts.forEach(ele => {
          toast(ele.message,{type:ele.type});
      });
    }

    if(currentBlog?._id===id){
        setBlog(currentBlog);
    }
  },[currentBlog,id,,toasts,clearToasts,getBlogById])
  return (
    <MainContainer>
      <Container maxWidth='md' sx={{mt:4,mb:8}}>
          <Paper>
            <Stack spacing={2}>
              <TextField label='Title' name='title' value={blog?.title} onChange={(e)=>setBlog({...blog,title:e.target.value})}/>
              <TextField label='Content' name='content' value={blog?.content} 
              onChange={(e)=>setBlog({...blog,content:e.target.value})} 
              multiline minRows={5} maxRows={20}/>

              <Stack spacing={2} direction='row'>
                <Button variant='contained'>Save</Button>
                <Button variant='outlined'>Cancel</Button>
              </Stack>
            </Stack>
          </Paper>
      </Container>
    </MainContainer>
  )
}
