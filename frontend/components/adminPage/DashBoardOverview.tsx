export function DashboardTab() {
  const stats = [
    { label: "Total Blogs", value: "128", color: "from-pink-400 to-purple-500" },
    { label: "Active Admins", value: "5", color: "from-blue-400 to-indigo-500" },
    { label: "Subscribers", value: "2,340", color: "from-green-400 to-emerald-500" },
    { label: "Revenue (₹)", value: "45,210", color: "from-yellow-400 to-orange-500" },
  ];

  return (
    <div>
      <h1 className="text-4xl font-bold mb-6">Dashboard Overview</h1>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className={`p-6 rounded-2xl backdrop-blur-xl bg-gradient-to-br ${stat.color} text-white shadow-lg`}
          >
            <h3 className="text-lg font-semibold">{stat.label}</h3>
            <p className="text-3xl font-bold mt-2">{stat.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
}