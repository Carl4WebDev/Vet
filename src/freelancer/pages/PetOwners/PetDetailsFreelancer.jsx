import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getFreelancePetDetails } from "../../api/pet-owners/getFreelancePetDetails";
import defaultImg from "../../assets/nav-profile.png";
import jsPDF from "jspdf";

const PetDetailsFreelancer = () => {
  const { petId } = useParams();
  const [pet, setPet] = useState(null);
  const [records, setRecords] = useState([]);
  const [selectedRecord, setSelectedRecord] = useState(null);

  const formatDate = (date) =>
    date ? new Date(date).toLocaleDateString("en-PH") : "N/A";

  useEffect(() => {
    (async () => {
      const data = await getFreelancePetDetails(petId);
      setPet(data.pet || null);
      setRecords(data.medical || []);
    })();
  }, [petId]);

  const handleDownloadPDF = () => {
    if (!selectedRecord || !pet) return;
    const doc = new jsPDF();
    let y = 15;

    doc.setFontSize(16);
    doc.text("Veterinary Medical Record", 14, y);
    y += 8;
    doc.setFontSize(10);
    doc.text(`Generated on: ${new Date().toLocaleString()}`, 14, y);
    y += 10;

    doc.text(`Pet Name: ${pet.pet_name}`, 14, y);
    y += 5;
    doc.text(`Species: ${pet.pet_species}`, 14, y);
    y += 5;
    doc.text(`Breed: ${pet.pet_breed}`, 14, y);
    y += 5;
    doc.text(`Gender: ${pet.pet_gender}`, 14, y);
    y += 5;
    doc.text(`Veterinarian: ${selectedRecord.veterinarian_name}`, 14, y);
    y += 5;
    doc.text(`Diagnosis: ${selectedRecord.primary_diagnosis || "N/A"}`, 14, y);
    y += 10;
    doc.text(`Notes: ${selectedRecord.notes || "N/A"}`, 14, y);
    y += 5;
    doc.text(`Treatment: ${selectedRecord.treatment || "N/A"}`, 14, y);

    doc.save(`Medical_Record_${pet.pet_name}_${selectedRecord.record_id}.pdf`);
  };

  if (!pet)
    return (
      <div className="p-8 text-center text-gray-600">
        Loading pet details...
      </div>
    );

  return (
    <div className="p-6 space-y-6 font-sans">
      <Link
        to="/vet-freelancer/home/pet-owners"
        className="text-blue-500 text-sm hover:underline"
      >
        ← Back to Owners
      </Link>

      {/* 🐶 Top Info Card */}
      <div className="border rounded-xl p-6 flex flex-col md:flex-row items-start gap-6 shadow-sm bg-white">
        <div className="flex flex-col gap-4">
          <img
            src={pet.pet_image_url || defaultImg}
            alt={pet.pet_name}
            className="w-24 h-24 rounded-full object-cover border"
          />

          {/* ⚠️ Contagious Disease Badge */}
          {records.length > 0 && records[0].is_contagious && (
            <div className="bg-red-100 text-red-700 px-3 py-2 rounded-md text-sm font-semibold shadow-sm">
              ⚠️ Contagious Disease:{" "}
              {records[0].contagious_disease || "Unspecified"}
            </div>
          )}

          <Link
            to={`/vet-freelancer/home/add-pet/${petId}`}
            className="p-2 border-black border rounded-lg font-bold text-center hover:bg-gray-100"
          >
            + New Health Record
          </Link>
        </div>

        {/* Pet Info */}
        <div className="flex-1 grid md:grid-cols-3 gap-4">
          <div>
            <h2 className="font-bold text-lg mb-2">Pet Information</h2>
            <p>
              <b>Name:</b> {pet.pet_name || "N/A"}
            </p>
            <p>
              <b>Age:</b> {pet.pet_age ? `${pet.pet_age} Years Old` : "N/A"}
            </p>
            <p>
              <b>Species:</b> {pet.pet_species || "N/A"}
            </p>
            <p>
              <b>Breed:</b> {pet.pet_breed || "N/A"}
            </p>
            <p>
              <b>Birthdate:</b> {formatDate(pet.pet_birthday)}
            </p>
            <p>
              <b>Gender:</b> {pet.pet_gender || "N/A"}
            </p>
            <p>
              <b>Weight:</b> {pet.pet_weight ? `${pet.pet_weight} kg` : "N/A"}
            </p>
            <p>
              <b>Veterinarian:</b> {pet.veterinarian_name || "N/A"}
            </p>
          </div>

          <div>
            <h2 className="font-bold text-lg mb-2">Medical Information</h2>
            <p>
              <b>Allergies:</b> None
            </p>
            <p>
              <b>Medication:</b> None
            </p>
            <p>
              <b>Name:</b> {pet.pet_name || "N/A"}
            </p>
          </div>

          <div>
            <h2 className="font-bold text-lg mb-2">Current Medication</h2>
            <p>
              {records.length > 0
                ? records[0].medication_given || "None"
                : "None"}
            </p>
          </div>
        </div>
      </div>

      {/* Section Header */}
      <div className="bg-gray-800 text-white font-bold px-4 py-2 rounded">
        Medical
      </div>

      {/* Medical History Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {records.map((rec, index) => (
          <div
            key={rec.record_id}
            onClick={() => setSelectedRecord(rec)}
            className="bg-white p-4 rounded-lg shadow-md cursor-pointer hover:shadow-lg transition"
          >
            <h3 className="font-bold text-lg mb-2">
              Medical History {index + 1}
            </h3>

            {/* ⚠️ Contagious Disease Flag */}
            {rec.is_contagious && (
              <div className="bg-red-100 text-red-700 px-2 py-1 rounded-md text-xs font-semibold mb-3 inline-block">
                ⚠️ {rec.contagious_disease || "Contagious Disease"}
              </div>
            )}

            <p>
              <b>Date:</b> {formatDate(rec.visit_date)}
            </p>
            <p>
              <b>Veterinarian:</b> {rec.veterinarian_name}
            </p>
            <p>
              <b>Diagnosis:</b> {rec.primary_diagnosis || "N/A"}
            </p>
            <p>
              <b>Medication:</b> {rec.medication_given || "N/A"}
            </p>
            <p>
              <b>Treatment:</b> {rec.treatment || "N/A"}
            </p>
            <p>
              <b>Notes:</b> {rec.notes || "N/A"}
            </p>
          </div>
        ))}
      </div>

      {/* Full Detail Modal */}
      {selectedRecord && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg w-full max-w-5xl shadow-lg relative overflow-y-auto max-h-[90vh]">
            <div className="bg-blue-700 text-white p-3 flex justify-between items-center rounded-t-lg">
              <h2 className="font-semibold">
                Medical History #{selectedRecord.record_id}
              </h2>
              <button
                onClick={() => setSelectedRecord(null)}
                className="text-white hover:text-gray-200"
              >
                ✕
              </button>
            </div>

            <div className="p-4 space-y-4 text-sm">
              {/* Visit Details */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                <p>
                  <b>Visit Date:</b> {formatDate(selectedRecord.visit_date)}
                </p>
                <p>
                  <b>Time:</b> {selectedRecord.visit_time || "N/A"}
                </p>
                <p>
                  <b>Duration:</b> {selectedRecord.duration || "N/A"}
                </p>
                <p>
                  <b>Type:</b> {selectedRecord.visit_type || "N/A"}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                <div className="border rounded p-3">
                  <h4 className="font-semibold mb-2">Visit Information</h4>
                  <p>Veterinarian: {selectedRecord.veterinarian_name}</p>
                  <p>
                    Chief Complaint: {selectedRecord.chief_complaint || "N/A"}
                  </p>
                  <p>Reason: {selectedRecord.visit_reason || "N/A"}</p>
                </div>

                <div className="border rounded p-3">
                  <h4 className="font-semibold mb-2">Tests & Procedures</h4>
                  <p>Fecal Exam: {selectedRecord.fecal_examination || "N/A"}</p>
                  <p>
                    Physical Exam:{" "}
                    {selectedRecord.physical_examination || "N/A"}
                  </p>
                </div>

                <div className="border rounded p-3">
                  <h4 className="font-semibold mb-2">Diagnosis</h4>
                  <p>Diagnosis: {selectedRecord.primary_diagnosis || "N/A"}</p>
                  <p>
                    Body Condition: {selectedRecord.body_condition || "N/A"}
                  </p>
                  <p>
                    Overall Health: {selectedRecord.overall_health || "N/A"}
                  </p>
                </div>

                <div className="border rounded p-3">
                  <h4 className="font-semibold mb-2">Treatment & Medication</h4>
                  <p>Medication: {selectedRecord.medication_given || "N/A"}</p>
                  <p>Prescriptions: {selectedRecord.prescriptions || "N/A"}</p>
                  <p>Treatment: {selectedRecord.treatment || "N/A"}</p>
                </div>

                <div className="border rounded p-3">
                  <h4 className="font-semibold mb-2">Notes & Action</h4>
                  <p>Action: {selectedRecord.key_action || "N/A"}</p>
                  <p>Notes: {selectedRecord.notes || "N/A"}</p>
                </div>

                <div className="border rounded p-3">
                  <h4 className="font-semibold mb-2">Vital Signs</h4>
                  <p>Weight: {selectedRecord.vital_weight || "N/A"} kg</p>
                  <p>
                    Temperature: {selectedRecord.vital_temperature || "N/A"}°C
                  </p>
                  <p>Heart Rate: {selectedRecord.vital_heart_rate || "N/A"}</p>
                  <p>Resp Rate: {selectedRecord.vital_resp_rate || "N/A"}</p>
                </div>
              </div>

              {/* Attached Documents */}
              {selectedRecord.documents &&
                selectedRecord.documents.length > 0 && (
                  <div className="border rounded p-3">
                    <h4 className="font-semibold mb-3">Attached Documents</h4>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                      {selectedRecord.documents.map((doc, index) => {
                        const isImage = doc.mime_type?.startsWith("image/");
                        return (
                          <div
                            key={index}
                            className="border rounded-md overflow-hidden bg-gray-50 shadow-sm"
                          >
                            {isImage ? (
                              <img
                                src={doc.document_url || defaultImg}
                                alt={doc.file_name}
                                className="w-full h-32 object-cover"
                              />
                            ) : (
                              <div className="h-32 flex items-center justify-center bg-gray-200 text-sm text-gray-600">
                                📄 {doc.file_name}
                              </div>
                            )}
                            <div className="p-2 text-xs flex justify-between items-center">
                              <span className="truncate w-[70%]">
                                {doc.file_name}
                              </span>
                              <a
                                href={doc.document_url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-500 hover:underline text-xs"
                              >
                                View
                              </a>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

              <div className="text-right">
                <button
                  onClick={handleDownloadPDF}
                  className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                  Download PDF
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PetDetailsFreelancer;
