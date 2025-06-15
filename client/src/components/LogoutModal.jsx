import { useDispatch, useSelector } from "react-redux";
import { showToast } from "@/components/ui/Toaster";
import { signOut as signOutThunk } from "../store/slices/authSlice";
import { Button } from "@/components/ui/Button";
import { useNavigate } from "react-router-dom";
import { IconLoader2 } from "@tabler/icons-react";

const LogoutModal = ({ onClose }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const loading = useSelector((state) => state.auth.loading);

  const handleLogout = async () => {
    const resultAction = await dispatch(signOutThunk());

    if (signOutThunk.fulfilled.match(resultAction)) {
      showToast({
        type: "success",
        message: "Logged out successfully!",
      });
      onClose();
      navigate("/sign-in");
    } else {
      showToast({
        type: "error",
        message: resultAction.payload || "Failed to log out",
      });
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="fixed inset-0 bg-black/50 animate-in fade-in-0 duration-200" />

      <div
        className="bg-background fixed z-50 grid w-full max-w-[calc(100%-2rem)] sm:max-w-lg translate-y-[-50%] translate-x-[-50%] top-[50%] left-[50%] border p-6 shadow-lg rounded-lg animate-in fade-in-0 zoom-in-95 max-h-[80vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex flex-col gap-2 text-left mb-4">
          <h2 className="text-lg font-semibold leading-none">Log Out</h2>
          <p className="text-sm text-muted-foreground">
            Are you sure you want to log out? You’ll need to sign in again to
            access your account.
          </p>
        </div>

        <div className="flex flex-row justify-end gap-2 mt-6">
          <Button variant="outline" disabled={loading} onClick={onClose}>
            Cancel
          </Button>

          <Button
            variant="custom"
            disabled={loading}
            className="w-fit rounded-md bg-custom-secondary-dark text-custom-secondary-content"
            onClick={handleLogout}
          >
            {loading && <IconLoader2 className="h-4 w-4 animate-spin" />}
            <span className="relative overflow-hidden">
              <span className="inline-block transition-transform duration-300 group-hover:-translate-y-full">
                Logout
              </span>
              <span
                className="absolute left-0 top-0 block translate-y-full 
                transition-transform duration-300 group-hover:translate-y-0"
              >
                Logout
              </span>
            </span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default LogoutModal;
