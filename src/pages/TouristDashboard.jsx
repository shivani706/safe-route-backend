// ===== Tourist Dashboard =====
// Main dashboard showing safety score, quick actions, alert preview, and map preview.

import { useNavigate } from "react-router-dom";
import {
  MdShield, MdMap, MdNotificationsActive, MdEmergency,
  MdLocalHospital, MdLocalPolice, MdPerson, MdTrendingUp,
} from "react-icons/md";
import Card from "../components/Card";
import MapContainer from "../components/MapContainer";
import { useAuth } from "../context/AuthContext";
import { MOCK_SAFETY_SCORE, MOCK_ALERTS, SAFETY_LEVELS } from "../utils/constants";

const TouristDashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  // Determine safety level from score
  const safetyLevel =
    MOCK_SAFETY_SCORE >= SAFETY_LEVELS.HIGH.min
      ? SAFETY_LEVELS.HIGH
      : MOCK_SAFETY_SCORE >= SAFETY_LEVELS.MEDIUM.min
      ? SAFETY_LEVELS.MEDIUM
      : SAFETY_LEVELS.LOW;

  const quickActions = [
    { icon: <MdMap className="text-2xl" />, label: "Safety Map", path: "/map", color: "blue" },
    { icon: <MdEmergency className="text-2xl" />, label: "SOS", path: "/sos", color: "red" },
    { icon: <MdNotificationsActive className="text-2xl" />, label: "Alerts", path: "/alerts", color: "amber" },
    { icon: <MdPerson className="text-2xl" />, label: "Profile", path: "/profile", color: "green" },
  ];

  const actionColors = {
    blue: "bg-blue-100 text-blue-600 hover:bg-blue-200",
    red: "bg-red-100 text-red-600 hover:bg-red-200",
    amber: "bg-amber-100 text-amber-600 hover:bg-amber-200",
    green: "bg-green-100 text-green-600 hover:bg-green-200",
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Welcome Header */}
      <div className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-800">
          Welcome back, {user?.name || "Traveler"} 👋
        </h1>
        <p className="text-slate-500 mt-1">Here&apos;s your safety overview for today.</p>
      </div>

      {/* Top Row — Safety Score + Quick Actions */}
      <div className="grid lg:grid-cols-3 gap-6 mb-8">
        {/* Safety Score Card */}
        <Card title="Safety Score" icon={<MdShield />} color="green">
          <div className="flex items-center gap-4 mt-2">
            <div className="relative w-20 h-20">
              <svg className="w-20 h-20 -rotate-90" viewBox="0 0 80 80">
                <circle cx="40" cy="40" r="34" fill="none" stroke="#e2e8f0" strokeWidth="8" />
                <circle
                  cx="40" cy="40" r="34" fill="none"
                  stroke={safetyLevel.color}
                  strokeWidth="8"
                  strokeDasharray={`${(MOCK_SAFETY_SCORE / 100) * 213.6} 213.6`}
                  strokeLinecap="round"
                />
              </svg>
              <span className="absolute inset-0 flex items-center justify-center text-xl font-bold text-slate-800">
                {MOCK_SAFETY_SCORE}
              </span>
            </div>
            <div>
              <span
                className="inline-block px-3 py-1 rounded-full text-xs font-semibold text-white"
                style={{ backgroundColor: safetyLevel.color }}
              >
                {safetyLevel.label}
              </span>
              <p className="text-slate-500 text-xs mt-1.5">Based on your current area</p>
            </div>
          </div>
        </Card>

        {/* Quick Actions */}
        <div className="lg:col-span-2">
          <Card title="Quick Actions" icon={<MdTrendingUp />} color="blue">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-2">
              {quickActions.map((action) => (
                <button
                  key={action.label}
                  onClick={() => navigate(action.path)}
                  className={`flex flex-col items-center gap-2 p-4 rounded-xl transition-all duration-200 cursor-pointer ${actionColors[action.color]}`}
                >
                  {action.icon}
                  <span className="text-xs font-medium">{action.label}</span>
                </button>
              ))}
            </div>
          </Card>
        </div>
      </div>

      {/* Middle Row — Nearby Services */}
      <div className="grid sm:grid-cols-2 gap-6 mb-8">
        <Card title="Nearest Police Station" icon={<MdLocalPolice />} color="blue">
          <div className="mt-1">
            <p className="font-medium text-slate-700">Central Police Station</p>
            <p className="text-xs text-slate-400 mt-1">📍 1.2 km away • Open 24/7</p>
            <p className="text-xs text-slate-400">📞 +91 100</p>
          </div>
        </Card>

        <Card title="Nearest Hospital" icon={<MdLocalHospital />} color="green">
          <div className="mt-1">
            <p className="font-medium text-slate-700">City General Hospital</p>
            <p className="text-xs text-slate-400 mt-1">📍 0.8 km away • Emergency 24/7</p>
            <p className="text-xs text-slate-400">📞 +91 108</p>
          </div>
        </Card>
      </div>

      {/* Bottom Row — Recent Alerts + Map Preview */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Recent Alerts */}
        <Card title="Recent Alerts" icon={<MdNotificationsActive />} color="amber">
          <div className="space-y-3 mt-2">
            {MOCK_ALERTS.slice(0, 3).map((alert) => {
              const alertColors = {
                warning: "border-l-amber-400 bg-amber-50/50",
                danger: "border-l-red-400 bg-red-50/50",
                info: "border-l-blue-400 bg-blue-50/50",
                sos: "border-l-red-600 bg-red-50/50",
              };
              return (
                <div
                  key={alert.id}
                  className={`border-l-4 rounded-r-lg p-3 ${alertColors[alert.type] || alertColors.info}`}
                >
                  <p className="text-sm font-medium text-slate-700">{alert.title}</p>
                  <p className="text-xs text-slate-400 mt-0.5">{alert.location} • {alert.time}</p>
                </div>
              );
            })}
            <button
              onClick={() => navigate("/alerts")}
              className="text-blue-600 text-sm font-medium hover:underline cursor-pointer"
            >
              View all alerts →
            </button>
          </div>
        </Card>

        {/* Map Preview */}
        <div className="flex">
          <MapContainer className="h-[420px] lg:h-[450px] w-full" />
        </div>
      </div>
    </div>
  );
};

export default TouristDashboard;
