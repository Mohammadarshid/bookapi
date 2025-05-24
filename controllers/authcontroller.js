const UserModel = require("../models/UserModel");
const bcrypt = require("bcryptjs");
const JWT =require ("jsonwebtoken")
const registerController = async (req, res) => {
  try {
    const { userName, email, password, address, phone } = req.body;
    // validation
    if (!userName || !email || !password || !address || !phone) {
      return res.status(400).send({
        success: false,
        message: " username is required",
      });
    }

    //  check user
    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return res.status(200).send({
        success: false,
        message: "EMail  already registered please  login",
      });
    }
    // hashing [password]

    var salt = bcrypt.genSaltSync(10);
    const hashingpassword = await bcrypt.hash(password, salt);

    //  create User
    const user = new UserModel({
      userName,
      email,
      password: hashingpassword,
      address,
      phone,
    });
    await user.save();
    console.log(user);

    res.status(201).send({
      success: true,
      message: " User  registered Successfully ",
      user,
    });
  } catch (error) {
    console.log("error in register Api ", error);
    res.status(500).send({
      success: false,
      message: "Error in register Api",
      error,
    });
  }
};

// login function

const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    //   validation
    if (!email || !password) {
      return res.status(500).send({
        success: false,
        message: "Please provide email and password",
      });
    }
    //  check user
    const user = await UserModel.findOne({ email });
    console.log(user);

    if (!user) {
      return res.status(404).send({
        sucess: false,
        message: "user not found ",
      });
    }

    //  check password    | compare password
    const ismatch = await bcrypt.compare(password, user.password);

    if (!ismatch) {
      return res.status(500).send({
        success: false,
        message: "Invalid credintials",
      });
    }
    //   token
    const token = JWT.sign({ id: user.id_ },process.env.JWT_seCRET,{expiresIn:"7days"})

    user.password = undefined;      // remove password from  user
    res.status(200).send({
      success: true,
      message: " login successfully",
      token,
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      sucess: false,
      message: "Error in login api",
      error,
    });
  }
};

module.exports = {
  registerController,
  loginController,
};
