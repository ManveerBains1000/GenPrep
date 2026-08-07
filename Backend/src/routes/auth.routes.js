import { Router } from "express";
import { register, login } from "../controllers/auth.controller.js";
const authRoutes = Router();

/**
 * @Route POST api/auth/register
 * @Description Register a new user
 * @Access Public
 */

authRoutes.route("/register").post(register);

/**
 * @Route POST api/auth/login
 * @Description Login a user
 * @Access Public
 */
authRoutes.route("/login").post(login);

export default authRoutes;
