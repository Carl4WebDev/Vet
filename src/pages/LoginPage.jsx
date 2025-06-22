import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { Link } from "react-router-dom";

import signinLogo from "../assets/images/signin-logo.png";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 h-screen">
      {/* Left - Logo Section */}
      <div className="hidden bg-gray-100 md:flex flex-col items-center justify-center h-full">
        <div className="text-center">
          <div className="flex flex-col justify-center items-center">
            {/* Logo */}
            <div className="">
              <img src={signinLogo} className="h-8/12" />
            </div>
            <div className="-translate-x-10 -translate-y-40">
              <h1 className="text-3xl font-bold mb-4">
                VetConnect in pet we care
              </h1>
            </div>
          </div>
        </div>
      </div>

      {/* Right - Login Form */}
      <div className="bg-sky-300 flex flex-col justify-center items-center">
        <div className="w-full max-w-xs space-y-4">
          <div>
            <label className="text-sm">Clinic Name</label>
            <input
              type="text"
              className="mt-1 w-full px-3 py-2 rounded-md border shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="text-sm">Password</label>
            <div className="relative mt-1">
              <input
                type={showPassword ? "text" : "password"}
                className="w-full px-3 py-2 rounded-md border shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
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
          <div className="text-center text-sm text-black">
            <a href="#" className="hover:underline">
              Forgot password?
            </a>
          </div>
          <div className="flex gap-2">
            <Link
              to="/dashboard"
              className="flex-1 text-center bg-black text-white py-2 rounded-md hover:opacity-90"
            >
              <button>Sign In</button>
            </Link>
            <Link
              to="/sign-up"
              className="flex-1 text-center bg-black text-white py-2 rounded-md hover:opacity-90"
            >
              <button>Sign Up</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
