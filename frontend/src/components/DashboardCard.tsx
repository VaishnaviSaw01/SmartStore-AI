type Props = {
  title: string;
  value: string;
  growth?: string;
};

function DashboardCard({
  title,
  value,
  growth,
}: Props) {

  return (

    <div className="bg-white p-7 rounded-2xl border border-slate-200 hover:shadow-lg transition-all">

      <div className="flex justify-between items-start mb-5">

        <div className="w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center text-indigo-700 text-xl">
          📊
        </div>

        {growth && (
          <span className="bg-green-100 text-green-700 text-xs px-3 py-1 rounded-full">
            {growth}
          </span>
        )}

      </div>

      <p className="text-sm text-slate-500 uppercase mb-2">
        {title}
      </p>

      <h2 className="text-4xl font-bold text-slate-800">
        {value}
      </h2>

    </div>

  );
}

export default DashboardCard;