// ===== Profile Page =====
// Displays user info with edit capability and settings.

import { useState } from "react";
import {
  MdPerson, MdEmail, MdPhone, MdEdit, MdSave,
  MdCalendarToday, MdEmergency, MdShield, MdClose,
} from "react-icons/md";
import { toast } from "react-toastify";
import { useAuth } from "../context/AuthContext";

const Profile = () => {
  const { user } = useAuth();
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phone: user?.phone || "",
    emergencyContact: user?.emergencyContact || "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    // In production, this would call an API to update the user
    toast.success("Profile updated successfully! ✅");
    setEditing(false);
  };

  const handleCancel = () => {
    setFormData({
      name: user?.name || "",
      email: user?.email || "",
      phone: user?.phone || "",
      emergencyContact: user?.emergencyContact || "",
    });
    setEditing(false);
  };

  const infoFields = [
    { key: "name", label: "Full Name", icon: <MdPerson />, type: "text" },
    { key: "email", label: "Email Address", icon: <MdEmail />, type: "email" },
    { key: "phone", label: "Phone Number", icon: <MdPhone />, type: "tel" },
    { key: "emergencyContact", label: "Emergency Contact", icon: <MdEmergency />, type: "tel" },
  ];

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-800 flex items-center gap-2">
          <MdPerson className="text-blue-600" />
          My Profile
        </h1>
        <p className="text-slate-500 mt-1">Manage your account information and settings.</p>
      </div>

      {/* Profile Card */}
      <div className="bg-white rounded-2xl shadow-lg border border-slate-100 overflow-hidden">
        {/* Profile Header */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 p-8 text-white">
          <div className="flex items-center gap-5">
            <div className="w-20 h-20 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-3xl font-bold border-2 border-white/40">
              {user?.name?.charAt(0)?.toUpperCase() || "U"}
            </div>
            <div>
              <h2 className="text-2xl font-bold">{user?.name || "User"}</h2>
              <p className="text-blue-100 flex items-center gap-1 mt-1">
                <MdShield className="text-lg" />
                <span className="capitalize">{user?.role || "Tourist"} Account</span>
              </p>
              <p className="text-blue-200 text-sm flex items-center gap-1 mt-1">
                <MdCalendarToday className="text-sm" />
                Joined {user?.joinedDate || "2026"}
              </p>
            </div>
          </div>
        </div>

        {/* Profile Body */}
        <div className="p-8">
          {/* Edit / Save Buttons */}
          <div className="flex justify-end mb-6">
            {editing ? (
              <div className="flex gap-2">
                <button
                  onClick={handleCancel}
                  className="flex items-center gap-1 px-4 py-2 border border-slate-300 text-slate-600 rounded-lg text-sm font-medium hover:bg-slate-50 transition-colors cursor-pointer"
                >
                  <MdClose /> Cancel
                </button>
                <button
                  onClick={handleSave}
                  className="flex items-center gap-1 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors cursor-pointer"
                >
                  <MdSave /> Save Changes
                </button>
              </div>
            ) : (
              <button
                onClick={() => setEditing(true)}
                className="flex items-center gap-1 px-4 py-2 bg-blue-50 text-blue-600 rounded-lg text-sm font-medium hover:bg-blue-100 transition-colors cursor-pointer"
              >
                <MdEdit /> Edit Profile
              </button>
            )}
          </div>

          {/* Form Fields */}
          <div className="space-y-5">
            {infoFields.map((field) => (
              <div key={field.key}>
                <label className="block text-sm font-medium text-slate-700 mb-1.5 flex items-center gap-1.5">
                  <span className="text-slate-400">{field.icon}</span>
                  {field.label}
                </label>
                {editing ? (
                  <input
                    type={field.type}
                    name={field.key}
                    value={formData[field.key]}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-slate-300 rounded-xl text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  />
                ) : (
                  <div className="px-4 py-3 bg-slate-50 rounded-xl text-slate-700 border border-slate-100">
                    {formData[field.key] || "Not set"}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Settings Section */}
      <div className="bg-white rounded-2xl shadow-lg border border-slate-100 mt-6 p-8">
        <h3 className="text-lg font-semibold text-slate-800 mb-4">Settings</h3>
        <div className="space-y-4">
          {[
            { label: "Push Notifications", desc: "Receive alerts about nearby dangers" },
            { label: "Location Sharing", desc: "Share location with emergency services" },
            { label: "Dark Mode", desc: "Switch to dark theme" },
          ].map((setting, i) => (
            <div key={setting.label} className="flex items-center justify-between py-3 border-b border-slate-100 last:border-0">
              <div>
                <p className="text-sm font-medium text-slate-700">{setting.label}</p>
                <p className="text-xs text-slate-400">{setting.desc}</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  defaultChecked={i < 2}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-slate-200 peer-focus:ring-2 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Profile;
