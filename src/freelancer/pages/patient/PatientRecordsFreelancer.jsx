import React, { useState, useEffect } from "react";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { Link } from "react-router-dom";
import { getPatientsFreelanceVet } from "../../api/patient/getPatientsFreelanceVet";
const vetName = localStorage.getItem("vet_name");

export default function PatientRecordsFreelancer() {
  const vetId = localStorage.getItem("vet_id");
  const [records, setRecords] = useState([]);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [loading, setLoading] = useState(true);
  const [showContagiousOnly, setShowContagiousOnly] = useState(false);

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

  // ✅ Filtering logic (date + contagious toggle)
  const filteredRecords = records.filter((record) => {
    const recordDate = parseDate(record.date);
    const start = startDate ? parseDate(startDate) : null;
    const end = endDate ? parseDate(endDate) : null;

    if (!recordDate) return false;
    if (start && end && (recordDate < start || recordDate > end)) return false;
    if (start && recordDate < start) return false;
    if (end && recordDate > end) return false;

    if (showContagiousOnly && !record.is_contagious) return false;
    return true;
  });

  // ✅ PDF Export (now includes contagious info)
  const handleExportPDF = () => {
    try {
      const doc = new jsPDF({
        orientation: "landscape",
        unit: "pt",
        format: "A4",
      });
      doc.setFontSize(16);
      doc.text(
        showContagiousOnly
          ? "Freelance Vet - Contagious Disease Records"
          : "Freelance Veterinarian Patient Records",
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
      const tableRows = filteredRecords.map((r) => [
        r.appointment_id,
        r.customer_name,
        r.pet_name,
        r.veterinarian_name,
        new Date(r.date).toLocaleDateString("en-PH"),
        r.breed || "N/A",
        `${r.reason || "N/A"}${
          r.is_contagious && r.contagious_disease
            ? ` ⚠️ (${r.contagious_disease})`
            : ""
        }`,
      ]);

      autoTable(doc, {
        head: [tableColumn],
        body: tableRows,
        startY: 60,
        styles: { fontSize: 10, cellPadding: 5 },
        headStyles: { fillColor: [40, 120, 180], textColor: 255 },
        alternateRowStyles: { fillColor: [245, 245, 245] },
      });

      doc.save(
        showContagiousOnly
          ? "contagious_patient_records.pdf"
          : "freelance_vet_patient_records.pdf"
      );
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

      {/* Filters + Buttons */}
      <div className="flex justify-center sm:justify-between items-center flex-wrap">
        <h2 className="text-3xl font-bold mb-6">Dr. {vetName}</h2>

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
                    <Link
                      to={`/vet-freelancer/home/add-pet/${r.pet_id}`}
                      state={{ record: r }} // 👈 passes the full record object
                    >
                      {r.pet_name}
                    </Link>
                  </td>
                  <td className="p-2">
                    {new Date(r.date).toLocaleDateString("en-PH")}
                  </td>
                  <td className="p-2">{r.breed || "N/A"}</td>

                  {/* ✅ Add contagious tag beside reason */}
                  <td className="p-2">
                    {r.reason || "N/A"}
                    {r.is_contagious && r.contagious_disease ? (
                      <span className="ml-2 text-red-600 font-semibold">
                        ⚠️ {r.contagious_disease}
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
