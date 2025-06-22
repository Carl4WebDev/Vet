import { useCallback, useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import signupBg from "../assets/images/signup-bg.png";
import navLogo from "../assets/images/nav-logo.png";
import { Link } from "react-router-dom";

export default function SignUpPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  return (
    <div
      className="min-h-screen w-full bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: `url(${signupBg})`,
      }}
    >
      {/* <img src={signupBg} className="absolute object-center " /> */}
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
          <form className="space-y-4">
            <Input label="Clinic Name" required />
            <Input label="Email" type="email" required />
            <Input label="Number" type="tel" required />
            <Input label="Address" required />

            {/* Password */}
            <div>
              <Label text="Password" required />
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
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
            <Link to="/dashboard">
              <button
                type="submit"
                className="w-full bg-black text-white py-2 rounded-md hover:opacity-90 transition"
              >
                Create Account
              </button>
            </Link>
          </form>
        </div>
      </main>
    </div>
  );
}

// Reusable Components
function Input({ label, required, type = "text" }) {
  return (
    <div>
      <Label text={label} required={required} />
      <input
        type={type}
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
