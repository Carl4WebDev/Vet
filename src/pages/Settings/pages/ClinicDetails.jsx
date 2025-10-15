import { useState } from "react";
import { changeInfoClinic } from "../../../api/put/changeInfoClinic";

// const clinicId = localStorage.getItem("clinic_id");
function waitForClinicId(timeout = 5000) {
  return new Promise((resolve, reject) => {
    const start = Date.now();

    const interval = setInterval(() => {
      const id = localStorage.getItem("clinic_id");
      if (id && id !== "null" && id !== "undefined") {
        clearInterval(interval);
        resolve(id);
      } else if (Date.now() - start > timeout) {
        clearInterval(interval);
        reject(new Error("Timed out waiting for clinic_id"));
      }
    }, 100); // check every 100ms
  });
}

const ClinicDetails = () => {
  const [preview, setPreview] = useState("/default-dog.png");
  const [selectedImage, setSelectedImage] = useState(null);
  // ✅ Modal state
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);

  const [formData, setFormData] = useState({
    clinicName: "",
    phone: "",
    street: "",
    city: "",
    province: "",
    postal_code: "",
    country: "",
    unit_number: "",
    latitude: "",
    longitude: "",
  });

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
      const address = {
        street: formData.street,
        city: formData.city,
        province: formData.province,
        postal_code: formData.postal_code,
        country: formData.country,
        unit_number: formData.unit_number,
        latitude: formData.latitude,
        longitude: formData.longitude,
      };

      const clinicId = await waitForClinicId();
      await changeInfoClinic(clinicId, {
        clinicName: formData.clinicName,
        phone: formData.phone,
        address,
        image: selectedImage,
      });

      // ✅ Show success modal
      setShowSuccess(true);

      // ⏳ Refresh entire page after short delay
      setTimeout(() => {
        window.location.reload();
      }, 1500);
    } catch (error) {
      setShowError(true);
    }
  };

  return (
    <div className="bg-[#D9D9D9] flex flex-col md:flex-row rounded-[30px] items-center justify-start px-4 md:px-5 py-5 font-roboto">
      <div className="p-4 md:p-8 rounded-3xl w-full md:w-[1101px] max-w-4xl">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Left Form Section */}
          <div className="flex-1 space-y-5">
            {/* Clinic Name */}
            <div>
              <label className="block text-sm font-semibold mb-1">
                Clinic Name:
              </label>
              <input
                name="clinicName"
                value={formData.clinicName}
                onChange={handleChange}
                className="w-full md:w-[513px] h-[65px] rounded-[20px] border-[2px] border-gray-400 px-4 text-[16px] outline-none shadow-[0px_4px_5px_5px_#00000040] bg-white"
              />
            </div>

            {/* Phone Number */}
            <div>
              <label className="block text-sm font-semibold mb-1">
                Phone Number:
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full md:w-[513px] h-[65px] rounded-[20px] border-[2px] border-gray-400 px-4 text-[16px] outline-none shadow-[0px_4px_5px_5px_#00000040] bg-white"
              />
            </div>

            {/* Address Fields */}
            <div>
              <label className="block text-sm font-semibold mb-1">
                Street:
              </label>
              <input
                name="street"
                value={formData.street}
                onChange={handleChange}
                className="w-full md:w-[513px] h-[50px] rounded-[15px] border-[2px] border-gray-400 px-4 text-[16px] outline-none bg-white"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold mb-1">
                  City:
                </label>
                <input
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  className="w-full h-[50px] rounded-[15px] border-[2px] border-gray-400 px-4 text-[16px] outline-none bg-white"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-1">
                  Province:
                </label>
                <input
                  name="province"
                  value={formData.province}
                  onChange={handleChange}
                  className="w-full h-[50px] rounded-[15px] border-[2px] border-gray-400 px-4 text-[16px] outline-none bg-white"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold mb-1">
                  Postal Code:
                </label>
                <input
                  name="postal_code"
                  value={formData.postal_code}
                  onChange={handleChange}
                  className="w-full h-[50px] rounded-[15px] border-[2px] border-gray-400 px-4 text-[16px] outline-none bg-white"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-1">
                  Country:
                </label>
                <input
                  name="country"
                  value={formData.country}
                  onChange={handleChange}
                  className="w-full h-[50px] rounded-[15px] border-[2px] border-gray-400 px-4 text-[16px] outline-none bg-white"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold mb-1">
                Unit Number:
              </label>
              <input
                name="unit_number"
                value={formData.unit_number}
                onChange={handleChange}
                className="w-full md:w-[513px] h-[50px] rounded-[15px] border-[2px] border-gray-400 px-4 text-[16px] outline-none bg-white"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold mb-1">
                  Latitude:
                </label>
                <input
                  name="latitude"
                  value={formData.latitude}
                  onChange={handleChange}
                  className="w-full h-[50px] rounded-[15px] border-[2px] border-gray-400 px-4 text-[16px] outline-none bg-white"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-1">
                  Longitude:
                </label>
                <input
                  name="longitude"
                  value={formData.longitude}
                  onChange={handleChange}
                  className="w-full h-[50px] rounded-[15px] border-[2px] border-gray-400 px-4 text-[16px] outline-none bg-white"
                />
              </div>
            </div>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row justify-center gap-4 pt-4">
              <button
                onClick={handleSubmit}
                className="bg-white text-black px-6 py-2 rounded-full border hover:bg-gray-200 transition shadow-[0px_4px_4px_0px_#00000040]"
              >
                Confirm
              </button>
              <button className="bg-white text-black px-6 py-2 rounded-full border hover:bg-gray-200 transition shadow-[0px_4px_4px_0px_#00000040]">
                Cancel
              </button>
            </div>
          </div>

          {/* Right Profile Image Upload */}
          {/* Right Profile Image Upload */}
          <div className="flex flex-col items-center justify-center mb-10 md:mb-20 md:mr-4">
            <img
              src={preview}
              alt="Clinic"
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
              Clinic information updated successfully.
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
              Failed to update clinic information. Please try again.
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
};

export default ClinicDetails;
