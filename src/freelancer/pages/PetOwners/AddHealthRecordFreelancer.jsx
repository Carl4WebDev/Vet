import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { createFreelanceMedicalRecord } from "../../api/pet-owners/createFreelanceMedicalRecord";

export default function AddHealthRecordFreelancer() {
  const navigate = useNavigate();
  const { petId } = useParams();
  const vetId = 8;

  const [showErrorModal, setShowErrorModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [files, setFiles] = useState([]);

  const [form, setForm] = useState({
    visit_date: "",
    visit_time: "",
    duration: "",
    visit_type: "",
    chief_complaint: "",
    visit_reason: "",
    weight: "",
    temperature: "",
    heart_rate: "",
    resp_rate: "",
    fecal_examination: "",
    physical_examination: "",
    medication_given: "",
    prescriptions: "",
    treatment: "",
    primary_diagnosis: "",
    body_condition: "",
    overall_health: "",
    description: "",
    test_results: "",
    key_action: "",
    notes: "",
    is_contagious: "",
    contagious_disease: "",
  });

  // ✅ Handle form input changes
  const handleChange = (e) => {
    const { name, value, type } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "number" && value !== "" ? Number(value) : value,
    }));
  };

  // ✅ Handle multiple file uploads
  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    setFiles((prev) => [...prev, ...selectedFiles]);
  };

  // ❌ Remove selected file
  const handleRemoveFile = (index) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

  // ✅ Submit new medical record
  const handleSubmit = async () => {
    try {
      console.log("🚀 Sending payload:", form);
      const recordData = await createFreelanceMedicalRecord(
        petId,
        { ...form, vet_id: vetId },
        files
      );

      alert("✅ Health record added successfully");
      navigate(-1);
    } catch (err) {
      console.error("❌ Failed to save health record:", err);
      setErrorMessage(
        err?.message ||
          "An unexpected error occurred while saving the health record."
      );
      setShowErrorModal(true);
    }
  };

  return (
    <div className="min-h-screen p-4">
      <div className="max-w-6xl mx-auto bg-white rounded-md shadow-md p-4 sm:p-8">
        <h1 className="text-xl sm:text-2xl font-semibold text-white mb-6 bg-blue-600 p-2 rounded-md">
          Add Health Record
        </h1>

        {/* Visit Info Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-6 bg-gray-300 p-8 rounded-md">
          <div>
            <label className="block text-sm font-medium">Visit Date</label>
            <input
              type="date"
              name="visit_date"
              value={form.visit_date}
              onChange={handleChange}
              className="bg-white w-full border rounded p-2"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Time</label>
            <input
              type="time"
              name="visit_time"
              value={form.visit_time}
              onChange={handleChange}
              className="bg-white w-full border rounded p-2"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Duration (min)</label>
            <input
              type="number"
              name="duration"
              value={form.duration}
              onChange={handleChange}
              className="bg-white w-full border rounded p-2"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Visit Type</label>
            <input
              type="text"
              name="visit_type"
              value={form.visit_type}
              onChange={handleChange}
              className="bg-white w-full border rounded p-2"
            />
          </div>
        </div>

        {/* Main Form Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Left Side */}
          <div>
            <h2 className="text-lg font-semibold mb-4">Visit Information</h2>

            {/* Vet Info (Auto-filled) */}
            <div className="mb-2">
              <label className="block text-sm font-medium">
                Veterinarian (Auto)
              </label>
              <input
                type="text"
                value={`Freelancer Vet ID: ${vetId}`}
                disabled
                className="w-full border rounded p-2 bg-gray-100"
              />
            </div>

            <div className="mb-2">
              <label className="block text-sm font-medium">
                Chief Complaint *
              </label>
              <input
                type="text"
                name="chief_complaint"
                value={form.chief_complaint}
                onChange={handleChange}
                className="w-full border rounded p-2"
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium">Visit Reason</label>
              <input
                type="text"
                name="visit_reason"
                value={form.visit_reason}
                onChange={handleChange}
                className="w-full border rounded p-2"
              />
            </div>

            <h2 className="text-lg font-semibold mb-4">Test and Result</h2>
            <div className="mb-2">
              <label className="block text-sm">Fecal Examination</label>
              <input
                type="text"
                name="fecal_examination"
                value={form.fecal_examination}
                onChange={handleChange}
                className="w-full border rounded p-2"
              />
            </div>

            <div className="mb-2">
              <label className="block text-sm">Physical Examination</label>
              <input
                type="text"
                name="physical_examination"
                value={form.physical_examination}
                onChange={handleChange}
                className="w-full border rounded p-2"
              />
            </div>

            {/* 🩺 Attach Documents */}
            <h2 className="text-lg font-semibold mb-2">Attach Documents</h2>
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={handleFileChange}
              className="border rounded p-2 w-full mb-3"
            />

            {files.length > 0 && (
              <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
                {files.map((file, index) => (
                  <li
                    key={index}
                    className="flex justify-between items-center bg-gray-100 rounded p-2"
                  >
                    <span>{file.name}</span>
                    <button
                      type="button"
                      onClick={() => handleRemoveFile(index)}
                      className="text-red-500 hover:text-red-700 text-sm font-semibold"
                    >
                      ✕
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Right Side */}
          <div>
            {/* Vital Signs */}
            <h2 className="text-lg font-semibold mb-4">Vital Signs</h2>
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div>
                <label className="text-sm">Weight</label>
                <input
                  type="number"
                  name="weight"
                  value={form.weight}
                  onChange={handleChange}
                  className="border rounded p-2 w-full"
                />
              </div>
              <div>
                <label className="text-sm">Temperature</label>
                <input
                  type="number"
                  step="0.1"
                  name="temperature"
                  value={form.temperature}
                  onChange={handleChange}
                  className="border rounded p-2 w-full"
                />
              </div>
              <div>
                <label className="text-sm">Heart Rate</label>
                <input
                  type="number"
                  name="heart_rate"
                  value={form.heart_rate}
                  onChange={handleChange}
                  className="border rounded p-2 w-full"
                />
              </div>
              <div>
                <label className="text-sm">Resp. Rate</label>
                <input
                  type="number"
                  name="resp_rate"
                  value={form.resp_rate}
                  onChange={handleChange}
                  className="border rounded p-2 w-full"
                />
              </div>
            </div>

            {/* Treatment and Diagnosis */}
            <h2 className="text-lg font-semibold mb-4">
              Treatment and Medication
            </h2>
            <input
              type="text"
              name="medication_given"
              placeholder="Medication Given"
              value={form.medication_given}
              onChange={handleChange}
              className="w-full border rounded p-2 mb-2"
            />
            <input
              type="text"
              name="prescriptions"
              placeholder="Prescriptions and doses"
              value={form.prescriptions}
              onChange={handleChange}
              className="w-full border rounded p-2 mb-2"
            />
            <input
              type="text"
              name="treatment"
              placeholder="Treatment"
              value={form.treatment}
              onChange={handleChange}
              className="w-full border rounded p-2 mb-4"
            />

            <h2 className="text-lg font-semibold mb-4">
              Diagnosis and Assessment
            </h2>
            <input
              type="text"
              name="primary_diagnosis"
              placeholder="Primary Diagnosis"
              value={form.primary_diagnosis}
              onChange={handleChange}
              className="w-full border rounded p-2 mb-2"
            />
            <input
              type="text"
              name="body_condition"
              placeholder="Body Condition"
              value={form.body_condition}
              onChange={handleChange}
              className="w-full border rounded p-2 mb-2"
            />
            <input
              type="text"
              name="overall_health"
              placeholder="Overall Health"
              value={form.overall_health}
              onChange={handleChange}
              className="w-full border rounded p-2 mb-4"
            />

            {/* ⚠️ Contagious Disease Section */}
            <h2 className="text-lg font-semibold mb-4 text-red-600">
              Contagious Disease Flag
            </h2>
            <div className="mb-3">
              <label className="block text-sm font-medium">
                Is this a contagious disease?
              </label>
              <select
                name="is_contagious"
                value={form.is_contagious}
                onChange={handleChange}
                className="w-full border rounded p-2"
              >
                <option value="">Select</option>
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </select>
            </div>

            {form.is_contagious === "Yes" && (
              <div className="mb-4">
                <label className="block text-sm font-medium">
                  Specify Disease
                </label>
                <input
                  type="text"
                  name="contagious_disease"
                  placeholder="e.g., Parvovirus, Rabies"
                  value={form.contagious_disease}
                  onChange={handleChange}
                  className="w-full border rounded p-2"
                />
              </div>
            )}

            {/* Notes */}
            <div className="mt-6">
              <h2 className="text-lg font-semibold mb-2">Additional Notes</h2>
              <textarea
                name="notes"
                rows="4"
                placeholder="Add any extra notes or observations..."
                value={form.notes}
                onChange={handleChange}
                className="w-full border rounded p-2 resize-none"
              ></textarea>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row justify-end gap-4 mt-6">
          <button
            className="bg-gray-300 px-6 py-2 rounded w-full sm:w-auto"
            onClick={() => navigate(-1)}
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="bg-green-500 text-white px-6 py-2 rounded hover:bg-green-600 w-full sm:w-auto"
          >
            Confirm
          </button>
        </div>
      </div>

      {/* Error Modal */}
      {showErrorModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
          <div className="bg-white w-[90%] max-w-md rounded-lg shadow-lg p-6 text-center">
            <h2 className="text-xl font-semibold text-red-600 mb-3">
              Failed to Save Health Record
            </h2>
            <p className="text-gray-700 mb-6">{errorMessage}</p>
            <button
              onClick={() => setShowErrorModal(false)}
              className="bg-red-500 text-white px-6 py-2 rounded hover:bg-red-600"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
