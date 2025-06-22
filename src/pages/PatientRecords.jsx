import React, { useState } from "react";

function PatientRecords() {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const patientRecords = [
    {
      recordId: "0001 0001",
      customerName: "Horgie L. Bangon",
      petName: "Horgie Jr.",
      veterinarian: "Dr. Jorge M. Martinez",
      date: "September 26, 2024",
      breed: "Dog",
      reason: "Vaccination",
    },
    {
      recordId: "0001 0002",
      customerName: "Beni L. Odin",
      petName: "Geof",
      veterinarian: "Dr. Jorge M. Martinez",
      date: "September 26, 2024",
      breed: "Dog",
      reason: "Dental Care",
    },
    {
      recordId: "0001 0003",
      customerName: "Beni",
      petName: "Jerry",
      veterinarian: "Dr. Jorge M. Martinez",
      date: "September 26, 2024",
      breed: "K9",
      reason: "Dental Care",
    },
    {
      recordId: "0001 0004",
      customerName: "Beni",
      petName: "Jerry",
      veterinarian: "Dr. Jorge M. Martinez",
      date: "September 26, 2024",
      breed: "K9",
      reason: "Dental Care",
    },
  ];

  // Convert date string to Date object for comparison
  const parseDate = (dateStr) => {
    return new Date(dateStr);
  };

  // Filter records based on date range
  const filteredRecords = patientRecords.filter((record) => {
    const recordDate = parseDate(record.date);
    const start = startDate ? parseDate(startDate) : null;
    const end = endDate ? parseDate(endDate) : null;

    if (start && end) {
      return recordDate >= start && recordDate <= end;
    } else if (start) {
      return recordDate >= start;
    } else if (end) {
      return recordDate <= end;
    }
    return true;
  });

  return (
    <div className="p-2 max-w-6xl mx-auto">
      <h1 className="text-2xl mb-4">Patients Record List</h1>
      <hr className="mb-4" />

      <div className="flex justify-center sm:justify-between items-center flex-wrap">
        <h2 className="text-3xl font-bold mb-6 ">Patient Records</h2>
        {/* Date range filter controls */}
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
              <th className="px-4 py-8 text-left">Record ID</th>
              <th className="px-4 py-8 text-left">Customer Name</th>
              <th className="px-4 py-8 text-left">Pvt. Name</th>
              <th className="px-4 py-8 text-left">Veterinarian</th>
              <th className="px-4 py-8 text-left">Date</th>
              <th className="px-4 py-8 text-left">Breed</th>
              <th className="px-4 py-8 text-left">Reason</th>
            </tr>
          </thead>
          <tbody>
            {filteredRecords.map((record, index) => (
              <tr
                key={index}
                className={index % 2 === 0 ? "bg-white" : "bg-gray-300"}
              >
                <td className="px-4 py-8">{record.recordId}</td>
                <td className="px-4 py-8">{record.customerName}</td>
                <td className="text-blue-600 px-4 py-8">{record.petName}</td>
                <td className="px-4 py-8">{record.veterinarian}</td>
                <td className="px-4 py-8">{record.date}</td>
                <td className="px-4 py-8">{record.breed}</td>
                <td className="px-4 py-8">{record.reason}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default PatientRecords;
