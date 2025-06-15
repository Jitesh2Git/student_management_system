import { Outlet } from "react-router-dom";

const AdminDashboardLayout = () => {
  return (
    <main className="min-h-screen">
      <Outlet />
    </main>
  );
};

export default AdminDashboardLayout;
