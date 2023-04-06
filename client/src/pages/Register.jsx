import { useState } from 'react'
import { Grid, TextField, Button, Typography, Container, CssBaseline, Box, Avatar } from '@mui/material';
import { useNavigate, Link } from 'react-router-dom';

// #region Icons begin
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
// #regionend



export default function Register() {
  //hooks
  const navigate=useNavigate();
  const [user,setUser]=useState({
    firstName:'Peter',
    lastName:'Pan',
    email:'gopal@gmail.com',
    password:'123',
    confirmPassword:'123'
  });
  
  return (
    <Container maxWidth="xs">
      <CssBaseline />
      <Box sx={{
        marginTop: 8, display: 'flex',
        flexDirection: 'column', alignItems: 'center'
      }}
      >

        <Avatar sx={{ m: 1, backgroundColor: 'secondary.main' }}>
          <LockOutlinedIcon />
        </Avatar>

        <Typography component="h1" variant='h5'>
          Register
        </Typography>
        <Grid container spacing={2} sx={{mt:3}}>
          <Grid item xs={12} sm={6}>
            <TextField label='First Name' value={user.firstName} name='firstName' placeholder='Enter your first name' onChange={(e)=>setUser({...user,firstName:e.target.value})} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField label='Last Name' value={user.lastName} name='lastName' placeholder='Enter your last name' onChange={(e)=>setUser({...user,lastName:e.target.value})} />
          </Grid>
          <Grid item xs={12}>
            <TextField label='Email' value={user.email} name='email' placeholder='Enter your email' onChange={(e)=>setUser({...user,email:e.target.value})} />
          </Grid>
          <Grid item xs={12}>
            <TextField label='Password' value={user.password} name='password' placeholder='Enter password' onChange={(e)=>setUser({...user,password:e.target.value})} />
          </Grid>
          <Grid item xs={12}>
            <TextField label='Confirm Password' value={user.confirmPassword} name='cofirmPassword' placeholder='Enter your last name' onChange={(e)=>setUser({...user,confirmPassword:e.target.value})} />
          </Grid>
            
        </Grid>
        <Button fullWidth sx={{
          mt:3,mb:2
        }}>Register</Button>
      </Box>
    </Container>
  )
}
