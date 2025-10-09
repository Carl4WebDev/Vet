import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import PetMedHistory from "./Modals/PetMedHistory";
import { getPetMedicalRecords } from "../../../api/get/getPetMedicalRecords";
import defaultImage from "../../../assets/images/nav-profile.png";

const PetDetailsPage = () => {
  const { petId } = useParams();
  const [open, setOpen] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(null); // 🟡 Added
  const [petInfo, setPetInfo] = useState(null);
  const [medicalHistory, setMedicalHistory] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getPetMedicalRecords(petId);
        setMedicalHistory(data);

        if (data.length > 0) {
          const first = data[0];
          setPetInfo({
            name: first.pet_name,
            age: first.pet_age,
            species: first.pet_species,
            breed: first.pet_breed,
            birthday: first.pet_birthday,
            gender: first.pet_gender,
            weight: first.pet_weight,
            bio: first.pet_bio,
            veterinarian: first.veterinarian_name,
            image_url: first.pet_image_url, // 🆕 Added here ✅
          });
        }
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
  }, [petId]);

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const d = new Date(dateString);
    return d.toLocaleDateString();
  };

  const handleCardClick = (record) => {
    setSelectedRecord(record);
    setOpen(true);
  };

  return (
    <div className="p-6 space-y-6 font-sans">
      {/* 🟡 Pass selectedRecord to modal */}
      <PetMedHistory
        isOpen={open}
        onClose={() => setOpen(false)}
        record={selectedRecord}
      />

      {/* Top Info Card */}
      <div className="border rounded-xl p-6 flex flex-col md:flex-row items-start gap-6 shadow-sm bg-white">
        <div className="flex flex-col gap-4">
          <img
            src={petInfo?.image_url || defaultImage}
            alt={petInfo?.name || "Pet"}
            className="w-24 h-24 rounded-full object-cover"
          />

          <Link
            to={`/pet-health-record/${petId}`}
            className="p-2 border-black border rounded-lg font-bold"
          >
            + New Health Record
          </Link>
        </div>

        <div className="flex-1 grid md:grid-cols-3 gap-4">
          <div>
            <h2 className="font-bold text-lg mb-2">Pet Information</h2>
            <p>
              <b>Name:</b> {petInfo?.name || "N/A"}
            </p>
            <p>
              <b>Age:</b> {petInfo?.age ? `${petInfo.age} Years Old` : "N/A"}
            </p>
            <p>
              <b>Species:</b> {petInfo?.species || "N/A"}
            </p>
            <p>
              <b>Breed:</b> {petInfo?.breed || "N/A"}
            </p>
            <p>
              <b>Birthdate:</b> {formatDate(petInfo?.birthday)}
            </p>
            <p>
              <b>Gender:</b> {petInfo?.gender || "N/A"}
            </p>
            <p>
              <b>Weight:</b> {petInfo?.weight ? `${petInfo.weight} kg` : "N/A"}
            </p>
            <p>
              <b>Veterinarian:</b> {petInfo?.veterinarian || "N/A"}
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
              <b>Name:</b> {petInfo?.name || "N/A"}
            </p>
          </div>

          <div>
            <h2 className="font-bold text-lg mb-2">Current Medication</h2>
            <p>
              {medicalHistory.length > 0
                ? medicalHistory[0].medication_given || "None"
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
        {medicalHistory.map((entry, index) => (
          <div
            key={entry.record_id}
            onClick={() => handleCardClick(entry)}
            className="bg-white p-4 rounded-lg shadow-md cursor-pointer hover:shadow-lg transition"
          >
            <h3 className="font-bold text-lg mb-2">
              Medical History {index + 1}
            </h3>
            <p>
              <b>Date:</b> {formatDate(entry.visit_date)}
            </p>
            <p>
              <b>Description:</b> {entry.description}
            </p>
            <p>
              <b>Veterinarian:</b> {entry.veterinarian_name}
            </p>
            <p>
              <b>Diagnosis:</b> {entry.primary_diagnosis || "N/A"}
            </p>
            <p>
              <b>Test Performed:</b>{" "}
              {entry.fecal_examination || entry.physical_examination || "N/A"}
            </p>
            <p>
              <b>Test Result:</b> {entry.test_results || "N/A"}
            </p>
            <p>
              <b>Action:</b> {entry.key_action || "N/A"}
            </p>
            <p>
              <b>Medication:</b> {entry.medication_given || "N/A"}
            </p>
            <p>
              <b>Remarks:</b> {entry.notes || "N/A"}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PetDetailsPage;
