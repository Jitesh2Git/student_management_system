import { Skeleton } from "@/components/ui/Skeleton";
import { useEffect, useRef, useState } from "react";
import {
  IconLogout2,
  IconSettings,
  IconTrashFilled,
} from "@tabler/icons-react";
import { Button } from "@/components/ui/Button";
import LogoutModal from "../LogoutModal";
import DeleteAdminModal from "./DeleteAdminModal";
import SettingsModal from "./SettingsModal";

const AdminAvatar = ({ user }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showSettingsModal, setShowSettingsModal] = useState(false);
  const popoverRef = useRef();

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (popoverRef.current && !popoverRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (!user) {
    return <Skeleton className="w-9 h-9 rounded-full bg-custom-border" />;
  }

  const getInitials = (name) => {
    if (!name) return "U";
    const names = name.trim().split(" ");
    if (names.length === 1) return names[0][0].toUpperCase();
    return (names[0][0] + names[1][0]).toUpperCase();
  };

  return (
    <div className="relative" ref={popoverRef}>
      <Button
        className="size-10 rounded-full bg-custom-primary text-custom-primary-content 
        flex items-center justify-center font-medium text-sm flex-shrink-0 border-2 hover:bg-custom-primary"
        onClick={() => setIsOpen((prev) => !prev)}
      >
        {getInitials(user?.name)}
      </Button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-56 bg-white shadow-lg border rounded-lg z-50 text-sm">
          <div className="p-4 border-b">
            <p className="font-medium text-custom-copy">{user?.name}</p>
            <p className="text-xs text-custom-copy-light break-all">
              {user?.email}
            </p>
          </div>

          <div className="p-2">
            <Button
              variant="ghost"
              className="w-full justify-start flex items-center gap-2 px-4 py-2"
              onClick={() => {
                setIsOpen(false);
                setShowSettingsModal(true);
              }}
            >
              <IconSettings size={16} /> Settings
            </Button>

            <Button
              variant="ghost"
              className="w-full justify-start flex items-center gap-2 px-4 py-2 text-destructive hover:text-destructive"
              onClick={() => {
                setIsOpen(false);
                setShowDeleteModal(true);
              }}
            >
              <IconTrashFilled size={16} /> Delete Account
            </Button>

            <Button
              variant="ghost"
              className="w-full justify-start flex items-center gap-2 px-4 py-2 text-destructive hover:text-destructive"
              onClick={() => {
                setIsOpen(false);
                setShowLogoutModal(true);
              }}
            >
              <IconLogout2 size={16} /> Logout
            </Button>
          </div>
        </div>
      )}

      {showLogoutModal && (
        <LogoutModal onClose={() => setShowLogoutModal(false)} />
      )}

      {showDeleteModal && (
        <DeleteAdminModal
          user={user}
          onClose={() => setShowDeleteModal(false)}
        />
      )}

      {showSettingsModal && (
        <SettingsModal
          user={user}
          onClose={() => setShowSettingsModal(false)}
        />
      )}
    </div>
  );
};

export default AdminAvatar;
