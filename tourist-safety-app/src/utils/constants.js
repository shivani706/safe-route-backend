// ===== Application Constants =====
// Central place for all app-wide constants

// API base URL — reads from .env file
export const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api";

// MapTiler API key — reads from .env file
// Get your free key at https://cloud.maptiler.com/account/keys/
export const MAPTILER_KEY =
  import.meta.env.VITE_MAPTILER_KEY || "";

// Default map center (New Delhi, India)
export const DEFAULT_MAP_CENTER = {
  lng: 77.2090,
  lat: 28.6139,
  zoom: 12,
};

// Safety score thresholds
export const SAFETY_LEVELS = {
  HIGH: { label: "Safe", color: "#22c55e", min: 70 },
  MEDIUM: { label: "Moderate", color: "#f59e0b", min: 40 },
  LOW: { label: "Unsafe", color: "#ef4444", min: 0 },
};

// Alert types
export const ALERT_TYPES = {
  DANGER: "danger",
  WARNING: "warning",
  INFO: "info",
  SOS: "sos",
};

// Navigation links for different user roles
export const NAV_LINKS = {
  tourist: [
    { name: "Dashboard", path: "/dashboard" },
    { name: "Safety Map", path: "/map" },
    { name: "Alerts", path: "/alerts" },
    { name: "SOS", path: "/sos" },
    { name: "Profile", path: "/profile" },
  ],
  authority: [
    { name: "Dashboard", path: "/authority" },
    { name: "Safety Map", path: "/map" },
    { name: "Alerts", path: "/alerts" },
    { name: "Profile", path: "/profile" },
  ],
};

// Placeholder data — used until backend is connected
export const MOCK_ALERTS = [
  {
    id: 1,
    title: "Pickpocket Warning",
    description: "Increased pickpocket activity reported near Central Market area.",
    type: "warning",
    location: "Central Market",
    time: "10 min ago",
    coordinates: [77.2195, 28.6328],
  },
  {
    id: 2,
    title: "Road Closure",
    description: "Main road near India Gate closed due to construction work.",
    type: "info",
    location: "India Gate",
    time: "30 min ago",
    coordinates: [77.2295, 28.6129],
  },
  {
    id: 3,
    title: "Unsafe Zone Alert",
    description: "Avoid dark alleys near old railway station after 9 PM.",
    type: "danger",
    location: "Old Railway Station",
    time: "1 hour ago",
    coordinates: [77.2167, 28.6423],
  },
  {
    id: 4,
    title: "Festival Crowd Warning",
    description: "Heavy crowd expected near temple area for upcoming festival.",
    type: "warning",
    location: "Temple Street",
    time: "2 hours ago",
    coordinates: [77.2310, 28.6250],
  },
  {
    id: 5,
    title: "SOS: Tourist Emergency",
    description: "A tourist reported an emergency near Connaught Place.",
    type: "sos",
    location: "Connaught Place",
    time: "5 min ago",
    coordinates: [77.2197, 28.6315],
  },
];

export const MOCK_SAFETY_SCORE = 72;

export const MOCK_MAP_MARKERS = [
  { id: 1, type: "police", name: "Central Police Station", coordinates: [77.2090, 28.6300] },
  { id: 2, type: "police", name: "Tourist Police Outpost", coordinates: [77.2250, 28.6200] },
  { id: 3, type: "hospital", name: "City General Hospital", coordinates: [77.2150, 28.6050] },
  { id: 4, type: "hospital", name: "Emergency Care Center", coordinates: [77.2300, 28.6400] },
  { id: 5, type: "danger", name: "Pickpocket Hotspot", coordinates: [77.2195, 28.6328] },
  { id: 6, type: "danger", name: "Unsafe Area (Night)", coordinates: [77.2167, 28.6423] },
  { id: 7, type: "safe", name: "Tourist Info Center", coordinates: [77.2197, 28.6315] },
  { id: 8, type: "safe", name: "Embassy Zone", coordinates: [77.2100, 28.6180] },
];

export const MOCK_USER = {
  name: "Piyush",
  email: "piyush@example.com",
  phone: "+91 98765 43210",
  role: "tourist",
  avatar: null,
  joinedDate: "2026-01-15",
  emergencyContact: "+91 91234 56789",
};
