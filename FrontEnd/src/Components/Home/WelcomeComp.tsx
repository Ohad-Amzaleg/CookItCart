import React from 'react';
import { makeStyles } from '@mui/styles';
import foodImage1 from '../../Assets/food1.jpg'; // Import your food images
import foodImage2 from '../../Assets/food2.jpg';
import foodImage3 from '../../Assets/food3.jpg';

const foodImages = [foodImage1, foodImage2, foodImage3]; // Array of imported images

const getRandomRotation = () => {
  const randomRotation = Math.random() * 360; // Random rotation angle
  return randomRotation;
};
const useStyles = makeStyles({
  welcomeContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    padding: '100px',
    borderRadius: '10px',
    background: 'linear-gradient(45deg, #fd6e6a, #ffcb80)',
    boxShadow: '0 10px 20px rgba(0, 0, 0, 0.1)',
    maxWidth: '100vx',
    maxHeight: '100vh',
    margin: '0 auto',
    color: '#fff',
  },
  welcomeHeading: {
    fontSize: '3rem',
    fontWeight: 'bold',
    marginBottom: '20px',
    textShadow: '2px 2px 4px rgba(0,0,0,0.2)',
  },
  welcomeText: {
     flex: '1 1 80%', // Take 50% of the available space
    padding: '20px',
    fontSize: '1.6rem',
    textAlign: 'center',
  },
  waveHand: {
    fontSize: '2.5rem',
    animation: '$wave 2s infinite',
  },
    foodImagesContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: '10px',
  },
  foodImage: {
    flexDirection: 'row',
    alignItems: 'center',
     maxWidth: '20%',
    margin: '10px',
  },
  '@keyframes wave': {
    '0%': { transform: 'rotate(0deg)' },
    '25%': { transform: 'rotate(20deg)' },
    '50%': { transform: 'rotate(0deg)' },
    '75%': { transform: 'rotate(-20deg)' },
    '100%': { transform: 'rotate(0deg)' },
  },
}) as any;

interface WelcomeProps {
  username: string;
}

const Welcome: React.FC<WelcomeProps> = ({ username }) => {
  const classes = useStyles();

  return (
      <div className={classes.welcomeContainer}>
      <h1 className={classes.welcomeHeading}>Welcome, {username}!</h1>
      <p className={classes.welcomeText}>
        Get ready to explore a world of delicious meals and exciting culinary experiences.
      </p>
      <span role="img" aria-label="Wave hand" className={classes.waveHand}>
        👋
      </span>
      <div className={classes.foodImagesContainer}>

             {foodImages.map((image, index) => {
               const rotation = getRandomRotation();
               return (
                 <img
                 key={index}
                 src={image}
                 alt="Food"
                 className={classes.foodImage}
                 style={{
                   transform: `rotate(${rotation}deg)`,
                  }}
                  />
                  );
                })}

                </div>
    </div>
  );
};

export default Welcome;
