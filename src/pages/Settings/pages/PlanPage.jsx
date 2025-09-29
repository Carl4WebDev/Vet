import React, { useState, useEffect } from "react";
import { Switch } from "@headlessui/react";
import { FaCcMastercard } from "react-icons/fa";

export default function PlanPage() {
  const [enabled, setEnabled] = useState(true);
  const [subscription, setSubscription] = useState(null); // 🔹 current plan
  const [billingHistory, setBillingHistory] = useState([]); // 🔹 invoices

  const userId = localStorage.getItem("user_id") || 1; // hardcoded fallback

  // ✅ Fetch subscription info (can be replaced with real API)
  useEffect(() => {
    const fetchSubscription = async () => {
      try {
        // TODO: Replace with your API call
        const fakeData = {
          plan: "Monthly",
          price: 200,
          daysRemaining: 18,
          autoRenew: true,
        };
        setSubscription(fakeData);
        setEnabled(fakeData.autoRenew);
      } catch (err) {
        console.error("Failed to load subscription", err);
      }
    };

    const fetchBillingHistory = async () => {
      try {
        // TODO: Replace with API later
        const fakeHistory = [
          {
            date: "07/01/2024",
            details: "Monthly Plan",
            amount: 200,
            invoiceUrl: "#",
          },
          {
            date: "06/01/2024",
            details: "Monthly Plan",
            amount: 200,
            invoiceUrl: "#",
          },
        ];
        setBillingHistory(fakeHistory);
      } catch (err) {
        console.error("Failed to load billing history", err);
      }
    };

    fetchSubscription();
    fetchBillingHistory();
  }, [userId]);

  // 🟣 Toggle Auto Renew
  const handleAutoRenewToggle = async (value) => {
    setEnabled(value);
    try {
      // TODO: Replace with API call to update subscription.auto_renew in DB
      console.log("Auto-renew toggled to:", value);
    } catch (err) {
      console.error("Failed to update auto-renew", err);
    }
  };

  // ❌ Cancel subscription
  const handleCancelSubscription = async () => {
    try {
      // TODO: Replace with API call to cancel subscription in DB
      alert("Subscription cancelled (demo)");
    } catch (err) {
      console.error("Failed to cancel subscription", err);
    }
  };

  // 🟢 Upgrade Plan
  const handleUpgradePlan = async () => {
    try {
      // TODO: Replace with API call to create checkout session (Stripe)
      alert("Redirecting to upgrade checkout (demo)");
    } catch (err) {
      console.error("Failed to upgrade", err);
    }
  };

  return (
    <div className="h-auto bg-white flex justify-center items-center font-roboto p-4">
      <div className="w-full bg-[#D9D9D9] rounded-[30px] shadow-lg p-4 relative">
        {/* Plan Selection */}
        <div className="flex flex-col md:flex-row gap-4 md:gap-8 items-center justify-center">
          {/* Monthly Plan */}
          <div className="w-full md:w-[490px] h-auto md:h-[184px] bg-[#BABABA] rounded-[25px] p-4">
            <div className="flex flex-col md:flex-row justify-between items-start h-full gap-4 md:gap-0">
              <div className="space-y-2">
                <div className="text-[20px] md:text-[24px] text-black">
                  Monthly
                </div>
                <div className="text-[14px] md:text-[16px] text-black">
                  {subscription?.daysRemaining ?? 0} days remaining
                </div>
                <button
                  onClick={handleCancelSubscription}
                  className="mt-2 md:mt-5 font-[400] w-full md:w-[208px] h-[32px] border border-gray-600 rounded bg-white hover:bg-gray-100 text-[16px] md:text-[20px]"
                >
                  Cancel Subscription
                </button>
              </div>
              <div className="text-[20px] md:text-[24px]">₱200/Month</div>
            </div>
          </div>

          {/* Yearly Plan */}
          <div className="w-full md:w-[490px] h-auto md:h-[184px] bg-[#BABABA] rounded-[25px] p-4">
            <div className="flex flex-col md:flex-row justify-between items-start h-full gap-4 md:gap-0">
              <div className="space-y-2">
                <div className="text-[20px] md:text-[24px]">Yearly</div>
                <div className="text-[14px] md:text-[16px]">365 Days</div>
                <button
                  onClick={handleUpgradePlan}
                  className="mt-2 md:mt-5 w-full md:w-[208px] h-[32px] border border-gray-600 rounded bg-white hover:bg-gray-100 text-[16px] md:text-[20px]"
                >
                  Upgrade
                </button>
              </div>
              <div className="text-[20px] md:text-[24px]">₱190/Month</div>
            </div>
          </div>
        </div>

        {/* Auto Renew Toggle */}
        <div className="flex items-center gap-2 mt-4 md:mt-0">
          <span className="text-[18px] md:text-[24px] font-[700]">
            Enable auto renew
          </span>
          <Switch
            checked={enabled}
            onChange={handleAutoRenewToggle}
            className={`${
              enabled ? "bg-purple-600" : "bg-gray-300"
            } relative inline-flex h-6 w-11 items-center rounded-full transition-colors`}
          >
            <span className="sr-only">Enable auto renew</span>
            <span
              className={`${
                enabled ? "translate-x-6" : "translate-x-1"
              } inline-block h-4 w-4 transform rounded-full bg-white transition`}
            />
          </Switch>
        </div>

        <p className="text-[16px] md:text-[20px] mt-2">
          This option if checked, will renew your productive subscription, if
          the current plan expires.
        </p>

        {/* Credit Cards (hardcoded for now) */}
        <div className="flex flex-wrap gap-4 md:gap-8 justify-center md:justify-start mt-4">
          {[1, 2].map((_, i) => (
            <div
              key={i}
              className="w-full md:w-[359px] h-auto md:h-[184px] border border-[#00FF26] rounded-[25px] bg-[#BABABA] p-4 flex flex-col justify-between"
            >
              <span className="text-[18px] md:text-[20px] font-[600] mb-2">
                Credit Card
              </span>
              <div className="flex items-center justify-between mb-4 md:mb-12">
                <FaCcMastercard className="text-3xl md:text-4xl text-red-600" />
                <span className="text-[16px] md:text-[20px] tracking-widest">
                  **** **** **** 1234
                </span>
              </div>
            </div>
          ))}

          {/* Add New Card */}
          <div className="w-[80px] h-[80px] md:w-[110px] md:h-[110px] border border-gray-400 rounded-[25px] flex justify-center items-center cursor-pointer hover:bg-gray-100 bg-white shadow self-center">
            <span className="text-4xl md:text-6xl font-bold text-gray-600">
              +
            </span>
          </div>
        </div>

        {/* Billing Table */}
        <div className="overflow-x-auto mt-4">
          <table className="w-full border border-[#989898] text-[10px] md:text-[12px] font-[400]">
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
              {billingHistory.map((item, i) => (
                <tr
                  key={i}
                  className={i % 2 === 0 ? "bg-white" : "bg-[#D9D9D9]"}
                >
                  <td className="px-2 py-1 md:px-4 md:py-2 border border-[#989898]">
                    {item.date}
                  </td>
                  <td className="px-2 py-1 md:px-4 md:py-2 border border-[#989898]">
                    {item.details}
                  </td>
                  <td className="px-2 py-1 md:px-4 md:py-2 font-bold border border-[#989898]">
                    ₱{item.amount}
                  </td>
                  <td className="px-2 py-1 md:px-4 md:py-2 border border-[#989898] text-blue-600 underline cursor-pointer">
                    <a href={item.invoiceUrl}>Invoice</a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
