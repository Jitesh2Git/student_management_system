import {
  IconUserPlus,
  IconEdit,
  IconDatabase,
  IconShieldLock,
} from "@tabler/icons-react";

const Features = () => {
  return (
    <div className="max-w-6xl mx-auto px-4">
      <div className="max-w-3xl mx-auto mb-16 text-center">
        <h2 className="text-slate-900 text-3xl lg:text-4xl font-bold mb-4 leading-relaxed">
          Core Features Built for Admins
        </h2>
        <p className="text-slate-600 text-base leading-relaxed">
          Everything you need to manage student records efficiently — create
          accounts, update data, and stay organized.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-12">
        <div className="text-center">
          <div className="w-12 h-12 p-3 rounded-md flex items-center justify-center mx-auto bg-blue-50 mb-6">
            <IconUserPlus className="text-blue-600 w-6 h-6" />
          </div>
          <h3 className="text-slate-900 text-lg font-semibold mb-3">
            Create Student Accounts
          </h3>
          <p className="text-slate-600 text-sm leading-relaxed">
            Easily create new student accounts with essential details like name,
            email, and contact info.
          </p>
        </div>

        <div className="text-center">
          <div className="w-12 h-12 p-3 rounded-md flex items-center justify-center mx-auto bg-pink-50 mb-6">
            <IconEdit className="text-pink-600 w-6 h-6" />
          </div>
          <h3 className="text-slate-900 text-lg font-semibold mb-3">
            Edit & Update Profiles
          </h3>
          <p className="text-slate-600 text-sm leading-relaxed">
            Admins can view, edit, or delete student details anytime with a
            clean and simple interface.
          </p>
        </div>

        <div className="text-center">
          <div className="w-12 h-12 p-3 rounded-md flex items-center justify-center mx-auto bg-green-50 mb-6">
            <IconDatabase className="text-green-600 w-6 h-6" />
          </div>
          <h3 className="text-slate-900 text-lg font-semibold mb-3">
            Student Self-Service
          </h3>
          <p className="text-slate-600 text-sm leading-relaxed">
            Students can log in to view their profile and update basic info like
            name or phone.
          </p>
        </div>

        <div className="text-center">
          <div className="w-12 h-12 p-3 rounded-md flex items-center justify-center mx-auto bg-purple-50 mb-6">
            <IconShieldLock className="text-purple-600 w-6 h-6" />
          </div>
          <h3 className="text-slate-900 text-lg font-semibold mb-3">
            Secure Access
          </h3>
          <p className="text-slate-600 text-sm leading-relaxed">
            Role-based access control ensures only authorized admins can manage
            student data.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Features;
