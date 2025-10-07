import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { createPetMedicalRecord } from "../../../api/post/createPetMedicalRecord";
import { getVetByClinic } from "../../../api/get/getVetByClinic";

export default function AddHealthRecord() {
  const navigate = useNavigate();
  const { petId } = useParams();
  const clinicId = localStorage.getItem("clinic_id");

  const [vets, setVets] = useState([]);
  const [form, setForm] = useState({
    visit_date: "",
    visit_time: "",
    duration: "",
    visit_type: "",
    chief_complaint: "",
    visit_reason: "",
    vet_id: "",
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
  });

  // Fetch veterinarians for dropdown
  useEffect(() => {
    const fetchVets = async () => {
      try {
        const data = await getVetByClinic(clinicId);
        setVets(data || []);
      } catch (err) {
        console.error("Failed to fetch vets:", err);
      }
    };
    if (clinicId) fetchVets();
  }, [clinicId]);

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value, type } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "number" && value !== "" ? Number(value) : value,
    }));
  };

  // Submit the form
  const handleSubmit = async () => {
    try {
      console.log("🚀 Sending payload:", form);
      await createPetMedicalRecord(petId, form);
      alert("Health record added successfully");
      navigate(-1);
    } catch (err) {
      console.error("❌ Failed to save health record:", err);
      alert("Failed to save health record");
    }
  };

  return (
    <div className="min-h-screen p-4">
      <div className="max-w-6xl mx-auto bg-white rounded-md shadow-md p-4 sm:p-8">
        <h1 className="text-xl sm:text-2xl font-semibold text-white mb-6 bg-blue-600 p-2 rounded-md">
          Add Health Record
        </h1>

        {/* Visit Info */}
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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Left */}
          <div>
            <h2 className="text-lg font-semibold mb-4">Visit Information</h2>
            <div className="mb-2">
              <label className="block text-sm font-medium">
                Veterinarian *
              </label>
              <select
                name="vet_id"
                value={form.vet_id}
                onChange={handleChange}
                className="w-full border rounded p-2"
              >
                <option value="">Select Veterinarian</option>
                {vets.map((vet) => (
                  <option key={vet.vet_id} value={vet.vet_id}>
                    {vet.vet_name}
                  </option>
                ))}
              </select>
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
          </div>

          {/* Right */}
          <div>
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
              className="w-full border rounded p-2 mb-2"
            />
          </div>
        </div>

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
    </div>
  );
}
