import React, { useState } from "react";

export default function ChangePassword() {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showOld, setShowOld] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setError("Password did not match");
    } else {
      setError("");
      alert("Password updated successfully!");
    }
  };

  const inputStyle =
    "w-full h-full px-4 pr-12 text-[16px] sm:text-[18px] rounded-[20px] border-2 font-bold font-[Roboto] focus:outline-none tracking-wide";

  const labelStyle = "mb-2 text-[16px] sm:text-[18px] font-bold text-black";
  const inputGroupStyle = "relative w-full h-[55px] sm:h-[65px]";
  const iconStyle =
    "h-5 w-5 sm:h-6 sm:w-6 absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer opacity-70 hover:opacity-100";

  return (
    <div className="min-h-screen rounded-[30px] bg-[#D9D9D9] flex items-start justify-start font-[Roboto]">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-[480px] bg-[#D9D9D9] rounded-xl p-6 sm:p-10 flex flex-col gap-6"
      >
        <h1 className="text-2xl sm:text-3xl font-bold text-black">
          Change Password
        </h1>

        {/* Old Password */}
        <div>
          <label className={labelStyle}>Old Password</label>
          <div className={inputGroupStyle}>
            <input
              type={showOld ? "text" : "password"}
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
              className={`${inputStyle} border-green-400`}
              placeholder="Enter old password"
            />
            <img
              src={showOld ? "/Eye.png" : "/Eye_off.png"}
              alt="Toggle"
              onClick={() => setShowOld(!showOld)}
              className={iconStyle}
            />
          </div>
        </div>

        {/* New Password */}
        <div>
          <label className={labelStyle}>New Password</label>
          <div className={inputGroupStyle}>
            <input
              type={showNew ? "text" : "password"}
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className={`${inputStyle} border-blue-400`}
              placeholder="Enter new password"
            />
            <img
              src={showNew ? "/Eye.png" : "/Eye_off.png"}
              alt="Toggle"
              onClick={() => setShowNew(!showNew)}
              className={iconStyle}
            />
          </div>
          <ul className="text-sm text-black mt-3 list-disc list-inside">
            <li>Minimum 12 characters</li>
            <li>One uppercase character</li>
            <li>One lowercase character</li>
            <li>One special character</li>
            <li>One number</li>
          </ul>
        </div>

        {/* Confirm Password */}
        <div>
          <label className={labelStyle}>Confirm Password</label>
          <div className={inputGroupStyle}>
            <input
              type={showConfirm ? "text" : "password"}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className={`${inputStyle} ${
                error ? "border-red-500" : "border-gray-400"
              }`}
              placeholder="Re-enter new password"
            />
            <img
              src={showConfirm ? "/Eye.png" : "/Eye_off.png"}
              alt="Toggle"
              onClick={() => setShowConfirm(!showConfirm)}
              className={iconStyle}
            />
          </div>
          {error && <p className="text-sm text-red-600 mt-1">{error}</p>}
        </div>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row justify-between gap-4 mt-6 ml-52">
          <button
            type="submit"
            className="bg-white text-black border border-gray-300 px-6 py-2 rounded-full shadow hover:bg-gray-100 transition w-full"
          >
            Confirm
          </button>
          <button
            type="button"
            className="bg-white text-black border border-gray-300 px-6 py-2 rounded-full shadow hover:bg-gray-100 transition w-full"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
