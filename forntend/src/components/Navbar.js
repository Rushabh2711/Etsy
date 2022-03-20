import React, {useState} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import Badge from '@mui/material/Badge';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import StorefrontIcon from '@mui/icons-material/Storefront';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MailIcon from '@mui/icons-material/Mail';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import NotificationsIcon from '@mui/icons-material/Notifications';
import MoreIcon from '@mui/icons-material/MoreVert';
import { orange } from '@mui/material/colors';
import Button from '@mui/material/Button';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { useNavigate } from 'react-router-dom';
import Modal from '@mui/material/Modal';
import Login from '../pages/Login'
import Registration from '../pages/Registration';
import { logout, userLogin, searchItem } from '../actions';



const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));

export default function Navbar(props) {

  const handleProfileMenuOpen = () => {

  }

  // const handleLoginClick = () => {
  //   console.log("login");
  //   navigate('/login');
  // }

  const navigate = useNavigate();
  const dispatch = useDispatch();

  var user = true;
  const [openLogin, setOpenLogin] = useState(false);
  const searchText = useSelector(state => state.searchText);
  const [openRegistration, setOpenRegistration] = useState(false);
  const LoggedInUSer = useSelector(state => state.LoggedInUSer)
  const cartItems = useSelector(state => state.CartItem);

  const handleLoginClick = () => setOpenLogin(true);
  const handleLoginClose = () => setOpenLogin(false);

  const handleLogoutClick = () => {
    dispatch(logout());
    dispatch(userLogin({}));
    // navigate('/');
  }

  const handleRegistrationClick = () => {
    setOpenRegistration(true);
    setOpenLogin(false)};
    
  const handleRegistrationClose = () => setOpenRegistration(false);

  const handleSearchChange = (e) => {
    if(e.keyCode === 13) {
      dispatch(searchItem(e.target.value));
    } 
  }

  const handleFavoriteClick = () => {
    navigate('/favorite');
  }

  const handleStoreClick = () => {
    navigate('/shop');
  }

  const handleProfileClick = () => {
    navigate('/EditProfile');
  }

  const handleCartClick = () => {
    navigate('/cart');
  }

  const handleLogoClick = () => {
    navigate('/');
    window.location.reload(false);
  }


  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" color='transparent'>
        <Toolbar>
          <div>
            <img onClick={handleLogoClick} src='data:image/png;base64,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' 
            alt='Etsy' loading="lazy" width="70" height="40"/>
          </div>
          <Search>
            <SearchIconWrapper><SearchIcon /></SearchIconWrapper>
            <StyledInputBase
              defaultValue={searchText}
              placeholder="Search for anything..."
              style={{"border": "2px solid", "border-radius": "96px" }}
              onKeyUp={handleSearchChange}
              inputProps={{ 'aria-label': 'search' }}
            />
          </Search>
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
          <IconButton size="large" color="default" onClick={handleFavoriteClick}> <FavoriteBorderIcon /></IconButton>
            <IconButton size="large" color="default" onClick={handleCartClick}>
              <Badge badgeContent={cartItems.length} color="error" >
                <ShoppingCartIcon />
              </Badge>
            </IconButton>
            <IconButton
              size="large"
              onClick={handleStoreClick}
              color="default">
              <Badge color="error">
                <StorefrontIcon />
              </Badge>
            </IconButton>
          </Box>
          {!LoggedInUSer ? <Button variant="outlined" style={{backgroundColor: "#000000", color: "#ffffff"}} size="small" onClick={handleLoginClick}>Login</Button> : 
              <div>
              <IconButton
                  size="large"
                  edge="end"
                  aria-label="account of current user"
                  onClick={handleProfileClick}
                  color='error'>
                  <AccountCircle />
                </IconButton>
                <Button variant="outlined" style={{backgroundColor: "#000000", color: "#ffffff", marginLeft: "15px"}} size="small" onClick={handleLogoutClick}>Logout</Button>
                </div>
                }
        </Toolbar>
      </AppBar>
      <Login open={openLogin} handleClose={handleLoginClose} handleRegistrationClick={handleRegistrationClick}/>
      <Registration open={openRegistration} handleClose={handleRegistrationClose} loginOpen={handleLoginClick}/>
    </Box>
  );
}




