import React from 'react';
import { useSpring, animated } from 'react-spring';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import FastfoodIcon from '@mui/icons-material/Fastfood';
import { styled } from "@mui/material/styles";

// Define styles using MUI's `styled` utility
const Container = styled('div')`
  background-image: url('FrontEnd/my-react-app/src/Assets/background.jpg');
  background-size: cover;
  color: white;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  height: 100vh;
  overflow: hidden;
`;

const AnimatedIconButton = animated(IconButton);

function WelcomeComp() {
  // Define animations using react-spring
  const fadeIn = useSpring({ opacity: 1, from: { opacity: 0 }, delay: 500 });
  const slideIn = useSpring({ transform: 'translateX(0)', from: { transform: 'translateX(-100%)' }, delay: 800 });

  return (
    <Container>
      <animated.div style={fadeIn}>
        <FastfoodIcon style={{ fontSize: 80, marginBottom: '1rem' }} />
        <Typography variant="h4" gutterBottom>
          Welcome to Foodie Delights
        </Typography>
        <Typography variant="subtitle1" gutterBottom>
          Explore a world of delicious culinary experiences.
        </Typography>
      </animated.div>

      <animated.div style={slideIn}>
        <Typography variant="body2" style={{ marginTop: '2rem' }}>
          Let's get started!
        </Typography>
        <AnimatedIconButton
          aria-label="Get Started"
          color="primary"
          style={{ marginTop: '1rem' }}
        >
          <ArrowForwardIcon fontSize="large" />
        </AnimatedIconButton>
      </animated.div>
    </Container>
  );
}

export default WelcomeComp;
