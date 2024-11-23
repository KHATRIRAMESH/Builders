import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import { errorHandler } from "../utils/error.js";
import jwt from "jsonwebtoken";




//Signup Controller
export const signup = async (req, res, next) => {
  const { username, email, password } = req.body;
  if (
    !username ||
    !password ||
    !email ||
    password === "" ||
    username === "" ||
    email == ""
  ) {
    next(errorHandler(400, "All fields are required!"));
  }

  const hasedPassword = bcrypt.hashSync(password, 10);

  const newUser = new User({
    username,
    email,
    password: hasedPassword,
  });
  try {
    await newUser.save();
    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    next(error);
  }
};



//Sign in Controller
export const signin = async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password || email === "" || password == null) {
   return next(errorHandler(400, "All fields are required!"));
  }
  try {
    const validUser = await User.findOne({ email });
    if (!validUser) {
     return next(errorHandler(404, "User not found!"));
    }

    const validPassword = bcrypt.compareSync(password, validUser.password);
    if (!validPassword) {
     return next(errorHandler(400, "Invalid credentials!"));
    } 

    
    const token = jwt.sign(
      {
        id: validUser._id
      },
      process.env.JWT_SECRET_KEY,
    );

    const {password:pass,...rest }=validUser._doc;
    
    res.status(200).cookie("access-token", token, {
      httpOnly: true,

    }).json(rest)
    console.log(rest)


  } catch (error) {
    next(error);
  }
};
