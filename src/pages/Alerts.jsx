// ===== Alerts Page =====
// Displays all safety alerts with filtering by type.

import { useState } from "react";
import {
  MdNotificationsActive, MdWarning, MdInfo, MdError,
  MdEmergency, MdAccessTime, MdLocationOn, MdFilterList,
} from "react-icons/md";
import { MOCK_ALERTS } from "../utils/constants";

const alertConfig = {
  warning: {
    icon: <MdWarning className="text-xl" />,
    color: "text-amber-600",
    bg: "bg-amber-50",
    border: "border-amber-200",
    badge: "bg-amber-100 text-amber-700",
  },
  danger: {
    icon: <MdError className="text-xl" />,
    color: "text-red-600",
    bg: "bg-red-50",
    border: "border-red-200",
    badge: "bg-red-100 text-red-700",
  },
  info: {
    icon: <MdInfo className="text-xl" />,
    color: "text-blue-600",
    bg: "bg-blue-50",
    border: "border-blue-200",
    badge: "bg-blue-100 text-blue-700",
  },
  sos: {
    icon: <MdEmergency className="text-xl" />,
    color: "text-red-700",
    bg: "bg-red-50",
    border: "border-red-300",
    badge: "bg-red-200 text-red-800",
  },
};

const filterTabs = [
  { key: "all", label: "All" },
  { key: "sos", label: "SOS" },
  { key: "danger", label: "Danger" },
  { key: "warning", label: "Warning" },
  { key: "info", label: "Info" },
];

const Alerts = () => {
  const [activeTab, setActiveTab] = useState("all");

  const filteredAlerts =
    activeTab === "all"
      ? MOCK_ALERTS
      : MOCK_ALERTS.filter((a) => a.type === activeTab);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-800 flex items-center gap-2">
            <MdNotificationsActive className="text-amber-500" />
            Safety Alerts
          </h1>
          <p className="text-slate-500 mt-1">Stay informed about nearby safety warnings.</p>
        </div>
        <span className="bg-amber-100 text-amber-700 px-3 py-1 rounded-full text-sm font-medium">
          {MOCK_ALERTS.length} alerts
        </span>
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-1 mb-6 bg-slate-100 p-1 rounded-xl overflow-x-auto">
        {filterTabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`flex items-center gap-1 px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all cursor-pointer ${
              activeTab === tab.key
                ? "bg-white text-slate-800 shadow-sm"
                : "text-slate-500 hover:text-slate-700"
            }`}
          >
            {tab.key === "all" && <MdFilterList />}
            {tab.label}
          </button>
        ))}
      </div>

      {/* Alert List */}
      <div className="space-y-4">
        {filteredAlerts.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-xl border border-slate-200">
            <MdNotificationsActive className="text-5xl text-slate-300 mx-auto mb-3" />
            <p className="text-slate-500">No alerts in this category.</p>
          </div>
        ) : (
          filteredAlerts.map((alert) => {
            const config = alertConfig[alert.type] || alertConfig.info;
            return (
              <div
                key={alert.id}
                className={`${config.bg} border ${config.border} rounded-xl p-5 hover:shadow-md transition-all duration-200`}
              >
                <div className="flex items-start gap-4">
                  {/* Icon */}
                  <div className={`mt-0.5 ${config.color}`}>
                    {config.icon}
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap mb-1">
                      <h3 className="text-base font-semibold text-slate-800">{alert.title}</h3>
                      <span className={`px-2 py-0.5 rounded-full text-xs font-medium capitalize ${config.badge}`}>
                        {alert.type}
                      </span>
                    </div>
                    <p className="text-sm text-slate-600 mb-2">{alert.description}</p>
                    <div className="flex items-center gap-4 text-xs text-slate-400">
                      <span className="flex items-center gap-1">
                        <MdLocationOn /> {alert.location}
                      </span>
                      <span className="flex items-center gap-1">
                        <MdAccessTime /> {alert.time}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default Alerts;
