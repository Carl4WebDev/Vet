import React, { useEffect, useState } from "react";
import { getAppointmentsByVet } from "../api/get/getAppointmentByVet";
import { getVetByClinic } from "../api/get/getVetByClinic";

export default function Schedule() {
  const [open, setOpen] = useState(false);
  const [appointments, setAppointments] = useState([]);
  const [selectedDate, setSelectedDate] = useState(""); // Empty means show all appointments
  const [vets, setVets] = useState([]);
  const [selectedVet, setSelectedVet] = useState(null);

  const clinicId = localStorage.getItem("clinic_id") || 1;

  // 🟡 Fetch veterinarians on mount
  useEffect(() => {
    const fetchVets = async () => {
      const data = await getVetByClinic(clinicId);
      setVets(data);
      if (data.length > 0) {
        setSelectedVet(data[0]); // Default to first vet
      }
    };
    fetchVets();
  }, [clinicId]);

  // 🟡 Fetch appointments every time vet or date changes
  useEffect(() => {
    const fetchAppointments = async () => {
      if (!selectedVet) return;
      const data = await getAppointmentsByVet(selectedVet.vet_id, selectedDate);
      setAppointments(data);
    };
    fetchAppointments();
  }, [selectedVet, selectedDate]);

  const formatTimeRange = (start, end) => {
    const format = (t) => {
      const [h, m] = t.split(":");
      const date = new Date();
      date.setHours(h);
      date.setMinutes(m);
      return date.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });
    };
    return `${format(start)} - ${format(end)}`;
  };

  const getRowColor = (status) => {
    switch (status) {
      case "Complete":
        return "bg-green-200";
      case "In-progress":
      case "Scheduled":
        return "bg-blue-200";
      case "Waiting":
        return "bg-yellow-200";
      case "Cancelled":
        return "bg-red-200";
      default:
        return "bg-gray-100";
    }
  };

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
              {[...Array(30)].map((_, i) => {
                const dayNum = i + 1;
                const dateStr = `2024-09-${String(dayNum).padStart(2, "0")}`;
                const isSelected = selectedDate === dateStr;
                return (
                  <div
                    key={i}
                    onClick={
                      () => setSelectedDate(isSelected ? "" : dateStr) // toggle off if selected again
                    }
                    className={`py-1 rounded cursor-pointer ${
                      isSelected
                        ? "bg-blue-200 text-blue-800 font-bold"
                        : "hover:bg-gray-200"
                    }`}
                  >
                    {dayNum}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Vet selection */}
          <button
            onClick={() => setOpen(!open)}
            className="w-full bg-gray-300 rounded py-2 font-medium"
          >
            {selectedVet
              ? `Vet. ${selectedVet.vet_name}`
              : "Select Veterinarian"}
          </button>

          {open && (
            <div className="w-full text-center mt-2 border rounded bg-white shadow text-sm">
              {vets.map((vet) => (
                <div
                  key={vet.vet_id}
                  onClick={() => {
                    setSelectedVet(vet);
                    setOpen(false);
                  }}
                  className="w-full rounded py-2 font-medium hover:bg-blue-400 cursor-pointer"
                >
                  {vet.vet_name}
                </div>
              ))}
            </div>
          )}

          <button className="w-full bg-gray-300 rounded py-2 font-medium">
            Pending Appointments
          </button>
          <button className="w-full bg-gray-300 rounded py-2 font-medium">
            Block Time
          </button>
        </div>

        {/* Right Side */}
        <div className="w-full lg:w-2/3 overflow-x-auto">
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
                {appointments.length > 0 ? (
                  appointments.map((row) => (
                    <tr
                      key={row.appointment_id}
                      className={getRowColor(row.status)}
                    >
                      <td className="p-2">
                        {formatTimeRange(row.start_time, row.end_time)}
                      </td>
                      <td className="p-2">{row.customer_name}</td>
                      <td className="p-2 text-blue-600 underline cursor-pointer">
                        {row.pet_name}
                      </td>
                      <td className="p-2">{row.type_name}</td>
                      <td className="p-2">{row.veterinarian_name}</td>
                      <td className="p-2">{row.status}</td>
                      <td className="p-2 text-center">
                        <input type="checkbox" className="w-4 h-4" />
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={7} className="text-center p-4 text-gray-500">
                      No appointments found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
