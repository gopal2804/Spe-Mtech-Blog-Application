import React,{useState,useEffect} from 'react'
import {Container,Stack,TextField,Button,Box} from '@mui/material';
import { useAuth } from '../middleware/ContextHooks';
// #regionbegin---------------Components------------------
import MainContainer from '../components/MainContainer';
// #endregioon
export default function Profile() {
  const [profile,setProfile]=useState({})
  return (
    <MainContainer>
      <Container maxWidth="md" sx={{my:3}}>
        <Stack spacing={2}>
          <Box sx={{display: 'flex' , justifyContent: 'flex-end'}}>
            <Button>Edit</Button>
          </Box>
          <TextField label="First Name" name="firstName" value={profile.firstName} onChange={(e)=>setProfile({...profile,firstName:e.target.value})} />
          <TextField label="Last Name" name="lastName" value={profile.lastName} onChange={(e)=>setProfile({...profile,lastName:e.target.value})} />
          <TextField label="Location" name="location" value={profile.location} onChange={(e)=>setProfile({...profile,location:e.target.value})} />
          <Stack spacing={2} direction="row">
            <Button>Update</Button>
            <Button>Cancel</Button>
          </Stack>
        </Stack>
      </Container>
    </MainContainer>
  )
}
