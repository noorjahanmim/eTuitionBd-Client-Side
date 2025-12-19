import { createBrowserRouter } from "react-router-dom";

import RootLayout from "../layout/RootLayout";
import Home from "../pages/Home/Home";
import About from "../pages/About/About";
import Contact from "../pages/Contact/Contact";
import Login from "../pages/Auth/Login";
import Register from "../pages/Auth/Register";
import AllTuitions from "../pages/AllTutions/AllTuitions";
import TuitionDetails from "../pages/TuitionDetails/TuitionDetails";
import AllTutors from "../pages/AllTutors/AllTutors";
// import TutorProfile from "../pages/AllTutors/TutorProfile";
import TutorDashboard from "../pages/AllTutors/TutorDashboard";
import DashboardLayout from "../layout/DashboardLayout";
import MyTuitions from "../pages/Dashboard/Student/MyTuitions";
import AppliedTutors from "../pages/Dashboard/Student/AppliedTutors";
import Payments from "../pages/Dashboard/Student/Payments";
import PostTuition from "../pages/Dashboard/Student/PostTuition";
import ProfileSettings from "../pages/Dashboard/Student/ProfileSettings";


import MyApplications from "../pages/Dashboard/Tutor/MyApplications";
import OngoingTuitions from "../pages/Dashboard/Tutor/OngoingTuitions";
import Revenue from "../pages/Dashboard/Tutor/Revenue";
import TutorProfile from "../pages/Dashboard/Tutor/TutorProfile";


import Users from "../pages/Dashboard/Admin/Users";
import Tuitions from "../pages/Dashboard/Admin/Tuitions";
import Reports from "../pages/Dashboard/Admin/Reports";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "about",
        element: <About />,
      },
      {
        path: "contact",
        element: <Contact />,
      },
      {
        path: "all-tuitions",
        element: <AllTuitions />,
      },
      {
        path: "tuitions/:id",
        element: <TuitionDetails />,
      },
      {
        path: "all-tutors",
        element: <AllTutors />,
      },
      {
          path: "tutors/:id",
  element: <TutorProfile />,
      },
      
      {
        path: "dashboard",
        element: <DashboardLayout />,
        children: [
          // Student
          { path: "student/my-tuitions", element: <MyTuitions /> },
          { path: "student/post-tuition", element: <PostTuition /> },
          { path: "student/applied-tutors", element: <AppliedTutors /> },
          { path: "student/payments", element: <Payments /> },
          { path: "student/profile", element: <ProfileSettings /> },

          // Tutor
          { path: "tutor/my-applications", element: <MyApplications /> },
          { path: "tutor/ongoing-tuitions", element: <OngoingTuitions /> },
          { path: "tutor/revenue", element: <Revenue /> },
    


    // Admin
    { path: "admin/users", element: <Users /> },
          { path: "admin/tuitions", element: <Tuitions /> },
          { path: "admin/reports", element: <Reports /> },
        ],
      },

      {
        path: "dashboard/tutor",
        element: <TutorDashboard />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
        element: <Register />,
      },
    ],
  },
]);
