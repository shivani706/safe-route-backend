// ===== SOS Emergency Page =====
// Large SOS button with location detection and confirmation flow.

import { useState } from "react";
import { MdEmergency, MdLocationOn, MdPhone, MdCheckCircle, MdLocalPolice, MdLocalHospital } from "react-icons/md";
import { toast } from "react-toastify";
import SOSButton from "../components/SOSButton";

const SOS = () => {
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [location, setLocation] = useState(null);

  const handleSOS = async () => {
    setSending(true);

    // Get user's current location
    try {
      const position = await new Promise((resolve, reject) => {
        if (!navigator.geolocation) {
          reject(new Error("Geolocation not supported"));
          return;
        }
        navigator.geolocation.getCurrentPosition(resolve, reject, {
          enableHighAccuracy: true,
          timeout: 10000,
        });
      });

      const loc = {
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      };
      setLocation(loc);

      // Simulate sending SOS (replace with real API call)
      await new Promise((resolve) => setTimeout(resolve, 2000));

      setSent(true);
      toast.success("🚨 SOS sent! Help is on the way.");
    } catch {
      toast.error("Could not get location. Please enable GPS and try again.");
    } finally {
      setSending(false);
    }
  };

  const handleReset = () => {
    setSent(false);
    setLocation(null);
  };

  const emergencyContacts = [
    { icon: <MdLocalPolice />, label: "Police", number: "100", color: "text-blue-600 bg-blue-50" },
    { icon: <MdLocalHospital />, label: "Ambulance", number: "108", color: "text-green-600 bg-green-50" },
    { icon: <MdPhone />, label: "Fire", number: "101", color: "text-red-600 bg-red-50" },
    { icon: <MdEmergency />, label: "Tourist Helpline", number: "1363", color: "text-purple-600 bg-purple-50" },
  ];

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-800 flex items-center justify-center gap-2">
          <MdEmergency className="text-red-600" />
          Emergency SOS
        </h1>
        <p className="text-slate-500 mt-1">
          Press the SOS button in case of emergency. Your location will be sent to authorities.
        </p>
      </div>

      {/* SOS Section */}
      <div className="bg-white rounded-2xl shadow-lg border border-slate-100 p-8 mb-6">
        {sent ? (
          /* ===== Success State ===== */
          <div className="text-center py-8">
            <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <MdCheckCircle className="text-5xl text-green-600" />
            </div>
            <h2 className="text-2xl font-bold text-green-700 mb-2">SOS Sent Successfully!</h2>
            <p className="text-slate-500 mb-2">
              Emergency services have been notified. Help is on the way.
            </p>
            {location && (
              <p className="text-sm text-slate-400 flex items-center justify-center gap-1 mb-6">
                <MdLocationOn />
                Location: {location.lat.toFixed(4)}, {location.lng.toFixed(4)}
              </p>
            )}
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 text-sm text-amber-700 mb-6">
              <strong>Stay calm.</strong> Keep your phone on and stay in a safe, visible location.
              Emergency services will contact you shortly.
            </div>
            <button
              onClick={handleReset}
              className="px-6 py-3 bg-slate-100 text-slate-700 rounded-xl font-medium hover:bg-slate-200 transition-colors cursor-pointer"
            >
              Reset
            </button>
          </div>
        ) : (
          /* ===== SOS Button State ===== */
          <div className="text-center py-8">
            <SOSButton onConfirm={handleSOS} loading={sending} />
            <p className="text-slate-400 text-sm mt-6">
              Your GPS location will be shared with emergency services.
            </p>
          </div>
        )}
      </div>

      {/* Emergency Contacts */}
      <div className="bg-white rounded-2xl shadow-lg border border-slate-100 p-6">
        <h3 className="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <MdPhone className="text-slate-500" />
          Emergency Contacts
        </h3>
        <div className="grid grid-cols-2 gap-3">
          {emergencyContacts.map((contact) => (
            <a
              key={contact.number}
              href={`tel:${contact.number}`}
              className={`flex items-center gap-3 p-4 rounded-xl ${contact.color} hover:shadow-md transition-all duration-200`}
            >
              <span className="text-2xl">{contact.icon}</span>
              <div>
                <p className="text-sm font-semibold">{contact.label}</p>
                <p className="text-lg font-bold">{contact.number}</p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SOS;
