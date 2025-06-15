import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { checkAuth } from "../store/slices/authSlice";
import { getAdmin, getAllUsers } from "../store/slices/adminSlice";
import { showToast } from "@/components/ui/Toaster";
import Loading from "@/components/Loading";
import AdminAvatar from "../components/AdminDashboard/AdminAvatar";
import UsersTable from "../components/AdminDashboard/UsersTable";
import CreateUserModal from "../components/AdminDashboard/CreateUserModal";

const AdminDashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const hasShownToast = useRef(false);
  const [refresh, setRefresh] = useState(false);
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const { checkingAuth, authError } = useSelector((state) => state.auth);
  const { data, loading, usersLoading, users } = useSelector(
    (state) => state.admin
  );

  useEffect(() => {
    const fetchData = async () => {
      const result = await dispatch(checkAuth());
      if (checkAuth.fulfilled.match(result)) {
        const userId = result.payload.userId;
        dispatch(getAdmin(userId));
      } else if (authError && !hasShownToast.current) {
        showToast({
          type: "error",
          message: "Please log in to access the dashboard!",
        });
        hasShownToast.current = true;
        navigate("/sign-in");
      }
    };
    fetchData();
  }, [dispatch, navigate, authError]);

  useEffect(() => {
    dispatch(getAllUsers()).finally(() => {
      setIsInitialLoad(false);
    });
  }, [dispatch, refresh]);

  if (checkingAuth || loading) return <Loading />;

  return (
    <section className="w-full space-y-8 min-h-screen">
      <div className="sticky top-0 z-50 bg-custom-foreground flex justify-between items-center gap-4 py-4 border-b px-4 md:px-8">
        <Link to="/" className="flex items-center gap-2 font-medium text-xl">
          <img src="/logo.png" alt="Logo Image" className="w-auto h-8" />
          EduPanel
        </Link>
        <AdminAvatar user={data} />
      </div>

      <div className="space-y-4 px-4 md:px-8">
        <div className="flex items-center justify-between">
          <h2 className="text-xl md:text-3xl font-semibold text-custom-copy">
            Registered Users
          </h2>

          {users?.length > 0 && (
            <CreateUserModal refresh={() => setRefresh(!refresh)} />
          )}
        </div>

        <UsersTable
          refresh={() => setRefresh(!refresh)}
          usersLoading={usersLoading || isInitialLoad}
          users={users}
        />
      </div>
    </section>
  );
};

export default AdminDashboard;
