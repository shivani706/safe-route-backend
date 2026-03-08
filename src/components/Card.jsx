// ===== Reusable Card Component =====
// Used on dashboards to display safety score, quick actions, alert previews, etc.
// Props:
//   title    — card heading
//   icon     — React icon element (optional)
//   color    — accent color (e.g. "blue", "green", "red", "amber")
//   children — card body content
//   onClick  — click handler (optional, makes card clickable)

const colorMap = {
  blue: {
    bg: "bg-blue-50",
    border: "border-blue-200",
    icon: "text-blue-600",
    hover: "hover:shadow-blue-100",
  },
  green: {
    bg: "bg-green-50",
    border: "border-green-200",
    icon: "text-green-600",
    hover: "hover:shadow-green-100",
  },
  red: {
    bg: "bg-red-50",
    border: "border-red-200",
    icon: "text-red-600",
    hover: "hover:shadow-red-100",
  },
  amber: {
    bg: "bg-amber-50",
    border: "border-amber-200",
    icon: "text-amber-600",
    hover: "hover:shadow-amber-100",
  },
  slate: {
    bg: "bg-slate-50",
    border: "border-slate-200",
    icon: "text-slate-600",
    hover: "hover:shadow-slate-100",
  },
};

const Card = ({ title, icon, color = "blue", children, onClick }) => {
  const colors = colorMap[color] || colorMap.blue;

  const Component = onClick ? "button" : "div";

  return (
    <Component
      onClick={onClick}
      className={`w-full text-left rounded-xl border ${colors.border} ${colors.bg} p-5 shadow-sm hover:shadow-md ${colors.hover} transition-all duration-200 ${
        onClick ? "cursor-pointer" : ""
      }`}
    >
      {/* Header */}
      <div className="flex items-center gap-3 mb-3">
        {icon && (
          <div className={`text-2xl ${colors.icon}`}>{icon}</div>
        )}
        <h3 className="text-lg font-semibold text-slate-800">{title}</h3>
      </div>

      {/* Body */}
      <div className="text-slate-600 text-sm leading-relaxed">{children}</div>
    </Component>
  );
};

export default Card;
