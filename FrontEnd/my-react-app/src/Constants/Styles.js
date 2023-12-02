import backgroundImg from "../Assets/background.jpg";
import { boxSizing, styled } from "@mui/system";

// ################ Styled Components ################
const StyledForm = styled("form")({
  display: "flex",
  flexDirection: "column",
  gap: "12px",
  width: "300px",
});

const textFieldStyle = {
  background: "rgba(255, 255, 255, 0.8)", // Semi-transparent white background
  border: "1px solid #ccc", // Add a border for separation
  borderRadius: "4px", // Add rounded corners
  color: "#333", // Dark text color
};

const verificationCodeStyle = {
  background: "rgba(255, 255, 255, 0.8)", // Semi-transparent white background
  border: "1px solid #ccc", // Add a border for separation
  borderRadius: "4px", // Add rounded corners
  color: "#333", // Dark text color
  width: "3em",
  // textAlign: "center",
  padding: "oem",
};

const containerStyle = {
  backgroundImage: `url(${backgroundImg})`, // Set the background image URL
  backgroundSize: "cover", // Adjust as needed
  backgroundRepeat: "no-repeat", // Adjust as needed
  backgroundPosition: "center", // Adjust as needed
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  position: "relative",
  minHeight: "100vh", // Adjust the height as needed
  minWidth: "100vw",
};

export { StyledForm, textFieldStyle, containerStyle, verificationCodeStyle };
