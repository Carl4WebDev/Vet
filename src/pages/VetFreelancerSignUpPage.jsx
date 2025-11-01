import { useState } from "react";
import { Eye, EyeOff, X } from "lucide-react";
import navLogo from "../assets/images/nav-logo.png";
import { useNavigate } from "react-router-dom";
import { registerVetFreelancer } from "../updated-api/registerVetFreelancer";
import bgReg from "../assets/images/signup-bg.png";

export default function VetFreelancerSignUpPage() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [name, setName] = useState("");
  const [specialization, setSpecialization] = useState("");
  const [email, setEmail] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // optional fields for freelancing
  const [hourlyRate, setHourlyRate] = useState("");
  const [bio, setBio] = useState("");

  const [accepted, setAccepted] = useState(false);
  const [showTermsModal, setShowTermsModal] = useState(false); // ✅ added modal state

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!accepted) {
      setShowTermsModal(true);
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setLoading(true);
    setError(null);
    setSuccess(null);

    const payload = {
      name,
      specialization: specialization || null,
      email,
      contact_number: contactNumber,
      password,
      employment_type: "freelancer",
      hourly_rate: hourlyRate ? Number(hourlyRate) : null,
      bio: bio || null,
    };

    try {
      const res = await registerVetFreelancer(payload);
      setSuccess("Veterinarian (Freelance) registered successfully!");
      console.log("✅ Registered vet freelancer:", res);
      navigate("/"); // go to login
    } catch (err) {
      setError(err?.message || "Failed to register vet freelancer");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen w-full bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: `url(${bgReg})`,
      }}
    >
      {/* Header */}
      <header className="bg-gray-200 flex items-center gap-2 px-6 py-3 mb-8">
        <img src={navLogo} alt="VetConnect Logo" className="w-10 h-10" />
        <h1 className="text-2xl font-bold -translate-y-1">
          VetConnect — Freelancer Sign Up
        </h1>
      </header>

      <main className="flex-grow flex items-center justify-center">
        <div className="bg-white p-8 rounded-md shadow-lg w-full max-w-md">
          <form className="space-y-4" onSubmit={handleSubmit}>
            <Field label="Full Name" required value={name} onChange={setName} />
            <Field
              label="Specialization"
              placeholder="e.g., Surgery, Dermatology"
              value={specialization}
              onChange={setSpecialization}
            />
            <Field
              label="Email"
              type="email"
              required
              value={email}
              onChange={setEmail}
            />
            <Field
              label="Contact Number"
              type="tel"
              required
              value={contactNumber}
              onChange={setContactNumber}
            />

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

            {/* Terms */}
            <div className="text-sm flex items-center gap-2 mt-4">
              <input
                type="checkbox"
                id="tos"
                checked={accepted}
                onChange={(e) => setAccepted(e.target.checked)}
                required
                className="accent-blue-500"
              />
              <label htmlFor="tos" className="text-black">
                I agree to the{" "}
                <button
                  type="button"
                  onClick={() => setShowTermsModal(true)}
                  className="text-blue-600 underline"
                >
                  Terms and Conditions
                </button>
              </label>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-black text-white py-2 rounded-md hover:opacity-90 transition"
            >
              {loading ? "Creating..." : "Create Freelancer Account"}
            </button>

            <button
              type="button"
              onClick={() => navigate("/")}
              className="w-full mt-2 bg-white text-black border border-black py-2 rounded-md hover:bg-gray-100 transition"
            >
              Back to Login
            </button>

            {error && <p className="text-red-500 text-sm">{error}</p>}
            {success && <p className="text-green-600 text-sm">{success}</p>}
          </form>
        </div>
      </main>

      {/* 📜 Terms & Conditions Modal */}
      {showTermsModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center p-4 z-50">
          <div className="bg-white max-w-3xl max-h-[80vh] overflow-y-auto rounded-lg shadow-xl p-6 relative">
            <button
              className="absolute top-2 right-2 text-gray-600 hover:text-black"
              onClick={() => setShowTermsModal(false)}
            >
              <X size={20} />
            </button>
            <h2 className="text-2xl font-bold mb-4 text-center">
              VetConnect Terms & Conditions
            </h2>
            <p className="text-gray-700 text-sm whitespace-pre-line leading-relaxed">
              Welcome to VetConnect, a digital platform designed to streamline
              veterinary practice management and enhance pet-owner healthcare
              engagement. By accessing or using the VetConnect System you
              acknowledge that you have read, understood, and agreed to comply
              with these Terms and Conditions, including our Privacy Policy, in
              compliance with the Data Privacy Act of 2012 (Republic Act No.
              10173). If you do not agree with any of the provisions herein, you
              are advised to discontinue use of the Application. VetConnect
              provides services that include electronic health records
              management for pets, appointment scheduling and reminders, secure
              communication between veterinary clinics and pet owners, access to
              medical history and treatment notes, as well as business
              intelligence dashboards for veterinary practices. These services
              are intended solely for lawful purposes relating to veterinary
              care and practice management. As a user of the Application, you
              agree to provide accurate and up-to-date information at all times,
              to maintain the confidentiality of your login credentials, and to
              use the System responsibly and lawfully. You further agree not to
              misuse the Application in any way, including but not limited to
              unauthorized access, data manipulation, or any activity that may
              compromise the integrity of the platform. VetConnect is fully
              committed to protecting the privacy and confidentiality of its
              users in accordance with the Data Privacy Act of 2012. By using
              the System, you give explicit consent to the collection and
              processing of your personal information and sensitive personal
              information. Data collected will be limited only to what is
              necessary for veterinary care, appointment management,
              communication, and analytics. All collected information will be
              securely stored with appropriate encryption and access controls.
              Information will not be shared with third parties without your
              consent, except with authorized veterinary staff or as required by
              law. You retain the right to access, update, correct, or request
              deletion of your personal information, consistent with the
              provisions of RA 10173. While the Application provides tools to
              support communication and record-keeping, VetConnect does not
              provide direct veterinary advice and is not liable for any
              misdiagnosis, treatment errors, or medical outcomes. The accuracy
              of all information entered into the System is the sole
              responsibility of the user. All content, software, design
              elements, and intellectual property within the VetConnect
              Application are the exclusive property of VetConnect. These may
              not be copied, modified, distributed, or used in any form without
              prior written consent from the company. We reserve the right to
              suspend or terminate user accounts that violate these Terms and
              Conditions, engage in fraudulent or illegal activity, or
              compromise the security of the platform. Additionally, VetConnect
              may update or amend these Terms and Conditions at any time. Users
              will be notified of significant changes through email or in-app
              notifications, and continued use of the Application after such
              updates will constitute acceptance of the revised terms. These
              Terms and Conditions shall be governed by the laws of the Republic
              of the Philippines, including the Data Privacy Act of 2012 and its
              implementing rules and regulations.
            </p>

            <div className="flex justify-end gap-2 mt-6">
              <button
                onClick={() => setShowTermsModal(false)}
                className="px-4 py-2 rounded-md bg-gray-200 hover:bg-gray-300"
              >
                Close
              </button>
              <button
                onClick={() => {
                  setAccepted(true);
                  setShowTermsModal(false);
                }}
                className="px-4 py-2 rounded-md bg-green-600 text-white hover:bg-green-700"
              >
                I Accept
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// Reusable components
function Field({
  label,
  value,
  onChange,
  type = "text",
  required = false,
  placeholder = "",
}) {
  return (
    <div>
      <Label text={label} required={required} />
      <input
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
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
