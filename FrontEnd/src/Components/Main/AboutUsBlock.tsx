import React from "react";
import styled from "styled-components";
import aboutus from "../../Assets/aboutus.jpg";

const AboutUsContainer = styled.section`
  background-color: #ffffff;
  padding: 60px 0;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  min-width: 100vw;
`;

const AboutText = styled.div`
  padding-bottom: 200px;
  max-width: 800px;
  margin: 0 auto;
  font-feature-settings: "kern", "ss01", "ss05", "ss07";
  font-family: WoltHeading-Omnes, -apple-system, BlinkMacSystemFont, Roboto,
    "Segoe UI", Arimo, "Open Sans", sans-serif;
  text-align: center;
  h2 {
    font-size: 40px;
    font-weight: 777;
    color: #333;
    margin-bottom: 20px;
  }
  p {
    font-size: 20px;
    color: #333;
    margin-bottom: 20px;
  }
`;

const AboutImage = styled.div`
  margin-top: 40px;
  padding-right: 150px;
  img {
    max-width: 100%;
    width: 500px;
    height: 700px;
    border: 1px solid #ccc;
    border-width: 1px 1px 1px 1px;
    border-radius: 8px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  }
`;

function AboutUsBlock() {
  return (
    <AboutUsContainer>
      <AboutText>
        <h1>What is CookItCart?</h1>
        <p>
          We're here to make cooking and food discovery more convenient and
          enjoyable for
        </p>
        <h2>everyone.</h2>
      </AboutText>
      <AboutImage>
        <img src={aboutus} alt="CookItCart" />
      </AboutImage>
    </AboutUsContainer>
  );
}

export default AboutUsBlock;
