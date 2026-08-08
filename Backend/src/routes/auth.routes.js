import { Router } from "express";
import { register, login, logout, getMe } from "../controllers/auth.controller.js";
import verifyJWT from "../middlewares/verifyJWT.js";
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


/**
 * @Route GET api/auth/logout
 * @Description logout a user
 * @Access Public
 */
authRoutes.route("/logout").get(logout);

/**
 * @Route  GET api/auth/get-me
 * @Description Get the current user's information
 * @Access Private
 */
authRoutes.route("/get-me").get(verifyJWT,getMe);


export default authRoutes;
