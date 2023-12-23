import React, { useState, FC } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { toast } from "react-toastify";
import VerificationComp from "./VerificationComp";
import Modal from "@mui/material/Modal";
import {
  CssBaseline,
  Avatar,
  Typography,
  Box,
  Checkbox,
  FormControlLabel,
  Grid,
  Link,
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import User from "../../Classes/User";

const defaultTheme = createTheme();

interface LoginCompProps {
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  userData: User;
  showLogin: boolean;
  toggleLogin: () => void;
  toggleSignUp: () => void;
  setPageLoading: React.Dispatch<React.SetStateAction<boolean>>;
}
const LoginComp = ({
  setUser,
  userData,
  showLogin,
  toggleLogin,
  toggleSignUp,
  setPageLoading,
}: LoginCompProps): JSX.Element => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleFrogetPassword = () => {
  
  }

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: any) => {
    setSubmitted(true);
    e.preventDefault();

    try {
      // Login current user
      const user = await userData?.userLogin(formData);
      // set new logged in user
      setUser(user);
      // Start loading page for logged in user
      if (user.verified) {
        // setPageLoading(true);
        toast.success(`${user.username} Logged in successfully`);
      } else {
        toast.warning(
          `${user.username} is not verified, please verify your email`
        );
      }
    } catch (err: any) {
      switch (err.response.data.code) {
        case 0:
          toast.error("No user found");
          break;
        case 1:
          toast.error("Invalid Password or Email");
          break;
      }
      setTimeout(() => {
        setSubmitted(false);
      }, 200);
    }
  };

  return (
    <Modal
      open={showLogin}
      onClose={toggleLogin}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 400,
          bgcolor: "background.paper",
          border: "2px solid #000",
          boxShadow: 24,
          p: 4,
        }}
      >
        <div>
          {!userData.initialized && (
            <ThemeProvider theme={defaultTheme}>
              <CssBaseline />
              <Box
                sx={{
                  marginTop: 8,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
                  <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                  Sign in
                </Typography>
                <Box
                  component="form"
                  onSubmit={handleSubmit}
                  noValidate
                  sx={{ mt: 1 }}
                >
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    onChange={handleInputChange}
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    autoFocus
                  />
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    onChange={handleInputChange}
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                  />
                  <FormControlLabel
                    control={<Checkbox value="remember" color="primary" />}
                    label="Remember me"
                  />
                  {!submitted ? (
                    <Button
                      type="submit"
                      fullWidth
                      variant="contained"
                      sx={{ mt: 3, mb: 2 }}
                    >
                      Sign In
                    </Button>
                  ) : (
                    <Button
                      type="submit"
                      fullWidth
                      variant="contained"
                      sx={{ mt: 3, mb: 2 }}
                      // Conditional rendering of CircularProgress
                    >
                      {submitted ? "Loading…" : "Sign In"}
                    </Button>
                  )}
                  <Grid container>
                    <Grid item xs>
                       <Button onClick={handleFrogetPassword} >
                           Forgot password?
                        </Button>
                    </Grid>
                    <Grid item>
                        <Button onClick={() => {
                          toggleLogin();
                          toggleSignUp();
                        }} >
                          Don't have an account? Sign Up
                        </Button>
                 
                    </Grid>
                  </Grid>
                </Box>
              </Box>
            </ThemeProvider>
          )}

          {userData.initialized && !userData.verified && (
            <VerificationComp setUser={setUser} userData={userData} />
          )}
        </div>
      </Box>
    </Modal>
  );
};

export default LoginComp;
