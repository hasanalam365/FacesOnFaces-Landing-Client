import { createBrowserRouter } from "react-router-dom";

import MainLayout from "../../Layouts/MainLayout/MainLayout";
import Homes from "../../Pages/Home/Homes";
import ErrorPage from "../../Pages/404/ErrorPage";
import ExploreCourses from "../../Pages/ExploreCourses/ExploreCourses";
import Enroll from "../../Pages/Enroll/Enroll";
import TermsAndCondition from "../../Pages/Terms&Condition/TermsAndCondition";
import PrivacyPolicy from "../../Pages/PrivacyPolicy/PrivacyPolicy";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Homes />,
      },
      {
        path: "/enroll",
        element: <Enroll />,
      },
      {
        path: "/explore-course",
        element: <ExploreCourses />,
      },
      {
        path: '/terms-and-conditions',
        element: <TermsAndCondition/>
      },
      {
        path: '/privacy-policy',
        element: <PrivacyPolicy/>
      }
    ],
  },
]);