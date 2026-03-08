// ===== Map Container Component =====
// Reusable MapTiler map component powered by @maptiler/sdk.
// Displays markers for police, hospitals, safe zones, and danger zones.
// Falls back to a beautiful placeholder if MapTiler key is not configured.

import { useEffect, useRef, useState } from "react";
import { MAPTILER_KEY, DEFAULT_MAP_CENTER, MOCK_MAP_MARKERS } from "../utils/constants";
import { MdLocationOn, MdLocalHospital, MdLocalPolice, MdWarning, MdCheckCircle } from "react-icons/md";

// Marker SVG icons (inline for fast rendering, no extra dependencies)
const markerSVGs = {
  police: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40" width="36" height="36">
    <circle cx="20" cy="20" r="18" fill="#3b82f6" stroke="white" stroke-width="3"/>
    <text x="20" y="26" text-anchor="middle" fill="white" font-size="18" font-weight="bold">🛡</text>
  </svg>`,
  hospital: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40" width="36" height="36">
    <circle cx="20" cy="20" r="18" fill="#22c55e" stroke="white" stroke-width="3"/>
    <text x="20" y="26" text-anchor="middle" fill="white" font-size="18">🏥</text>
  </svg>`,
  danger: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40" width="36" height="36">
    <circle cx="20" cy="20" r="18" fill="#ef4444" stroke="white" stroke-width="3"/>
    <text x="20" y="26" text-anchor="middle" fill="white" font-size="18">⚠</text>
  </svg>`,
  safe: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40" width="36" height="36">
    <circle cx="20" cy="20" r="18" fill="#06b6d4" stroke="white" stroke-width="3"/>
    <text x="20" y="26" text-anchor="middle" fill="white" font-size="18">✓</text>
  </svg>`,
};

// Popup HTML builder
const buildPopupHTML = (marker) => {
  const colorMap = {
    police: { bg: "#eff6ff", accent: "#3b82f6", label: "Police Station" },
    hospital: { bg: "#f0fdf4", accent: "#22c55e", label: "Hospital" },
    danger: { bg: "#fef2f2", accent: "#ef4444", label: "Risk Zone" },
    safe: { bg: "#ecfeff", accent: "#06b6d4", label: "Safe Zone" },
  };
  const c = colorMap[marker.type] || colorMap.safe;
  return `
    <div style="min-width: 180px; font-family: 'Inter', 'Segoe UI', system-ui, sans-serif;">
      <div style="background: ${c.bg}; padding: 12px 14px; border-bottom: 2px solid ${c.accent};">
        <div style="font-size: 14px; font-weight: 700; color: #1e293b; margin-bottom: 2px;">
          ${marker.name}
        </div>
        <span style="
          display: inline-block; padding: 2px 8px; border-radius: 99px;
          font-size: 11px; font-weight: 600; color: ${c.accent};
          background: white; text-transform: capitalize;
        ">${c.label}</span>
      </div>
      <div style="padding: 10px 14px; font-size: 12px; color: #64748b;">
        📍 ${marker.coordinates[1].toFixed(4)}, ${marker.coordinates[0].toFixed(4)}
      </div>
    </div>
  `;
};

const MapContainer = ({ markers = MOCK_MAP_MARKERS, center = DEFAULT_MAP_CENTER, className = "" }) => {
  const mapContainerRef = useRef(null);
  const mapRef = useRef(null);
  const markersRef = useRef([]);
  const [mapLoaded, setMapLoaded] = useState(false);
  const [mapError, setMapError] = useState(null);

  // Initialize map
  useEffect(() => {
    if (!MAPTILER_KEY || MAPTILER_KEY === "your_maptiler_key_here") {
      setMapError("no-token");
      return;
    }

    let map;
    const initMap = async () => {
      try {
        const maptilersdk = await import("@maptiler/sdk");
        await import("@maptiler/sdk/dist/maptiler-sdk.css");

        maptilersdk.config.apiKey = MAPTILER_KEY;

        map = new maptilersdk.Map({
          container: mapContainerRef.current,
          style: maptilersdk.MapStyle.STREETS,
          center: [center.lng, center.lat],
          zoom: center.zoom,
          navigationControl: "top-right",
          geolocateControl: "top-right",
        });

        map.on("load", () => {
          setMapLoaded(true);
          mapRef.current = map;
          addMarkers(maptilersdk, map);
        });

        map.on("error", () => {
          setMapError("load-error");
        });
      } catch (err) {
        console.error("Map init error:", err);
        setMapError("load-error");
      }
    };

    const addMarkers = (sdk, mapInstance) => {
      // Clear previous markers
      markersRef.current.forEach((m) => m.remove());
      markersRef.current = [];

      markers.forEach((marker) => {
        // Create custom marker element
        const el = document.createElement("div");
        el.innerHTML = markerSVGs[marker.type] || markerSVGs.safe;
        el.style.cssText = "cursor: pointer; transition: transform 0.2s; filter: drop-shadow(0 2px 4px rgba(0,0,0,0.3));";
        el.addEventListener("mouseenter", () => { el.style.transform = "scale(1.25)"; });
        el.addEventListener("mouseleave", () => { el.style.transform = "scale(1)"; });

        // Create popup
        const popup = new sdk.Popup({
          offset: 25,
          closeButton: true,
          closeOnClick: true,
          maxWidth: "260px",
        }).setHTML(buildPopupHTML(marker));

        // Add marker to map
        const m = new sdk.Marker({ element: el })
          .setLngLat(marker.coordinates)
          .setPopup(popup)
          .addTo(mapInstance);

        markersRef.current.push(m);
      });
    };

    initMap();

    return () => {
      markersRef.current.forEach((m) => m.remove());
      if (map) map.remove();
    };
  }, [markers, center]);

  // ---- Placeholder Map (when no MapTiler key) ----
  if (mapError === "no-token") {
    return (
      <div className={`rounded-xl border border-slate-200 bg-gradient-to-br from-blue-50 to-cyan-50 overflow-hidden ${className || "h-[450px] lg:h-[500px]"}`}>
        <div className="p-5 h-full flex flex-col">
          <div className="flex items-center gap-2 mb-3">
            <MdLocationOn className="text-2xl text-blue-600" />
            <h3 className="text-lg font-semibold text-slate-800">Safety Map Preview</h3>
          </div>

          {/* Simulated map background */}
          <div className="flex-1 relative bg-blue-100/50 rounded-lg overflow-hidden">
            {/* Grid lines simulating streets */}
            <div className="absolute inset-0 opacity-20">
              {[...Array(8)].map((_, i) => (
                <div key={`h-${i}`} className="absolute w-full h-px bg-blue-300" style={{ top: `${(i + 1) * 12}%` }} />
              ))}
              {[...Array(6)].map((_, i) => (
                <div key={`v-${i}`} className="absolute h-full w-px bg-blue-300" style={{ left: `${(i + 1) * 15}%` }} />
              ))}
            </div>

            {/* Legend Markers */}
            <div className="absolute top-4 left-4 space-y-2 z-10">
              {[
                { icon: <MdLocalPolice />, label: "Police Station", color: "text-blue-600", bg: "bg-blue-100" },
                { icon: <MdLocalHospital />, label: "Hospital", color: "text-green-600", bg: "bg-green-100" },
                { icon: <MdWarning />, label: "Risk Zone", color: "text-red-600", bg: "bg-red-100" },
                { icon: <MdCheckCircle />, label: "Safe Zone", color: "text-cyan-600", bg: "bg-cyan-100" },
              ].map((item) => (
                <div key={item.label} className={`flex items-center gap-2 ${item.bg} px-2.5 py-1.5 rounded-lg shadow-sm`}>
                  <span className={`${item.color}`}>{item.icon}</span>
                  <span className="text-xs font-medium text-slate-700">{item.label}</span>
                </div>
              ))}
            </div>

            {/* Simulated marker dots */}
            <div className="absolute top-[30%] left-[40%] w-4 h-4 bg-blue-500 rounded-full border-2 border-white shadow-md animate-pulse" title="Police Station" />
            <div className="absolute top-[55%] left-[60%] w-4 h-4 bg-green-500 rounded-full border-2 border-white shadow-md animate-pulse" title="Hospital" />
            <div className="absolute top-[40%] left-[70%] w-4 h-4 bg-red-500 rounded-full border-2 border-white shadow-md animate-pulse" title="Risk Zone" />
            <div className="absolute top-[65%] left-[30%] w-4 h-4 bg-cyan-500 rounded-full border-2 border-white shadow-md animate-pulse" title="Safe Zone" />
            <div className="absolute top-[50%] left-[50%] w-5 h-5 bg-indigo-600 rounded-full border-2 border-white shadow-lg">
              <span className="absolute inset-0 rounded-full bg-indigo-400 animate-ping opacity-40"></span>
            </div>

            {/* Setup instruction */}
            <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-sm rounded-xl p-4 text-center shadow-lg">
              <p className="text-sm font-medium text-slate-700 mb-1">🗺️ Enable Live Map</p>
              <p className="text-xs text-slate-500">
                Get your free key at{" "}
                <a href="https://cloud.maptiler.com/account/keys/" target="_blank" rel="noreferrer" className="text-blue-600 underline">
                  cloud.maptiler.com
                </a>{" "}
                and add it to your <code className="bg-slate-100 px-1.5 py-0.5 rounded text-xs">.env</code> file
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ---- Error State ----
  if (mapError === "load-error") {
    return (
      <div className={`rounded-xl border border-red-200 bg-red-50 flex flex-col items-center justify-center text-center ${className || "h-[450px] lg:h-[500px]"}`}>
        <MdWarning className="text-5xl text-red-400 mb-3" />
        <h3 className="text-lg font-semibold text-red-700 mb-1">Map Failed to Load</h3>
        <p className="text-red-500 text-sm">Please check your internet connection and MapTiler API key.</p>
      </div>
    );
  }

  // ---- Actual Map ----
  return (
    <div className={`relative rounded-xl border border-slate-200 shadow-md overflow-hidden ${className || "h-[450px] lg:h-[500px]"}`} style={{ isolation: "isolate" }}>
      {!mapLoaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-slate-50 z-10">
          <div className="flex flex-col items-center gap-3">
            <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
            <span className="text-sm text-slate-500 font-medium">Loading map...</span>
          </div>
        </div>
      )}
      <div
        ref={mapContainerRef}
        className="absolute inset-0"
      />
    </div>
  );
};

export default MapContainer;
