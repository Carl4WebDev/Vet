import React from "react";
import jsPDF from "jspdf";

export default function PetMedHistory({ isOpen, onClose, record }) {
  if (!isOpen || !record) return null;

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString();
  };

  const formatTime = (timeString) => {
    if (!timeString) return "N/A";
    return timeString.slice(0, 5); // HH:mm
  };

  const handleDownloadPDF = () => {
    const doc = new jsPDF();
    let y = 15;

    // Header
    doc.setFontSize(16);
    doc.setFont("helvetica", "bold");
    doc.text("Veterinary Medical Record", 14, y);
    y += 8;

    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    doc.text(`Generated on: ${new Date().toLocaleString()}`, 14, y);
    y += 8;

    // Pet Info
    doc.setFont("helvetica", "bold");
    doc.text("Pet Information", 14, y);
    y += 6;
    doc.setFont("helvetica", "normal");
    doc.text(`Name: ${record.pet_name}`, 14, y);
    y += 5;
    doc.text(`Age: ${record.pet_age} year(s)`, 14, y);
    y += 5;
    doc.text(`Species: ${record.pet_species}`, 14, y);
    y += 5;
    doc.text(`Breed: ${record.pet_breed}`, 14, y);
    y += 5;
    doc.text(`Gender: ${record.pet_gender}`, 14, y);
    y += 8;

    // Visit Info
    doc.setFont("helvetica", "bold");
    doc.text("Visit Information", 14, y);
    y += 6;
    doc.setFont("helvetica", "normal");
    doc.text(`Visit Date: ${formatDate(record.visit_date)}`, 14, y);
    y += 5;
    doc.text(`Visit Time: ${formatTime(record.visit_time)}`, 14, y);
    y += 5;
    doc.text(`Duration: ${record.duration} minutes`, 14, y);
    y += 5;
    doc.text(`Visit Type: ${record.visit_type}`, 14, y);
    y += 5;
    doc.text(`Veterinarian: ${record.veterinarian_name}`, 14, y);
    y += 5;
    doc.text(`Chief Complaint: ${record.chief_complaint || "N/A"}`, 14, y);
    y += 5;
    doc.text(`Visit Reason: ${record.visit_reason || "N/A"}`, 14, y);
    y += 8;

    // Tests
    doc.setFont("helvetica", "bold");
    doc.text("Tests and Procedures", 14, y);
    y += 6;
    doc.setFont("helvetica", "normal");
    doc.text(`Fecal Examination: ${record.fecal_examination || "N/A"}`, 14, y);
    y += 5;
    doc.text(
      `Physical Examination: ${record.physical_examination || "N/A"}`,
      14,
      y
    );
    y += 8;

    // Diagnosis
    doc.setFont("helvetica", "bold");
    doc.text("Diagnosis and Assessment", 14, y);
    y += 6;
    doc.setFont("helvetica", "normal");
    doc.text(`Primary Diagnosis: ${record.primary_diagnosis || "N/A"}`, 14, y);
    y += 5;
    doc.text(`Body Condition: ${record.body_condition || "N/A"}`, 14, y);
    y += 5;
    doc.text(`Overall Health: ${record.overall_health || "N/A"}`, 14, y);
    y += 8;

    // Treatment
    doc.setFont("helvetica", "bold");
    doc.text("Treatment and Medication", 14, y);
    y += 6;
    doc.setFont("helvetica", "normal");
    doc.text(`Medication Given: ${record.medication_given || "None"}`, 14, y);
    y += 5;
    doc.text(`Prescriptions: ${record.prescriptions || "None"}`, 14, y);
    y += 5;
    doc.text(`Treatment: ${record.treatment || "None"}`, 14, y);
    y += 8;

    // Notes
    doc.setFont("helvetica", "bold");
    doc.text("Notes & Actions", 14, y);
    y += 6;
    doc.setFont("helvetica", "normal");
    doc.text(`Action: ${record.key_action || "None"}`, 14, y);
    y += 5;
    doc.text(`Remarks: ${record.notes || "None"}`, 14, y);
    y += 8;

    // Footer
    doc.line(14, y, 196, y);
    y += 6;
    doc.setFontSize(10);
    doc.text("This report is system-generated.", 14, y);

    // Save
    doc.save(`Medical_Record_${record.pet_name}_${record.record_id}.pdf`);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center w-full p-4">
      <div className="w-full max-w-4xl bg-gray-100 rounded-xl overflow-y-auto max-h-[90vh] shadow-lg border-2 ">
        {/* Header */}
        <div className="flex items-center justify-between bg-blue-600 text-white px-4 py-2 rounded-t-xl">
          <h1 className="text-lg font-bold">
            Medical History #{record.record_id}
          </h1>
          <button
            className="bg-blue-500 hover:bg-blue-700 px-4 py-1 rounded text-sm"
            onClick={onClose}
          >
            Exit
          </button>
        </div>

        {/* Visit Details */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 bg-white p-4 shadow">
          <div>
            <p className="text-sm text-gray-600">Visit Date</p>
            <p className="font-semibold">{formatDate(record.visit_date)}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Time</p>
            <p className="font-semibold">{formatTime(record.visit_time)}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Duration</p>
            <p className="font-semibold">{record.duration} Minutes</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Visit Type</p>
            <p className="font-semibold">{record.visit_type}</p>
          </div>
        </div>

        {/* Sections */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
          <Section title="Visit Information">
            <p>
              <span className="font-semibold">Veterinarian:</span>{" "}
              {record.veterinarian_name}
            </p>
            <p>
              <span className="font-semibold">Chief Complaint:</span>{" "}
              {record.chief_complaint || "N/A"}
            </p>
            <p>
              <span className="font-semibold">Visit Reason:</span>{" "}
              {record.visit_reason || "N/A"}
            </p>
          </Section>

          <Section title="Test and Procedures">
            <p>
              Fecal Examination:{" "}
              <span className="font-semibold">
                {record.fecal_examination || "N/A"}
              </span>
            </p>
            <p>
              Physical Exam:{" "}
              <span className="font-semibold">
                {record.physical_examination || "N/A"}
              </span>
            </p>
          </Section>

          <Section title="Diagnosis and Assessment">
            <p>
              Primary Diagnosis:{" "}
              <span className="font-semibold">
                {record.primary_diagnosis || "N/A"}
              </span>
            </p>
            <p>
              Body Condition:{" "}
              <span className="font-semibold">
                {record.body_condition || "N/A"}
              </span>
            </p>
            <p>
              Overall Health:{" "}
              <span className="font-semibold">
                {record.overall_health || "N/A"}
              </span>
            </p>
          </Section>

          <Section title="Treatment and Medication">
            <p>
              Medication Given:{" "}
              <span className="font-semibold">
                {record.medication_given || "None"}
              </span>
            </p>
            <p>
              Prescriptions:{" "}
              <span className="font-semibold">
                {record.prescriptions || "None"}
              </span>
            </p>
            <p>
              Treatment:{" "}
              <span className="font-semibold">
                {record.treatment || "None"}
              </span>
            </p>
          </Section>

          <Section title="Notes & Action">
            <p>
              <span className="font-semibold">Action:</span>{" "}
              {record.key_action || "None"}
            </p>
            <p>
              <span className="font-semibold">Remarks:</span>{" "}
              {record.notes || "None"}
            </p>
          </Section>
        </div>
        {/* 📎 Attachments Section */}
        {record.documents && record.documents.length > 0 && (
          <div className="bg-white rounded-xl p-4 shadow mx-4 mb-6">
            <h2 className="text-md font-semibold mb-3 text-gray-700">
              Attached Documents
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {record.documents.map((doc, index) => {
                const isImage = doc.mime_type.startsWith("image/");
                return (
                  <div
                    key={doc.document_id || index}
                    className="border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition bg-gray-50"
                  >
                    {isImage ? (
                      // 🖼️ Image Preview
                      <img
                        src={doc.document_url || ""}
                        alt={doc.file_name || ""}
                        className="w-full h-48 object-cover"
                      />
                    ) : (
                      // 📄 Non-image file (PDF, DOCX, etc.)
                      <div className="flex flex-col items-center justify-center h-48 text-gray-600 bg-gray-200">
                        <span className="text-4xl">📄</span>
                        <p className="text-xs mt-1">{doc.mime_type || ""}</p>
                      </div>
                    )}

                    {/* Footer: filename + open link */}
                    <div className="p-2 border-t text-center bg-white">
                      <p className="text-sm truncate text-gray-800">
                        {doc.file_name || ""}
                      </p>
                      <a
                        href={doc.document_url || ""}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block mt-1 text-blue-600 hover:underline text-sm"
                      >
                        Open File
                      </a>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row justify-center gap-4 p-4">
          <button
            onClick={handleDownloadPDF}
            className="bg-blue-500 text-white px-4 py-2 rounded shadow"
          >
            Download PDF
          </button>
        </div>
      </div>
    </div>
  );
}

function Section({ title, children }) {
  return (
    <div className="bg-white rounded-xl p-4 shadow">
      <h2 className="text-md font-semibold mb-2 text-gray-700">{title}</h2>
      <div className="text-sm text-gray-800 space-y-1">{children}</div>
    </div>
  );
}
