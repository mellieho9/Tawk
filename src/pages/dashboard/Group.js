import { Box, Stack, Typography, Link, Divider, IconButton } from '@mui/material'
import { alpha, useTheme } from '@mui/material/styles';
import { MagnifyingGlass, Plus } from 'phosphor-react';
import React, {useState} from 'react'
import { SimpleBarStyle } from '../../components/Scrollbar';
import { ChatList } from '../../data';
import { Search, SearchIconWrapper, StyledInputBase } from '../../components/Search';
import ChatElement from '../../components/ChatElement';
import CreateGroup from '../../sections/main/CreateGroup';

const Group = () => {
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
                    <Typography variant="h5">Groups</Typography>
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
                        Create New Group
                    </Typography>
                    <IconButton onClick={() => {setOpenDialog(true)}}>
                    <Plus style={{color: theme.palette.primary.main}} />
                    </IconButton>
                    
                </Stack>
                <Divider />
                <Stack spacing={2}
            direction="column" 
            sx={{flexGrow: 1, overflowY: "scroll", height:"100%"}}>
            <SimpleBarStyle timeout={500} clickOnTrack={false}>
              <Stack spacing={2.4}>
                <Typography variant="subtitle2" sx={{color: theme.palette.mode === "light" ? "#676767" : theme.palette.default}}>
                  Pinned
                </Typography>
                {ChatList.filter((el) => el.pinned).map((el) => {
                  return <ChatElement {...el} />
                })}
                <Typography variant="caption" sx={{color: theme.palette.mode === "light" ? alpha(theme.palette.primary.main, 0.00)  : theme.palette.background.paper}} >
                  Hiding this
                </Typography>
              </Stack>
              
              <Stack spacing={2.4}>
                <Typography variant="subtitle2" sx={{color: theme.palette.mode === "light" ? "#676767" : theme.palette.default}}>
                  All Groups
                </Typography>
                {ChatList.filter((el) => !el.pinned).map((el) => {
                  return <ChatElement {...el} />
                })}
                
              </Stack>
            </SimpleBarStyle>
          </Stack>
            </Stack>
        </Box>
    </Stack>  
    {openDialog && <CreateGroup open={openDialog} handleClose={handleCloseDialog} />}
    </>
  )
}

export default Group