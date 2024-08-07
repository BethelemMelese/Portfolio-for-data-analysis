const {
  GetUser,
  GetUserById,
  GetUserByUserName,
  GetUserByToken,
  LoginUser,
  RegisterUser,
  UpdateUserInfo,
  ChangePassword,
  UpdateProfileImg,
  DownloadPhoto,
} = require("../controllers/user.controller.js");
const express = require("express");
const router = express.Router();

const multer = require("multer");

// Set up Multer storage configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, __dirname + "/files");
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

router.get("/", GetUser);
router.get("/:id", GetUserById);
router.get("/", GetUserByUserName);
router.get("/userInfo/:token", GetUserByToken);
router.post("/login", LoginUser);
router.post("/register/", RegisterUser);
router.put("/profile/:id", UpdateUserInfo);
router.put("/changePassword/:name", ChangePassword);
router.put("/photo/:id", upload.single("file"), UpdateProfileImg);
router.get("/uploads/:filePath", DownloadPhoto);

module.exports = router;
