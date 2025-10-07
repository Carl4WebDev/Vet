import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

import signinLogo from "../assets/images/signin-logo.png";
import newLoginBg from "../assets/images/new-login-bg.jpg";
import { loginClinic } from "../api/auth/loginClinic";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [clinicName, setClinicName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
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

  return (
    <div
      className="min-h-screen bg-cover bg-center flex items-center justify-center px-4"
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
            <a href="#" className="hover:underline">
              Forgot password?
            </a>
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
        </form>
      </div>
    </div>
  );
}
