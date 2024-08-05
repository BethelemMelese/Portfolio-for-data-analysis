const User = require("../models/user.model.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

// configuration file
dotenv.config();

const GetUser = async (req, res) => {
  try {
    const user = await User.find();
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const GetUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const GetUserByUserName = async (req, res) => {
  try {
    const userName = req.params;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "The User is not Found !" });
    }

    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const LoginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(404)
        .json({ message: "User is not Found, Please insert correctly !" });
    }

    const generateToken = jwt.sign(
      {
        id: user._id,
        time: Date(),
        name:
          req.body.firstName +
          " " +
          req.body.middleName +
          " " +
          req.body.lastName,
        email: req.body.email,
      },
      process.env.JWT_SECRET_KEY,
      {
        expiresIn: 3600000,
      }
    );

    const isPasswordMatch = bcrypt.compareSync(password, user.passwordHash);

    if (user && isPasswordMatch) {
      await User.findByIdAndUpdate(user._id, {
        token: generateToken,
      });

      const updatedUser = await User.findOne({ email });
      res.status(200).json({
        message: "Login is Successfully Done !",
        token: updatedUser.token,
        name: updatedUser.firstName,
      });
    } else if (!isPasswordMatch) {
      res.status(404).json({
        message:
          "The Password is Not Correct, Please insert the correct password !",
      });
    } else {
      res.status(404).json({
        error: "User is not Found, Please insert correctly !",
      });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const RegisterUser = async (req, res) => {
  try {
    const isExistUser = await User.findOne({
      $or: [{ email: req.body.email }, { phone: req.body.phone }],
    });

    if (isExistUser == null) {
      const saltRounds = 10;
      const password = bcrypt.hashSync(req.body.password, saltRounds);
      const user = await User.create({
        firstName: req.body.firstName,
        middleName: req.body.middleName,
        lastName: req.body.lastName,
        fullName:
          req.body.firstName +
          " " +
          req.body.middleName +
          " " +
          req.body.lastName,
        phone: req.body.phone,
        email: req.body.email,
        passwordHash: password,
        profession: req.body.profession,
      });

      res.status(200).json({
        id: user._id,
        firstName: user.firstName,
        middleName: user.middleName,
        lastName: user.lastName,
        fullName: user.fullName,
        phone: user.phone,
        email: user.email,
        passwordHash: user.passwordHash,
        profession: user.profession,
      });
    } else {
      res.status(500).json({ message: "The User already exist" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const UpdateUserInfo = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findByIdAndUpdate(id, req.body);

    if (!user) {
      return res.status(404).json({ message: "User not Found !" });
    }

    const updatedUser = await User.findById(id);
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const ChangePassword = async (req, res) => {
  try {
    const { name } = req.params;
    const { oldPassword, newPassword } = req.body;
    const user = await User.findOne({ firstName: name });
    if (user == null) {
      return res
        .status(404)
        .json({ message: "User is not Found, Please insert correctly !" });
    } else {
      const isPasswordMatch = bcrypt.compareSync(
        oldPassword,
        user.passwordHash
      );
      if (!isPasswordMatch) {
        return res.status(404).json({
          message:
            "The Old Password not Correct, please insert the old password correctly!",
        });
      }
      const saltRounds = 10;
      const password = bcrypt.hashSync(newPassword, saltRounds);
      await User.updateOne({ passwordHash: password });
      res.status(200).json({ message: "Password is Successfully Changed !" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const UpdateProfileImg = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);

    if (!user) {
      res.status(404).json({ message: "User is Not Found !" });
    }

    const updateUserProfile = await User.findByIdAndUpdate(id, {
      profileImage: req.file.filename,
    });

    res.status(200).json({
      id: updateUserProfile._id,
      firstName: updateUserProfile.firstName,
      middleName: updateUserProfile.middleName,
      lastName: updateUserProfile.lastName,
      fullName: updateUserProfile.fullName,
      phone: updateUserProfile.phone,
      email: updateUserProfile.email,
      profileImage: updateUserProfile.profileImage,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const GenerateToken = async (req, res) => {
  try {
    let jwtSecretKey = process.env.JWT_SECRET_KEY;
    let data = {
      time: Date(),
      userId: 12,
    };

    const token = await jwt.sign(data, jwtSecretKey);
    res.send(token);
  } catch (error) {
    res.status(500).json({ message: error, message });
  }
};

const VerificationToken = async (req, res, next) => {
  try {
    const bearerHeader = req.headers["authorization"];
    if (typeof bearerHeader !== "undefined") {
      const bearer = bearerHeader.split(" ");
      const bearerToken = bearer[1];
      req.token = bearerToken;
      next();
    } else {
      res.sendStatus(403);
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const DownloadPhoto = async (req, res) => {
  try {
    const { filePath } = req.params;
    const path = process.env.FILE_PATH;
    const response = path + filePath;
    res.sendFile(response);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = {
  GetUser,
  GetUserById,
  GetUserByUserName,
  LoginUser,
  GenerateToken,
  VerificationToken,
  RegisterUser,
  UpdateUserInfo,
  ChangePassword,
  UpdateProfileImg,
  DownloadPhoto,
};
