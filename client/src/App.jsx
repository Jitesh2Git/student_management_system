import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Suspense, lazy } from "react";
import MainLayout from "@/components/Layouts/MainLayout";
import UserDashboardLayout from "@/components/Layouts/UserDashboardLayout";
import AdminDashboardLayout from "@/components/Layouts/AdminDashboardLayout";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Loading from "@/components/Loading";

const Home = lazy(() => import("@/pages/Home"));
const UserDashboard = lazy(() => import("@/pages/UserDashboard"));
const AdminDashboard = lazy(() => import("@/pages/AdminDashboard"));
const NotFound = lazy(() => import("@/pages/NotFound"));
const SignIn = lazy(() => import("@/components/Auth/SignIn"));
const AdminSignUp = lazy(() => import("@/components/Auth/AdminSignUp"));

const App = () => {
  return (
    <Router>
      <Suspense fallback={<Loading />}>
        <Routes>
          <Route element={<MainLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/sign-in" element={<SignIn />} />
            <Route path="/sign-up" element={<AdminSignUp />} />
          </Route>

          <Route element={<UserDashboardLayout />}>
            <Route path="/user/dashboard" element={<UserDashboard />} />
          </Route>

          <Route element={<AdminDashboardLayout />}>
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
          </Route>

          <Route
            path="*"
            element={
              <>
                <Header />
                <NotFound />
                <Footer />
              </>
            }
          />
        </Routes>
      </Suspense>
    </Router>
  );
};

export default App;
