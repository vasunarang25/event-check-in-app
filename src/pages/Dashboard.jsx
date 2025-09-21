// import React, { useEffect, useState } from "react";
// import {
//   PieChart,
//   Pie,
//   Cell,
//   Tooltip,
//   BarChart,
//   Bar,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   ResponsiveContainer,
// } from "recharts";

// const Dashboard = () => {
//   const [stats, setStats] = useState({
//     total: 100,
//     checkedIn: 65,
//     pending: 35,
//     peakTimes: [
//       { time: "9:00", count: 20 },
//       { time: "9:15", count: 30 },
//       { time: "9:30", count: 15 },
//     ],
//   });

//   useEffect(() => {
//     // Simulate API call to fetch stats
//     // fetch("/api/dashboard").then(res => res.json()).then(setStats);
//   }, []);

//   const pieData = [
//     { name: "Checked In", value: stats.checkedIn },
//     { name: "Pending", value: stats.pending },
//   ];

//   const COLORS = ["#4F46E5", "#E5E7EB"];

//   return (
//     <div className="p-6 bg-gray-100 min-h-screen">
//       <h1 className="text-3xl font-bold text-center mb-6">Event Dashboard</h1>

//       <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//         {/* Stats Cards */}
//         <div className="bg-white rounded-2xl shadow-lg p-6 text-center">
//           <h2 className="text-lg font-semibold">Total Participants</h2>
//           <p className="text-2xl font-bold mt-2">{stats.total}</p>
//         </div>
//         <div className="bg-white rounded-2xl shadow-lg p-6 text-center">
//           <h2 className="text-lg font-semibold">Checked In</h2>
//           <p className="text-2xl font-bold mt-2 text-green-600">{stats.checkedIn}</p>
//         </div>
//         <div className="bg-white rounded-2xl shadow-lg p-6 text-center">
//           <h2 className="text-lg font-semibold">Pending</h2>
//           <p className="text-2xl font-bold mt-2 text-red-600">{stats.pending}</p>
//         </div>
//       </div>

//       {/* Charts Section */}
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
//         {/* Pie Chart */}
//         <div className="bg-white rounded-2xl shadow-lg p-6">
//           <h2 className="text-lg font-semibold mb-4">Check-in Status</h2>
//           <ResponsiveContainer width="100%" height={300}>
//             <PieChart>
//               <Pie
//                 data={pieData}
//                 dataKey="value"
//                 nameKey="name"
//                 cx="50%"
//                 cy="50%"
//                 outerRadius={100}
//                 label
//               >
//                 {pieData.map((entry, index) => (
//                   <Cell key={`cell-${index}`} fill={COLORS[index]} />
//                 ))}
//               </Pie>
//               <Tooltip />
//             </PieChart>
//           </ResponsiveContainer>
//         </div>

//         {/* Bar Chart */}
//         <div className="bg-white rounded-2xl shadow-lg p-6">
//           <h2 className="text-lg font-semibold mb-4">Peak Check-In Times</h2>
//           <ResponsiveContainer width="100%" height={300}>
//             <BarChart data={stats.peakTimes}>
//               <CartesianGrid strokeDasharray="3 3" />
//               <XAxis dataKey="time" />
//               <YAxis />
//               <Tooltip />
//               <Bar dataKey="count" fill="#4F46E5" />
//             </BarChart>
//           </ResponsiveContainer>
//         </div>
//       </div>

//       {/* AI Insights */}
//       <div className="bg-white rounded-2xl shadow-lg p-6 mt-8">
//         <h2 className="text-lg font-semibold">AI Insights</h2>
//         <p className="mt-2 text-gray-700">
//           Most participants checked in between <span className="font-bold">9:00 - 9:30 AM</span>.
//         </p>
//       </div>
//     </div>
//   );
// };

// export default Dashboard;


import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

const Dashboard = () => {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/dashboard");
        console.log(res, "resresres")
        setStats(res.data);
      } catch (err) {
        console.error("Error fetching dashboard data:", err);
      }
    };

    fetchStats();
  }, []);

  if (!stats) {
    return <div className="text-center mt-20">Loading dashboard...</div>;
  }

  const pieData = [
    { name: "Checked In", value: stats.checkedIn },
    { name: "Pending", value: stats.pending },
  ];
  const COLORS = ["#4F46E5", "#E5E7EB"];

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-center mb-6">Event Dashboard</h1>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-2xl shadow-lg p-6 text-center">
          <h2 className="text-lg font-semibold">Total Participants</h2>
          <p className="text-2xl font-bold mt-2">{stats.total}</p>
        </div>
        <div className="bg-white rounded-2xl shadow-lg p-6 text-center">
          <h2 className="text-lg font-semibold">Checked In</h2>
          <p className="text-2xl font-bold mt-2 text-green-600">{stats.checkedIn}</p>
        </div>
        <div className="bg-white rounded-2xl shadow-lg p-6 text-center">
          <h2 className="text-lg font-semibold">Pending</h2>
          <p className="text-2xl font-bold mt-2 text-red-600">{stats.pending}</p>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
        {/* Pie */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h2 className="text-lg font-semibold mb-4">Check-in Status</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie data={pieData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100} label>
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Bar */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h2 className="text-lg font-semibold mb-4">Peak Check-In Times</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={stats.peakTimes}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="time" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="count" fill="#4F46E5" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Insights */}
      <div className="bg-white rounded-2xl shadow-lg p-6 mt-8">
        <h2 className="text-lg font-semibold">AI Insights</h2>
        <p className="mt-2 text-gray-700">{stats.insights}</p>
      </div>
    </div>
  );
};

export default Dashboard;
