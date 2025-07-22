import { useState } from "react";

const ClinicDetails = () => {
  const [preview, setPreview] = useState("/default-dog.png"); // set your default image
  const [formData, setFormData] = useState({
    clinicName: "Enter Clinic Name...",
    email: "Enter Email...",
    address: "Enter Address...",
    phone: "Enter Phone Number...",
  });

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="bg-[#D9D9D9] flex flex-col md:flex-row rounded-[30px] items-center justify-start px-4 md:px-5 py-5 font-roboto">
      <div className="p-4 md:p-8 rounded-3xl w-full md:w-[1101px] max-w-4xl">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Left Form Section */}
          <div className="flex-1 space-y-5">
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
            <div>
              <label className="block text-sm font-semibold mb-1">
                Contact Email:
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full md:w-[513px] h-[65px] rounded-[20px] border-[2px] border-gray-400 px-4 text-[16px] outline-none shadow-[0px_4px_5px_5px_#00000040] bg-white"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-1">
                Address:
              </label>
              <input
                name="address"
                value={formData.address}
                onChange={handleChange}
                className="w-full md:w-[513px] h-[65px] rounded-[20px] border-[2px] border-gray-400 px-4 text-[16px] outline-none shadow-[0px_4px_5px_5px_#00000040] bg-white"
              />
            </div>
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

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row justify-center gap-4 pt-4">
              <button className="bg-white text-black px-6 py-2 rounded-full border hover:bg-gray-200 transition shadow-[0px_4px_4px_0px_#00000040]">
                Confirm
              </button>
              <button className="bg-white text-black px-6 py-2 rounded-full border hover:bg-gray-200 transition shadow-[0px_4px_4px_0px_#00000040]">
                Cancel
              </button>
            </div>
          </div>

          {/* Right Profile Image Upload */}
          <div className="flex flex-col items-center justify-center mb-10 md:mb-20 md:mr-4">
            <img
              src={preview}
              alt="Clinic "
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
    </div>
  );
};

export default ClinicDetails;
