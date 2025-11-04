import React, { useState, useEffect } from "react";
import { getPatientsClinic } from "../api/get/getPatientClinic";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { Link } from "react-router-dom";

function PatientRecords() {
  const clinicId = localStorage.getItem("clinic_id");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showContagiousOnly, setShowContagiousOnly] = useState(false); // ✅ new toggle

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getPatientsClinic(clinicId);
        setRecords(data || []);
      } catch (err) {
        console.error("⚠️ Failed to fetch clinic patient records:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [clinicId]);

  const parseDate = (dateStr) => new Date(dateStr);

  // ✅ Filter by date + contagious toggle
  const filteredRecords = records.filter((record) => {
    const recordDate = parseDate(record.date);
    const start = startDate ? parseDate(startDate) : null;
    const end = endDate ? parseDate(endDate) : null;

    if (start && end && (recordDate < start || recordDate > end)) return false;
    if (start && recordDate < start) return false;
    if (end && recordDate > end) return false;

    // Show only contagious if toggled
    if (showContagiousOnly && !record.is_contagious) return false;

    return true;
  });

  // ✅ PDF export now includes contagious info
  const handleExportPDF = () => {
    const doc = new jsPDF({
      orientation: "landscape",
      unit: "pt",
      format: "A4",
    });

    doc.setFontSize(16);
    doc.text(
      showContagiousOnly
        ? "Clinic Patient Records - Contagious Diseases"
        : "Clinic Patient Records",
      40,
      40
    );

    const tableColumn = [
      "Record ID",
      "Customer Name",
      "Pet Name",
      "Veterinarian",
      "Date",
      "Breed",
      "Reason",
    ];

    const tableRows = filteredRecords.map((record) => [
      record.appointment_id,
      record.customer_name,
      record.pet_name,
      record.veterinarian_name,
      new Date(record.date).toLocaleDateString("en-PH"),
      record.breed || "N/A",
      `${record.reason || "N/A"}${
        record.is_contagious && record.contagious_disease
          ? ` ⚠️ (${record.contagious_disease})`
          : ""
      }`,
    ]);

    autoTable(doc, {
      head: [tableColumn],
      body: tableRows,
      startY: 60,
      styles: {
        fontSize: 10,
        cellPadding: 5,
      },
      headStyles: {
        fillColor: [128, 128, 128],
        textColor: 255,
      },
      alternateRowStyles: {
        fillColor: [240, 240, 240],
      },
    });

    doc.save(
      showContagiousOnly
        ? "contagious_clinic_patient_records.pdf"
        : "clinic_patient_records.pdf"
    );
  };

  return (
    <div className="p-2 max-w-6xl mx-auto">
      <h1 className="text-2xl mb-4">Patients Record List</h1>
      <hr className="mb-4" />

      <div className="flex justify-center sm:justify-between items-center flex-wrap">
        <h2 className="text-3xl font-bold mb-6">Patient Records</h2>

        {/* ✅ Date Filters + Buttons */}
        <div className="flex gap-4 mb-6 flex-wrap justify-center items-end">
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

          {/* ✅ Contagious toggle */}
          <button
            onClick={() => setShowContagiousOnly((prev) => !prev)}
            className={`${
              showContagiousOnly
                ? "bg-red-600 hover:bg-red-700"
                : "bg-yellow-500 hover:bg-yellow-600"
            } text-white font-semibold px-4 py-2 rounded`}
          >
            {showContagiousOnly
              ? "Show All Patients"
              : "🦠 Show Contagious Only"}
          </button>

          {/* ✅ Export button */}
          <button
            onClick={handleExportPDF}
            className="bg-green-600 hover:bg-green-700 text-white font-semibold px-4 py-2 rounded"
          >
            📄 Export PDF
          </button>
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
                    <Link to={`/pet-details/${record.pet_id}`}>
                      {record.pet_name}
                    </Link>
                  </td>
                  <td className="p-2 md:p-4">{record.veterinarian_name}</td>
                  <td className="p-2 md:p-4">
                    {new Date(record.date).toLocaleDateString("en-PH")}
                  </td>
                  <td className="p-2 md:p-4">{record.breed || "N/A"}</td>

                  {/* ✅ Reason with contagious tag */}
                  <td className="p-2 md:p-4">
                    {record.reason || "N/A"}
                    {record.is_contagious && record.contagious_disease ? (
                      <span className="ml-2 text-red-600 font-semibold">
                        ⚠️ {record.contagious_disease}
                      </span>
                    ) : null}
                  </td>
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
