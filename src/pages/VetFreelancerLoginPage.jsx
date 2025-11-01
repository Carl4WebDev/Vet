import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import navLogo from "../assets/images/nav-logo.png";
import { useNavigate } from "react-router-dom";
import { loginVetFreelancer } from "../updated-api/loginVetFreelancer";

import newLoginBg from "../assets/images/new-login-bg.jpg";

export default function VetFreelancerLoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await loginVetFreelancer(email, password);
      console.log("✅ Logged in:", res);
      localStorage.setItem("token", res.token);
      localStorage.setItem("user_id", res.user.user_id);
      localStorage.setItem("role", res.user.role);
      localStorage.setItem("vet_id", res.user.vet_id);
      localStorage.setItem("vet_name", res.user.vet_name);
      console.log(res);
      navigate("/vet-freelancer/home/dashboard");
    } catch (err) {
      setError(err.message || "Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center bg-gray-100"
      style={{
        backgroundImage: `url(${newLoginBg})`,
      }}
    >
      <img src={navLogo} alt="VetConnect Logo" className="w-16 h-16 mb-4" />
      <h1 className="text-2xl font-bold mb-6 text-center">
        Vet Freelancer Login
      </h1>

      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-lg shadow-md w-full max-w-sm"
      >
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-3 py-2 border rounded focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="mb-4 relative">
          <label className="block text-sm font-medium mb-1">Password</label>
          <input
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full px-3 py-2 border rounded focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-2 top-8 text-gray-500"
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>

        {error && <p className="text-red-500 text-sm mb-3">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-black text-white py-2 rounded hover:opacity-90 transition"
        >
          {loading ? "Signing in..." : "Sign In"}
        </button>

        <button
          type="button"
          onClick={() => navigate("/signup/vet-freelancer")}
          className="w-full bg-white text-black border border-black py-2 mt-3 rounded hover:bg-gray-100 transition"
        >
          Register as Freelancer
        </button>
      </form>
    </div>
  );
}
