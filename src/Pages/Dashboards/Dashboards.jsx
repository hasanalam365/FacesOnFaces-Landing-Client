import React from "react";
import useAdmin from "../../Hooks/useAdmin";
import PageLoader from "../../Routes/PrivateRoute/PageLoading";
import AdminDashboard from "./AdminDash/AdminDash";
import UserDashboard from "./UserDash/UserDashboard";


const Dashboard = () => {
  const [isAdmin, isAdminLoading] = useAdmin();

  if (isAdminLoading) {
    return <PageLoader />;
  }

  return (
    <>
      {isAdmin ? (
        <AdminDashboard />
      ) : (
        <UserDashboard />
      )}
    </>
  );
};

export default Dashboard;
