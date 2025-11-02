import React, { useState, useEffect } from "react";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";
import { getFreelanceDashboard } from "../../api/dashboard/getFreelanceDashboard";
import { getFreelanceSchedule } from "../../api/dashboard/getFreelanceSchedule";

const DashboardHome = () => {
  const [petTypes, setPetTypes] = useState([]);
  const [contagiousDiseases, setContagiousDiseases] = useState([]);
  const [visitPurpose, setVisitPurpose] = useState([]);
  const [summary, setSummary] = useState({});
  const [schedule, setSchedule] = useState([]);
  const COLORS = ["#ff5c8d", "#4db6e6"];
  const vetId = localStorage.getItem("vet_id");
  const vetName = localStorage.getItem("vet_name");

  useEffect(() => {
    if (!vetId) return;
    (async () => {
      const dashboardData = await getFreelanceDashboard(vetId);
      const scheduleData = await getFreelanceSchedule(vetId);

      setPetTypes(dashboardData.petTypes || []);
      setContagiousDiseases(dashboardData.contagiousDiseases || []);
      setVisitPurpose(dashboardData.visitPurpose || []);
      setSummary(dashboardData.summary || {});
      setSchedule(scheduleData.schedule || []);
    })();
  }, [vetId]);

  return (
    <div>
      {/* Schedule Table */}
      <div className="overflow-x-auto mb-8">
        <table className="min-w-full border-collapse">
          <thead>
            <tr className="bg-gray-200 text-gray-700 text-left">
              <th className="p-3 text-sm">Time</th>
              <th className="p-3 text-sm">Customer Name</th>
              <th className="p-3 text-sm">Pet Name</th>
              <th className="p-3 text-sm">Reason</th>
              <th className="p-3 text-sm">Veterinarian</th>
              <th className="p-3 text-sm">Status</th>
            </tr>
          </thead>
          <tbody>
            {schedule.length > 0 ? (
              schedule.map((item, index) => (
                <tr key={index} className="border-b">
                  <td className="p-3 text-sm">
                    {item.start_time} - {item.end_time}
                  </td>
                  <td className="p-3 text-sm">{item.client_name}</td>
                  <td className="p-3 text-sm">{item.pet_name}</td>
                  <td className="p-3 text-sm">{item.appointment_type}</td>
                  <td className="p-3 text-sm">{vetName}</td>
                  <td className="p-3 text-sm">{item.status}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center py-6 text-gray-500">
                  No appointments today
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
        <div className="bg-white shadow rounded-lg p-4">
          <h3 className="text-md font-semibold mb-2 text-gray-700">
            Type of Pet Admitted to Clinic
          </h3>
          <PieChart width={280} height={240}>
            <Pie
              data={petTypes}
              dataKey="value"
              cx="50%"
              cy="50%"
              outerRadius={80}
              label
            >
              {petTypes.map((entry, index) => (
                <Cell key={index} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </div>

        <div className="bg-white shadow rounded-lg p-4">
          <h3 className="text-md font-semibold mb-2 text-red-600">
            Contagious Diseases by Pet Type
          </h3>
          <PieChart width={280} height={240}>
            <Pie
              data={contagiousDiseases}
              dataKey="value"
              cx="50%"
              cy="50%"
              outerRadius={80}
              label
            >
              {contagiousDiseases.map((entry, index) => (
                <Cell key={index} fill="#ff7b7b" />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </div>

        <div className="bg-white shadow rounded-lg p-4">
          <h3 className="text-md font-semibold mb-2 text-gray-700">
            Purpose of Visit in the Past Weeks
          </h3>
          <PieChart width={280} height={240}>
            <Pie
              data={visitPurpose}
              dataKey="value"
              cx="50%"
              cy="50%"
              outerRadius={80}
              label
            >
              {visitPurpose.map((entry, index) => (
                <Cell key={index} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </div>
      </div>

      {/* Stats Summary */}
      <div className="mt-8 bg-white shadow rounded-lg p-6 text-gray-700 text-lg font-semibold space-y-2">
        <p>New Patient: {summary.new_patients || 0}</p>
        <p>Transferee: {summary.transferees || 0}</p>
        <p>Week Visitor: {summary.week_visitors || 0}</p>
      </div>
    </div>
  );
};

export default DashboardHome;
