import { Box, IconButton, Stack, Typography } from '@mui/material'
import React from 'react'
import { alpha, useTheme } from '@mui/material/styles';
import { CaretLeft } from 'phosphor-react';
import ProfileForm from '../../sections/settings/ProfileForm';
const Profile = () => {
    const theme = useTheme();
  return (
    <Stack direction={"row"} sx={{width: "100%"}}>
        <Box sx={{height: "100vh", backgroundColor: (theme) => theme.palette.mode === "light" ? alpha(theme.palette.primary.main, 0.03)  : theme.palette.background.paper, width: 320, boxShadow: "0px 0px 2px rgba(0,0,0,0.25)"}}>
            <Stack p={4} spacing={5}>
                <Stack direction="row" alignItems={"center"} spacing={3} >
                    <IconButton>
                        <CaretLeft size={24} color={theme.palette.default} />
                    </IconButton>
                    <Typography variant="h5">
                        Profile
                    </Typography>
                </Stack>
                <ProfileForm />
            </Stack>
        </Box>
    </Stack>
  )
}

export default Profile