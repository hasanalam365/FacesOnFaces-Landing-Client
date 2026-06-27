import { createBrowserRouter } from "react-router-dom";

import MainLayout from "../../Layouts/MainLayout/MainLayout";
import Homes from "../../Pages/Home/Homes";
import ErrorPage from "../../Pages/404/ErrorPage";
import ExploreCourses from "../../Pages/ExploreCourses/ExploreCourses";
import Enroll from "../../Pages/Enroll/Enroll";
import TermsAndCondition from "../../Pages/Terms&Condition/TermsAndCondition";
import PrivacyPolicy from "../../Pages/PrivacyPolicy/PrivacyPolicy";
import CookiePolicy from "../../Pages/CookiePolicy/CookiePolicy";
import RefundPolicy from "../../Pages/RefundPolicy/RefundPolicy";
import DepositEnroll from "../../Pages/Enroll/DepositEnroll";
import SubscriptionEnroll from "../../Pages/Enroll/SubscriptionEnroll";

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
        path: '/deposit-enroll',
        element: <DepositEnroll/>
      },
      {
       path:"/subscription-enroll" ,
       element:<SubscriptionEnroll />
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
      },
      {
        path: '/refund-policy',
        element: <RefundPolicy/>
      },
      {
        path: '/cookie-policy',
        element: <CookiePolicy/>
      }
    ],
  },
]);