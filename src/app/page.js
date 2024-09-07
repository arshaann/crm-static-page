'use client'
import React, { useState, useEffect } from "react";
import { Pie, Line, Bar } from "react-chartjs-2";
import 'chart.js/auto'; // For charts

const dummyData = {
  daily: { pie: [30, 40, 30], line: [65, 59, 80, 81, 56], bar: [50, 40, 60, 70, 90] },
  weekly: { pie: [50, 30, 20], line: [28, 48, 40, 19, 86], bar: [60, 50, 70, 80, 100] },
  monthly: { pie: [20, 50, 30], line: [85, 72, 90, 100, 40], bar: [70, 60, 80, 90, 110] }
};

export default function Home() {
  const [timeFrame, setTimeFrame] = useState("daily");
  const [data, setData] = useState(dummyData[timeFrame]);

  useEffect(() => {
    setData(dummyData[timeFrame]);
  }, [timeFrame]);

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-3xl font-bold text-center mb-8">CRM Statistics Dashboard</h1>
      
      {/* Time Selector */}
      <div className="flex justify-center mb-6">
        {["daily", "weekly", "monthly"].map((frame) => (
          <button
            key={frame}
            className={`mx-2 py-2 px-4 rounded ${frame === timeFrame ? "bg-blue-500 text-white" : "bg-white text-blue-500 border border-blue-500"}`}
            onClick={() => setTimeFrame(frame)}
          >
            {frame.charAt(0).toUpperCase() + frame.slice(1)}
          </button>
        ))}
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-md text-center">
          <h2 className="text-xl font-semibold mb-4">Total Sales</h2>
          <p className="text-3xl font-bold">{data.pie.reduce((a, b) => a + b)}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md text-center">
          <h2 className="text-xl font-semibold mb-4">Active Users</h2>
          <p className="text-3xl font-bold">{data.line.reduce((a, b) => a + b)}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md text-center">
          <h2 className="text-xl font-semibold mb-4">New Signups</h2>
          <p className="text-3xl font-bold">{data.bar.reduce((a, b) => a + b)}</p>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold mb-4">Pie Chart</h2>
          <Pie data={{
            labels: ["Product A", "Product B", "Product C"],
            datasets: [{ data: data.pie, backgroundColor: ["#ff6384", "#36a2eb", "#ffce56"] }]
          }} />
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold mb-4">Line Chart</h2>
          <Line data={{
            labels: ["January", "February", "March", "April", "May"],
            datasets: [{ label: "Monthly Growth", data: data.line, borderColor: "#36a2eb", fill: false }]
          }} />
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold mb-4">Bar Chart</h2>
          <Bar data={{
            labels: ["Week 1", "Week 2", "Week 3", "Week 4", "Week 5"],
            datasets: [{ label: "Weekly Revenue", data: data.bar, backgroundColor: "#ff6384" }]
          }} />
        </div>
      </div>
    </div>
  );
}
