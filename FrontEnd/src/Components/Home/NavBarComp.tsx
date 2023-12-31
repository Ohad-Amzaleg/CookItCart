import ExploreIcon from '@mui/icons-material/Explore'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import { Badge } from '@mui/material'
import Typography from '@mui/material/Typography'
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth'
import { AppBar, Toolbar } from '@mui/material'
import Button from '@mui/material/Button'
import { useNavigate } from 'react-router-dom'
import Cart from '../../Classes/Cart'

interface NavBarCompProps {
  cart: Cart
}

const NavBarComp = ({ cart }: NavBarCompProps) => {
  const navigate = useNavigate()

  const handleFood = () => {
    navigate(`/HomePage/food`)
  }

  const handleSchedule = () => {
    navigate(`/HomePage/schedule`)
  }

  const handleCart = () => {
    navigate(`/HomePage/cart`)
  }

  const buttonStyle = {
    borderRadius: '10px',
    backgroundColor: 'white',
    color: 'black',
    '&:focus': { backgroundColor: '#1592da', color: 'white' },
  }

  return (
    <AppBar position="relative" color="transparent" sx={{ boxShadow: 'none' }}>
      <Toolbar style={{ justifyContent: 'center' }}>
        <Button sx={buttonStyle} onClick={handleFood}>
          <Badge color="error">
            <ExploreIcon />
            <Typography>Food</Typography>
          </Badge>
        </Button>
        <Button sx={buttonStyle} onClick={handleSchedule}>
          <Badge color="error">
            <CalendarMonthIcon />
            <Typography>Schedule</Typography>
          </Badge>
        </Button>
        <Button sx={buttonStyle} onClick={handleCart}>
          <Badge
            badgeContent={cart.items.length > 0 ? cart.items.length : null}
            color="error"
          >
            <ShoppingCartIcon />
            <Typography>Cart</Typography>
          </Badge>
        </Button>
      </Toolbar>
    </AppBar>
  )
}

export default NavBarComp
