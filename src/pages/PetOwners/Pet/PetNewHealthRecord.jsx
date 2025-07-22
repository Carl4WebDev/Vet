import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import UploadFile from "./Modals/UploadFile";

export default function AddHealthRecord() {
  const Navigate = useNavigate();

  const [open, setOpen] = useState(false);
  return (
    <div className="min-h-screen ">
      <UploadFile isOpen={open} onClose={() => setOpen(false)} />
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
              defaultValue="2024-03-21"
              className="bg-white w-full border rounded p-2"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Time</label>
            <input
              type="time"
              defaultValue="10:30"
              className="bg-white w-full border rounded p-2"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Duration</label>
            <select className="bg-white w-full border rounded p-2">
              <option>45 Minutes</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium">Visit Type</label>
            <select className="bg-white w-full border rounded p-2">
              <option>Routine Exam</option>
            </select>
          </div>
        </div>

        {/* Info Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Left */}
          <div>
            <h2 className="text-lg font-semibold mb-4">Visit Information</h2>
            <div className="mb-2">
              <label className="block text-sm font-medium">
                Veterinarian *
              </label>
              <input
                type="text"
                value="Dr. Jorge M. Martinez"
                className="w-full border rounded p-2"
                readOnly
              />
            </div>
            <div className="mb-2">
              <label className="block text-sm font-medium">
                Chief Complaint *
              </label>
              <input
                type="text"
                value="Annual Wellness Exam + Fecal Check"
                className="w-full border rounded p-2"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium">Visit Reason</label>
              <input
                type="text"
                placeholder="Preventive care, dental care, etc"
                className="w-full border rounded p-2"
              />
            </div>

            <h2 className="text-lg font-semibold mb-4">Test and Result</h2>
            {[
              "Fecal Examination",
              "Physical Examination",
              "Dental Examination",
              "Blood Work",
              "Urinalysis",
              "X-ray",
            ].map((test, index) => (
              <div
                className="flex flex-col justify-between sm:flex-row sm:items-center gap-2 mb-2"
                key={index}
              >
                <div className="flex items-center gap-2 border p-2">
                  <input
                    type="checkbox"
                    defaultChecked={index < 2}
                    className="w-4 h-4"
                  />
                  <label className="text-sm">{test}</label>
                </div>
                <select className="w-full sm:w-32 border rounded p-1">
                  <option>Select Result</option>
                  {index === 0 && <option>Negative</option>}
                  {index === 1 && <option>Normal</option>}
                </select>
              </div>
            ))}

            <div className="mt-4 flex justify-between">
              <div className="flex flex-col">
                <label className="block text-sm font-medium">
                  Specify if others
                </label>
                <input type="text" className="w-full border rounded p-2 mb-2" />
              </div>
              <div className="flex flex-col">
                <label className="block text-sm font-medium">Findings</label>
                <textarea
                  className="w-full border rounded p-2"
                  rows="2"
                ></textarea>
              </div>
            </div>
          </div>

          {/* Right */}
          <div>
            <h2 className="text-lg font-semibold mb-4">Vital Signs</h2>
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div>
                <label className="text-sm">Weight</label>
                <div className="border rounded p-2">15.2 kg</div>
              </div>
              <div>
                <label className="text-sm">Temperature</label>
                <div className="border rounded p-2">38.33 °C</div>
              </div>
              <div>
                <label className="text-sm">Heart Rate</label>
                <div className="border rounded p-2">88 bpm</div>
              </div>
              <div>
                <label className="text-sm">Resp. Rate</label>
                <div className="border rounded p-2">24 rpm</div>
              </div>
            </div>

            <h2 className="text-lg font-semibold mb-4">
              Treatment and Medication
            </h2>
            <input
              type="text"
              placeholder="Type of Medication"
              className="w-full border rounded p-2 mb-2"
            />
            <input type="date" className="w-full border rounded p-2 mb-2" />
            <input
              type="text"
              placeholder="Prescriptions and doses"
              className="w-full border rounded p-2 mb-2"
            />
            <input
              type="text"
              value="Routine Examination"
              className="w-full border rounded p-2 mb-2"
            />
            <input type="date" className="w-full border rounded p-2 mb-4" />

            <h2 className="text-lg font-semibold mb-4">
              Diagnosis and Assessment
            </h2>
            <div className="mb-2">
              <label className="text-sm">Primary Diagnosis</label>
              <input
                type="text"
                value="Healthy"
                className="w-full border rounded p-2"
              />
            </div>
            <div className="mb-2">
              <label className="text-sm">Body Condition</label>
              <select className="w-full border rounded p-2">
                <option>5/9 (Ideal)</option>
              </select>
            </div>
            <div className="mb-4">
              <label className="text-sm">Overall Health</label>
              <select className="w-full border rounded p-2">
                <option>Excellent</option>
              </select>
            </div>

            <button
              onClick={() => setOpen(true)}
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded mb-4 w-full sm:w-auto"
            >
              Upload Documents
            </button>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row justify-end gap-4 mt-6">
          <button
            className="bg-gray-300 px-6 py-2 rounded w-full sm:w-auto"
            onClick={() => Navigate(-1)}
          >
            Cancel
          </button>
          <button className="bg-green-500 text-white px-6 py-2 rounded hover:bg-green-600 w-full sm:w-auto">
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
}
