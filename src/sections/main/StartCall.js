import {
    Button,
    Dialog,
    DialogContent,
    DialogTitle,
    Slide,
    Stack,
  } from "@mui/material";
  import { alpha, useTheme } from '@mui/material/styles';
import { MagnifyingGlass } from "phosphor-react";
import React from 'react'
import { CallElement } from "../../components/CallElement";
import { Search, SearchIconWrapper, StyledInputBase } from "../../components/Search";
import { MembersList } from "../../data";

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });

const StartCall = ({open, handleClose}) => {
const theme = useTheme();
  return (
    <Dialog
    fullWidth
    maxWidth="xs"
    open={open}
    TransitionComponent={Transition}
    keepMounted
    onClose={handleClose}
    aria-describedby="alert-dialog-slide-description"
    sx={{ p: 4 }}
  >
    <DialogTitle sx={{mb:3}}>Start Call</DialogTitle>

    <DialogContent>
        <Stack spacing={3}>
        <Stack sx={{width:"100%"}}>
                    <Search>
                        <SearchIconWrapper>
                            <MagnifyingGlass color={theme.palette.default} />
                        </SearchIconWrapper>
                        <StyledInputBase placeholder='Search...' inputProps={{"aria-label": "search"}}/>
                    </Search>
                    
        </Stack>
        {MembersList.map((el) => <CallElement {...el} />)}
        </Stack>
        
        
    </DialogContent>
    </Dialog>
  )
}

export default StartCall