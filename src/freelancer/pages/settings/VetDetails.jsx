import React, { useState } from "react";
import { updateVetInfo } from "../../api/settings/updateVetInfo";

export default function VetDetails() {
  const [preview, setPreview] = useState("/default-dog.png");
  const [selectedImage, setSelectedImage] = useState(null);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    specialization: "",
    contact_number: "",
  });

  const vetId = localStorage.getItem("vet_id");

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    try {
      await updateVetInfo(vetId, {
        ...formData,
        image: selectedImage,
      });

      setShowSuccess(true);
      setTimeout(() => window.location.reload(), 1500);
    } catch (error) {
      console.error("❌ Update failed:", error);
      setShowError(true);
    }
  };

  return (
    <div className="bg-[#D9D9D9] flex flex-col md:flex-row rounded-[30px] items-center justify-start px-4 md:px-5 py-5 font-roboto">
      <div className="p-4 md:p-8 rounded-3xl w-full md:w-[1101px] max-w-4xl">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Left Form Section */}
          <div className="flex-1 space-y-5">
            <div>
              <label className="block text-sm font-semibold mb-1">Name:</label>
              <input
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full md:w-[513px] h-[65px] rounded-[20px] border-[2px] border-gray-400 px-4 text-[16px] outline-none shadow-[0px_4px_5px_5px_#00000040] bg-white"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-1">
                Specialization:
              </label>
              <input
                name="specialization"
                value={formData.specialization}
                onChange={handleChange}
                className="w-full md:w-[513px] h-[65px] rounded-[20px] border-[2px] border-gray-400 px-4 text-[16px] outline-none shadow-[0px_4px_5px_5px_#00000040] bg-white"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-1">
                Contact Number:
              </label>
              <input
                type="tel"
                name="contact_number"
                value={formData.contact_number}
                onChange={handleChange}
                className="w-full md:w-[513px] h-[65px] rounded-[20px] border-[2px] border-gray-400 px-4 text-[16px] outline-none shadow-[0px_4px_5px_5px_#00000040] bg-white"
              />
            </div>

            <div className="flex flex-col sm:flex-row justify-center gap-4 pt-4">
              <button
                onClick={handleSubmit}
                className="bg-white text-black px-6 py-2 rounded-full border hover:bg-gray-200 transition shadow-[0px_4px_4px_0px_#00000040]"
              >
                Confirm
              </button>
              <button
                onClick={() =>
                  setFormData({
                    name: "",
                    specialization: "",
                    contact_number: "",
                  })
                }
                className="bg-white text-black px-6 py-2 rounded-full border hover:bg-gray-200 transition shadow-[0px_4px_4px_0px_#00000040]"
              >
                Cancel
              </button>
            </div>
          </div>

          {/* Right: Image Upload */}
          <div className="flex flex-col items-center justify-center mb-10 md:mb-20 md:mr-4">
            <img
              src={preview}
              alt="Vet"
              className="w-[200px] h-[200px] md:w-[246px] md:h-[246px] rounded-full object-cover border border-black bg-white"
            />
            <label
              htmlFor="image-upload"
              className="mt-4 flex items-center justify-center text-center bg-white w-[120px] h-[44px] md:w-[153px] rounded-full cursor-pointer hover:bg-gray-100 shadow-[0px_4px_5px_5px_#00000040]"
            >
              Upload
            </label>
            <input
              id="image-upload"
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
            />
          </div>
        </div>
      </div>

      {/* ✅ Success Modal */}
      {showSuccess && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-2xl shadow-lg text-center max-w-sm">
            <h2 className="text-xl font-semibold mb-2 text-green-600">
              ✅ Success!
            </h2>
            <p className="text-gray-600 mb-4">
              Veterinarian info updated successfully.
            </p>
          </div>
        </div>
      )}

      {/* ❌ Error Modal */}
      {showError && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-2xl shadow-lg text-center max-w-sm">
            <h2 className="text-xl font-semibold mb-2 text-red-600">
              ❌ Error
            </h2>
            <p className="text-gray-600 mb-4">
              Failed to update vet information. Please try again.
            </p>
            <button
              onClick={() => setShowError(false)}
              className="mt-2 bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded-lg"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
