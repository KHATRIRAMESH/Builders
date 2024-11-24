import User from "../models/user.model.js";
import { errorHandler } from "../utils/error.js";

export const test = (req, res) => {
  res.json({ message: "hello from test" });
};

export const user = (req, res) => {
  res.json({ user: "test", pass: "password" });
};

export const update = (req, res, next) => {
  if (req.user.id !== req.params.userId) {
    return next(errorHandler(401, "Unauthorized"));
  }
  if (req.body.password) {
    if (req.body.password.length < 6) {
      return next(errorHandler(403, "Password too short"));
    }
  }
};

export const signOut = (req, res, next) => {
  try {
    res
      .clearCookie("access_token")
      .status(200)
      .json({ message: "User has been signed out" });
  } catch (error) {
    next(error);
  }
};
