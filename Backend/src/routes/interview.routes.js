import {Router} from 'express'
import verifyJWT from '../middlewares/verifyJWT.js';
import { generateInterviewReportController,getInterviewReportByIdController,getAllInterviewReportsController } from '../controllers/interview.controller.js';
import upload from '../middlewares/file.middleware.js';
const interviewRoutes = Router()


/**
 * @Route Post /api/interview/
 * @Description generate new interview report on the basis of user self description, resume pdf, and job description
 * @Access private
 */

interviewRoutes.route("/").post(verifyJWT,upload.single("resume"),generateInterviewReportController);


/**
 * @Route get /api/interview/report/:interviewId
 * @Description get interview report by interviewId,
 * @Access private
 */
interviewRoutes.route("/report/:interviewId").get(verifyJWT,getInterviewReportByIdController);

/**
 * @Route get /api/interview/
 * @Description get all interview reports of the logged in user
 * @Access private
 */

interviewRoutes.route("/").get(verifyJWT,getAllInterviewReportsController);

export default interviewRoutes;