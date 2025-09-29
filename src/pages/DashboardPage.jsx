import { Pie, Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";

import { useEffect, useState } from "react";
import { getTodaySchedule } from "../api/get/getTodaySchedule";
import { getPetTypeDistribution } from "../api/get/getPetTypeDistribution";
import { getVisitPurposeDistribution } from "../api/get/getVisitPurposeDistribution";
import { getStats } from "../api/get/getStats";
import { getAttendanceStats } from "../api/get/getAttendanceStats";

// Register ChartJS components
ChartJS.register(
  ArcElement,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend
);

function DashboardPage() {
  const clinicId = localStorage.getItem("clinic_id");
  const [petData, setPetData] = useState(null);
  const [visitData, setVisitData] = useState(null);
  const [stats, setStats] = useState({
    new_patients: 0,
    transferees: 0,
    week_visitors: 0,
  });
  const [attendanceData, setAttendanceData] = useState(null);

  const [schedule, setSchedule] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAttendance = async () => {
      const data = await getAttendanceStats(clinicId);

      setAttendanceData({
        labels: data.map((d) => d.day.trim()), // labels like Monday, Tuesday
        datasets: [
          {
            label: "Showed Up",
            data: data.map((d) => d.showed_up),
            backgroundColor: "#36A2EB",
            borderWidth: 1,
          },
          {
            label: "No Show",
            data: data.map((d) => d.no_show),
            backgroundColor: "#FF6384",
            borderWidth: 1,
          },
        ],
      });
    };

    fetchAttendance();
  }, [clinicId]);
  useEffect(() => {
    const fetchSchedule = async () => {
      try {
        const result = await getTodaySchedule(clinicId);
        setSchedule(result.data || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchSchedule();
  }, [clinicId]);
  useEffect(() => {
    const fetchInsights = async () => {
      // 🐾 Pet Type
      const pets = await getPetTypeDistribution(clinicId);
      setPetData({
        labels: pets.map((p) => p.species), // ✅ species
        datasets: [
          {
            data: pets.map((p) => p.total), // ✅ total
            backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
            borderWidth: 1,
          },
        ],
      });

      // 🏥 Visit Purpose
      const visits = await getVisitPurposeDistribution(clinicId);
      setVisitData({
        labels: visits.map((v) => v.type), // ✅ type
        datasets: [
          {
            data: visits.map((v) => v.total), // ✅ total
            backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0"],
            borderWidth: 1,
          },
        ],
      });

      // 📊 Stats
      const s = await getStats(clinicId);
      setStats(s); // ✅ already matches
    };

    fetchInsights();
  }, [clinicId]);

  const tableData = {
    headers: [
      "Time",
      "Customer Name",
      "Pet name",
      "Reason",
      "Veterinarian",
      "Status",
    ],
  };

  return (
    <div className="font-sans">
      {/* Today Schedule Table */}
      <h1 className="text-2xl font-bold mb-4">Today Schedule</h1>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-400 text-white text-left">
              {tableData.headers.map((header, index) => (
                <th key={index} className="p-2 md:p-4 text-center">
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td
                  colSpan={tableData.headers.length}
                  className="text-center py-4"
                >
                  Loading...
                </td>
              </tr>
            ) : schedule.length === 0 ? (
              <tr>
                <td
                  colSpan={tableData.headers.length}
                  className="text-center py-4"
                >
                  No appointments today
                </td>
              </tr>
            ) : (
              schedule.map((row, rowIndex) => {
                const status = row.status?.toLowerCase();
                let statusClass = "";

                if (status === "complete")
                  statusClass = "bg-blue-200 rounded-lg";
                else if (status === "in-progress")
                  statusClass = "bg-green-200 rounded-lg";
                else if (status === "pending")
                  statusClass = "bg-yellow-200 rounded-lg";

                return (
                  <tr
                    key={rowIndex}
                    className={rowIndex % 2 === 0 ? "bg-white" : "bg-gray-300"}
                  >
                    <td className="p-2 md:p-4">
                      {row.start_time} - {row.end_time}
                    </td>
                    <td className="p-2 md:p-4">{row.client_name}</td>
                    <td className="p-2 md:p-4">{row.pet_name}</td>
                    <td className="p-2 md:p-4">
                      {row.type || "Not Specified"}
                    </td>
                    <td className="p-2 md:p-4">{row.name}</td>
                    <td className={`p-2 md:p-4 ${statusClass}`}>
                      {row.status}
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
      <hr className="my-4 border-gray-300" />

      <div className="grid grid-cols-1 md:grid-cols-2">
        {/* Pie Chart */}
        <div className="bg-white shadow w-96 h-96 p-2 rounded-lg flex flex-col justify-center items-center">
          <h2 className="text-xl font-bold mb-4">
            Type of Pet Admitted to Clinic
          </h2>
          <div className="min-w-48 min-h-48 w-full h-96">
            {petData ? (
              <Pie
                data={petData}
                options={{
                  plugins: {
                    legend: { position: "right" },
                    tooltip: {
                      callbacks: {
                        label: (context) => `${context.label}: ${context.raw}%`,
                      },
                    },
                  },
                }}
              />
            ) : (
              <p>Loading...</p>
            )}
          </div>
        </div>

        {/* bar graph */}
        <div className="bg-white shadow rounded-lg mt-10 flex flex-col justify-center items-center">
          <h3 className="text-xl font-bold mb-4">Appointment Attendance</h3>
          <div className=" min-w-48 min-h-48 w-full h-96 ">
            <Bar
              data={attendanceData || { labels: [], datasets: [] }}
              options={{
                indexAxis: "y",
                responsive: true,
                scales: {
                  x: {
                    beginAtZero: true,
                    title: { display: true, text: "Number of Clients" },
                  },
                  y: { title: { display: true, text: "Days" }, offset: true },
                },
                plugins: { legend: { position: "top" } },
                datasets: {
                  bar: { barPercentage: 0.6, categoryPercentage: 0.8 },
                },
              }}
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2">
        {/* Purpose of visit pie graph */}
        <div className="bg-white shadow w-96 h-96 p-2 rounded-lg flex flex-col justify-center items-center">
          <h2 className="text-xl font-bold mb-4">
            Purpose of Visit in the past weeks
          </h2>
          <div className="min-w-48 min-h-48 w-full h-96">
            {visitData ? (
              <Pie
                data={visitData}
                options={{
                  plugins: {
                    legend: { position: "right" },
                    tooltip: {
                      callbacks: {
                        label: (context) => `${context.label}: ${context.raw}%`,
                      },
                    },
                  },
                }}
              />
            ) : (
              <p>Loading...</p>
            )}
          </div>
        </div>

        {/* Stats */}
        <div className="bg-white shadow w-96 h-96 mt-5 p-2 rounded-lg flex flex-col justify-center items-start gap-10">
          <h1 className="text-3xl font-bold">
            New Patient: {stats.new_patients}
          </h1>
          <h1 className="text-3xl font-bold">
            Transferee: {stats.transferees}
          </h1>
          <h1 className="text-3xl font-bold">
            Week Visitor: {stats.week_visitors}
          </h1>
        </div>
      </div>
    </div>
  );
}

export default DashboardPage;
