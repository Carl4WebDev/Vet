import React, { useState, useEffect } from "react";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { Link } from "react-router-dom";

// ✅ Separate API call
import { getPatientsFreelanceVet } from "../../api/patient/getPatientsFreelanceVet";

export default function PatientRecordsFreelancer() {
  const vetId = localStorage.getItem("vet_id");
  const [records, setRecords] = useState([]);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!vetId) return;
    const fetchRecords = async () => {
      try {
        const data = await getPatientsFreelanceVet(vetId);
        setRecords(data || []);
      } catch (err) {
        console.error("⚠️ Failed to fetch freelance vet records:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchRecords();
  }, [vetId]);

  const parseDate = (dateStr) => (dateStr ? new Date(dateStr) : null);

  const filteredRecords = records.filter((record) => {
    const recordDate = parseDate(record.date);
    const start = startDate ? parseDate(startDate) : null;
    const end = endDate ? parseDate(endDate) : null;
    if (!recordDate) return false;
    if (start && end) return recordDate >= start && recordDate <= end;
    if (start) return recordDate >= start;
    if (end) return recordDate <= end;
    return true;
  });

  const handleExportPDF = () => {
    try {
      const doc = new jsPDF({
        orientation: "landscape",
        unit: "pt",
        format: "A4",
      });
      doc.setFontSize(16);
      doc.text("Freelance Veterinarian Patient Records", 40, 40);

      const tableColumn = [
        "Record ID",
        "Customer Name",
        "Pet Name",
        "Veterinarian",
        "Date",
        "Breed",
        "Reason",
      ];
      const tableRows = filteredRecords.map((r) => [
        r.appointment_id,
        r.customer_name,
        r.pet_name,
        r.veterinarian_name,
        new Date(r.date).toLocaleDateString("en-PH"),
        r.breed || "N/A",
        r.reason || "N/A",
      ]);

      autoTable(doc, {
        head: [tableColumn],
        body: tableRows,
        startY: 60,
        styles: { fontSize: 10, cellPadding: 5 },
        headStyles: { fillColor: [40, 120, 180], textColor: 255 },
        alternateRowStyles: { fillColor: [245, 245, 245] },
      });

      doc.save("freelance_vet_patient_records.pdf");
    } catch (error) {
      console.error("❌ Failed to generate PDF:", error);
      alert("An error occurred while generating PDF.");
    }
  };

  return (
    <div className="p-4 max-w-6xl mx-auto">
      <h1 className="text-2xl mb-4 font-semibold">
        Patient Records (Freelance Vet)
      </h1>
      <hr className="mb-4" />

      {/* Filters + Export Button */}
      <div className="flex justify-center sm:justify-between items-center flex-wrap">
        <h2 className="text-3xl font-bold mb-6">Patient Records</h2>

        <div className="flex gap-4 mb-6 flex-wrap justify-center items-end">
          <div>
            <label className="block text-sm mb-1">Start Date</label>
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="border border-gray-300 rounded px-3 py-2"
            />
          </div>
          <div>
            <label className="block text-sm mb-1">End Date</label>
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="border border-gray-300 rounded px-3 py-2"
            />
          </div>
          <button
            onClick={handleExportPDF}
            className="bg-green-600 hover:bg-green-700 text-white font-semibold px-4 py-2 rounded"
          >
            📄 Export PDF
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead>
            <tr className="bg-gray-400 text-white text-center">
              <th className="p-2 text-left">Record ID</th>
              <th className="p-2 text-left">Customer Name</th>
              <th className="p-2 text-left">Pet Name</th>
              <th className="p-2 text-left">Veterinarian</th>
              <th className="p-2 text-left">Date</th>
              <th className="p-2 text-left">Breed</th>
              <th className="p-2 text-left">Reason</th>
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
              filteredRecords.map((r, i) => (
                <tr
                  key={r.appointment_id}
                  className={i % 2 === 0 ? "bg-white" : "bg-gray-100"}
                >
                  <td className="p-2">{r.appointment_id}</td>
                  <td className="p-2">{r.customer_name}</td>
                  <td className="p-2 text-blue-600">
                    <Link to={`/vet-freelancer/home/pet-details/${r.pet_id}`}>
                      {r.pet_name}
                    </Link>
                  </td>
                  <td className="p-2">{r.veterinarian_name}</td>
                  <td className="p-2">
                    {new Date(r.date).toLocaleDateString("en-PH")}
                  </td>
                  <td className="p-2">{r.breed || "N/A"}</td>
                  <td className="p-2">{r.reason || "N/A"}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
