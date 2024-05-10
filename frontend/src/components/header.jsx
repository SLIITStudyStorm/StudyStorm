import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AppBar, Box, Toolbar, IconButton, Typography, Menu, Container, Avatar, Button, MenuItem, } from "@mui/material";
import { Offcanvas } from 'react-bootstrap';
import { FaSignInAlt } from 'react-icons/fa';
import { clearUserInfo, setUserInfo } from "../slices/authSlice";
import { toast } from "react-toastify";
import MenuIcon from "@mui/icons-material/Menu";

import headerStyles from "../styles/headerStyles.module.css";
import { AccountCircle } from "@mui/icons-material";
// import signInWithGoogle from "../firebase/googleAuth";

const Header = () => {
    const [anchorElUser, setAnchorElUser] = useState(null);
    const [isSticky, setIsSticky] = useState(false);
    const [showDrawer, setShowDrawer] = useState(false);

    const { userInfo } = useSelector((state) => state.auth);

    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    const activeRoute = location.pathname;

    const SignIn = async() => {
      try {
        let { user } = await signInWithGoogle();
  
        dispatch(
          setUserInfo({
            firstName: user.displayName.split(' ')[0],
            lastName: user.displayName.split(' ')[1],
            displayName: user.displayName,
            email: user.email,
            phoneNumber: user.phoneNumber,
            photoURL: user.photoURL
          })
        )
  
        toast.success('Login Successful!')
      } catch (error) {
        toast.error('Login Failed!')
        console.error(error)
      }
    }

    const logoutHandler = () => {
        setAnchorElUser(null)
        try {
          dispatch(clearUserInfo())
          toast.success('Logged Out Successfully')
        } catch (error) {
          console.log(error);
          toast.error(error.message || error.error)
        }
    };

    let timeout;
    const handleScroll = () => {
        if (timeout) {
            clearTimeout(timeout);
        }

        timeout = setTimeout(() => {
            if (document.getElementById("main").scrollTop > 10) {
                setIsSticky(true);
            } else {
                setIsSticky(false);
            }
        }, 10);
    };

    useEffect(() => {
        if(activeRoute == '/'){
            document.getElementById("main").addEventListener("scroll", handleScroll);
            if (document.getElementById("main").scrollTop > 10) {
                setIsSticky(true);
            } else {
                setIsSticky(false);
            }
        }
        else{
            setIsSticky(true)
        }
    }, []);

    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const scrollToElement = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

    return (
        <AppBar id="header" className={`${headerStyles.header} ${isSticky ? headerStyles.sticky : ""}`} >
            <Container maxWidth="lg">
                <Toolbar disableGutters>
                    <Box sx={{display: { xs: "none", md: "flex", cursor:'pointer' }}}>
                        {isSticky? 
                            <img src="/Logo2.png" width='75px' onClick={() => navigate('/')}/> 
                        :
                            <img src="/Logo1.png" width='75px' onClick={() => navigate('/')}/> 
                        }
                    </Box>

                    <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={() => setShowDrawer(true)}
                            color="inherit"
                        >
                            <MenuIcon />
                        </IconButton>
                        <Offcanvas show={showDrawer} onHide={() => setShowDrawer(false)} style={{width:'200px'}}>
                            <Offcanvas.Body>
                            <Button
                                onClick={() => {navigate('/');scrollToElement('top')}}
                                sx={{ my: 2, px: 1, mx: 1, color: "inherit", fontWeight:'inherit', display: "block" }}
                                className={isSticky? headerStyles.navBtns : headerStyles.navBtns2} 
                            >
                                Home
                            </Button>
                            <Button
                                onClick={() => {navigate('/epic')}}
                                sx={{ my: 2, px: 1, mx: 1, color: "inherit", fontWeight:'inherit', display: "block" }}
                                className={isSticky? headerStyles.navBtns : headerStyles.navBtns2} 
                            >
                                EPIC
                            </Button>
                            <Button
                                onClick={() => {navigate('/apod')}}
                                sx={{ my: 2, px: 1, mx: 1, color: "inherit", fontWeight:'inherit', display: "block" }}
                                className={isSticky? headerStyles.navBtns : headerStyles.navBtns2} 
                            >
                                APOD
                            </Button>
                            <Button
                                onClick={() => {navigate('/my-courses')}}
                                sx={{ my: 2, px: 1, mx: 1, color: "inherit", fontWeight:'inherit', display: "block" }}
                                className={isSticky? headerStyles.navBtns : headerStyles.navBtns2} 
                            >
                                My Courses
                            </Button>
                            <Button
                                onClick={() => {navigate('/favourites')}}
                                sx={{ my: 2, px: 1, mx: 1, color: "inherit", fontWeight:'inherit', display: "block" }}
                                className={isSticky? headerStyles.navBtns : headerStyles.navBtns2} 
                            >
                                Favourites
                            </Button>
                            </Offcanvas.Body>
                        </Offcanvas>
                    </Box>
                    <Box sx={{display: { xs: "flex", md: "none", cursor:'pointer' }}} style={{width:'100%', justifyContent:'center'}}>   
                        {isSticky? 
                            <img src="/LogoBig2.png" width='150px' onClick={() => navigate('/')}/> 
                        :
                            <img src="/LogoBig1.png" width='150px' onClick={() => navigate('/')}/> 
                        }
                    </Box>
                    <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" }, justifyContent:'center' }}>
                            <Button
                                onClick={() => {navigate('/');scrollToElement('top')}}
                                sx={{ my: 2, px: 3, mx: 2, color: "inherit", fontWeight:'inherit', display: "block" }}
                                className={isSticky? headerStyles.navBtns : headerStyles.navBtns2} 
                            >
                                Home
                            </Button>
                            <Button
                                onClick={() => {navigate('/epic')}}
                                sx={{ my: 2, px: 3, mx: 2, color: "inherit", fontWeight:'inherit', display: "block" }}
                                className={isSticky? headerStyles.navBtns : headerStyles.navBtns2} 
                            >
                                EPIC
                            </Button>
                            <Button
                                onClick={() => {navigate('/apod')}}
                                sx={{ my: 2, px: 3, mx: 2, color: "inherit", fontWeight:'inherit', display: "block" }}
                                className={isSticky? headerStyles.navBtns : headerStyles.navBtns2} 
                            >
                                APOD
                            </Button>
                            <Button
                                onClick={() => {navigate('/my-courses')}}
                                sx={{ my: 2, px: 3, mx: 2, color: "inherit", fontWeight:'inherit', display: "block" }}
                                className={isSticky? headerStyles.navBtns : headerStyles.navBtns2} 
                            >
                                My Courses
                            </Button>
                            <Button
                                onClick={() => {navigate('/favourites')}}
                                sx={{ my: 2, px: 3, mx: 2, color: "inherit", fontWeight:'inherit', display: "block" }}
                                className={isSticky? headerStyles.navBtns : headerStyles.navBtns2} 
                            >
                                Favourites
                            </Button>
                    </Box>
                    {userInfo ? 
                    <Box sx={{ flexGrow: 0 }}>
                        <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                            {userInfo.photoURL ? <Avatar alt={userInfo.displayName} src={userInfo.photoURL} sx={!open ? { width: 24, height: 24 } : {}} style={{ transition: 'all .2s ease-in-out'}} /> : <AccountCircle />}
                        </IconButton>
                        <Menu
                            sx={{ mt: "45px", textAlign:'center' }}
                            id="menu-appbar"
                            anchorEl={anchorElUser}
                            anchorOrigin={{
                                vertical: "top",
                                horizontal: "right",
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: "top",
                                horizontal: "right",
                            }}
                            open={Boolean(anchorElUser)}
                            onClose={handleCloseUserMenu}
                        >
                            <MenuItem onClick={logoutHandler} style={{justifyContent:'center'}}>
                                <Typography textAlign="center">Logout</Typography>
                            </MenuItem>
                        </Menu>
                    </Box>
                    :
                    
                    <Box sx={{ flexGrow: 0 }}>
                        <Button onClick={SignIn} className={isSticky? headerStyles.navBtns : headerStyles.navBtns2} sx={{ p: 0, color: "inherit", fontWeight:'inherit' }}>
                            <FaSignInAlt />&nbsp; Sign In
                        </Button>
                    </Box>}
                </Toolbar>
            </Container>
        </AppBar>
    );
};

export default Header;
