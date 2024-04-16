import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation  } from 'react-router-dom';
import { styled, useTheme } from '@mui/material/styles';
import { Box, List, CssBaseline, Divider, ListItem, ListItemButton, ListItemIcon, ListItemText, useMediaQuery, Tooltip } from '@mui/material';
import MuiDrawer from '@mui/material/Drawer';
import { HomeRounded, Person, MenuRounded, MenuOpenRounded } from '@mui/icons-material';
import {setSideBarStatus} from '../slices/customizeSlice';
import sideBarStyles from '../styles/sideBarStyles.module.css'
// import LogoBig from '/logoBig.png';
// import Logo from '/logo.png';

const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
  background: 'white',
  color:'black'
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(8)} + 1px)`,
  background: 'white',
  color:'black'
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: theme.spacing(0, 0),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
    }),
  }),
);

export default function Sidebar() {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
  
  const { sideBar } = useSelector((state) => state.customize);
  const { userInfo } = useSelector((state) => state.auth);

  const [open, setOpen] = React.useState(sideBar ? sideBar.status : false);
  
  const location = useLocation();
  const dispatch = useDispatch();
  const activeRoute = location.pathname;

  const handleDrawerOpen = () => {
    // document.getElementById('logo').src = LogoBig;
    setOpen(true);
    dispatch(setSideBarStatus({status:true})); 
  };

  const handleDrawerClose = () => {
    // document.getElementById('logo').src = Logo;
    setOpen(false);
    dispatch(setSideBarStatus({status:false})); 
  };

  React.useEffect(() => {
    setOpen(sideBar ? sideBar.status : false);
  },[isSmallScreen]);
  
  return (
    <Box sx={{ display: 'flex' }} id='sideBarBox'>
      <CssBaseline  style={{border:'none !important'}}/>
      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          {/* <Link to='/'><Image src={open ? LogoBig : Logo} height='70px' id="logo"/></Link> */}
          {open ? <div onClick={handleDrawerClose} className={sideBarStyles.closeMenuBtn}><MenuOpenRounded style={{verticalAlign:'bottom'}} /></div> : <></>}
        </DrawerHeader>
        <Divider />
        <List>
          <Link to='/' style={{textDecoration:'none', color:'black'}}><ListItem disablePadding sx={{ display: 'block' }}>
            <Tooltip title={!open ? "Home" : ''} placement="right" arrow>
              <ListItemButton sx={{ minHeight: 48, justifyContent: open ? 'initial' : 'center', px: 2.5, }} className={`${sideBarStyles.itmBtn} ${activeRoute === '/' ? sideBarStyles.active : ''}`}>
                <ListItemIcon sx={{ minWidth: 0, mr: open ? 3 : 'auto', justifyContent: 'center', color: 'inherit' }}>
                  <HomeRounded />
                </ListItemIcon>
                <ListItemText primary={"Home"} sx={{ opacity: open ? 1 : 0 }} />
              </ListItemButton>
            </Tooltip>
          </ListItem></Link>
          
          <Link to='/profile' style={{textDecoration:'none', color:'black'}}><ListItem disablePadding sx={{ display: 'block' }}>
            <Tooltip title={!open ? "Profile" : ''} placement="right" arrow>  
              <ListItemButton sx={{ minHeight: 48, justifyContent: open ? 'initial' : 'initial', px: 2.5, }} className={`${sideBarStyles.itmBtn} ${activeRoute === '/profile' ? sideBarStyles.active : ''}`}>
                <ListItemIcon sx={{ minWidth: 0, mr: open ? 3 : 'auto', justifyContent: 'center', color: 'inherit' }}>
                  <Person />
                </ListItemIcon>
                <ListItemText primary={"Profile"} sx={{ opacity: open ? 1 : 0 }} />
              </ListItemButton>
            </Tooltip>
          </ListItem></Link>

          {/* {userInfo.userType == 'admin' ? //Navigations for Admin

            <>
              <Link to='/admin/boardings/' style={{textDecoration:'none', color:'black'}}><ListItem disablePadding sx={{ display: 'block' }}>
                <Tooltip title={!open ? "Boardings" : ''} placement="right" arrow>
                  <ListItemButton sx={{ minHeight: 48, justifyContent: open ? 'initial' : 'initial', px: 2.5, }} className={`${sideBarStyles.itmBtn} ${(activeRoute.startsWith('/admin/boardings')) ? sideBarStyles.active : ''}`}>
                    <ListItemIcon sx={{ minWidth: 0, mr: open ? 3 : 'auto', justifyContent: 'center', color: 'black' }}>
                      <HomeWorkRounded />
                    </ListItemIcon>
                    <ListItemText primary={"Boardings"} sx={{ opacity: open ? 1 : 0 }} />
                  </ListItemButton>
                </Tooltip>
              </ListItem></Link>

              <Link to='/admin/feedbacks' style={{textDecoration:'none', color:'black'}}><ListItem disablePadding sx={{ display: 'block' }}>
              <Tooltip title={!open ? "All Feedbacks" : ''} placement="right" arrow>
                <ListItemButton sx={{ minHeight: 48, justifyContent: open ? 'initial' : 'initial', px: 2.5, }} className={`${sideBarStyles.itmBtn} ${activeRoute.startsWith('/occupant/feedback') ? sideBarStyles.active : ''}`}>
                  <ListItemIcon sx={{ minWidth: 0, mr: open ? 3 : 'auto', justifyContent: 'center', color: 'black' }}>
                  <RateReviewRounded />
                  </ListItemIcon>
                  <ListItemText primary={"All Feedbacks"} sx={{ opacity: open ? 1 : 0 }} />
                </ListItemButton>
              </Tooltip>
            </ListItem></Link>

            </>

          : <></>} */}
          
        </List>
      </Drawer>
      {open ? <></> : <div id="smMenuBtn" onClick={handleDrawerOpen} style={{left: `calc(${theme.spacing(7)} + 9px)`}} className={sideBarStyles.openMenuBtn}><MenuRounded style={{verticalAlign:'bottom'}} /></div>}
    </Box>
  );
}