import React from "react";
import { Switch } from "@headlessui/react";
import { FaCcMastercard } from "react-icons/fa";

const PlanPage = () => {
  const [enabled, setEnabled] = React.useState(true);
  return (
    <div className="h-auto bg-white flex justify-center items-center font-roboto p-4">
      <div className="w-full bg-[#D9D9D9] rounded-[30px] shadow-lg p-4 relative">
        {/* Plan Selection */}
        <div className="flex flex-col md:flex-row gap-4 md:gap-8 items-center justify-center">
          {/* Monthly Plan */}
          <div className="w-full md:w-[490px] h-auto md:h-[184px] bg-[#BABABA] rounded-[25px] p-4">
            <div className="flex flex-col md:flex-row justify-between items-start h-full gap-4 md:gap-0">
              <div className="space-y-2">
                <div className="text-[20px] md:text-[24px] font-Roboto text-black">
                  Monthly
                </div>
                <div className="text-[14px] md:text-[16px] font-Roboto text-black">
                  18 days remaining
                </div>
                <button className="mt-2 md:mt-5 font-[400] w-full md:w-[208px] h-[32px] border border-gray-600 rounded bg-white hover:bg-gray-100 text-[16px] md:text-[20px] font-Roboto">
                  Cancel Subscription
                </button>
              </div>
              <div className="text-[20px] md:text-[24px] font-Roboto">
                ₱200/Month
              </div>
            </div>
          </div>

          {/* Yearly Plan */}
          <div className="w-full md:w-[490px] h-auto md:h-[184px] bg-[#BABABA] rounded-[25px] p-4">
            <div className="flex flex-col md:flex-row justify-between items-start h-full gap-4 md:gap-0">
              <div className="space-y-2">
                <div className="text-[20px] md:text-[24px] font-Roboto">
                  Yearly
                </div>
                <div className="text-[14px] md:text-[16px] font-Roboto">
                  365 Days
                </div>
                <button className="mt-2 md:mt-5 w-full md:w-[208px] h-[32px] border border-gray-600 rounded bg-white hover:bg-gray-100 text-[16px] md:text-[20px] font-Roboto">
                  Upgrade
                </button>
              </div>
              <div className="text-[20px] md:text-[24px] font-Roboto">
                ₱190/Month
              </div>
            </div>
          </div>
        </div>

        {/* Auto Renew Toggle */}
        <div className="flex items-center gap-2 mt-4 md:mt-0">
          <span className="text-[18px] md:text-[24px] font-Roboto font-[700]">
            Enable auto renew
          </span>
          <Switch
            checked={enabled}
            onChange={setEnabled}
            className={`${enabled ? "bg-purple-600" : "bg-gray-300"} 
              relative inline-flex h-6 w-11 items-center rounded-full transition-colors`}
          >
            <span className="sr-only">Enable auto renew</span>
            <span
              className={`${enabled ? "translate-x-6" : "translate-x-1"} 
                inline-block h-4 w-4 transform rounded-full bg-white transition`}
            />
          </Switch>
        </div>

        <p className="text-[16px] md:text-[20px] font-Roboto mt-2">
          This option if checked, will renew your productive subscription, if
          the current plan expires.
        </p>

        {/* Credit Cards */}
        <div className="flex flex-wrap gap-4 md:gap-8 justify-center md:justify-start mt-4">
          {[1, 2].map((_, i) => (
            <div
              key={i}
              className="w-full md:w-[359px] h-auto md:h-[184px] border border-[#00FF26] rounded-[25px] bg-[#BABABA] p-4 flex flex-col justify-between"
            >
              {/* Label */}
              <span className="text-[18px] md:text-[20px] font-roboto font-[600] mb-2">
                Credit Card
              </span>

              {/* Icon + Number horizontally */}
              <div className="flex items-center justify-between mb-4 md:mb-12">
                <FaCcMastercard className="text-3xl md:text-4xl text-red-600" />
                <span className="text-[16px] md:text-[20px] font-roboto tracking-widest">
                  **** **** **** 1234
                </span>
              </div>
            </div>
          ))}

          {/* Add New Card Plus Box */}
          <div className="w-[80px] h-[80px] md:w-[110px] md:h-[110px] border border-gray-400 rounded-[25px] flex justify-center items-center cursor-pointer hover:bg-gray-100 bg-white shadow self-center">
            <span className="text-4xl md:text-6xl font-bold text-gray-600">
              +
            </span>
          </div>
        </div>

        {/* Billing Table */}
        <div className="overflow-x-auto mt-4">
          <table className="w-full border border-[#989898] text-[10px] md:text-[12px] font-roboto font-[400]">
            <thead className="bg-[#989898] text-left text-white">
              <tr>
                <th className="px-2 py-1 md:px-4 md:py-2 border border-[#989898]">
                  Date
                </th>
                <th className="px-2 py-1 md:px-4 md:py-2 border border-[#989898]">
                  Details
                </th>
                <th className="px-2 py-1 md:px-4 md:py-2 border border-[#989898]">
                  Amount
                </th>
                <th className="px-2 py-1 md:px-4 md:py-2 border border-[#989898]">
                  Download
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className="odd:bg-white even:bg-[#D9D9D9]">
                <td className="px-2 py-1 md:px-4 md:py-2 border border-[#989898]">
                  07/01/2024
                </td>
                <td className="px-2 py-1 md:px-4 md:py-2 border border-[#989898]">
                  Monthly Plan
                </td>
                <td className="px-2 py-1 md:px-4 md:py-2 font-bold border border-[#989898]">
                  ₱200
                </td>
                <td className="px-2 py-1 md:px-4 md:py-2 border border-[#989898] text-blue-600 underline cursor-pointer">
                  Invoice July 01 2024
                </td>
              </tr>
              <tr className="odd:bg-white even:bg-[#D9D9D9]">
                <td className="px-2 py-1 md:px-4 md:py-2 border border-[#989898]">
                  06/01/2024
                </td>
                <td className="px-2 py-1 md:px-4 md:py-2 border border-[#989898]">
                  Monthly Plan
                </td>
                <td className="px-2 py-1 md:px-4 md:py-2 font-bold border border-[#989898]">
                  ₱200
                </td>
                <td className="px-2 py-1 md:px-4 md:py-2 border border-[#989898] text-blue-600 underline cursor-pointer">
                  Invoice June 01 2024
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default PlanPage;
