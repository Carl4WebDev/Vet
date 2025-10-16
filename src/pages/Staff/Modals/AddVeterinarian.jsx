import React, { useState } from "react";
import { X } from "lucide-react";

export default function AddVeterinarian({
  isOpen,
  onClose,
  onAddVeterinarian,
}) {
  const [formData, setFormData] = useState({
    name: "",
    specialization: "",
    position: "Veterinarian",
    email: "",
    password: "",
    contact_number: "",
    department: "Medical",
  });

  if (!isOpen) return null;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await onAddVeterinarian(formData);
    onClose();
    setFormData({
      name: "",
      specialization: "",
      position: "Veterinarian",
      email: "",
      password: "",
      contact_number: "",
      department: "Medical",
    });
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
      <div className="bg-white rounded-lg w-[90%] sm:w-[500px] p-6 relative shadow-lg">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-black"
        >
          <X size={20} />
        </button>

        <h2 className="text-xl font-semibold mb-4">Add Veterinarian</h2>

        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            className="w-full border p-2 rounded"
            value={formData.name}
            onChange={handleChange}
            required
          />

          <input
            type="text"
            name="specialization"
            placeholder="Specialization (e.g. Canine, Feline)"
            className="w-full border p-2 rounded"
            value={formData.specialization}
            onChange={handleChange}
          />

          <input
            type="email"
            name="email"
            placeholder="Email Address"
            className="w-full border p-2 rounded"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            className="w-full border p-2 rounded"
            value={formData.password}
            onChange={handleChange}
            required
          />

          <input
            type="text"
            name="contact_number"
            placeholder="Contact Number"
            className="w-full border p-2 rounded"
            value={formData.contact_number}
            onChange={handleChange}
          />

          <input
            type="text"
            name="department"
            placeholder="Department (e.g. Medical)"
            className="w-full border p-2 rounded"
            value={formData.department}
            onChange={handleChange}
          />

          <div className="flex justify-end gap-2 mt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-black text-white rounded hover:bg-gray-800"
            >
              Add Veterinarian
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
