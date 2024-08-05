const {
  GetUser,
  GetUserById,
  GetUserByUserName,
  LoginUser,
  VerificationToken,
  RegisterUser,
  UpdateUserInfo,
  ChangePassword,
  UpdateProfileImg,
  DownloadPhoto,
} = require("../controllers/user.controller.js");
const express = require("express");
const router = express.Router();

router.get("/", GetUser);
router.get("/:id", GetUserById);
router.get("/", GetUserByUserName);
router.post("/login", LoginUser);
router.post("/register/", RegisterUser);
router.put("/:id", UpdateUserInfo);
router.put("/changePassword/:name", ChangePassword);
router.put(
  "/profile/:id",
  VerificationToken,
  UpdateProfileImg
);
router.get("/uploads/:filePath", DownloadPhoto);

module.exports = router;
