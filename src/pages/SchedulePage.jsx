import React from "react";

export default function Schedule() {
  return (
    <div className="min-h-screen bg-white p-4">
      <h1 className="text-xl font-semibold mb-4">Schedule</h1>

      {/* Search Bar */}
      <div className="flex justify-start mb-4">
        <div className="w-full sm:w-96 bg-gray-200 rounded-full px-4 py-2 flex items-center">
          <input
            type="text"
            placeholder="Search..."
            className="w-full bg-transparent focus:outline-none"
          />
        </div>
      </div>
      <div className="flex flex-col lg:flex-row gap-4">
        {/* Left Side */}
        <div className="flex flex-col gap-4 w-full lg:w-1/3">
          {/* Calendar */}
          <div className="bg-white rounded-md shadow p-4">
            <div className="text-sm font-semibold mb-2">September 2024</div>
            <div className="grid grid-cols-7 text-center gap-1 text-xs">
              {["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"].map((day) => (
                <div key={day} className="font-medium">
                  {day}
                </div>
              ))}
              {[...Array(30)].map((_, i) => (
                <div
                  key={i}
                  className={`py-1 rounded cursor-pointer ${
                    i === 25
                      ? "bg-blue-200 text-blue-800 font-bold"
                      : "hover:bg-gray-200"
                  }`}
                >
                  {i + 1}
                </div>
              ))}
            </div>
          </div>

          {/* Buttons */}
          <button className="w-full bg-gray-300 rounded py-2 font-medium">
            Pending Appointments
          </button>
          <button className="w-full bg-gray-300 rounded py-2 font-medium">
            Block Time
          </button>
        </div>

        {/* Right Side */}
        <div className="w-full lg:w-2/3 overflow-x-auto">
          {/* Schedule Table */}
          <div className="bg-white rounded-md shadow overflow-x-auto">
            <table className="w-full table-auto text-sm">
              <thead>
                <tr className="bg-gray-100 text-left">
                  <th className="p-2 font-medium">Time</th>
                  <th className="p-2 font-medium">Customer Name</th>
                  <th className="p-2 font-medium">Petname</th>
                  <th className="p-2 font-medium">Reason</th>
                  <th className="p-2 font-medium">Veterinarian</th>
                  <th className="p-2 font-medium">Status</th>
                  <th className="p-2 font-medium text-center">✔</th>
                </tr>
              </thead>
              <tbody>
                {[
                  {
                    time: "10:30 AM - 11:00 AM",
                    name: "Jorge S Macon",
                    pet: "Horgie Jr.",
                    reason: "Check Up",
                    vet: "Dr. Jorge M. Martinez",
                    status: "Complete",
                    color: "bg-green-200",
                  },
                  {
                    time: "11:00 AM - 11:30 AM",
                    name: "Jack S. Sparrow",
                    pet: "Garfield",
                    reason: "Surgery",
                    vet: "Dr. Jorge M. Martinez",
                    status: "In-progress",
                    color: "bg-blue-200",
                  },
                  {
                    time: "11:30 AM - 12:00 PM",
                    name: "Jorge S Macon",
                    pet: "Blocky",
                    reason: "Dental Care",
                    vet: "Dr. Jorge M. Martinez",
                    status: "Waiting",
                    color: "bg-yellow-200",
                  },
                  {
                    time: "12:00 PM - 12:30 PM",
                    name: "",
                    pet: "",
                    reason: "Blocked",
                    vet: "",
                    status: "",
                    color: "bg-gray-200",
                  },
                  {
                    time: "12:30 PM - 1:00 PM",
                    name: "",
                    pet: "",
                    reason: "Blocked",
                    vet: "",
                    status: "",
                    color: "bg-gray-200",
                  },
                  {
                    time: "1:00 PM - 2:00 PM",
                    name: "",
                    pet: "",
                    reason: "Open",
                    vet: "",
                    status: "",
                    color: "bg-gray-100",
                  },
                  {
                    time: "2:00 PM - 3:00 PM",
                    name: "",
                    pet: "",
                    reason: "Open",
                    vet: "",
                    status: "",
                    color: "bg-gray-100",
                  },
                ].map((row, i) => (
                  <tr key={i} className={`${row.color}`}>
                    <td className="p-2">{row.time}</td>
                    <td className="p-2">{row.name}</td>
                    <td className="p-2 text-blue-600 underline cursor-pointer">
                      {row.pet}
                    </td>
                    <td className="p-2">{row.reason}</td>
                    <td className="p-2">{row.vet}</td>
                    <td className="p-2">{row.status}</td>
                    <td className="p-2 text-center">
                      <input type="checkbox" className="w-4 h-4" />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
