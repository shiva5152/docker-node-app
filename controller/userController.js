import User from "../model/User.js";
import bcrypt from "bcryptjs";

export const signUp = async (req, res, next) => {
  try {
    const user = await User.create(req.body);

    res.status(201).json({
      success: true,
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      status: "fail",
    });
  }
};

export const login = async (req, res, next) => {
  try {
    const { username, password } = req.body;

    // 1) Check if username and password exist
    if (!username || !password) {
      return res.status(400).json({
        status: "fail",
        message: "Please provide username and password",
      });
    }

    // 2) Check if user exists && password is correct
    const user = await User.findOne({ username }).select("+password");
    const isCorrect = await bcrypt.compare(password, user.password);
    if (!user || !isCorrect) {
      return res.status(401).json({
        status: "fail",
        message: "Incorrect username or password",
      });
    }

    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      status: "fail",
    });
  }
};
