const bcrypt = require("bcrypt");

//########################## User Validation ##########################

// Check for user existance in the database
const userExist = async (email, model) => {
  try {
    const user = await model.findOne({ email: email });
    if (!user) return false;

    return user;
  } catch (error) {
    console.log(error);
  }
};
const OTPExist = async (email, model) => {
  try {
    const OTP = await model.findOne({ email: email });
    if (!OTP || OTP.expiresAt < Date.now()) throw new Error("OTP expired");

    return OTP.otp;
  } catch (error) {
    console.log(error);
  }
};

//Validate the user credentials
const validateUser = async (user, model) => {
  try {
    const { email, password } = user;

    //Get the user from the database
    const db_user = userExist(email, model);

    if (!db_user) return false;

    //Get the db password
    const dbPassword = db_user.password;

    //Compare passwords
    bcrypt
      .hash(password, 10)
      .then(async (hash) => {
        const match = await bcrypt.compare(hash, dbPassword);

        console.log(match);
        if (!match) return false;
      })
      .catch((err) => {
        console.log(err);
      });

    return true;
  } catch (error) {
    console.log(error);
  }
};

const validateUserOTP = async (email, otp, userModel, otpModel) => {
  try {
    //Get the user from the database
    const db_user = await userExist(email, userModel);

    if (!db_user) return false;

    //Get the OTP from the database
    const dbOTP = await OTPExist(email, otpModel);

    console.log(dbOTP);
    if (!dbOTP) return false;

    //Compare passwords
    bcrypt
      .hash(otp, 10)
      .then(async (hash) => {
        const match = bcrypt.compare(hash, dbOTP);

        if (!match) return false;
      })
      .catch((err) => {
        console.log(err);
      });

    return true;
  } catch (error) {
    console.log(error);
  }
};

//########################## Form Validation ##########################

const validateUserName = (username) => {
  const re = /^[a-zA-Z0-9]+$/;
  return re.test(username);
};

const validateEmail = (email) => {
  const re = /\S+@\S+\.\S+/;
  return re.test(email);
};

const validatePassword = (password) => {
  const reSpcialChar = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
  const reUpperCase = /[A-Z]/;
  const reLength = /.{8,}/;

  return (
    reLength.test(password) &&
    reSpcialChar.test(password) &&
    reUpperCase.test(password)
  );
};

//########################## Verification ##########################
const sendVerificationEmail = async (
  email,
  transporter,
  userOTPVerification
) => {
  //Create a random 5 digit number
  const otp = Math.floor(Math.random() * 9999) + 10000;
  console.log(otp);

  //Save the OTP in the database
  bcrypt.hash(otp.toString(), 10).then(async (hash) => {
    const user = new userOTPVerification({
      email: email,
      otp: hash,
      createdAt: Date.now(),
      expiresAt: Date.now() + 600000,
    });
    try {
      await user.save();
    } catch (err) {
      console.log(err);
    }
  });

  //Create email
  const mailOptions = {
    from: "CodeVerify@CookItCart.com",
    to: email.toString(),
    subject: "Email Verification",
    html: `<p> Please verify your email by entering the code: <b> ${otp}</b> ,Notice that the code will <b> expire in 24 hours </b> </p>`,
  };

  //Send email to the user
  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log(`Email sent: ${info.response}`);
    }
  });
};

module.exports = {
  validateUserName,
  validateEmail,
  validatePassword,
  validateUser,
  userExist,
  sendVerificationEmail,
  validateUserOTP,
};
