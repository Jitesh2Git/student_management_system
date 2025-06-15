import { Outlet } from "react-router-dom";

const UserDashboardLayout = () => {
  return (
    <main className="min-h-screen">
      <Outlet />
    </main>
  );
};

export default UserDashboardLayout;
