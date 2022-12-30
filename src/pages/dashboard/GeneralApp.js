import { useTheme } from "@mui/material/styles";
import { Box, Stack } from "@mui/material";
import React from "react";
import Conversation from "../../components/Conversation";
import Chat from "./Chat";
import Contact from "../../components/Contact";
import { useSelector } from "react-redux";
import SharedMessages from "../../components/SharedMessages";
import StarredMessages from "../../components/StarredMessages";


const GeneralApp = () => {
  const theme = useTheme();
  const { sideBar } = useSelector((state) => state.app);
  console.log(sideBar, "app")
  return (
    <Stack direction={"row"} sx={{width:"100%"}}>
      {/* Chats */}
      <Chat />
      <Box sx={{height: "100%", width: sideBar.open
              ? `calc(100vw - 740px )`
              : "calc(100vw - 420px )", backgroundColor:  theme.palette.mode === "light" ? "F0F4FA" : theme.palette.background}}>
        <Conversation />
      </Box>
      {sideBar.open && (() => {
        switch(sideBar.type) {
          case "CONTACT":
            console.log("contact")
            return <Contact /> 
          case "STARRED":
            console.log("shared")
            return <StarredMessages />
          case "SHARED":
            console.log("shared")
            return <SharedMessages />
          default:
            break;
        }
      })() }

    </Stack>
  );
};

export default GeneralApp;
