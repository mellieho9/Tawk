# Tawk
A secure and responsive multi-platform messenger app with customizable themes, file transfer, and video/call functionality


## Background 💡
This is project I am developing during Winter break. It helps me practice my knowledge of React and React redux and gain exposure to MaterialUI, React Context API, Socket.io, and Agora WebRTC.

## Intended features 🧩
- One-to-one messaging
- Group messaging
- Audio calling
- Video calling
- Stories/Updates
- File upload/transfer
- Block/Delete chat
- Light/Dark Mode & Customizable themes
- Authentication
- Settings

## Current Progress 🏃
- Implemented the home dashboard (Which includes the side navigation bar, contact list, one-on-one message screen, and pop-up contact info menu)
- Implemented the "Starred Messages" and "Shared Files" section of the pop-up contact info menu
- Implemented the settings screen (As well as the pop-up menu for "Keyboard Shortcuts")
- Implemented the UI and validation schema for the Login page
- Implemented dark/light mode and theme preset customization

## Preview
<img src="https://github.com/mellieho9/Tawk/blob/main/preview/Login.png" width="500">
<img src="https://github.com/mellieho9/Tawk/blob/main/preview/Home%20dashboard.png" width="500">
<img src="https://github.com/mellieho9/Tawk/blob/main/preview/Nightmode%20with%20file%20transfer%20dial%20open.png" width="500">
<img src="https://github.com/mellieho9/Tawk/blob/main/preview/Settings.png" width="500">


## Technologies used 🛠️
### Frontend
- React
- MaterialUI (For UI components such as Box, Stack, Menu, Modal, Image, IconButton, Button, Alert)
- Phosphor-React (For icons)
- Redux (For state management)
- Emoji-mart (For emoji selection options)
- React-Hook-Form (Login/Signup UI and validation)
- FakerJS (To populate dummy data)
### Backend (Intended)
- NodeJS
- ExpressJS 
- MongoDB (Stores user data and messages)
- Mongoose (Supports MongoDB)
- Socket.io (For video calling / voice calling functionality)
- Agora WebRTC API (For video calling / voice calling functionality)
### Deployment
AWS EC2, S3

# Try it yourself 🧰 
1. Clone this repository
2. Run 
```
  cd Tawk
```
3. Run 
```
  npm install
```
4. Run 
```
  npm run start
```
