import React from "react";
import { Switch } from "@headlessui/react";
import { FaCcMastercard } from "react-icons/fa";

const PlanPage = () => {
  const [enabled, setEnabled] = React.useState(true);
  return (
    <div className="min-h-screen bg-white flex justify-center items-center font-roboto">
      <div className="w-[1101px] h-[1087px] bg-[#D9D9D9] rounded-[30px] shadow-lg p-6 space-y-8 relative">
        {/* Plan Selection */}
        <div className="flex flex-col md:flex-row gap-8 items-center justify-center">
          {/* Monthly Plan */}
          <div className="w-[490px] h-[184px] bg-[#BABABA] rounded-[25px] p-4">
            <div className="flex justify-between items-start h-full">
              <div className="space-y-2">
                <div className="text-[24px] font-Roboto text-black ">
                  Monthly
                </div>
                <div className="text-[16px] font-Roboto text-black">
                  18 days remaining
                </div>
                <button className="mt-5 font-[400] w-[208px] h-[32px] border border-gray-600 rounded bg-white hover:bg-gray-100 text-[20px] font-Roboto ">
                  Cancel Subscription
                </button>
              </div>
              <div className="text-[24px] font-Roboto">₱200/Month</div>
            </div>
          </div>

          {/* Yearly Plan */}
          <div className="w-[490px] h-[184px] bg-[#BABABA] rounded-[25px] p-4">
            <div className="flex justify-between items-start h-full">
              <div className="space-y-2">
                <div className="text-[24px] font-Roboto ">Yearly</div>
                <div className="text-[16px] font-Roboto">365 Days</div>
                <button className="mt-5 w-[208px] h-[32px] border border-gray-600 rounded bg-white hover:bg-gray-100 text-[20px] font-Roboto">
                  Upgrade
                </button>
              </div>
              <div className="text-[24px] font-Roboto ">₱190/Month</div>
            </div>
          </div>
        </div>

        {/* Auto Renew Toggle */}
        <div className="flex items-center gap-2">
          <span className="ml-5 text-[24px] font-Roboto font-[700]">
            Enable auto renew
          </span>
          <Switch
            checked={enabled}
            onChange={setEnabled}
            className={`${enabled ? "bg-purple-600" : "bg-gray-300"} 
              relative inline-flex h-6 w-11 items-center rounded-full transition-colors`}
          >
            <span className=" sr-only">Enable auto renew</span>
            <span
              className={`${enabled ? "translate-x-6" : "translate-x-1"} 
                inline-block h-4 w-4 transform rounded-full bg-white transition`}
            />
          </Switch>
        </div>

        <p className="ml-5 text-[20px] font-Roboto ">
          This option if checked, will renew your productive subscription, if
          the current plan expires.
        </p>

        {/* Credit Cards */}
        <div className="ml-5 flex flex-wrap gap-8 justify-start ">
          {[1, 2].map((_, i) => (
            <div
              key={i}
              className="w-[359px] h-[184px] border border-[#00FF26] rounded-[25px] bg-[#BABABA] p-4 flex flex-col justify-between"
            >
              {/* Label */}
              <span className="text-[20px] font-roboto font-[600] mb-2">
                Credit Card
              </span>

              {/* Icon + Number horizontally */}
              <div className="flex items-center justify-between mb-12">
                <FaCcMastercard className="text-4xl text-red-600" />
                <span className="text-[20px] font-roboto tracking-widest">
                  **** **** **** 1234
                </span>
              </div>
            </div>
          ))}

          {/* Add New Card Plus Box */}
          <div className="mt-8 w-[110px] h-[110px] border border-gray-400 rounded-[25px] flex justify-center items-center cursor-pointer hover:bg-gray-100 bg-white shadow">
            <span className="text-6xl font-bold text-gray-600">+</span>
          </div>
        </div>

        {/* Billing Table */}
        <div className="overflow-x-auto">
          <table className="w-full border border-[#989898] mt-6 text-[12px] font-roboto font-[400]">
            <thead className="bg-[#989898] text-left text-white">
              <tr>
                <th className="px-4 py-2 border border-[#989898]">Date</th>
                <th className="px-4 py-2 border border-[#989898]">Details</th>
                <th className="px-4 py-2 border border-[#989898]">Amount</th>
                <th className="px-4 py-2 border border-[#989898]">Download</th>
              </tr>
            </thead>
            <tbody>
              <tr className="odd:bg-white even:bg-[#D9D9D9]">
                <td className="px-4 py-2 border border-[#989898]">
                  07/01/2024
                </td>
                <td className="px-4 py-2 border border-[#989898]">
                  Monthly Plan
                </td>
                <td className="px-4 py-2 font-bold border border-[#989898]">
                  ₱200
                </td>
                <td className="px-4 py-2 border border-[#989898] text-blue-600 underline cursor-pointer">
                  Invoice July 01 2024
                </td>
              </tr>
              <tr className="odd:bg-white even:bg-[#D9D9D9]">
                <td className="px-4 py-2 border border-[#989898]">
                  06/01/2024
                </td>
                <td className="px-4 py-2 border border-[#989898]">
                  Monthly Plan
                </td>
                <td className="px-4 py-2 font-bold border border-[#989898]">
                  ₱200
                </td>
                <td className="px-4 py-2 border border-[#989898] text-blue-600 underline cursor-pointer">
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
