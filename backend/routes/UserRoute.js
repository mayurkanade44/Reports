import express from "express";
const router = express.Router();

import {
  allUsers,
  deleteUser,
  loginUser,
  registerUser,
} from "../controllers/UserController.js";

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/allUser").get(allUsers);
router.route("/delete/:id").delete(deleteUser);

export default router
