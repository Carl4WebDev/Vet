// src/pages/vet-freelancer/Schedule.jsx
import React, { useEffect, useState } from "react";
import {
  getAppointmentsByVetFreelancer,
  scheduleAppointment,
  rejectAppointment,
  completeAppointment,
} from "../../api/appointments/getAppointmentsByVetFreelancer";
import { Link } from "react-router-dom";

export default function VetFreelancerSchedule() {
  const [appointments, setAppointments] = useState([]);
  const [filteredAppointments, setFilteredAppointments] = useState([]);
  const [selectedDate, setSelectedDate] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [monthFilter, setMonthFilter] = useState("");
  const [yearFilter, setYearFilter] = useState(new Date().getFullYear());
  const [highlightedDates, setHighlightedDates] = useState(new Set());
  const [activeRow, setActiveRow] = useState(null);
  const [viewingPending, setViewingPending] = useState(false);

  // Calendar
  const [calendarMonth, setCalendarMonth] = useState(new Date().getMonth());
  const [calendarYear, setCalendarYear] = useState(new Date().getFullYear());
  const vetId = localStorage.getItem("vet_id");

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  // 🩺 Fetch appointments (corrected + highlights working)
  useEffect(() => {
    const fetchAppointments = async () => {
      if (!vetId) return;

      try {
        const query =
          selectedDate || searchTerm || `${yearFilter}-${monthFilter}`;
        const data = await getAppointmentsByVetFreelancer(vetId, query);

        const now = new Date();

        // ✅ Normalize ISO + filter out past appointments
        const upcoming = data.filter((appt) => {
          if (!appt.date || !appt.end_time) return false;

          // Parse the ISO date string safely (keeps timezone)
          const apptDate = new Date(appt.date);
          const [h, m] = appt.end_time.split(":").map(Number);
          apptDate.setHours(h, m, 0, 0);

          // Keep only today or future
          return apptDate >= now;
        });

        setAppointments(upcoming);
        setFilteredAppointments(upcoming);

        // ✅ Build highlighted date strings from *upcoming* appointments
        const highlightDates = new Set(
          upcoming.map((a) => {
            const apptDate = new Date(a.date);
            const year = apptDate.getFullYear();
            const month = String(apptDate.getMonth() + 1).padStart(2, "0");
            const day = String(apptDate.getDate()).padStart(2, "0");
            return `${year}-${month}-${day}`;
          })
        );

        setHighlightedDates(highlightDates);
      } catch (err) {
        console.error("❌ Error fetching appointments:", err);
      }
    };

    fetchAppointments();
  }, [vetId, selectedDate, searchTerm, monthFilter, yearFilter]);

  // 🔶 Pending view toggle
  const handlePending = () => {
    setFilteredAppointments(appointments.filter((a) => a.status === "Pending"));
    setViewingPending(true);
  };
  const showAll = () => {
    setFilteredAppointments(appointments);
    setViewingPending(false);
  };

  // 🕒 Format time
  const formatTimeRange = (start, end) => {
    const fmt = (t) => {
      const [h, m] = t.split(":");
      const d = new Date();
      d.setHours(h);
      d.setMinutes(m);
      return d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    };
    return `${fmt(start)} - ${fmt(end)}`;
  };

  // 🎨 Row color
  const getRowColor = (status) => {
    switch (status) {
      case "Complete":
        return "bg-green-200";
      case "Scheduled":
      case "In-progress":
        return "bg-blue-200";
      case "Pending":
        return "bg-yellow-200";
      case "Cancelled":
        return "bg-red-200";
      default:
        return "bg-gray-100";
    }
  };

  // 📅 Calendar logic
  const daysInMonth = new Date(calendarYear, calendarMonth + 1, 0).getDate();
  const firstDay = new Date(calendarYear, calendarMonth, 1).getDay();
  const today = new Date();

  const handlePrevMonth = () => {
    if (calendarMonth === 0) {
      setCalendarMonth(11);
      setCalendarYear((y) => y - 1);
    } else setCalendarMonth((m) => m - 1);
  };
  const handleNextMonth = () => {
    if (calendarMonth === 11) {
      setCalendarMonth(0);
      setCalendarYear((y) => y + 1);
    } else setCalendarMonth((m) => m + 1);
  };

  const handleDayClick = (day) => {
    const formatted = `${calendarYear}-${String(calendarMonth + 1).padStart(
      2,
      "0"
    )}-${String(day).padStart(2, "0")}`;
    setSelectedDate((prev) => (prev === formatted ? "" : formatted));
  };

  return (
    <div className="min-h-screen bg-white p-4">
      <h1 className="text-xl font-semibold mb-4">My Schedule</h1>

      {/* 🔍 Search */}
      <div className="flex flex-col sm:flex-row gap-4 mb-4">
        <div className="w-full sm:w-96 bg-gray-200 rounded-full px-4 py-2 flex items-center">
          <input
            type="text"
            placeholder="Search by day, month, or year..."
            className="w-full bg-transparent focus:outline-none"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-4">
        {/* 📅 Calendar */}
        <div className="flex flex-col gap-4 w-full lg:w-1/3">
          <div className="bg-white rounded-md shadow p-4">
            <div className="flex justify-between items-center mb-2">
              <button
                onClick={handlePrevMonth}
                className="text-gray-600 hover:text-black"
              >
                ←
              </button>
              <div className="text-sm font-semibold">
                {monthNames[calendarMonth]} {calendarYear}
              </div>
              <button
                onClick={handleNextMonth}
                className="text-gray-600 hover:text-black"
              >
                →
              </button>
            </div>

            {/* Calendar grid */}
            <div className="grid grid-cols-7 text-center gap-1 text-xs">
              {["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"].map((d) => (
                <div key={d} className="font-medium">
                  {d}
                </div>
              ))}

              {Array.from({ length: firstDay }).map((_, i) => (
                <div key={`empty-${i}`} />
              ))}

              {Array.from({ length: daysInMonth }).map((_, i) => {
                const dayNum = i + 1;
                const formatted = `${calendarYear}-${String(
                  calendarMonth + 1
                ).padStart(2, "0")}-${String(dayNum).padStart(2, "0")}`;
                const selected = selectedDate === formatted;
                const hasAppointment = highlightedDates.has(formatted);

                // 🩶 Gray out past days
                const dayDate = new Date(calendarYear, calendarMonth, dayNum);
                const isPast =
                  dayDate.setHours(0, 0, 0, 0) < today.setHours(0, 0, 0, 0);

                return (
                  <div
                    key={dayNum}
                    onClick={() => !isPast && handleDayClick(dayNum)}
                    className={`py-1 rounded border cursor-pointer ${
                      isPast
                        ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                        : selected
                        ? "bg-blue-500 text-white font-bold"
                        : hasAppointment
                        ? "bg-blue-200 text-blue-800 font-semibold"
                        : "hover:bg-gray-200"
                    }`}
                  >
                    {dayNum}
                  </div>
                );
              })}
            </div>
          </div>

          {/* 🧑‍⚕️ Vet name */}
          <div className="w-full bg-gray-200 rounded py-2 text-center font-medium">
            Vet. {appointments[0]?.veterinarian_name || "Myself"}
          </div>

          {/* 🟡 Pending button */}
          <button
            onClick={handlePending}
            className={`w-full rounded py-2 font-medium ${
              viewingPending ? "bg-yellow-400" : "bg-gray-300"
            }`}
          >
            Pending Appointments
          </button>
          {viewingPending && (
            <button
              onClick={showAll}
              className="w-full bg-gray-200 rounded py-2 font-medium"
            >
              Show All
            </button>
          )}
        </div>

        {/* 🧾 Table */}
        <div className="w-full lg:w-2/3 overflow-x-auto">
          <div className="bg-white rounded-md shadow overflow-x-auto">
            <table className="w-full table-auto text-sm">
              <thead>
                <tr className="bg-gray-100 text-left">
                  <th className="p-2 font-medium">Time</th>
                  <th className="p-2 font-medium">Customer</th>
                  <th className="p-2 font-medium">Pet</th>
                  <th className="p-2 font-medium">Reason</th>
                  <th className="p-2 font-medium">Status</th>
                  <th className="p-2 text-center">✔</th>
                </tr>
              </thead>
              <tbody>
                {filteredAppointments.length ? (
                  filteredAppointments.map((row) => (
                    <tr
                      key={row.appointment_id}
                      className={getRowColor(row.status)}
                    >
                      <td className="p-2">
                        {formatTimeRange(row.start_time, row.end_time)}
                      </td>
                      <td className="p-2">{row.customer_name}</td>
                      <td className="p-2 text-blue-600 underline cursor-pointer">
                        <Link
                          to={`/vet-freelancer/home/pet-details/${row.pet_id}`}
                        >
                          {row.pet_name}
                        </Link>
                      </td>
                      <td className="p-2">{row.type_name}</td>
                      <td className="p-2">{row.status}</td>
                      <td className="p-2 text-center">
                        <input
                          type="checkbox"
                          className="w-4 h-4"
                          checked={activeRow === row.appointment_id}
                          onChange={() =>
                            setActiveRow(
                              activeRow === row.appointment_id
                                ? null
                                : row.appointment_id
                            )
                          }
                        />

                        {/* Action buttons */}
                        {activeRow === row.appointment_id && (
                          <div className="flex flex-col items-center gap-1 mt-1">
                            {row.status === "Pending" && (
                              <>
                                <button
                                  onClick={async () => {
                                    await scheduleAppointment(
                                      row.appointment_id
                                    );
                                    window.location.reload();
                                  }}
                                  className="bg-blue-500 text-white px-2 py-1 rounded text-xs w-20"
                                >
                                  Schedule
                                </button>
                                <button
                                  onClick={async () => {
                                    await rejectAppointment(row.appointment_id);
                                    window.location.reload();
                                  }}
                                  className="bg-red-500 text-white px-2 py-1 rounded text-xs w-20"
                                >
                                  Reject
                                </button>
                              </>
                            )}
                            {row.status === "Scheduled" && (
                              <button
                                onClick={async () => {
                                  await completeAppointment(row.appointment_id);
                                  window.location.reload();
                                }}
                                className="bg-green-600 text-white px-2 py-1 rounded text-xs w-20"
                              >
                                Done
                              </button>
                            )}
                          </div>
                        )}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="text-center p-4 text-gray-500">
                      No upcoming appointments.
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
