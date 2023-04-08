import React,{useState,useEffect} from 'react'
import MainContainer from '../components/MainContainer';
import { useParams } from 'react-router-dom';
import { Container, Paper,Button,TextField,
        Stack,IconButton } from '@mui/material';

// #regionbrgin ---------------Icons-----------------
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
import EditIcon from '@mui/icons-material/Edit'
// #endregion

export default function BlogDetail() {
  const [blog,setBlog]=useState(null);

  return (
    <MainContainer>
      <Container maxWidth='md'>
          <Paper>
            <Stack spacing={2}>
              <TextField label='Title' name='title' value={blog?.title} onChange={(e)=>setBlog({...blog,title:e.target.value})}/>
              <TextField label='Content' name='content' value={blog?.content} onChange={(e)=>setBlog({...blog,content:e.target.value})}/>
            </Stack>
          </Paper>
      </Container>
    </MainContainer>
  )
}
