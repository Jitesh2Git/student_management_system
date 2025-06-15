import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { checkAuth } from "../store/slices/authSlice";
import { getUser, updateUser } from "../store/slices/userSlice";
import { showToast } from "@/components/ui/Toaster";
import Loading from "@/components/Loading";
import { validateUserEditForm } from "../lib/validations";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { IconLoader2, IconLock } from "@tabler/icons-react";
import FieldLabel from "@/components/UserDashboard/FieldLabel";
import moment from "moment";
import UserAvatar from "../components/UserDashboard/UserAvatar";

const UserDashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const hasShownToast = useRef(false);
  const [originalForm, setOriginalForm] = useState(null);
  const { checkingAuth, authError } = useSelector((state) => state.auth);
  const { data, loading, updating } = useSelector((state) => state.users);
  const [form, setForm] = useState({
    name: "",
    firstName: "",
    lastName: "",
    phone: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      const result = await dispatch(checkAuth());
      if (checkAuth.fulfilled.match(result)) {
        const userId = result.payload.userId;
        dispatch(getUser(userId));
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
    if (data) {
      const filledForm = {
        name: data.user?.name || "",
        firstName: data.student?.firstName || "",
        lastName: data.student?.lastName || "",
        phone: data.student?.phone || "",
      };
      setForm(filledForm);
      setOriginalForm(filledForm);
    }
  }, [data]);

  const isFormChanged =
    originalForm &&
    (form.name !== originalForm.name ||
      form.firstName !== originalForm.firstName ||
      form.lastName !== originalForm.lastName ||
      form.phone !== originalForm.phone);

  const getInitials = (name) => {
    if (!name) return "U";
    const names = name.trim().split(" ");
    if (names.length === 1) return names[0][0].toUpperCase();
    return (names[0][0] + names[1][0]).toUpperCase();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    const errorMessage = validateUserEditForm({
      name: form.name,
      firstName: form.firstName,
      lastName: form.lastName,
      phone: form.phone,
    });
    if (errorMessage) {
      showToast({ type: "error", message: errorMessage });
      return;
    }

    const payload = {
      name: form.name,
      student: {
        firstName: form.firstName,
        lastName: form.lastName,
        phone: form.phone,
      },
    };

    const resultAction = await dispatch(
      updateUser({ userId: data.user._id, userData: payload })
    );

    if (updateUser.fulfilled.match(resultAction)) {
      showToast({
        type: "success",
        message: "Profile updated successfully!",
      });
    } else {
      showToast({
        type: "error",
        message: resultAction.payload || "Failed to update profile",
      });
    }
  };

  if (checkingAuth || loading) return <Loading />;

  return (
    <section className="w-full space-y-8 min-h-screen">
      <div className="sticky top-0 z-50 bg-custom-foreground flex justify-between items-center gap-4 py-4 border-b px-4 md:px-8">
        <Link to="/" className="flex items-center gap-2 font-medium text-xl">
          <img src="/logo.png" alt="Logo Image" className="w-auto h-8" />
          EduPanel
        </Link>
        <UserAvatar user={data} />
      </div>

      <div className="flex justify-center px-4 pb-10">
        <div className="w-full max-w-4xl rounded-xl shadow-lg border border-gray-200 p-6 bg-white space-y-6">
          <div className="flex items-center space-x-4">
            <div className="h-16 w-16 rounded-full bg-custom-primary text-white flex items-center justify-center text-xl font-semibold flex-shrink-0">
              {getInitials(data?.user?.name)}
            </div>
            <div>
              <h2 className="text-2xl font-semibold text-gray-800">
                Welcome, {data?.user?.name}
              </h2>
            </div>
          </div>

          <div className="text-sm text-gray-500 mt-1 flex items-center gap-4">
            <div className="flex items-center gap-1">
              <span className="text-green-500 text-2xl">*</span>
              <span>Editable</span>
            </div>
            <div className="flex items-center gap-1">
              <IconLock size={14} className="text-destructive mb-2" />
              <span>Not Editable</span>
            </div>
          </div>

          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <FieldLabel label="Name" editable />
                <Input
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  required
                  disabled={updating}
                  maxLength={50}
                  className="text-sm"
                />
                <p className="text-xs text-muted-foreground mt-1 text-right">
                  {form.name.length}/50
                </p>
              </div>

              <div>
                <FieldLabel label="Email" editable={false} />
                <Input
                  value={data?.user?.email}
                  readOnly
                  className="text-sm mt-2.5"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <FieldLabel label="First Name" editable />
                <Input
                  name="firstName"
                  value={form.firstName}
                  onChange={handleChange}
                  required
                  disabled={updating}
                  maxLength={50}
                  className="text-sm"
                />
                <p className="text-xs text-muted-foreground mt-1 text-right">
                  {form.firstName.length}/50
                </p>
              </div>
              <div>
                <FieldLabel label="Last Name" editable />
                <Input
                  name="lastName"
                  value={form.lastName}
                  onChange={handleChange}
                  required
                  disabled={updating}
                  className="text-sm"
                  maxLength={50}
                />
                <p className="text-xs text-muted-foreground mt-1 text-right">
                  {form.lastName.length}/50
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <FieldLabel label="Phone" editable />
                <div className="flex items-center">
                  <span className="px-3 py-2 text-sm text-gray-700 bg-gray-100 border border-r-0 border-gray-300 rounded-l-md select-none">
                    +91
                  </span>
                  <input
                    type="text"
                    name="phone"
                    value={form.phone.replace("+91", "").trim()}
                    onChange={(e) => {
                      const digits = e.target.value
                        .replace(/\D/g, "")
                        .slice(0, 10);
                      handleChange({
                        target: {
                          name: "phone",
                          value: `+91 ${digits}`,
                        },
                      });
                    }}
                    disabled={updating}
                    required
                    className="text-sm bg-neutral-100 border border-gray-300 rounded-r-md px-3 py-2 w-full"
                  />
                </div>
              </div>

              <div>
                <FieldLabel label="Enrollment Number" editable={false} />
                <Input
                  value={data?.student?.enrollmentNumber}
                  readOnly
                  className="text-sm mt-2.5"
                />
              </div>
            </div>

            <div>
              <FieldLabel label="Course" editable={false} />
              <Input
                value={data?.student?.course}
                readOnly
                className="text-sm"
              />
            </div>

            <div>
              <FieldLabel label="Admission Date" editable={false} />
              <Input
                value={moment(data?.student?.admissionDate).format(
                  "MMMM D, YYYY"
                )}
                readOnly
                className="text-sm"
              />
            </div>

            <Button
              variant="custom"
              onClick={handleSubmit}
              disabled={updating || !isFormChanged}
            >
              {updating ? (
                <>
                  <IconLoader2 className="h-4 w-4 animate-spin" />
                  <span className="relative overflow-hidden">
                    <span className="inline-block transition-transform duration-300 group-hover:-translate-y-full">
                      Saving
                    </span>
                    <span
                      className="absolute left-0 top-0 block translate-y-full 
                          transition-transform duration-300 group-hover:translate-y-0"
                    >
                      Saving
                    </span>
                  </span>
                </>
              ) : (
                <span className="relative overflow-hidden">
                  <span className="inline-block transition-transform duration-300 group-hover:-translate-y-full">
                    Save Changes
                  </span>
                  <span
                    className="absolute left-0 top-0 block translate-y-full 
                      transition-transform duration-300 group-hover:translate-y-0"
                  >
                    Save Changes
                  </span>
                </span>
              )}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default UserDashboard;
