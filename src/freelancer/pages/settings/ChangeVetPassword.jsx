import React, { useState } from "react";
import { changeVetPassword } from "../../api/settings/changeVetPassword";

export default function ChangeVetPassword() {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const vetId = localStorage.getItem("vet_id");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setError("Password did not match");
      return;
    }
    setError("");
    try {
      const res = await changeVetPassword(vetId, {
        oldPassword,
        newPassword,
      });
      alert(res.message || "Password changed successfully!");
      setOldPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (err) {
      console.error("❌ Change password error:", err);
      setError("Failed to change password");
    }
  };

  const inputStyle =
    "w-full h-full px-4 text-[16px] sm:text-[18px] rounded-[20px] border-2 font-bold font-[Roboto] focus:outline-none tracking-wide";
  const labelStyle = "mb-2 text-[16px] sm:text-[18px] font-bold text-black";

  return (
    <div className="min-h-screen rounded-[30px] bg-[#D9D9D9] flex items-start justify-start px-4 sm:px-0 font-[Roboto]">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-[480px] bg-[#D9D9D9] rounded-xl p-6 sm:p-10 flex flex-col gap-6"
      >
        <h1 className="text-2xl sm:text-3xl font-bold text-black">
          Change Password
        </h1>

        <div>
          <label className={labelStyle}>Old Password</label>
          <input
            type="password"
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
            className={`${inputStyle} border-green-400`}
            placeholder="Enter old password"
            required
          />
        </div>

        <div>
          <label className={labelStyle}>New Password</label>
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className={`${inputStyle} border-blue-400`}
            placeholder="Enter new password"
            required
          />
          <ul className="text-sm text-black mt-3 list-disc list-inside">
            <li>Minimum 12 characters</li>
            <li>One uppercase character</li>
            <li>One lowercase character</li>
            <li>One special character</li>
            <li>One number</li>
          </ul>
        </div>

        <div>
          <label className={labelStyle}>Confirm Password</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className={`${inputStyle} ${
              error ? "border-red-500" : "border-gray-400"
            }`}
            placeholder="Re-enter new password"
            required
          />
          {error && <p className="text-sm text-red-600 mt-1">{error}</p>}
        </div>

        <div className="flex flex-col sm:flex-row justify-between gap-4 mt-6 sm:ml-52">
          <button
            type="submit"
            className="bg-white text-black border border-gray-300 px-6 py-2 rounded-full shadow hover:bg-gray-100 transition w-full"
          >
            Confirm
          </button>
          <button
            type="button"
            onClick={() => {
              setOldPassword("");
              setNewPassword("");
              setConfirmPassword("");
              setError("");
            }}
            className="bg-white text-black border border-gray-300 px-6 py-2 rounded-full shadow hover:bg-gray-100 transition w-full"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
