
import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../../Layouts/MainLayout/MainLayout";

import DashboardLayout from "../../Layouts/Dashboard/DashboardLayout";
import Homes from "../../Pages/Home/Homes";
import ErrorPage from "../../Pages/404/ErrorPage";
import ExploreCourses from "../../Pages/ExploreCourses/ExploreCourses";
import Enroll from "../../Pages/Enroll/Enroll";






export const router = createBrowserRouter([
    {
        path: "/",
        element: <MainLayout></MainLayout>,
    //    errorElement: <ErrorPage/>,
        children: [
            {
                path: '/',
                element:<Homes/>
            },
            {
                path: '/enroll',
                element: <Enroll/>
            },
           
          
           
        ]
    },
    {
         
                path: '/explore-course',
                element: <ExploreCourses/>
            
    },
 
    {
        path: '/dashboard',
        element: 
            <DashboardLayout></DashboardLayout>,
        
        children:[
            {
                path: '/dashboard',
                element: <>dashboard</>
            },
           
        ]
    }
    
]);