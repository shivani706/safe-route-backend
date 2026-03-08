// ===== Alert Service =====
// Handles fetching alerts, safety scores, and sending SOS.

import api from "./api";

// GET /api/alerts — Fetch all safety alerts
export const fetchAlerts = async () => {
  try {
    const response = await api.get("/alerts");
    return { success: true, data: response.data };
  } catch (error) {
    const message =
      error.response?.data?.message || "Failed to fetch alerts.";
    return { success: false, message };
  }
};

// GET /api/safety-score — Fetch current safety score for user's location
export const fetchSafetyScore = async () => {
  try {
    const response = await api.get("/safety-score");
    return { success: true, data: response.data };
  } catch (error) {
    const message =
      error.response?.data?.message || "Failed to fetch safety score.";
    return { success: false, message };
  }
};

// POST /api/sos — Send emergency SOS alert
export const sendSOS = async (location, message = "") => {
  try {
    const response = await api.post("/sos", {
      latitude: location.lat,
      longitude: location.lng,
      message,
      timestamp: new Date().toISOString(),
    });
    return { success: true, data: response.data };
  } catch (error) {
    const msg =
      error.response?.data?.message || "Failed to send SOS. Try calling emergency services directly.";
    return { success: false, message: msg };
  }
};

// GET /api/map-markers — Fetch map markers (police, hospitals, risk zones)
export const fetchMapMarkers = async () => {
  try {
    const response = await api.get("/map-markers");
    return { success: true, data: response.data };
  } catch (error) {
    const message =
      error.response?.data?.message || "Failed to load map data.";
    return { success: false, message };
  }
};
