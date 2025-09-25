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
  const petData = {
    labels: ["Cats", "Dogs", "Others"],
    datasets: [
      {
        data: [37.5, 37.5, 25],
        backgroundColor: [
          "#FF6384", // Red for Cats
          "#36A2EB", // Blue for Dogs
          "#FFCE56", // Yellow for Others
        ],
        borderWidth: 1,
      },
    ],
  };

  // Visit Purpose Data
  const visitData = {
    labels: ["Check up", "Grooming", "Vaccination", "Admission"],
    datasets: [
      {
        data: [35, 25, 30, 10], // Sample percentages - adjust these to your actual data
        backgroundColor: [
          "#FF6384", // Red for Check up
          "#36A2EB", // Blue for Grooming
          "#FFCE56", // Yellow for Vaccination
          "#4BC0C0", // Teal for Admission
        ],
        borderWidth: 1,
      },
    ],
  };

  const appointmentData = {
    labels: [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ],
    datasets: [
      {
        label: "Showed Up",
        data: [8, 12, 5, 10, 18, 15], // Sample data for clients who attended
        backgroundColor: "#36A2EB", // Blue
        borderWidth: 1,
      },
      {
        label: "No Show",
        data: [4, 7, 3, 5, 4, 3], // Sample data for clients who didn't attend
        backgroundColor: "#FF6384", // Pink
        borderWidth: 1,
      },
    ],
  };

  const tableData = {
    headers: [
      "Time",
      "Customer Name",
      "Pet name",
      "Reason",
      "Veterinarian",
      "Status",
    ],
    rows: [
      [
        "10:30 AM - 11:00 AM",
        "Jorgie S Macron",
        "Horgie Jr.",
        "Check Up",
        "Dr.Jorgie Y. Swerte",
        "complete",
      ],
      [
        "11:00 AM - 10:30 AM",
        "Jack S. Sparrow",
        "Garfield",
        "Surgery",
        "Dr.Jorgie Y. Swerte",
        "in-progress",
      ],
      [
        "12:00 PM - 12:00 PM",
        "Jorgie S Macron",
        "Blacky",
        "Dental Care",
        "Dr.Jorgie Y. Swerte",
        "pending",
      ],
      ["12:00 PM - 12:30 PM", "Blocked", "", "", "", ""],
      ["12:30 PM - 1:00 PM", "Blocked", "", "", "", ""],
      ["1:00 PM - 2:00 PM", "Open", "", "", "", ""],
      ["2:00 PM - 3:00 PM", "Open", "", "", "", ""],
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
                <th key={index} className="p-2 md:p-4  text-center">
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {tableData.rows.map((row, rowIndex) => {
              // Get the status value (assuming it's the last column)
              const status = row[row.length - 1].toLowerCase();

              return (
                <tr
                  key={rowIndex}
                  className={rowIndex % 2 === 0 ? "bg-white" : "bg-gray-300"}
                >
                  {row.map((cell, cellIndex) => {
                    // Apply special styling only to status column (last column)
                    const isStatusColumn = cellIndex === row.length - 1;
                    let statusClass = "";

                    if (isStatusColumn) {
                      if (status === "complete")
                        statusClass = "bg-blue-200 rounded-lg";
                      else if (status === "in-progress")
                        statusClass = "bg-green-200 rounded-lg";
                      else if (status === "pending")
                        statusClass = "bg-yellow-200 rounded-lg";
                    }

                    return (
                      <td
                        key={cellIndex}
                        className={`p-2 md:p-4 ${
                          isStatusColumn ? statusClass : ""
                        }`}
                      >
                        {cell}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
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
            <Pie
              data={petData}
              options={{
                plugins: {
                  legend: {
                    position: "right",
                  },
                  tooltip: {
                    callbacks: {
                      label: (context) => `${context.label}: ${context.raw}%`,
                    },
                  },
                },
              }}
            />
          </div>
        </div>

        {/* bar graph */}
        <div className="bg-white shadow rounded-lg mt-10 flex flex-col justify-center items-center">
          <h3 className="text-xl font-bold mb-4">Appointment Attendance</h3>
          <div className=" min-w-48 min-h-48 w-full h-96 ">
            <Bar
              data={appointmentData}
              options={{
                indexAxis: "y",
                responsive: true,
                scales: {
                  x: {
                    beginAtZero: true,
                    title: {
                      display: true,
                      text: "Number of Clients",
                    },
                  },
                  y: {
                    title: {
                      display: true,
                      text: "Days/Categories",
                    },
                    // This creates the grouped effect
                    offset: true, // Adds padding between category groups
                  },
                },
                plugins: {
                  legend: {
                    position: "top",
                  },
                },
                // Group bars instead of stacking
                datasets: {
                  bar: {
                    barPercentage: 0.6, // Controls bar width (0.6 = 60% of available space)
                    categoryPercentage: 0.8, // Controls group spacing
                  },
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
            <Pie
              data={visitData}
              options={{
                plugins: {
                  legend: {
                    position: "right",
                  },
                  tooltip: {
                    callbacks: {
                      label: (context) => `${context.label}: ${context.raw}%`,
                    },
                  },
                },
              }}
            />
          </div>
        </div>
        <div className="bg-white shadow w-96 h-96 mt-5 p-2 rounded-lg flex flex-col justify-center items-start gap-10">
          <h1 className="text-3xl font-bold">New Patient: 5</h1>
          <h1 className="text-3xl font-bold">Transferee: 3</h1>
          <h1 className="text-3xl font-bold">Week Visitor: 47</h1>
        </div>
      </div>
    </div>
  );
}

export default DashboardPage;
