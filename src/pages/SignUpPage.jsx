import { useState } from "react";
import { Eye, EyeOff, X } from "lucide-react";
import signupBg from "../assets/images/signup-bg.png";
import navLogo from "../assets/images/nav-logo.png";
import { registerClinic } from "../api/auth/registerClinic";

import { useNavigate } from "react-router-dom";
export default function SignUpPage() {
  const navigate = useNavigate(); // ✅
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Form state
  const [clinicName, setClinicName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // Address modal state
  const [isAddressModalOpen, setIsAddressModalOpen] = useState(false);
  const [address, setAddress] = useState({
    street: "",
    city: "",
    province: "",
    postal_code: "",
    country: "",
    unit_number: "",
    latitude: "",
    longitude: "",
  });

  // Feedback state
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleAddressChange = (e) => {
    const { name, value } = e.target;
    setAddress((prev) => ({ ...prev, [name]: value }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setLoading(true);
    setError(null);
    setSuccess(null);

    const clinicData = {
      email,
      password,
      clinic_name: clinicName,
      phone_number: phoneNumber,
      address,
    };

    try {
      const result = await registerClinic(clinicData);
      setSuccess("Clinic registered successfully!");
      console.log("✅ Registered clinic:", result);
      navigate("/dashboard"); // ✅ navigate after success
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen w-full bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: `url(${signupBg})`,
      }}
    >
      {/* Header */}
      <header className="bg-gray-200 flex items-center gap-2 px-6 py-3 mb-8">
        <img src={navLogo} alt="VetConnect Logo" className="w-10 h-10" />
        <h1 className="text-2xl font-bold -translate-y-1">
          VetConnect in pet we care
        </h1>
      </header>

      {/* Body */}
      <main className="flex-grow flex items-center justify-center">
        <div className="bg-[#BBC0C3] backdrop-blur-sm p-8 rounded-md shadow-lg w-full max-w-md">
          <form className="space-y-4" onSubmit={handleSubmit}>
            <Input
              label="Clinic Name"
              required
              value={clinicName}
              onChange={(e) => setClinicName(e.target.value)}
            />
            <Input
              label="Email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input
              label="Number"
              type="tel"
              required
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
            />

            {/* Address → opens modal */}
            <div>
              <Label text="Address" required />
              <div
                onClick={() => setIsAddressModalOpen(true)}
                className="w-full px-3 py-2 rounded-md border bg-white cursor-pointer focus:ring-2 focus:ring-blue-400"
              >
                {address.street && address.city
                  ? `${address.street}, ${address.city}`
                  : "Click to enter address"}
              </div>
            </div>

            {/* Password */}
            <div>
              <Label text="Password" required />
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-3 py-2 rounded-md border focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-2 top-2.5"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {/* Confirm Password */}
            <div>
              <Label text="Confirm Password" required />
              <div className="relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full px-3 py-2 rounded-md border focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-2 top-2.5"
                >
                  {showConfirmPassword ? (
                    <EyeOff size={18} />
                  ) : (
                    <Eye size={18} />
                  )}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-black text-white py-2 rounded-md hover:opacity-90 transition"
            >
              {loading ? "Creating..." : "Create Account"}
            </button>

            {error && <p className="text-red-500 text-sm">{error}</p>}
            {success && <p className="text-green-600 text-sm">{success}</p>}
          </form>
        </div>
      </main>

      {/* Address Modal */}
      {isAddressModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-md shadow-lg w-full max-w-lg relative">
            <button
              className="absolute top-2 right-2 text-gray-600 hover:text-black"
              onClick={() => setIsAddressModalOpen(false)}
            >
              <X size={20} />
            </button>
            <h2 className="text-lg font-semibold mb-4">Enter Address</h2>
            <div className="grid grid-cols-2 gap-4">
              <InputField
                label="Street"
                name="street"
                value={address.street}
                onChange={handleAddressChange}
              />
              <InputField
                label="City"
                name="city"
                value={address.city}
                onChange={handleAddressChange}
              />
              <InputField
                label="Province"
                name="province"
                value={address.province}
                onChange={handleAddressChange}
              />
              <InputField
                label="Postal Code"
                name="postal_code"
                value={address.postal_code}
                onChange={handleAddressChange}
              />
              <InputField
                label="Country"
                name="country"
                value={address.country}
                onChange={handleAddressChange}
              />
              <InputField
                label="Unit Number"
                name="unit_number"
                value={address.unit_number}
                onChange={handleAddressChange}
              />
              <InputField
                label="Latitude"
                name="latitude"
                value={address.latitude}
                onChange={handleAddressChange}
              />
              <InputField
                label="Longitude"
                name="longitude"
                value={address.longitude}
                onChange={handleAddressChange}
              />
            </div>
            <div className="mt-4 text-right">
              <button
                className="bg-black text-white px-4 py-2 rounded-md hover:opacity-90"
                onClick={() => setIsAddressModalOpen(false)}
              >
                Save Address
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// Reusable Components
function Input({ label, required, type = "text", value, onChange }) {
  return (
    <div>
      <Label text={label} required={required} />
      <input
        type={type}
        value={value}
        onChange={onChange}
        className="w-full px-3 py-2 rounded-md border focus:outline-none focus:ring-2 focus:ring-blue-400"
      />
    </div>
  );
}

function Label({ text, required }) {
  return (
    <label className="text-sm block mb-1 font-medium">
      {text} {required && <span className="text-red-500">*</span>}
    </label>
  );
}

function InputField({ label, name, value, onChange }) {
  return (
    <div className="col-span-1">
      <Label text={label} />
      <input
        type="text"
        name={name}
        value={value}
        onChange={onChange}
        className="w-full px-3 py-2 rounded-md border focus:outline-none focus:ring-2 focus:ring-blue-400"
      />
    </div>
  );
}
