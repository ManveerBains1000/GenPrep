import { createBrowserRouter, Navigate } from "react-router";
import Login from "./features/auth/pages/Login";
import Register from "./features/auth/pages/Register";
import Home from "./features/interview/pages/Home.jsx";
import Protected from "./features/auth/components/Protected.jsx";
import Interview from "./features/interview/pages/interview.jsx";
import InterviewReports from "./features/interview/pages/InterviewReports.jsx";
import Cover from "./Cover.jsx";
import Logout from "./features/auth/pages/Logout.jsx";
import GenerateResume from "./features/interview/pages/GenerateResume.jsx";

export const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/logout",
    element: <Logout/>
  },
  {
    path: "/",
    element: (
      <Protected>
        <Cover />
      </Protected>
    ),
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/interview/:interviewId",
        element: <Interview />,
      },
      {
        path: "/interview-reports",
        element: <InterviewReports />,
      },
      {
        path: "/generate-resume",
        element: <GenerateResume/>
      }
    ],
  },
]);
