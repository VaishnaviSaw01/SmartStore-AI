type Props = {
  title: string;
  value: string;
  icon?: React.ReactNode;
  change?: string;
  positive?: boolean;
  accent?: string;
};

function DashboardCard({
  title,
  value,
  icon,
  change,
  positive = true,
  accent = "#6366f1",
}: Props) {
  return (
    <div
      className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 relative overflow-hidden"
    >
      {/* Subtle top accent bar */}
      <div
        className="absolute top-0 left-0 right-0 h-0.5 rounded-t-2xl"
        style={{ background: accent }}
      />

      <div className="flex items-start justify-between mb-5">
        <p className="text-slate-500 text-sm font-medium">{title}</p>
        {icon && (
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
            style={{ background: `${accent}18`, color: accent }}
          >
            {icon}
          </div>
        )}
      </div>

      <p
        style={{ fontFamily: "'Sora', sans-serif" }}
        className="text-3xl font-bold text-slate-900 mb-2"
      >
        {value}
      </p>

      {change && (
        <div
          className={`inline-flex items-center gap-1 text-xs font-medium px-2 py-1 rounded-lg ${
            positive
              ? "bg-emerald-50 text-emerald-700"
              : "bg-red-50 text-red-600"
          }`}
        >
          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
            {positive ? (
              <polyline points="18 15 12 9 6 15" />
            ) : (
              <polyline points="6 9 12 15 18 9" />
            )}
          </svg>
          {change} vs last month
        </div>
      )}
    </div>
  );
}

export default DashboardCard;
