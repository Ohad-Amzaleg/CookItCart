import * as React from 'react'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import IconButton from '@mui/material/IconButton'
import Badge from '@mui/material/Badge'
import MenuItem from '@mui/material/MenuItem'
import Menu from '@mui/material/Menu'
import AccountCircle from '@mui/icons-material/AccountCircle'
import MailIcon from '@mui/icons-material/Mail'
import NotificationsIcon from '@mui/icons-material/Notifications'
import MoreIcon from '@mui/icons-material/MoreVert'
import LoginComp from './LoginComp'
import SignUpComp from './SignUpComp'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import FilterMenu from './FilterMenu'
import User from '../../Classes/User'

interface AppBarCompProps {
  setUser: React.Dispatch<React.SetStateAction<any>>
  userData: User
  setFilterOptions?: React.Dispatch<React.SetStateAction<any>>
  filterOptions?: any
  setLoading?: React.Dispatch<React.SetStateAction<boolean>>
  setPageLoading: React.Dispatch<React.SetStateAction<boolean>>
}

export default function PrimarySearchAppBar({
  setUser,
  userData,
  setFilterOptions,
  filterOptions,
  setLoading,
  setPageLoading,
}: AppBarCompProps) {
  const [showSignUp, setShowSignUp] = useState(false)
  const [showLogin, setShowLogin] = useState(false)
  const [anchorEl, setAnchorEl] = React.useState(null)
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null)
  const isMenuOpen = Boolean(anchorEl)
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl)
  const [isFilterMenuOpen, setFilterMenuOpen] = useState(false)
  const navigate = useNavigate()

  // const toggleFilterMenu = () => {
  //   setFilterMenuOpen(!isFilterMenuOpen);
  // };

  const toggleSignUp = () => {
    setShowSignUp(!showSignUp)
  }

  const toggleLogin = () => {
    setShowLogin(!showLogin)
  }

  const handleProfileMenuOpen = (event: any) => {
    setAnchorEl(event.currentTarget)
  }

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null)
  }

  const handleMenuClose = () => {
    setAnchorEl(null)
    handleMobileMenuClose()
  }

  const handleMobileMenuOpen = (event: any) => {
    setMobileMoreAnchorEl(event.currentTarget)
  }

  const handleMyAccount = () => {
    navigate('/HomePage/myaccount')
  }

  const handleLogout = () => {
    // Delete the token cookie by setting its expiration date to a date in the past
    const expirationDate = new Date('2000-01-01') // A date in the past

    document.cookie = `access-token=; expires=${expirationDate.toUTCString()}; path:'/';domain:'http://cookitcart.site`

    // Redirect the user to login page
    navigate('/')
    window.location.reload()
    toast.success(`${userData.username} Logged out`)
  }

  // const handleFilterChange = (name: any, value: any) => {
  //   setFilterOptions((prev: any) => ({ ...prev, [name]: value }));
  //   console.log(name, value);
  // };

  const menuId = 'primary-search-account-menu'
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMyAccount}>My account</MenuItem>
      <MenuItem onClick={handleLogout}> Logout </MenuItem>
    </Menu>
  )

  const renderPopUp = (
    <>
      {showSignUp && (
        <SignUpComp
          showSignUp={showSignUp}
          toggleSignUp={toggleSignUp}
          toggleLogin={toggleLogin}
          userData={userData}
        />
      )}
      {showLogin && (
        <LoginComp
          setUser={setUser}
          userData={userData}
          showLogin={showLogin}
          toggleLogin={toggleLogin}
          toggleSignUp={toggleSignUp}
          setPageLoading={setPageLoading}
        />
      )}
    </>
  )

  const mobileMenuId = 'primary-search-account-menu-mobile'
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
        <IconButton
          size="large"
          aria-label="show 17 new notifications"
          color="inherit"
        >
          <Badge badgeContent={17} color="error">
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <p>Notifications</p>
      </MenuItem>
      <MenuItem onClick={handleLogout}>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <p>Logout</p>
      </MenuItem>
    </Menu>
  )

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="relative" color="transparent">
        <Toolbar>
          <span className="logo">CookItCart</span>
          {userData.initialized &&
            userData.verified &&
            setFilterOptions &&
            setLoading && (
              <FilterMenu
                filterOptions={filterOptions}
                setFilterOptions={setFilterOptions}
                setLoading={setLoading}
                isFilterMenuOpen={isFilterMenuOpen}
                setIsFilterMenuOpen={setFilterMenuOpen}
              />
            )}
          <Box sx={{ flexGrow: 1 }} />
          {!userData || !userData.verified ? (
            <>
              <button className="login" onClick={toggleLogin}>
                Log in
              </button>
              <button className="signup" onClick={toggleSignUp}>
                Sign Up
              </button>
            </>
          ) : (
            <>
              <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
                <IconButton
                  size="large"
                  aria-label="show 17 new notifications"
                  color="inherit"
                >
                  <Badge badgeContent={1} color="error">
                    <NotificationsIcon />
                  </Badge>
                </IconButton>
                <IconButton
                  size="large"
                  edge="end"
                  aria-label="account of current user"
                  aria-controls={menuId}
                  aria-haspopup="true"
                  onClick={handleProfileMenuOpen}
                  color="inherit"
                >
                  <AccountCircle />
                </IconButton>
              </Box>
              <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
                <IconButton
                  size="large"
                  aria-label="show more"
                  aria-controls={mobileMenuId}
                  aria-haspopup="true"
                  onClick={handleMobileMenuOpen}
                  color="inherit"
                >
                  <MoreIcon />
                </IconButton>
              </Box>
            </>
          )}
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
      {renderPopUp}
    </Box>
  )
}
