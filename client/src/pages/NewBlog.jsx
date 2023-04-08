import React,{useState,useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import { useBlog } from '../middleware/ContextHooks';
import {Transition} from 'react-transition-group';
import {LoremIpsum} from 'lorem-ipsum';
import {toast} from 'react-toastify';
import gsap from 'gsap';
import {Container,Paper,Button,TextField,Stack,IconButton,Typography,
        Grid,Slider,FormControlLabel,Checkbox} from '@mui/material'

// #beginregion ------------Components-----------
import MainContainer from '../components/MainContainer';
// #endregion

export default function NewBlog() {
  const navigate=useNavigate();

  const [newBlog,setNewBlog]=useState({
    title: '',
    content: ''
  });
  const {toasts,clearErrors,createBlog,blogs,getBlogs}=useBlog(); 

  useEffect(()=>{
    if(!blogs){
      getBlogs();
    }

    if(toasts){
      toasts.forEach(ele => {
        toast(ele.message,{type:ele.type})
      });
      clearErrors();
    }
  },[toasts,clearErrors,blogs,getBlogs])

  return (
    <MainContainer>
      <Container maxWidth="md" sx={{py:2,my:1,backgroundColor:'silver'}} component={Paper}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField label="Title" value={newBlog.title} onChange={(e)=>setNewBlog({...newBlog,title: e.target.value})}></TextField>
            </Grid>
            <Grid item xs={12}>
              <TextField 
              multiline minRows={8} maxRows={20}
              label="Content" value={newBlog.content} onChange={(e)=>setNewBlog({...newBlog,content: e.target.value})}></TextField>
            </Grid>
            <Grid item>
              <Stack spacing={2} direction="row">
                <Button>Save</Button>
                <Button variant='outlined' onClick={e=>setNewBlog({title: '',content:''})}>Clear</Button>
                <Button onClick={()=>navigate('/blogs')}>Cancel</Button>
              </Stack>
            </Grid>
          </Grid>
      </Container>
    </MainContainer>
  )
}
