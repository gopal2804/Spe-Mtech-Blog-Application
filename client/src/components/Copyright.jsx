import React from 'react'
import {Link,Typography} from '@mui/material'

export default function Copyright() {
  return (
    <Typography variant='body2' color="primary" align='center'>
        {'Copyright ©'}
        <Link color="inherit" href='/'>
            Blog Application
            <br></br> 
            Author: Gopal Gupta
        </Link>{' '}
        {new Date().getFullYear()}{'.'}
    </Typography>
  )
}
