type ShimmerProps = {
  className?: string;
};

export function Skeleton({ className = "" }: ShimmerProps) {
  return (
    <div
      className={`animate-pulse bg-slate-200/80 rounded-xl ${className}`}
      style={{
        backgroundImage: "linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.4) 50%, rgba(255,255,255,0) 100%)",
        backgroundSize: "200% 100%",
        animation: "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite, shimmer 1.5s infinite"
      }}
    />
  );
}

export function Spinner({ className = "w-6 h-6 text-indigo-600" }: ShimmerProps) {
  return (
    <svg
      className={`animate-spin ${className}`}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      />
    </svg>
  );
}

export default Spinner;
