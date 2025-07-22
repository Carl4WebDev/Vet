import React from "react";

export default function PetMedHistory({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center w-full p-4">
      <div className="w-full max-w-4xl bg-gray-100 rounded-xl overflow-y-auto max-h-[90vh] shadow-lg border-2 ">
        {/* Header */}
        <div className="flex items-center justify-between bg-blue-600 text-white px-4 py-2 rounded-t-xl">
          <h1 className="text-lg font-bold">Medical History #1</h1>
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
            <p className="font-semibold">March 21, 2021</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Time</p>
            <p className="font-semibold">10:30 AM</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Duration</p>
            <p className="font-semibold">45 Minutes</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Visit Type</p>
            <p className="font-semibold">Routine Exam</p>
          </div>
        </div>

        {/* Sections */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
          <Section title="Visit Information">
            <p>
              <span className="font-semibold">Veterinarian:</span> Dr. Jorge M.
              Martinez
            </p>
            <p>
              <span className="font-semibold">Chief Complaint:</span> Annual
              Wellness Exam + Fecal Check
            </p>
            <p>
              <span className="font-semibold">Visit Reason:</span> Preventive
              Care
            </p>
          </Section>

          <Section title="Vital Signs">
            <p>Weight: 15.2 kg</p>
            <p>Temperature: 38.33 °C</p>
            <p>Heart Rate: 152 bpm</p>
            <p>Resp. Rate: 24 rpm</p>
          </Section>

          <Section title="Test and Procedures">
            <p>
              Fecal Examination: <span className="font-semibold">Negative</span>
            </p>
            <p>
              Physical Exam: <span className="font-semibold">Normal</span>
            </p>
          </Section>

          <Section title="Treatment and Medication">
            <p>
              Medication Given: <span className="font-semibold">None</span>
            </p>
            <p>
              Prescriptions: <span className="font-semibold">None</span>
            </p>
            <p>
              Treatment:{" "}
              <span className="font-semibold">Routine Examination</span>
            </p>
          </Section>

          <Section title="Diagnosis and Assessment">
            <p>
              Primary Diagnosis: <span className="font-semibold">Healthy</span>
            </p>
            <p>
              Body Condition: <span className="font-semibold">5/9 (Ideal)</span>
            </p>
            <p>
              Overall Health: <span className="font-semibold">Excellent</span>
            </p>
          </Section>

          <Section title="Documents">
            <p className="text-gray-400 italic">(Empty)</p>
          </Section>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row justify-center gap-4 p-4">
          <button className="bg-blue-500 text-white px-4 py-2 rounded shadow">
            Print
          </button>
          <button className="bg-gray-500 text-white px-4 py-2 rounded shadow">
            Email to Owner
          </button>
          <button className="bg-yellow-400 text-white px-4 py-2 rounded shadow">
            Add Note
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
