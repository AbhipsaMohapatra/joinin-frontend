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

  const userMenu = ['About me', 'My Events', 'All Events','Ask AI'];
const adminMenu = ['About me', 'Add Event', 'All Events', 'See Feedbacks','Ask AI'];

const data =( user.role==='admin' ? adminMenu : userMenu);

  const DrawerList = (
    <Box sx={{ width: 280 }} role="presentation" onClick={toggleDrawer(false)} >
      <List sx={{ '& .MuiTypography-root': { fontSize: 20 } }} className='!flex !flex-col !justify-center !items-center'>
        {data.map((text, index) => (
          <ListItem key={text} disablePadding className="hover:!bg-amber-300 !text-center !p-5" >
            <ListItemButton>
              <ListItemIcon>
                {index==0&& <AccountCircleIcon sx={{fontSize:30}}/>}
                {index==1&&<EmojiEventsIcon sx={{fontSize:30}}/>}
                {index==2 && <EventIcon sx={{fontSize:30}}/>}
                {index==3 && <ThumbUpAltIcon sx={{fontSize:30}}/> }
                {index==data.length-1 && <SmartToyIcon sx={{fontSize:30}}/>}

                
              </ListItemIcon>
              <ListItemButton component={Link} to={'/aboutme'}>
            <ListItemText primary={text} />
          </ListItemButton>
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



