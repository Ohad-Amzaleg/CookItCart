import React, { useState, useRef, useEffect } from "react";
import { TextField, Button, Grid, Box } from "@mui/material";
import { verificationCodeStyle } from "../../Constants/Styles";
import axios from "axios";
import { toast } from "react-toastify";

const buttonStyle = {
  padding: "10px 20px", // Adjust the padding as needed
  margin: "0 10px", // Add margin between buttons
  borderRadius: "5px", // Add rounded corners
  fontWeight: "bold", // Make text bold
};
interface VerificationCompProps {
  setUser: React.Dispatch<React.SetStateAction<any>>;
  userData: any;
}

function VerificationComp({ setUser, userData }: VerificationCompProps) {
  const [verificationCode, setVerificationCode] = useState([
    "",
    "",
    "",
    "",
    "",
  ]);
  const inputRefs = useRef([]) as any;

  useEffect(() => {
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus(); // Focus on the first input field initially
    }
    toast.warning("Please verify your email");
  }, []);

  const handleInputChange = (event: any, index: number) => {
    //Restrict input to numbers only
    const re = /^[0-9\b]+$/;
    const value = re.test(event.target.value) ? event.target.value : "";

    // Update state with new code entered by the user
    const newVerificationCode = [...verificationCode];
    newVerificationCode[index] = value;
    setVerificationCode(newVerificationCode);

    // Automatically focus on the next input field
    if (index < verificationCode.length - 1 && value) {
      console.log(inputRefs.current[index + 1], index);
      inputRefs.current[index + 1].focus();
    }
  };

  const validateCode = async (code: string) => {
    console.log(code);
    try {
      await axios
        .post(
          "http://localhost:3080/api/auth/validate",
          { code },
          { withCredentials: true }
        )
        .then((res) => {
          if (res.data.verified) {
            //Update verification status
            setUser((prevState: any) => ({ ...prevState, verified: true }));
            toast.success(`${userData.username} Logged in successfully`);
          }
        })
        .catch((err) => {
          toast.error("Invalid OTP");
        });
    } catch (err) {}
  };
  const handleValidation = (event: any) => {
    event.preventDefault();
    const code = verificationCode.join("").toString();
    validateCode(code);
  };

  const handleResend = async (event: any) => {
    event.preventDefault();
    await axios
      .post("http://localhost:3080/api/auth/resend", {
        withCredentials: true,
      })
      .then((res) => {
        toast.success("Verification Email Sent");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <h2>Verification Code</h2>

      <form onSubmit={handleValidation}>
        <Grid container justifyContent="center" alignItems="center">
          {verificationCode.map((digit, index) => (
            <Grid item key={index}>
              <TextField
                type="text"
                name={`code-${index}`}
                variant="outlined"
                value={digit}
                onChange={(event) => handleInputChange(event, index)}
                style={verificationCodeStyle}
                inputProps={{
                  maxLength: 1,
                  style: {
                    textAlign: "center",
                    fontSize: "2em",
                    padding: "0em",
                  },
                }}
                ref={(inputRef) => (inputRefs.current[index] = inputRef)}
              />
            </Grid>
          ))}
        </Grid>

        <Box mt={4} textAlign="center">
          <Button
            type="submit"
            variant="contained"
            color="primary"
            style={buttonStyle}
          >
            Verify Account
          </Button>
          <Button
            variant="contained"
            color="primary"
            style={buttonStyle}
            onClick={handleResend}
          >
            Resend Verification Email
          </Button>
        </Box>
      </form>
    </div>
  );
}

export default VerificationComp;
