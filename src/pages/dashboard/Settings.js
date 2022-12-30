import { faker } from '@faker-js/faker'
import { Avatar, Box, IconButton, Stack, Typography, Divider } from '@mui/material'
import { useTheme, alpha } from '@mui/material/styles'
import { Bell, CaretLeft, Image, Info, Key, Keyboard, Lock, Note, PencilCircle } from 'phosphor-react'
import React, { useState } from 'react'
import Shortcuts from '../../sections/settings/Shortcuts'

const Settings = () => {
    const theme = useTheme()
    const [openShortcuts, setOpenShortcuts] = useState(false)

    const handleOpenShortcuts = () => {
        setOpenShortcuts(true)
    }

    const handleCloseShortcuts = () => {
        setOpenShortcuts(false)
    }
    const list =  [
        {
            key: 0,
            icon: <Bell size={20} />,
            title: "Notifications",
            onClick: () => {}
        },
        {
            key: 1,
            icon: <Lock size={20} />,
            title: "Privacy",
            onClick: () => {}
        },
        {
            key: 2,
            icon: <Key size={20} />,
            title: "Security",
            onClick: () => {}
        },
        {
            key: 3,
            icon: <PencilCircle size={20} />,
            title: "Theme",
            // onClick: handleOpenTheme,
            onClick: () => {}
        },
        {
            key: 4,
            icon: <Image size={20} />,
            title: "Chat Wallpaper",
            onClick: ()  => {}
        },
        {
            key: 5,
            icon: <Note size={20} />,
            title: "Request Account Info",
            onClick: () => {}
        },
        {
            key: 6,
            icon: <Keyboard size={20} />,
            title: "Keyboard Shortcuts",
            onClick: handleOpenShortcuts,
        },
        {
            key: 7,
            icon: <Info size={20} />,
            title: "Help",
            onClick: () => {}
        }
    ]
  return (
    <>
        <Stack direction="row" sx={{width: "100%"}}>
            <Box sx={{overflowY: "scroll", height: "100vh",width: 320, backgroundColor: theme.palette.mode === "light" ?  alpha(theme.palette.primary.main, 0.03)  : theme.palette.background.paper, boxShadow: "0px 0px 2px rgba(0,0,0,0.25)"}}>
                <Stack  p={4} spacing={5}>
                    <Stack direction="row" alignItems="center" spacing={3}>
                        <IconButton>
                            <CaretLeft size={24} color={"#4B4B4B"} />
                        </IconButton>
                        <Typography variant="h6">
                            Settings
                        </Typography>
                    </Stack>
                    <Stack direction={"row"} spacing={3}>
                        <Avatar sx={{width: 56, height: 56}}  src={faker.image.avatar()} alt={faker.name.fullName()} />
                        <Stack spacing={0.5}>
                            <Typography variant='article'>
                                    {faker.name.fullName()}
                            </Typography>
                            <Typography variant='body2'>
                                    {faker.random.words()}
                            </Typography>
                        </Stack>
                    </Stack>
                    <Stack spacing={4}>
              {list.map(({ key, icon, title, onClick }) => {
                return (
                  <>
                    <Stack
                      onClick={onClick}
                      sx={{ cursor: "pointer" }}
                      spacing={2}
                    >
                      <Stack alignItems={"center"} direction="row" spacing={2}>
                        {icon}
                        <Typography variant="body2">{title}</Typography>
                      </Stack>
                      {key !== 7 && <Divider />}
                    </Stack>
                  </>
                );
              })}
            </Stack>
                </Stack>
            </Box>

        </Stack>
        {openShortcuts && <Shortcuts open={openShortcuts} handleClose={handleCloseShortcuts} />}
    </>
  )
}

export default Settings