type Props = {
  title: string;
  value: string;
};

function DashboardCard({ title, value }: Props) {
  return (
    <div className="bg-white p-6 rounded-2xl shadow">

      <h2 className="text-gray-500 text-lg">
        {title}
      </h2>

      <p className="text-3xl font-bold mt-2">
        {value}
      </p>

    </div>
  );
}

export default DashboardCard;