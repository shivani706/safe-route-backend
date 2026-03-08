// ===== Safety Map Page =====
// Full-screen interactive map with filter controls.

import { useState } from "react";
import { MdFilterList, MdLocalPolice, MdLocalHospital, MdWarning, MdCheckCircle } from "react-icons/md";
import MapContainer from "../components/MapContainer";
import { MOCK_MAP_MARKERS } from "../utils/constants";

const filterOptions = [
  { key: "all", label: "All", icon: <MdFilterList />, color: "bg-slate-100 text-slate-700" },
  { key: "police", label: "Police", icon: <MdLocalPolice />, color: "bg-blue-100 text-blue-700" },
  { key: "hospital", label: "Hospitals", icon: <MdLocalHospital />, color: "bg-green-100 text-green-700" },
  { key: "danger", label: "Risk Zones", icon: <MdWarning />, color: "bg-red-100 text-red-700" },
  { key: "safe", label: "Safe Zones", icon: <MdCheckCircle />, color: "bg-cyan-100 text-cyan-700" },
];

const SafetyMap = () => {
  const [activeFilter, setActiveFilter] = useState("all");

  // Filter markers based on selected type
  const filteredMarkers =
    activeFilter === "all"
      ? MOCK_MAP_MARKERS
      : MOCK_MAP_MARKERS.filter((m) => m.type === activeFilter);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-800">Live Safety Map</h1>
        <p className="text-slate-500 mt-1">
          View real-time safety data, nearby services, and risk zones.
        </p>
      </div>

      {/* Filter Buttons */}
      <div className="flex flex-wrap gap-2 mb-6">
        {filterOptions.map((filter) => (
          <button
            key={filter.key}
            onClick={() => setActiveFilter(filter.key)}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 cursor-pointer ${
              activeFilter === filter.key
                ? `${filter.color} ring-2 ring-offset-1 ring-current shadow-sm`
                : "bg-white text-slate-500 border border-slate-200 hover:bg-slate-50"
            }`}
          >
            {filter.icon}
            {filter.label}
            {activeFilter === filter.key && filter.key !== "all" && (
              <span className="ml-1 bg-white/50 px-1.5 py-0.5 rounded-full text-xs">
                {filteredMarkers.length}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Map */}
      <MapContainer markers={filteredMarkers} className="h-[450px] sm:h-[500px] lg:h-[600px] w-full" />

      {/* Legend & Stats */}
      <div className="grid sm:grid-cols-4 gap-4 mt-6">
        {[
          { icon: <MdLocalPolice className="text-blue-600" />, label: "Police Stations", count: MOCK_MAP_MARKERS.filter((m) => m.type === "police").length, bg: "bg-blue-50" },
          { icon: <MdLocalHospital className="text-green-600" />, label: "Hospitals", count: MOCK_MAP_MARKERS.filter((m) => m.type === "hospital").length, bg: "bg-green-50" },
          { icon: <MdWarning className="text-red-600" />, label: "Risk Zones", count: MOCK_MAP_MARKERS.filter((m) => m.type === "danger").length, bg: "bg-red-50" },
          { icon: <MdCheckCircle className="text-cyan-600" />, label: "Safe Zones", count: MOCK_MAP_MARKERS.filter((m) => m.type === "safe").length, bg: "bg-cyan-50" },
        ].map((item) => (
          <div key={item.label} className={`${item.bg} rounded-xl p-4 flex items-center gap-3`}>
            <div className="text-2xl">{item.icon}</div>
            <div>
              <p className="text-2xl font-bold text-slate-800">{item.count}</p>
              <p className="text-xs text-slate-500">{item.label}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SafetyMap;
