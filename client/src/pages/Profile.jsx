import React, { useState, useEffect } from 'react'
import { Container, Stack, TextField, Button, Box } from '@mui/material';
import { useAuth } from '../middleware/ContextHooks';
// #regionbegin---------------Components------------------
import MainContainer from '../components/MainContainer';
// #endregioon
export default function Profile() {
  const { currentUser, getProfile } = useAuth();
  const [profile, setProfile] = useState({})
  const [isDisabled, setIsDisabled] = useState(true);
  useEffect(() => {
    if (!currentUser) {
      getProfile();
    }
    if (currentUser) {
      setProfile(currentUser);
    }
  }, [currentUser, getProfile])


  const handleDisabled=e=>{
    setIsDisabled(false);
  }

  const handleCancel=e=>{
    setIsDisabled(true);
  }

  const handleUpdate=e=>{
    setIsDisabled(true);
  }
  return (
    <MainContainer>
      <Container maxWidth="md" sx={{ my: 3 }}>
        <Stack spacing={2}>
          {isDisabled ?
            <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
              <Button onClick={handleDisabled}>Edit</Button>
            </Box>
            : null}
          <TextField label="First Name" name="firstName" disabled={isDisabled} value={profile.firstName} onChange={(e) => setProfile({ ...profile, firstName: e.target.value })} />
          <TextField label="Last Name" name="lastName" disabled={isDisabled} value={profile.lastName} onChange={(e) => setProfile({ ...profile, lastName: e.target.value })} />
          <TextField label="Location" name="location" disabled={isDisabled} value={profile.location} onChange={(e) => setProfile({ ...profile, location: e.target.value })} />
          {!isDisabled ?
            <Stack spacing={2} direction="row">
              <Button onClick={handleUpdate}>Update</Button>
              <Button onClick={handleCancel}>Cancel</Button>
            </Stack>
            : null
          }
        </Stack>
      </Container>
    </MainContainer>
  )
}
