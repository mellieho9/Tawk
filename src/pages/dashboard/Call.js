import { Box, Divider, IconButton, Link, Stack, Typography } from '@mui/material'
import { alpha, useTheme } from '@mui/material/styles';
import { MagnifyingGlass, Plus } from 'phosphor-react';
import React, { useState } from 'react'
import { CallLogElement } from '../../components/CallElement';
import { SimpleBarStyle } from '../../components/Scrollbar';
import { Search, SearchIconWrapper, StyledInputBase } from '../../components/Search';
import { CallLogs } from '../../data';
import StartCall from '../../sections/main/StartCall';

const Call = () => {
    const theme = useTheme();
    const [openDialog, setOpenDialog] = useState(false);
    const handleCloseDialog = () => {
      setOpenDialog(false)
  }
  return (
    <>
        <Stack direction={"row"} sx={{width: "100%"}}>
        <Box sx={{height: "100vh", backgroundColor: (theme) => theme.palette.mode === "light" ? alpha(theme.palette.primary.main, 0.03)  : theme.palette.background.paper, width: 320, boxShadow: "0px 0px 2px rgba(0,0,0,0.25)"}}>
            <Stack p={3} spacing={2} sx={{maxHeight: "100vh"}}>
                <Stack>
                    <Typography variant="h5">Call Logs</Typography>
                </Stack>
                <Stack sx={{width:"100%"}}>
                    <Search>
                        <SearchIconWrapper>
                            <MagnifyingGlass color={theme.palette.default} />
                        </SearchIconWrapper>
                        <StyledInputBase placeholder='Search...' inputProps={{"aria-label": "search"}}/>
                    </Search>
                </Stack>
                <Stack direction={"row"} justifyContent="space-between" alignItems={"center"}>
                    <Typography variant="subtitle2" component={Link}>
                        Start a conversation
                    </Typography>
                    <IconButton onClick={() => { setOpenDialog(true);}}>
                    <Plus style={{color: theme.palette.primary.main}} />
                    </IconButton>
                    
                </Stack>
                <Divider />
                <Stack spacing={2}
            direction="column" 
            sx={{flexGrow: 1, overflowY: "scroll", height:"100%"}}>
            <SimpleBarStyle timeout={500} clickOnTrack={false}>
              <Stack spacing={2.4}>
                {CallLogs.map((el) => <CallLogElement {...el} />)}
              </Stack>
            </SimpleBarStyle>
          </Stack>
            </Stack>
        </Box>
    </Stack>  
    { openDialog && <StartCall open={openDialog} handleClose={handleCloseDialog} />}
    </>
  )
}

export default Call