type Props = {
  title: string;
  value: string;
};

function DashboardCard({
  title,
  value,
}: Props) {

  return (

    <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 hover:shadow-xl transition duration-300 hover:-translate-y-1">

      <h2 className="text-gray-500 text-lg font-medium">
        {title}
      </h2>

      <p className="text-5xl font-extrabold text-blue-500 mt-6">
        {value}
      </p>

    </div>

  );
}

export default DashboardCard;