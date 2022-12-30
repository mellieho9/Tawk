import { Box, Stack } from '@mui/material'
import { useTheme, alpha } from "@mui/material/styles"
import React from 'react'
import { Chat_History } from '../../data'
import { DocMsg, LinkMsg, MediaMsg, ReplyMsg, TextMsg, Timeline } from './MsgTypes'

const Message = ({menu}) => {
    const theme =  useTheme();
  return (
    <Box p={3} sx={{backgroundColor: theme.palette.mode === "light" ? alpha(theme.palette.primary.main, 0.08) : alpha(theme.palette.background.paper, 0.5)}}>
        <Stack spacing={3}>
            {Chat_History.map((el) => {
                switch (el.type) {
                    case "divider":
                        // Timeline
                        return  <Timeline el={el} />;;
                        break;
                    case "msg":
                        switch (el.subtype) {
                            case "img":
                                return <MediaMsg el={el} menu={menu} />
                                break;
                            case "doc":
                                return <DocMsg el={el} menu={menu} />
                                break;
                            case "link":
                                return <LinkMsg el={el} menu={menu} />
                                break;
                            case "reply":
                                return <ReplyMsg el={el} menu={menu} />
                                break;
                            default:
                                return <TextMsg el={el} menu={menu} />
                                break;
                        }
                        return;
                        break;
                    default:
                        return <></>;
                }
            })}
        </Stack>
    </Box>
  )
}

export default Message