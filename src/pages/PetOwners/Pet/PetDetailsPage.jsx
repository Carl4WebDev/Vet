import React from "react";
import { Link } from "react-router-dom";

const PetDetailsPage = () => {
  const medicalHistory = [
    {
      id: 1,
      date: "3/21/2024",
      description: "Fecal/Deworming",
      veterinarian: "Dr. Jorge",
      diagnosis: "Fecal/Deworming",
      testPerformed: "Fecal/Deworming",
      testResult: "None",
      action: "N/A",
      medication: "N/A",
      remarks: "N/A",
    },
    {
      id: 2,
      date: "3/21/2024",
      description: "Fecal/Deworming",
      veterinarian: "Dr. Jorge",
      diagnosis: "Fecal/Deworming",
      testPerformed: "Fecal/Deworming",
      testResult: "None",
      action: "N/A",
      medication: "N/A",
      remarks: "N/A",
    },
    {
      id: 3,
      date: "9/25/2024",
      description: "Vaccination",
      veterinarian: "Dr. Jorge",
      diagnosis: "None",
      testPerformed: "Vaccination",
      testResult: "None",
      action: "N/A",
      medication: "N/A",
      remarks: "N/A",
    },
  ];

  return (
    <div className="p-6 space-y-6 font-sans">
      {/* Top Info Card */}
      <div className="border rounded-xl p-6 flex flex-col md:flex-row items-start gap-6 shadow-sm bg-white">
        <div className="flex flex-col gap-4">
          <img
            src="https://placedog.net/100/100?id=1"
            alt="Pet"
            className="w-24 h-24 rounded-full object-cover"
          />
          <Link
            to="/pet-health-record"
            className="p-2 border-black border rounded-lg font-bold"
          >
            + New Health Record
          </Link>
        </div>

        <div className="flex-1 grid md:grid-cols-3 gap-4">
          <div>
            <h2 className="font-bold text-lg mb-2">Pet Information</h2>
            <p>
              <b>Name:</b> Horgie Jr.
            </p>
            <p>
              <b>Age:</b> 2 Years Old
            </p>
            <p>
              <b>Species:</b> Dog
            </p>
            <p>
              <b>Breed:</b> Bulldog
            </p>
            <p>
              <b>Birthdate:</b> 2/26/2023
            </p>
            <p>
              <b>Gender:</b> Male
            </p>
            <p>
              <b>Weight:</b> 15kg
            </p>
            <p>
              <b>Veterinarian:</b> Dr. Jorge
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
              <b>Name:</b> Horgie Jr.
            </p>
          </div>

          <div>
            <h2 className="font-bold text-lg mb-2">Current Medication</h2>
            <p>None</p>
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
          <div key={entry.id} className="bg-white p-4 rounded-lg shadow-md">
            <h3 className="font-bold text-lg mb-2">
              Medical History {index + 1}
            </h3>
            <p>
              <b>Date:</b> {entry.date}
            </p>
            <p>
              <b>Description:</b> {entry.description}
            </p>
            <p>
              <b>Veterinarian:</b> {entry.veterinarian}
            </p>
            <p>
              <b>Diagnosis:</b> {entry.diagnosis}
            </p>
            <p>
              <b>Test Performed:</b> {entry.testPerformed}
            </p>
            <p>
              <b>Test Result:</b> {entry.testResult}
            </p>
            <p>
              <b>Action:</b> {entry.action}
            </p>
            <p>
              <b>Medication:</b> {entry.medication}
            </p>
            <p>
              <b>Remarks:</b> {entry.remarks}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PetDetailsPage;
