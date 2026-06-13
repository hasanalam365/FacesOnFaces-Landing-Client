import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../../Hooks/useAuth";
import PageLoader from "./PageLoading"; 

const PrivateRoute = ({ children }) => {
    const { user, loading } = useAuth();
    const location = useLocation();

    
    if (loading) {
        return <PageLoader />;
    }

   
    if (user) {
        return children;
    }

   
    return (
        <Navigate 
            to="/login" 
            state={location?.pathname || "/"} 
            replace
        />
    );
};

export default PrivateRoute;
