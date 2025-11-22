import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { motion } from "framer-motion";

export function DashboardTab() {
  const stats = [
    { label: "Total Blogs", value: "128", color: "from-pink-400 to-purple-500" },
    { label: "Active Admins", value: "5", color: "from-blue-400 to-indigo-500" },
    { label: "Subscribers", value: "2,340", color: "from-green-400 to-emerald-500" },
    { label: "Revenue (₹)", value: "45,210", color: "from-yellow-400 to-orange-500" },
  ];

  const monthlyRevenue = [
    { month: "Jan", revenue: 4000 },
    { month: "Feb", revenue: 3200 },
    { month: "Mar", revenue: 5000 },
    { month: "Apr", revenue: 4500 },
    { month: "May", revenue: 7000 },
    { month: "Jun", revenue: 6500 },
  ];

  const subscriberGrowth = [
    { month: "Jan", users: 200 },
    { month: "Feb", users: 350 },
    { month: "Mar", users: 500 },
    { month: "Apr", users: 800 },
    { month: "May", users: 1200 },
    { month: "Jun", users: 1800 },
  ];

  const subscriptionType = [
    { name: "Basic", value: 400 },
    { name: "Premium", value: 900 },
    { name: "Enterprise", value: 300 },
  ];

  const pieColors = ["#ec4899", "#6366f1", "#22c55e"];

  // Glassmorphism class reuse
  const glass = 
    "bg-white/10 dark:bg-white/5 border border-white/20 backdrop-blur-xl shadow-2xl rounded-2xl";

  return (
    <div>
      <h1 className="text-4xl font-bold mb-6">Dashboard Overview</h1>

      {/* Stats Cards */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className={`p-6 rounded-2xl backdrop-blur-xl bg-gradient-to-br ${stat.color} text-white shadow-xl hover:scale-105 transition-all cursor-pointer`}
          >
            <h3 className="text-lg font-semibold">{stat.label}</h3>
            <p className="text-3xl font-bold mt-2">{stat.value}</p>
          </motion.div>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid lg:grid-cols-2 gap-8 mt-10">

        {/* Bar Chart */}
        <motion.div
          whileHover={{ scale: 1.02 }}
          className={`p-6 ${glass}`}
        >
          <h2 className="text-xl font-semibold mb-4">Monthly Revenue</h2>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={monthlyRevenue}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.2)" />
              <XAxis dataKey="month" stroke="white" />
              <YAxis stroke="white" />
              <Tooltip contentStyle={{ background: "rgba(0,0,0,0.6)", borderRadius: "10px" }} />
              <Bar dataKey="revenue" fill="#6366f1" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Line Chart */}
        <motion.div
          whileHover={{ scale: 1.02 }}
          className={`p-6 ${glass}`}
        >
          <h2 className="text-xl font-semibold mb-4">Subscriber Growth</h2>
          <ResponsiveContainer width="100%" height={280}>
            <LineChart data={subscriberGrowth}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.2)" />
              <XAxis dataKey="month" stroke="white" />
              <YAxis stroke="white" />
              <Tooltip contentStyle={{ background: "rgba(0,0,0,0.6)", borderRadius: "10px" }} />
              <Line type="monotone" dataKey="users" stroke="#22c55e" strokeWidth={3} dot />
            </LineChart>
          </ResponsiveContainer>
        </motion.div>
      </div>

      {/* Pie Chart */}
      <motion.div
        whileHover={{ scale: 1.02 }}
        className={`p-6 mt-10 ${glass}`}
      >
        <h2 className="text-xl font-semibold mb-4">Subscription Type Distribution</h2>
        <div className="w-full flex justify-center">
          <ResponsiveContainer width="60%" height={300}>
            <PieChart>
              <Pie
                data={subscriptionType}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={3}
                dataKey="value"
              >
                {subscriptionType.map((entry, index) => (
                  <Cell key={index} fill={pieColors[index]} />
                ))}
              </Pie>
              <Tooltip contentStyle={{ background: "rgba(0,0,0,0.6)", borderRadius: "10px" }} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </motion.div>
    </div>
  );
}
