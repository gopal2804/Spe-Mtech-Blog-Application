import { useState,useEffect } from 'react'
import { Grid, TextField, Button, Typography, Container, CssBaseline, Box, Avatar,InputAdornment } from '@mui/material';
import { useNavigate, Link } from 'react-router-dom';
import {toast, toasts} from 'react-toastify';


// #region Icons begin
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';
// #regionend

import { useAuth } from '../middleware/ContextHooks';



export default function Register() {
  const {registerUser, clearErrors,toasts,isAuthenticated} =useAuth();

  //hooks
  const navigate=useNavigate();
  const [user,setUser]=useState({
    firstName:'Peter',
    lastName:'Pan',
    email:'gopal@gmail.com',
    password:'123',
    confirmPassword:'123'
  });

  const [showPassword, setShowPassword]=useState({
    password:false, confirmPassword:false
  })

  useEffect(()=>{
    if(isAuthenticated) navigate('/blogs')

    if(toasts){
      toasts.forEach(ele => {
          toast(ele.message,{
            type: ele.type
          })
      });
      clearErrors();
    }
  },[toasts,isAuthenticated,clearErrors,navigate])

  //api
  const handleRegister=()=>{
    const {firstName,lastName,email,password,confirmPassword}=user;
    if(!firstName || !lastName || !email || !password || !confirmPassword){
      toast('Please fill all the fields', {type:'error'})
      return 
    }
    if(password!==confirmPassword){
      toast("Password do not match",{type:'error'})
      return 
    }

    registerUser(user);

  }
  
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
            <TextField label='First Name' value={user.firstName} name='firstName' placeholder='Enter your first name' onChange={(e)=>setUser({... user,firstName:e.target.value})} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField label='Last Name' value={user.lastName} name='lastName' placeholder='Enter your last name' onChange={(e)=>setUser({...user,lastName:e.target.value})} />
          </Grid>
          <Grid item xs={12}>
            <TextField label='Email' value={user.email} name='email' placeholder='Enter your email' onChange={(e)=>setUser({...user,email:e.target.value})} />
          </Grid>
          <Grid item xs={12}>
            <TextField label='Password' value={user.password} name='password' type={showPassword.password ? 'text':'password'} placeholder='Enter password' onChange={(e)=>setUser({...user,password:e.target.value})} 
              InputProps={{
                endAdornment: <InputAdornment position='end' onClick={()=>setShowPassword({... showPassword,password: !showPassword.password})}>
                  {showPassword.password ? <VisibilityOutlinedIcon/> : <VisibilityOffOutlinedIcon/>}
                </InputAdornment>
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField label='Confirm Password' value={user.confirmPassword} name='cofirmPassword' type={showPassword.confirmPassword ? 'text':'password'} placeholder='Enter your last name' onChange={(e)=>setUser({...user,confirmPassword:e.target.value})} 
              InputProps={{
                endAdornment: <InputAdornment position='end' onClick={()=>setShowPassword({... showPassword,confirmPassword: !showPassword.confirmPassword })}>
                  {showPassword.confirmPassword ? <VisibilityOutlinedIcon/> : <VisibilityOffOutlinedIcon/>}
                </InputAdornment>
              }}
            />
          </Grid>
            
        </Grid>
        <Button fullWidth sx={{
          mt:3,mb:2
        }} onClick={handleRegister}>Register</Button>

        <Grid container justifyContent="flex-end">
          <Grid item>
            <Link to="/login">
              Already have an account? Sign in
            </Link>
          </Grid>
        </Grid>

      </Box>
    </Container>
  )
}
