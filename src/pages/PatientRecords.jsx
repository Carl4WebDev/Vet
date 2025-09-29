import React, { useState, useEffect } from "react";
import { getPatientsClinic } from "../api/get/getPatientClinic";

function PatientRecords() {
  const clinicId = localStorage.getItem("clinic_id");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch patient records from backend
  useEffect(() => {
    const fetchData = async () => {
      const data = await getPatientsClinic(clinicId);
      setRecords(data);
      setLoading(false);
    };

    fetchData();
  }, [clinicId]);

  const parseDate = (dateStr) => new Date(dateStr);

  // Filter records based on date range
  const filteredRecords = records.filter((record) => {
    const recordDate = parseDate(record.date);
    const start = startDate ? parseDate(startDate) : null;
    const end = endDate ? parseDate(endDate) : null;

    if (start && end) return recordDate >= start && recordDate <= end;
    if (start) return recordDate >= start;
    if (end) return recordDate <= end;
    return true;
  });

  return (
    <div className="p-2 max-w-6xl mx-auto">
      <h1 className="text-2xl mb-4">Patients Record List</h1>
      <hr className="mb-4" />

      <div className="flex justify-center sm:justify-between items-center flex-wrap">
        <h2 className="text-3xl font-bold mb-6">Patient Records</h2>

        {/* Date Filters */}
        <div className="flex gap-4 mb-6 flex-wrap justify-center">
          <div>
            <label
              htmlFor="startDate"
              className="block text-sm font-medium text-black mb-1"
            >
              Start Date
            </label>
            <input
              type="date"
              id="startDate"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="border border-gray-300 rounded px-3 py-2"
            />
          </div>
          <div>
            <label
              htmlFor="endDate"
              className="block text-sm font-medium text-black mb-1"
            >
              End Date
            </label>
            <input
              type="date"
              id="endDate"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="border border-gray-300 rounded px-3 py-2"
            />
          </div>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead>
            <tr className="bg-gray-400 text-center text-white">
              <th className="p-2 md:p-4 text-left">Record ID</th>
              <th className="p-2 md:p-4 text-left">Customer Name</th>
              <th className="p-2 md:p-4 text-left">Pet Name</th>
              <th className="p-2 md:p-4 text-left">Veterinarian</th>
              <th className="p-2 md:p-4 text-left">Date</th>
              <th className="p-2 md:p-4 text-left">Breed</th>
              <th className="p-2 md:p-4 text-left">Reason</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="7" className="text-center py-4">
                  Loading...
                </td>
              </tr>
            ) : filteredRecords.length === 0 ? (
              <tr>
                <td colSpan="7" className="text-center py-4">
                  No records found
                </td>
              </tr>
            ) : (
              filteredRecords.map((record, index) => (
                <tr
                  key={record.appointment_id}
                  className={index % 2 === 0 ? "bg-white" : "bg-gray-300"}
                >
                  <td className="p-2 md:p-4">{record.appointment_id}</td>
                  <td className="p-2 md:p-4">{record.customer_name}</td>
                  <td className="text-blue-600 p-2 md:p-4">
                    {record.pet_name}
                  </td>
                  <td className="p-2 md:p-4">{record.veterinarian_name}</td>
                  <td className="p-2 md:p-4">
                    {new Date(record.date).toLocaleDateString()}
                  </td>
                  <td className="p-2 md:p-4">{record.breed}</td>
                  <td className="p-2 md:p-4">{record.reason}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default PatientRecords;
