import { createBrowserRouter, Navigate } from "react-router";
import Login from "./features/auth/pages/Login";
import Register from "./features/auth/pages/Register";
import Home from "./features/interview/pages/Home.jsx";
import Protected from "./features/auth/components/Protected.jsx";
import Interview from "./features/interview/pages/interview.jsx";
import InterviewReports from "./features/interview/pages/InterviewReports.jsx";

export const router = createBrowserRouter([
  ,
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/",
    element: (
      <Protected>
        <Home />
      </Protected>
    ),
  },
  {
    path: "/interview/:interviewId",
    element: (
      <Protected>
        <Interview />
      </Protected>
    ),
  },
  {
    path: "/interview-reports",
    element:(
      <Protected>
        <InterviewReports/>
      </Protected>
    )
  }
]);
