import React from 'react';
import { Box, Button, Divider, IconButton, Stack, Typography} from '@mui/material';
import { ArchiveBox, CircleDashed, MagnifyingGlass } from 'phosphor-react';
import { alpha, useTheme } from '@mui/material/styles';
import { ChatList } from '../../data';
import { SimpleBarStyle } from '../../components/Scrollbar';
import { Search, SearchIconWrapper, StyledInputBase } from '../../components/Search';
import ChatElement from '../../components/ChatElement';



const Chat = () => {
  const theme = useTheme();
  
  return (
    <Box sx={{backgroundColor: theme.palette.mode === "light" ? alpha(theme.palette.primary.main, 0.03)  : theme.palette.background.paper, position: "relative", boxShadow: "0px 0px 2px rgba(0,0,0,0.25)", width: 320}} >
        <Stack p={3} spacing={2} sx={{height: "100vh"}}>
          <Stack direction="row" alignItems={"center"} justifyContent="space-between">
              <Typography variant="h5">Chats</Typography>
              <IconButton><CircleDashed /></IconButton>
          </Stack>
          <Stack sx={{width: "100%"}}>
            <Search>
              <SearchIconWrapper>
                <MagnifyingGlass color={theme.palette.default} />
              </SearchIconWrapper>
              <StyledInputBase placeholder='Search...' inputProps={{"aria-label": "search"}}/>
            </Search>
          </Stack>
          <Stack spacing={1}>
            <Stack direction="row" alignItems={"center"} spacing={1.5}>
              <ArchiveBox size = {24} />
              <Button>Archive</Button>
            </Stack>
            <Divider />
          </Stack>
          <Stack spacing={2}
            direction="column" 
            sx={{flexGrow: 1, overflow: "scroll", height:"100%"}}>
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
                  All Chats
                </Typography>
                {ChatList.filter((el) => !el.pinned).map((el) => {
                  return <ChatElement {...el} />
                })}
                
              </Stack>
            </SimpleBarStyle>
          </Stack>
        </Stack>
    </Box>
  );
};

export default Chat;