import foodTinder from "../../Assets/foodTinder.png";
import styled, { keyframes } from "styled-components";
import cart from "../../Assets/cart.png";

const AboutText = styled.div`
  margin: 0 auto;
  font-feature-settings: "kern", "ss01", "ss05", "ss07";
  font-family: WoltHeading-Omnes, -apple-system, BlinkMacSystemFont, Roboto,
    "Segoe UI", Arimo, "Open Sans", sans-serif;
  text-align: center;
  font-size: 15px;
  h2 {
    padding-right: 800px;
    font-size: 40px;
    font-weight: 777;
    color: #333;
    margin-bottom: 20px;
  }
`;

const ImagesRow = styled.div`
  display: flex;
  justify-content: space-between; /* Distribute images evenly */
  align-items: center; /* Vertically align images */
`;

const Image = styled.div`
  flex: 1; /* Each image takes an equal width */
  max-width: 33%; /* Maximum width for each image (one-third of the container) */
  img {
    max-width: 400px;
    height: 350px;
  }
`;

const ArrowAnimation = keyframes`
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(100px); /* Adjust the distance the arrow travels */
  }
`;

const ArrowSvg = styled.svg`
  width: 100%;
  height: auto;
  animation: ${ArrowAnimation} 2s linear infinite;
`;
const containerStyle = {
  flexDirection: "column",
  justifyContent: "center",
  minHeight: "100vh", // Adjust the height as needed
  minWidth: "100vw",
};
function FoodScheduleBlock() {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
        padding: "30px",
      }}
    >
      <AboutText>
        <h2>Did you know? </h2>
      </AboutText>
      <AboutText>
        <h1>
          With <b>cookItCart</b> making a cart is easier than ever, just choose
          the food you love{" "}
        </h1>
      </AboutText>
      <ImagesRow>
        <Image>
          <img src={foodTinder} alt="1" />
        </Image>
        <Image>
          <ArrowSvg
            xmlns="http://www.w3.org/2000/svg"
            width="200" /* Make the arrow wider */
            height="50" /* Make the arrow longer */
            viewBox="0 0 200 50" /* Adjust the viewBox accordingly */
          >
            <path fill="#000" d="M10 25 L50 25 L50 15 L90 25 L50 35 L50 25 Z" />
          </ArrowSvg>
        </Image>
        <Image>
          <img src={cart} alt="3" />
        </Image>
      </ImagesRow>
    </div>
  );
}

export default FoodScheduleBlock;
