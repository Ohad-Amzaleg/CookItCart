import React, { useState } from 'react'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { errors } from '../../Constants/Errors'
import { StyledForm, textFieldStyle } from '../../Constants/Styles'
import Modal from '@mui/material/Modal'
import Box from '@mui/material/Box'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import Avatar from '@mui/material/Avatar'
import CssBaseline from '@mui/material/CssBaseline'
import FormControlLabel from '@mui/material/FormControlLabel'
import Checkbox from '@mui/material/Checkbox'
import Link from '@mui/material/Link'
import Grid from '@mui/material/Grid'
import Container from '@mui/material/Container'
import User from '../../Classes/User'

const defaultTheme = createTheme()
interface SignUpCompProps {
  showSignUp: boolean
  toggleLogin: () => void
  toggleSignUp: () => void
  userData: User
}

function SignUpComp({
  showSignUp,
  toggleSignUp,
  toggleLogin,
  userData,
}: SignUpCompProps) {
  const navigate = useNavigate()
  const [emailColor, setEmailColor] = useState('')
  const [passColor, setpassColor] = useState('')
  const [passError, setPassError] = useState('')
  const [emailError, setEmailError] = useState('')

  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  })

  const validateEmail = (email: string) => {
    const re = /\S+@\S+\.\S+/
    !re.test(email) ? setEmailError(errors.email) : setEmailError('')
    return emailError === ''
  }

  const validatePassword = (password: string) => {
    const reSpcialChar = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/
    const reUpperCase = /[A-Z]/
    const reLength = /.{8,}/

    !reLength.test(password)
      ? setPassError(errors.pass_length)
      : !reSpcialChar.test(password)
      ? setPassError(errors.pass_special_char)
      : !reUpperCase.test(password)
      ? setPassError(errors.pass_upper_case)
      : setPassError('')

    return passError === ''
  }

  const handleInputChange = (e: any) => {
    if (e.target.name === 'password' && !validatePassword(e.target.value)) {
      setpassColor('red')
    }
    if (e.target.name === 'email' && !validateEmail(e.target.value)) {
      setEmailColor('red')
    }

    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const handleLogin = (e: any) => {
    navigate('/LoginPage')
  }

  const handleSubmit = async (e: any) => {
    e.preventDefault()
    console.log(formData)

    try {
      await userData.userRegister(formData)
      toast.success('Registered Successfully')
      toast.info('Please verify your email')
    } catch (err: any) {
      switch (err.response.data.code) {
        case 0:
          toast.error('User already exists')
          break
      }
    }
  }

  return (
    <Modal
      open={showSignUp}
      onClose={toggleSignUp}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 400,
          bgcolor: 'background.paper',
          border: '2px solid #000',
          boxShadow: 24,
          p: 4,
        }}
      >
        <div>
          <ThemeProvider theme={defaultTheme}>
            <Container component="main" maxWidth="xs">
              <CssBaseline />
              <Box
                sx={{
                  marginTop: 8,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                }}
              >
                <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                  <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                  Sign up
                </Typography>
                <Box
                  component="form"
                  noValidate
                  onSubmit={handleSubmit}
                  sx={{ mt: 3 }}
                >
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        autoComplete="given-name"
                        name="username"
                        onChange={handleInputChange}
                        required
                        fullWidth
                        id="username"
                        label="Full Name"
                        autoFocus
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        required
                        fullWidth
                        onChange={handleInputChange}
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        style={{ color: emailColor }}
                      />
                    </Grid>
                    <Grid item xs={12} style={{ color: 'red' }}>
                      {emailError}
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        required
                        fullWidth
                        onChange={handleInputChange}
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="new-password"
                      />
                    </Grid>
                    <Grid item xs={12} style={{ color: 'red' }}>
                      {passError}
                    </Grid>
                    <Grid item xs={12}>
                      <FormControlLabel
                        control={
                          <Checkbox value="allowExtraEmails" color="primary" />
                        }
                        label="I want to receive inspiration, marketing promotions and updates via email."
                      />
                    </Grid>
                  </Grid>
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                  >
                    Sign Up
                  </Button>
                  <Grid container justifyContent="flex-end">
                    <Grid item>
                      <Button
                        onClick={() => {
                          toggleSignUp()
                          toggleLogin()
                        }}
                        color="primary"
                      >
                        Already have an account? Sign in
                      </Button>
                    </Grid>
                  </Grid>
                </Box>
              </Box>
            </Container>
          </ThemeProvider>
        </div>
      </Box>
    </Modal>
  )
}

export default SignUpComp
