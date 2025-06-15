import Header from "@/components/Header";
import { Outlet } from "react-router-dom";
import Footer from "@/components/Footer";
import { useDispatch, useSelector } from "react-redux";
import { checkAuth } from "../../store/slices/authSlice";
import { useEffect, useState } from "react";
import Loading from "@/components/Loading";

const MainLayout = () => {
  const dispatch = useDispatch();
  const [role, setRole] = useState(null);
  const { checkingAuth } = useSelector((state) => state.auth);

  useEffect(() => {
    const fetchData = async () => {
      const result = await dispatch(checkAuth());
      if (result?.payload?.role) {
        setRole(result.payload.role);
      }
    };
    fetchData();
  }, [dispatch]);

  if (checkingAuth) return <Loading />;

  return (
    <>
      <Header role={role} />
      <main className="min-h-screen">
        <Outlet />
      </main>
      <Footer role={role} />
    </>
  );
};

export default MainLayout;
