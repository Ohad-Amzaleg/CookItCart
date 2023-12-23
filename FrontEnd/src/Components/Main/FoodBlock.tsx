import React, { useState, useEffect } from "react";
import styled, { keyframes } from "styled-components";
import foodBlock from "../../Assets/foodBlock.jpg";

const FoodBlockContainer = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f2f2f2;
  background-image: url(${foodBlock});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  min-height: 100vh;
  min-width: 100vw;
  flex-direction: column;

`;

const textAnimation = keyframes`
  0% {
    opacity: 0;
    transform: translateY(-10px);
  }
  50% {
    opacity: 1;
    transform: translateY(0);
  }
  100% {
    opacity: 0;
    transform: translateY(10px);
  }
`;

const FoodText = styled.div`
  text-align: left;
  padding-left: 400px;
  h1 {
    color: black;
    font-feature-settings: "kern", "ss01", "ss05", "ss07";
    font-family: WoltHeading-Omnes, -apple-system, BlinkMacSystemFont, Roboto,
      "Segoe UI", Arimo, "Open Sans", sans-serif;
    font-size: 60px;
    font-weight: bold;
    animation: ${textAnimation} 10s ease-in-out infinite;
  }
`;

const phrases = [
  "Do More With Less",
  "Explore New Culinary Experiences",
  "Satisfy Your Cravings",
  "Be Your Own Chef",
];

function FoodBlock() {
  const [phrase, setPhrase] = useState(phrases[0]);
  const [currentIndex, setCurrentIndex] = useState(1);

  useEffect(() => {
    setTimeout(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % phrases.length);
      setPhrase(phrases[currentIndex]);
    }, 11000);
  }, [phrase, currentIndex]);

  return (
    <FoodBlockContainer>
      <FoodText>
        <h1>{phrase}</h1>
      </FoodText>
    </FoodBlockContainer>
  );
}

export default FoodBlock;
