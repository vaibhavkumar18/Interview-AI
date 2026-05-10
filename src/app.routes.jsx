import { createBrowserRouter } from "react-router";
import Login from "./features/Auth/pages/Login";
import Register from "./features/Auth/pages/Register";
import Protected from "./features/Auth/components/protected";
import Home from "./pages/Home";
import Interview from "./features/Interview/pages/Interview";
import CreateInterviewPlan from "./features/Interview/pages/CreateInterviewPlan";
import Layout from "./components/Layout";
import AllReports from "./features/Interview/pages/AllReports";
export const router = createBrowserRouter([
  // Public Routes
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
    ],
  },
  // Protected Routes
  {
    element: (
      <Protected>
        <Layout />
      </Protected>
    ),
    children: [
      {
        path: "/interview/create",
        element: (
          <Protected>
            <CreateInterviewPlan />
          </Protected>
        ),
      },
      {
        path: "/interview/reports",
        element: (
          <Protected>
            <AllReports />
          </Protected>
        ),
      },
      {
        path: "/interview/report/:interviewId",
        element: (
          <Protected>
            <Interview />
          </Protected>
        ),
      },
    ],
  },
]);
