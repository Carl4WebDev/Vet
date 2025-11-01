import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

import signinLogo from "../assets/images/signin-logo.png";
import newLoginBg from "../assets/images/new-login-bg.jpg";
import { loginClinic } from "../api/auth/loginClinic";
import { forgotPassword } from "../api/forgotPassword"; // ✅ added

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [clinicName, setClinicName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showForgotModal, setShowForgotModal] = useState(false);
  const [forgotEmail, setForgotEmail] = useState("");
  const [forgotKey, setForgotKey] = useState("");
  const [recoveredPassword, setRecoveredPassword] = useState("");
  const [showRecoveredPassword, setShowRecoveredPassword] = useState(false);
  const [feedback, setFeedback] = useState(null); // ✅ for success/error feedback
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const data = await loginClinic(clinicName, password);

      localStorage.setItem("token", data.token);
      localStorage.setItem("role", data.role);
      localStorage.setItem("clinic_name", data.clinic_name);
      localStorage.setItem("user_id", data.user_id);
      localStorage.setItem("clinic_id", data.clinic_id);

      if (data.role === "clinic_owner") {
        navigate("/dashboard");
      } else {
        navigate("/");
      }
    } catch (err) {
      setError(err.message);
    }
  };

  // 🔑 Forgot Password Handler
  const handleForgotSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await forgotPassword(forgotEmail, forgotKey);
      setRecoveredPassword(data.password);
      setFeedback({
        type: "success",
        message: "✅ Password reset successful! Use your new password below.",
      });
      setError("");
    } catch (err) {
      setRecoveredPassword("");
      setFeedback({
        type: "error",
        message: "❌ Invalid email or secret key. Please try again.",
      });
    }
  };

  return (
    <div
      className="relative z-0 min-h-screen bg-cover bg-center flex items-center justify-center px-4"
      style={{ backgroundImage: `url(${newLoginBg})` }}
    >
      <div className="bg-white/90 backdrop-blur-sm shadow-lg rounded-2xl w-full max-w-md p-6 sm:p-8">
        {/* Logo Section */}
        <div className="flex flex-col items-center mb-6">
          <img src={signinLogo} alt="Logo" className="w-32 sm:w-40 mb-2" />
          <h1 className="text-lg sm:text-2xl font-bold text-center text-gray-800">
            VetConnect in pet we care
          </h1>
        </div>

        {/* Login Form */}
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="text-sm">Clinic Name</label>
            <input
              type="text"
              value={clinicName}
              onChange={(e) => setClinicName(e.target.value)}
              className="mt-1 w-full px-3 py-2 rounded-md border shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label className="text-sm">Password</label>
            <div className="relative mt-1">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 py-2 rounded-md border shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
              <button
                type="button"
                className="absolute inset-y-0 right-2 flex items-center"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          {error && <p className="text-red-600 text-sm">{error}</p>}

          <div className="text-center text-sm text-black">
            <button
              type="button"
              onClick={() => setShowForgotModal(true)}
              className="hover:underline"
            >
              Forgot password?
            </button>
          </div>

          <div className="flex gap-2">
            <button
              type="submit"
              className="flex-1 bg-black text-white py-2 rounded-md hover:opacity-90"
            >
              Sign In
            </button>

            <Link
              to="/sign-up"
              className="flex-1 text-center bg-black text-white py-2 rounded-md hover:opacity-90"
            >
              <button type="button">Sign Up</button>
            </Link>
          </div>
          {/* 🔗 Vet Freelancer Login Button */}
          <div className="mt-3">
            <Link
              to="/vet-freelancer/login"
              className="w-full block text-center bg-white text-black border border-black py-2 rounded-md hover:bg-gray-100 transition"
            >
              Login as Vet Freelancer
            </Link>
          </div>
        </form>
      </div>

      {/* 🔐 Forgot Password Modal */}
      {showForgotModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md">
            <h2 className="text-xl font-bold mb-4 text-center">
              Forgot Password
            </h2>

            <form onSubmit={handleForgotSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Email Address
                </label>
                <input
                  type="email"
                  value={forgotEmail}
                  onChange={(e) => setForgotEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="mt-2 w-full px-4 py-2 border rounded-md"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Secret Key
                </label>
                <input
                  type="text"
                  value={forgotKey}
                  onChange={(e) => setForgotKey(e.target.value)}
                  placeholder="Enter your secret key"
                  className="mt-2 w-full px-4 py-2 border rounded-md"
                  required
                />
              </div>

              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowForgotModal(false)}
                  className="px-4 py-2 rounded-md bg-gray-200 hover:bg-gray-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700"
                >
                  Submit
                </button>
              </div>
            </form>

            {/* ✅ Show Feedback */}
            {feedback && (
              <div
                className={`mt-4 p-3 rounded-md text-center text-sm ${
                  feedback.type === "success"
                    ? "bg-green-100 text-green-700 border border-green-300"
                    : "bg-red-100 text-red-700 border border-red-300"
                }`}
              >
                {feedback.message}
              </div>
            )}

            {/* ✅ Show New Password */}
            {recoveredPassword && (
              <div className="mt-6 bg-gray-50 border border-gray-300 rounded-xl p-4 shadow-inner">
                <p className="text-gray-700 font-medium mb-2 text-center">
                  🔐 Your new password has been reset successfully!
                </p>

                <div className="flex items-center justify-between bg-white border border-gray-300 rounded-lg px-3 py-2">
                  <input
                    type={showRecoveredPassword ? "text" : "password"}
                    value={recoveredPassword}
                    readOnly
                    className="flex-1 outline-none bg-transparent font-mono text-gray-900 text-lg"
                  />
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setShowRecoveredPassword((prev) => !prev)}
                      className="text-sm text-gray-500 hover:text-black transition"
                    >
                      {showRecoveredPassword ? "Hide" : "Show"}
                    </button>
                    <button
                      type="button"
                      onClick={() =>
                        navigator.clipboard.writeText(recoveredPassword)
                      }
                      className="text-sm text-blue-600 font-medium hover:underline"
                    >
                      Copy
                    </button>
                  </div>
                </div>

                <p className="text-xs text-gray-500 text-center mt-3">
                  Please keep your new password secure — you’ll need it to log
                  in.
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
