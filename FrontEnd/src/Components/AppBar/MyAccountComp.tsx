import React, { useState } from 'react';
import { makeStyles } from '@mui/styles';
import { TextField, Button, Typography, Divider, Modal, Box } from '@mui/material';
import User from '../../Classes/User';
import { useNavigate } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home'; 

interface MyAccountCompProps {
  userData: User;
}

const useStyles = makeStyles({
  root: {
    height: '100vh',
    width: '80vw',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '10px',
    backgroundColor: '#f0f0f0',
    color: '#333',
  },
  section: {
    width: '100%',
    padding: '60px',
    border: '1px solid #ccc',
    borderRadius: '8px',
    backgroundColor: '#fff',
    marginBottom: '20px',
    boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
  },
   returnHomeButton: {
    marginTop: '20px',
    padding: '12px 20px',
    borderRadius: '8px',
    backgroundColor: '#1877f2',
    color: '#fff',
    border: 'none',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
    fontWeight: 'bold',
    textDecoration: 'none',
    '&:hover': {
      backgroundColor: '#0e5aac',
     },
  },
});

const MyAccountComp = ({userData}:MyAccountCompProps) => {
  const classes = useStyles();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [currentEmail, setCurrentEmail] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showEmail, setShowEmail] = useState(false);
  const navigate = useNavigate();

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleCurrentEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentEmail(e.target.value);
  };

  const handleCurrentPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentPassword(e.target.value);
  };

  const handleEmailSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Implement your logic to change email
    console.log('Current Email:', currentEmail);
    console.log('New Email:', email);
  };

  const handlePasswordSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Implement your logic to change password
    console.log('Current Password:', currentPassword);
    console.log('New Password:', password);
  };

   const handleReturnHome = () => {
    navigate("/HomePage");
   };
  
  return (
    <div className={classes.root}>
       <Button className={classes.returnHomeButton} onClick={handleReturnHome}>
        <HomeIcon/>
        Return Home
      </Button>
      <div className={classes.section}>
        <Typography variant="h4">Account Information</Typography>
        {/* Display user information here */}
        <Typography>User Name : {userData.username}</Typography>
        <Typography>Email: {userData.email}</Typography>
        {/* Other user information fields */}
      </div>
      <Divider />
      <div className={classes.section}>
        <Typography variant="h4">Change Email</Typography>
            <Modal
      open={showEmail}
      onClose={()=>setShowEmail(false)}
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
          <form className={classes.form} onSubmit={handleEmailSubmit}>
            <TextField
              type="email"
              label="Current Email"
              variant="outlined"
              value={currentEmail}
              onChange={handleCurrentEmailChange}
              required
            />
            <TextField
              type="email"
              label="New Email"
              variant="outlined"
              value={email}
              onChange={handleEmailChange}
              required
            />
            <Button type="submit" variant="contained" color="primary">
              Update Email
            </Button>
          </form>
          </Box>
          </Modal>
          <Button onClick={() => setShowEmail(true)} variant="outlined" color="primary">
            Change Email
          </Button>
      </div>
      <Divider />
      <div className={classes.section}>
        <Typography variant="h4">Change Password</Typography>
         <Modal
      open={showPassword}
      onClose={()=>setShowPassword(false)}
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
             <form className={classes.form} onSubmit={handlePasswordSubmit}>
            <TextField
              type="password"
              label="Current Password"
              variant="outlined"
              value={currentPassword}
              onChange={handleCurrentPasswordChange}
              required
            />
            <TextField
              type="password"
              label="New Password"
              variant="outlined"
              value={password}
              onChange={handlePasswordChange}
              required
            />
            <Button type="submit" variant="contained" color="primary">
              Update Password
            </Button>
          </form>
          </Box>
          </Modal>
          <Button onClick={() => setShowPassword(true)} variant="outlined" color="primary">
            Change Password
          </Button>
      </div>
    </div>
  );
};

export default MyAccountComp;
