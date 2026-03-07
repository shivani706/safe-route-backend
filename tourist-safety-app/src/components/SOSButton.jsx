// ===== SOS Button Component =====
// Large emergency button with pulse animation.
// Shows a confirmation dialog before sending the SOS.

import { useState } from "react";
import { MdEmergency } from "react-icons/md";

const SOSButton = ({ onConfirm, loading = false }) => {
  const [showConfirm, setShowConfirm] = useState(false);

  const handleClick = () => {
    setShowConfirm(true);
  };

  const handleConfirm = () => {
    setShowConfirm(false);
    if (onConfirm) onConfirm();
  };

  const handleCancel = () => {
    setShowConfirm(false);
  };

  return (
    <div className="flex flex-col items-center gap-4">
      {/* Main SOS Button */}
      <button
        onClick={handleClick}
        disabled={loading}
        className="relative w-40 h-40 sm:w-48 sm:h-48 rounded-full bg-red-600 text-white flex flex-col items-center justify-center shadow-lg hover:bg-red-700 active:scale-95 transition-all duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {/* Pulse animation ring */}
        <span className="absolute inset-0 rounded-full bg-red-400 animate-ping opacity-20"></span>
        <span className="absolute inset-2 rounded-full bg-red-500 animate-pulse opacity-30"></span>

        <MdEmergency className="text-5xl sm:text-6xl mb-1 relative z-10" />
        <span className="text-xl sm:text-2xl font-bold relative z-10">
          {loading ? "Sending..." : "SOS"}
        </span>
        <span className="text-xs opacity-80 relative z-10">Tap for help</span>
      </button>

      {/* Confirmation Modal */}
      {showConfirm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 max-w-sm w-full shadow-2xl animate-[fadeIn_0.2s_ease-out]">
            <div className="text-center">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <MdEmergency className="text-3xl text-red-600" />
              </div>
              <h3 className="text-xl font-bold text-slate-800 mb-2">
                Confirm Emergency?
              </h3>
              <p className="text-slate-500 text-sm mb-6">
                This will send your current location to nearby authorities and
                emergency services. Only use in real emergencies.
              </p>
              <div className="flex gap-3">
                <button
                  onClick={handleCancel}
                  className="flex-1 py-3 rounded-xl border border-slate-300 text-slate-600 font-medium hover:bg-slate-50 transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  onClick={handleConfirm}
                  className="flex-1 py-3 rounded-xl bg-red-600 text-white font-medium hover:bg-red-700 transition-colors cursor-pointer"
                >
                  Send SOS
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SOSButton;
