import React from 'react'
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import NameAvatar from './NameAvatar';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import EventIcon from '@mui/icons-material/Event';
import {login} from "../../redux/authSlice"
import { useDispatch,useSelector } from 'react-redux';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import SmartToyIcon from '@mui/icons-material/SmartToy';
import { Link } from 'react-router-dom';



const Draw = ({name}) => {
     const [open, setOpen] = React.useState(false);
     const { isAuthenticated, user, accountType } = useSelector(
    (state) => state.auth
  );
  const dispatch = useDispatch();


  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  // const userMenu = ['About me', 'My Events', 'All Events','Ask AI'];
  const userMenu = [
     { text: "About Me", path: "/aboutme", icon: <AccountCircleIcon sx={{ fontSize: 30 }} /> },
      { text: "My Events", path: "/events", icon: <EmojiEventsIcon sx={{fontSize:30}}/> },
      { text: "All Events", path: "/events", icon: <EventIcon sx={{fontSize:30}}/> },
      { text: "Ask AI", path: "/events", icon: <SmartToyIcon sx={{fontSize:30}}/> },
  ];

// const adminMenu = ['About me', 'Add Event', 'All Events', 'See Feedbacks','Ask AI'];
  const adminMenu = [
     { text: "About Me", path: "/aboutme", icon: <AccountCircleIcon sx={{ fontSize: 30 }} /> },
      { text: "Add Events", path: "/events", icon: <EmojiEventsIcon sx={{fontSize:30}}/> },
      { text: "All Events", path: "/events", icon: <EventIcon sx={{fontSize:30}}/> },
      { text: "See Feedbacks", path: "/events", icon: <ThumbUpAltIcon sx={{fontSize:30}}/> },

      { text: "Ask AI", path: "/events", icon: <SmartToyIcon sx={{fontSize:30}}/> },
  ];


const data =( user.role==='admin' ? adminMenu : userMenu);

  const DrawerList = (
    <Box sx={{ width: 280 }} role="presentation" onClick={toggleDrawer(false)} >
      <List sx={{ '& .MuiTypography-root': { fontSize: 20 } }} className='!flex !flex-col !justify-center !items-center'>
        {data.map((item, index) => (
          <ListItem key={index} disablePadding className="hover:!bg-amber-300 !text-center !p-5" >
          <ListItemButton component={Link} to={item.path}>
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItemButton>
          </ListItem>
        ))}
      </List>
      
    </Box>
    
  );
  

  return (
    <>
       <div>
      <Button onClick={toggleDrawer(true)}>
        <NameAvatar name={name}/>
      </Button>
      <Drawer open={open} onClose={toggleDrawer(false)} anchor='right'>
        {DrawerList}
      </Drawer>
    </div>
      
    </>
  )
}

export default Draw



