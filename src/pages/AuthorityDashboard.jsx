// ===== Authority Dashboard =====
// Admin view showing SOS reports, tourist monitoring, alert map, and statistics.

import { useState } from "react";
import {
  MdDashboard, MdEmergency, MdPeople, MdNotificationsActive,
  MdLocationOn, MdAccessTime, MdCheckCircle, MdWarning,
  MdTrendingUp, MdMap,
} from "react-icons/md";
import Card from "../components/Card";
import MapContainer from "../components/MapContainer";
import { MOCK_ALERTS, MOCK_MAP_MARKERS } from "../utils/constants";

// Mock SOS reports for authority view
const mockSOSReports = [
  { id: 1, tourist: "Alice Johnson", location: "Connaught Place", time: "2 min ago", status: "active", lat: 28.6315, lng: 77.2197 },
  { id: 2, tourist: "Bob Smith", location: "India Gate", time: "15 min ago", status: "responding", lat: 28.6129, lng: 77.2295 },
  { id: 3, tourist: "Maria Garcia", location: "Red Fort", time: "1 hour ago", status: "resolved", lat: 28.6562, lng: 77.2410 },
];

const statusConfig = {
  active: { color: "bg-red-100 text-red-700", dot: "bg-red-500" },
  responding: { color: "bg-amber-100 text-amber-700", dot: "bg-amber-500" },
  resolved: { color: "bg-green-100 text-green-700", dot: "bg-green-500" },
};

const AuthorityDashboard = () => {
  const [selectedTab, setSelectedTab] = useState("overview");

  const stats = [
    { icon: <MdPeople />, label: "Active Tourists", value: "1,247", color: "blue", trend: "+12%" },
    { icon: <MdEmergency />, label: "Active SOS", value: "3", color: "red", trend: "-2" },
    { icon: <MdNotificationsActive />, label: "Today's Alerts", value: "18", color: "amber", trend: "+5" },
    { icon: <MdCheckCircle />, label: "Resolved", value: "156", color: "green", trend: "+23" },
  ];

  const statColors = {
    blue: "bg-blue-50 text-blue-600",
    red: "bg-red-50 text-red-600",
    amber: "bg-amber-50 text-amber-600",
    green: "bg-green-50 text-green-600",
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-800 flex items-center gap-2">
            <MdDashboard className="text-indigo-600" />
            Authority Dashboard
          </h1>
          <p className="text-slate-500 mt-1">Monitor tourist safety and respond to emergencies.</p>
        </div>
        <div className="flex gap-1 mt-4 sm:mt-0 bg-slate-100 p-1 rounded-xl">
          {["overview", "sos", "map"].map((tab) => (
            <button
              key={tab}
              onClick={() => setSelectedTab(tab)}
              className={`px-4 py-2 rounded-lg text-sm font-medium capitalize transition-all cursor-pointer ${
                selectedTab === tab
                  ? "bg-white text-slate-800 shadow-sm"
                  : "text-slate-500 hover:text-slate-700"
              }`}
            >
              {tab === "sos" ? "SOS Reports" : tab}
            </button>
          ))}
        </div>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="bg-white rounded-xl border border-slate-100 p-5 shadow-sm hover:shadow-md transition-all"
          >
            <div className="flex items-center justify-between mb-3">
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center text-xl ${statColors[stat.color]}`}>
                {stat.icon}
              </div>
              <span className="text-xs font-medium text-green-600 flex items-center gap-0.5">
                <MdTrendingUp /> {stat.trend}
              </span>
            </div>
            <p className="text-2xl font-bold text-slate-800">{stat.value}</p>
            <p className="text-xs text-slate-500 mt-0.5">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Tab Content */}
      {selectedTab === "overview" && (
        <div className="grid lg:grid-cols-2 gap-6">
          {/* SOS Reports */}
          <Card title="Active SOS Reports" icon={<MdEmergency />} color="red">
            <div className="space-y-3 mt-2">
              {mockSOSReports.map((report) => {
                const config = statusConfig[report.status];
                return (
                  <div
                    key={report.id}
                    className="flex items-center justify-between p-3 bg-white rounded-lg border border-slate-100"
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-2.5 h-2.5 rounded-full ${config.dot} ${report.status === "active" ? "animate-pulse" : ""}`} />
                      <div>
                        <p className="text-sm font-medium text-slate-700">{report.tourist}</p>
                        <p className="text-xs text-slate-400 flex items-center gap-1">
                          <MdLocationOn /> {report.location} • <MdAccessTime /> {report.time}
                        </p>
                      </div>
                    </div>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium capitalize ${config.color}`}>
                      {report.status}
                    </span>
                  </div>
                );
              })}
            </div>
          </Card>

          {/* Recent Alerts */}
          <Card title="Recent Alerts" icon={<MdNotificationsActive />} color="amber">
            <div className="space-y-3 mt-2">
              {MOCK_ALERTS.slice(0, 4).map((alert) => {
                const alertColors = {
                  warning: "border-l-amber-400",
                  danger: "border-l-red-400",
                  info: "border-l-blue-400",
                  sos: "border-l-red-600",
                };
                return (
                  <div
                    key={alert.id}
                    className={`border-l-4 rounded-r-lg p-3 bg-white border border-slate-100 ${alertColors[alert.type]}`}
                  >
                    <p className="text-sm font-medium text-slate-700">{alert.title}</p>
                    <p className="text-xs text-slate-400 mt-0.5">{alert.location} • {alert.time}</p>
                  </div>
                );
              })}
            </div>
          </Card>
        </div>
      )}

      {selectedTab === "sos" && (
        <div className="bg-white rounded-2xl shadow-lg border border-slate-100 overflow-hidden">
          <div className="p-6 border-b border-slate-100">
            <h3 className="text-lg font-semibold text-slate-800">All SOS Reports</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-50">
                <tr>
                  {["Tourist", "Location", "Time", "Status", "Action"].map((h) => (
                    <th key={h} className="px-6 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {mockSOSReports.map((report) => {
                  const config = statusConfig[report.status];
                  return (
                    <tr key={report.id} className="hover:bg-slate-50 transition-colors">
                      <td className="px-6 py-4 text-sm font-medium text-slate-700">{report.tourist}</td>
                      <td className="px-6 py-4 text-sm text-slate-500">{report.location}</td>
                      <td className="px-6 py-4 text-sm text-slate-500">{report.time}</td>
                      <td className="px-6 py-4">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium capitalize ${config.color}`}>
                          {report.status}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <button className="text-blue-600 text-sm font-medium hover:underline cursor-pointer">
                          View Details
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {selectedTab === "map" && (
        <div>
          <div className="flex items-center gap-2 mb-4">
            <MdMap className="text-xl text-blue-600" />
            <h3 className="text-lg font-semibold text-slate-800">Live Monitoring Map</h3>
          </div>
          <MapContainer markers={MOCK_MAP_MARKERS} className="h-[450px] sm:h-[500px] lg:h-[600px] w-full" />
        </div>
      )}
    </div>
  );
};

export default AuthorityDashboard;
