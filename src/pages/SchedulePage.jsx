import React, { useEffect, useState } from "react";
import { getAppointmentsByVet } from "../api/get/getAppointmentByVet";
import { getVetByClinic } from "../api/get/getVetByClinic";

// 🟢 Import individual API calls
import { scheduleAppointment } from "../api/appointments/scheduleAppointment";
import { rejectAppointment } from "../api/appointments/rejectAppointment";
import { completeAppointment } from "../api/appointments/completeAppointment";

export default function Schedule() {
  const [open, setOpen] = useState(false);
  const [appointments, setAppointments] = useState([]);
  const [filteredAppointments, setFilteredAppointments] = useState([]);
  const [selectedDate, setSelectedDate] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [monthFilter, setMonthFilter] = useState("");
  const [yearFilter, setYearFilter] = useState(new Date().getFullYear());
  const [vets, setVets] = useState([]);
  const [selectedVet, setSelectedVet] = useState(null);
  const [highlightedDates, setHighlightedDates] = useState(new Set());
  const [activeRow, setActiveRow] = useState(null);
  const [viewingPending, setViewingPending] = useState(false);
  const [lastCount, setLastCount] = useState(0);
  const [autoRefreshing, setAutoRefreshing] = useState(false); // optional

  // 📅 Calendar states
  const [calendarMonth, setCalendarMonth] = useState(new Date().getMonth());
  const [calendarYear, setCalendarYear] = useState(new Date().getFullYear());

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
  const refreshAppointments = async () => {
    if (!selectedVet) return;

    let query = selectedDate || searchTerm;
    if (!query && monthFilter && yearFilter) {
      query = `${yearFilter}-${monthFilter}`;
    }

    const data = await getAppointmentsByVet(selectedVet.vet_id, query);

    const now = new Date();
    const upcoming = data.filter((appt) => {
      if (!appt.date || !appt.end_time) return true;

      const [hour, minute] = appt.end_time.split(":").map(Number);
      const d = new Date(appt.date);
      d.setHours(hour, minute, 0, 0);

      return d >= now;
    });

    setAppointments(upcoming);
    setFilteredAppointments(upcoming);

    const highlightDates = new Set(
      upcoming.map((a) => {
        if (!a.date) return null;
        const d = new Date(a.date);
        return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(
          2,
          "0"
        )}-${String(d.getDate()).padStart(2, "0")}`;
      })
    );

    setHighlightedDates(highlightDates);
  };
  useEffect(() => {
    if (!selectedVet) return;

    const interval = setInterval(async () => {
      const data = await getAppointmentsByVet(selectedVet.vet_id, "");

      const now = new Date();
      const upcoming = data.filter((appt) => {
        if (!appt.date || !appt.end_time) return true;
        const [h, m] = appt.end_time.split(":").map(Number);
        const d = new Date(appt.date);
        d.setHours(h, m, 0, 0);
        return d >= now;
      });

      if (upcoming.length !== lastCount) {
        setLastCount(upcoming.length);
        refreshAppointments();
      }
    }, 8000);

    return () => clearInterval(interval);
  }, [selectedVet, lastCount]);

  // ⏳ Wait for clinic_id before proceeding
  function waitForClinicId(timeout = 5000) {
    return new Promise((resolve, reject) => {
      const start = Date.now();
      const interval = setInterval(() => {
        const id = localStorage.getItem("clinic_id");
        if (id && id !== "null" && id !== "undefined") {
          clearInterval(interval);
          resolve(id);
        } else if (Date.now() - start > timeout) {
          clearInterval(interval);
          reject(new Error("Timed out waiting for clinic_id"));
        }
      }, 100);
    });
  }

  // 🟢 Fetch veterinarians after clinic_id is ready
  useEffect(() => {
    const fetchVets = async () => {
      try {
        const clinicId = await waitForClinicId();
        const data = await getVetByClinic(clinicId);
        setVets(data);
        if (data.length > 0) setSelectedVet(data[0]);
      } catch (err) {
        console.error("❌ Failed to fetch vets:", err);
      }
    };
    fetchVets();
  }, []);

  useEffect(() => {
    const fetchAppointments = async () => {
      if (!selectedVet) return;

      let query = selectedDate || searchTerm;
      if (!query && monthFilter && yearFilter) {
        query = `${yearFilter}-${monthFilter}`;
      }

      const data = await getAppointmentsByVet(selectedVet.vet_id, query);

      const now = new Date();
      const upcoming = data.filter((appt) => {
        if (!appt.date || !appt.end_time) return true;

        // Combine date + time as local, not UTC
        const [hour, minute] = appt.end_time.split(":").map(Number);
        const localAppt = new Date(appt.date);
        localAppt.setHours(hour, minute, 0, 0);

        return localAppt >= now; // keep only today & future
      });

      setAppointments(upcoming);
      setFilteredAppointments(upcoming);

      const appointmentDates = new Set(
        upcoming
          .map((a) => {
            if (!a.date) return null;
            const localDate = new Date(a.date);
            const year = localDate.getFullYear();
            const month = String(localDate.getMonth() + 1).padStart(2, "0");
            const day = String(localDate.getDate()).padStart(2, "0");
            return `${year}-${month}-${day}`;
          })
          .filter(Boolean)
      );
      setHighlightedDates(appointmentDates);
    };

    fetchAppointments();
  }, [selectedVet, selectedDate, searchTerm, monthFilter, yearFilter]);

  // 🟠 Show only pending appointments
  const handlePendingAppointments = async () => {
    if (!selectedVet) return;
    try {
      const data = appointments.filter((a) => a.status === "Pending");
      setFilteredAppointments(data);
      setViewingPending(true);
    } catch (err) {
      console.error("Failed to fetch pending appointments:", err);
    }
  };

  // 🟣 Show all appointments again
  const showAllAppointments = () => {
    setFilteredAppointments(appointments);
    setViewingPending(false);
  };

  // 🕐 Time formatter
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

  // 🎨 Row color
  const getRowColor = (status) => {
    switch (status) {
      case "Complete":
        return "bg-green-200";
      case "In-progress":
      case "Scheduled":
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

  const handlePrevMonth = () => {
    if (calendarMonth === 0) {
      setCalendarMonth(11);
      setCalendarYear((prev) => prev - 1);
    } else {
      setCalendarMonth((prev) => prev - 1);
    }
  };

  const handleNextMonth = () => {
    if (calendarMonth === 11) {
      setCalendarMonth(0);
      setCalendarYear((prev) => prev + 1);
    } else {
      setCalendarMonth((prev) => prev + 1);
    }
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
      <h1 className="text-xl font-semibold mb-4">Schedule</h1>

      {/* 🔍 Search Bar */}
      <div className="flex flex-col sm:flex-row justify-start items-start sm:items-center gap-4 mb-4">
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
        {/* Left Side */}
        <div className="flex flex-col gap-4 w-full lg:w-1/3">
          {/* 📅 Calendar */}
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

            <div className="grid grid-cols-7 text-center gap-1 text-xs">
              {["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"].map((day) => (
                <div key={day} className="font-medium">
                  {day}
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
                const isSelected = selectedDate === formatted;
                const hasAppointment = highlightedDates.has(formatted);

                return (
                  <div
                    key={dayNum}
                    onClick={() => handleDayClick(dayNum)}
                    className={`py-1 rounded cursor-pointer border ${
                      isSelected
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

          {/* 🩺 Vet Selection */}
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

          {/* 🟡 Pending Button */}
          <button
            onClick={handlePendingAppointments}
            className={`w-full rounded py-2 font-medium ${
              viewingPending ? "bg-yellow-400" : "bg-gray-300"
            }`}
          >
            Pending Appointments
          </button>

          {viewingPending && (
            <button
              onClick={showAllAppointments}
              className="w-full bg-gray-200 rounded py-2 font-medium"
            >
              Show All Appointments
            </button>
          )}

          {/* <button className="w-full bg-gray-300 rounded py-2 font-medium">
            Block Time
          </button> */}
        </div>

        {/* 🧾 Table */}
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
                {filteredAppointments.length > 0 ? (
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
                        {row.pet_name}
                      </td>
                      <td className="p-2">{row.type_name}</td>
                      <td className="p-2">{row.veterinarian_name}</td>
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

                        {activeRow === row.appointment_id && (
                          <div className="flex flex-col items-center gap-1 mt-1">
                            {/* 🟡 Pending Buttons */}
                            {row.status === "Pending" && (
                              <>
                                <button
                                  onClick={async () => {
                                    try {
                                      await scheduleAppointment(
                                        row.appointment_id
                                      );
                                      setAppointments((prev) =>
                                        prev.map((a) =>
                                          a.appointment_id ===
                                          row.appointment_id
                                            ? { ...a, status: "Scheduled" }
                                            : a
                                        )
                                      );
                                      setFilteredAppointments((prev) =>
                                        prev.filter(
                                          (a) =>
                                            a.appointment_id !==
                                            row.appointment_id
                                        )
                                      );
                                      setActiveRow(null);

                                      // ✅ Refresh page after success
                                      window.location.reload();
                                    } catch (err) {
                                      console.error("Failed to schedule:", err);
                                    }
                                  }}
                                  className="bg-blue-500 text-white px-2 py-1 rounded text-xs w-20"
                                >
                                  Schedule
                                </button>

                                <button
                                  onClick={async () => {
                                    try {
                                      await rejectAppointment(
                                        row.appointment_id
                                      );
                                      setAppointments((prev) =>
                                        prev.map((a) =>
                                          a.appointment_id ===
                                          row.appointment_id
                                            ? { ...a, status: "Rejected" }
                                            : a
                                        )
                                      );
                                      setFilteredAppointments((prev) =>
                                        prev.filter(
                                          (a) =>
                                            a.appointment_id !==
                                            row.appointment_id
                                        )
                                      );
                                      setActiveRow(null);
                                    } catch (err) {
                                      console.error("Failed to reject:", err);
                                    }
                                  }}
                                  className="bg-red-500 text-white px-2 py-1 rounded text-xs w-20"
                                >
                                  Reject
                                </button>
                              </>
                            )}

                            {/* 🔵 Scheduled → Done */}
                            {row.status === "Scheduled" && (
                              <button
                                onClick={async () => {
                                  try {
                                    await completeAppointment(
                                      row.appointment_id
                                    );
                                    setAppointments((prev) =>
                                      prev.map((a) =>
                                        a.appointment_id === row.appointment_id
                                          ? { ...a, status: "Complete" }
                                          : a
                                      )
                                    );
                                    setFilteredAppointments((prev) =>
                                      prev.map((a) =>
                                        a.appointment_id === row.appointment_id
                                          ? { ...a, status: "Complete" }
                                          : a
                                      )
                                    );
                                    setActiveRow(null);
                                  } catch (err) {
                                    console.error("Failed to complete:", err);
                                  }
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
