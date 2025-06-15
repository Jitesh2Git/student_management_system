import moment from "moment";
import { Skeleton } from "@/components/ui/Skeleton";
import {
  IconPencilMinus,
  IconTrashFilled,
  IconUsers,
} from "@tabler/icons-react";
import { useState } from "react";
import UserEditModal from "./UserEditModal";
import { Button } from "@/components/ui/Button";
import CreateUserModal from "./CreateUserModal";
import DeleteUserModal from "./DeleteUserModal";

const UsersTable = ({ usersLoading, users, refresh }) => {
  const [userToEdit, setUserToEdit] = useState(null);
  const [userToDelete, setUserToDelete] = useState(null);

  return (
    <div>
      {usersLoading ? (
        <div className="bg-white/50 rounded-xl overflow-hidden border border-custom-border">
          <div className="overflow-x-auto">
            <div className="min-w-[700px] bg-gray-50/80 p-3 border-b border-custom-border">
              <div className="flex justify-between items-center gap-4">
                <Skeleton className="h-5 w-30 rounded bg-custom-border" />
                <Skeleton className="h-5 w-30 rounded bg-custom-border" />
                <Skeleton className="h-5 w-30 rounded bg-custom-border" />
                <Skeleton className="h-5 w-30 rounded bg-custom-border" />
                <Skeleton className="h-5 w-30 rounded bg-custom-border" />
              </div>
            </div>

            <div className="min-w-[700px]">
              {Array.from({ length: 12 }).map((_, i) => (
                <div
                  key={i}
                  className={`p-3 border-b border-custom-border ${
                    i % 2 === 0 ? "bg-white" : "bg-gray-50/30"
                  }`}
                >
                  <div className="flex justify-between items-center gap-4">
                    <Skeleton className="h-4 w-20 rounded bg-custom-border" />
                    <Skeleton className="h-4 w-20 rounded bg-custom-border" />
                    <Skeleton className="h-4 w-20 rounded bg-custom-border" />
                    <Skeleton className="h-4 w-20 rounded bg-custom-border" />
                    <Skeleton className="h-4 w-20 rounded bg-custom-border" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : users?.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm text-left text-gray-600 border border-custom-border rounded-lg overflow-hidden">
            <thead className="bg-gray-100 text-xs uppercase font-semibold border-x-2 border-t-2">
              <tr>
                <th className="px-6 py-3">Name</th>
                <th className="px-6 py-3">Email</th>
                <th className="px-6 py-3">Role</th>
                <th className="px-6 py-3">Created At</th>
                <th className="px-6 py-3">Updated At</th>
                <th className="px-6 py-3">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-gray-50 divide-y divide-gray-200 border-2 rounded-b-lg">
              {users.map((user) => (
                <tr key={user._id}>
                  <td className="px-6 py-4 whitespace-nowrap">{user.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{user.email}</td>
                  <td className="px-6 py-4 capitalize">{user.role}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {moment(user.createdAt).format("DD MMM YYYY")}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {moment(user.updatedAt).format("DD MMM YYYY")}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-gray-300 hover:text-custom-primary"
                      onClick={(e) => {
                        e.stopPropagation();
                        setUserToEdit(user);
                      }}
                    >
                      <IconPencilMinus
                        size={18}
                        className="stroke-current fill-current"
                      />
                    </Button>

                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-gray-300 hover:text-destructive"
                      onClick={(e) => {
                        e.stopPropagation();
                        setUserToDelete(user);
                      }}
                    >
                      <IconTrashFilled size={18} className="stroke-current" />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div
          className="col-span-full flex flex-col items-center justify-center min-h-[50vh] 
        text-custom-copy-light space-y-3 px-4"
        >
          <div className="flex justify-center text-center ">
            <IconUsers className="w-12 h-12 text-custom-primary-dark" />
          </div>
          <div className="space-y-2 text-center ">
            <p className="text-lg font-medium">No users found</p>
            <p className="text-sm">
              There are currently no registered students in the system.
            </p>
          </div>
          <CreateUserModal refresh={refresh} />
        </div>
      )}

      {userToEdit && (
        <UserEditModal user={userToEdit} onCancel={() => setUserToEdit(null)} />
      )}

      {userToDelete && (
        <DeleteUserModal
          user={userToDelete}
          onCancel={() => setUserToDelete(null)}
        />
      )}
    </div>
  );
};

export default UsersTable;
