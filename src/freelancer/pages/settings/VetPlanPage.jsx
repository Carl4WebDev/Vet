import React, { useState, useEffect } from "react";
import { Switch } from "@headlessui/react";
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
import { getBillingHistory } from "../../../api/billing/getBillingHistory";
import { getAllPlans } from "../../../api/plans/getAllPlans";
import { createPaymentIntent } from "../../../api/paymongo/createPaymentIntent";

import { getSubscriptionByUser } from "../../../api/subscriptions/getSubscriptionByUser";
import { toggleAutoRenew } from "../../../api/subscriptions/toggleAutoRenew";
import { cancelSubscription } from "../../../api/subscriptions/cancelSubscription";

export default function VetPlanPage() {
  const [enabled, setEnabled] = useState(true);
  const [subscription, setSubscription] = useState(null);
  const [billingHistory, setBillingHistory] = useState([]);
  const [plans, setPlans] = useState([]);
  const [showExpiredModal, setShowExpiredModal] = useState(false);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [cancelMode, setCancelMode] = useState("period_end");
  const userId = localStorage.getItem("user_id") || 1;

  // 🧩 Fetch subscription + plans + billing
  const refreshData = async () => {
    try {
      const [sub, bills, planList] = await Promise.all([
        getSubscriptionByUser(userId),
        getBillingHistory(userId),
        getAllPlans(),
      ]);
      setSubscription(sub || {});
      setEnabled(sub?.auto_renew ?? true);
      setBillingHistory(bills || []);
      setPlans(planList || []);
      if (
        sub?.effective_status === "expired" &&
        sub?.plan_name !== "Free Trial"
      )
        setShowExpiredModal(true);
    } catch (err) {
      console.error("Failed to load data", err);
    }
  };

  useEffect(() => {
    refreshData();
  }, [userId]);

  // 🟣 Toggle auto renew
  const handleAutoRenewToggle = async (value) => {
    setEnabled(value);
    try {
      await toggleAutoRenew(subscription.subscription_id, value);
      await refreshData();
    } catch (err) {
      console.error("Auto-renew error:", err);
    }
  };

  // ❌ Cancel subscription (open modal)
  const openCancelModal = () => setShowCancelModal(true);
  const closeCancelModal = () => setShowCancelModal(false);

  const confirmCancel = async () => {
    try {
      await cancelSubscription(subscription.subscription_id, cancelMode);
      closeCancelModal();
      await refreshData();
      alert("Subscription updated successfully!");
    } catch (err) {
      console.error("Cancel error:", err);
      alert("Failed to cancel subscription.");
    }
  };

  // 🧾 PDF Invoice generator
  const handlePrintInvoice = (item) => {
    const doc = new jsPDF({ orientation: "p", unit: "mm", format: "a4" });
    const cleanText = (val) =>
      String(val ?? "")
        .replace(/[^\x20-\x7E₱.,]/g, "")
        .trim();
    const plan = cleanText(item.details);
    const date = cleanText(item.date);
    const status = cleanText(item.status);
    const amount = Number(item.amount || 0).toLocaleString("en-PH", {
      style: "currency",
      currency: "PHP",
      minimumFractionDigits: 2,
    });

    doc.setFont("helvetica", "bold");
    doc.setFontSize(22);
    doc.text("VetConnect Subscription Invoice", 14, 25);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(12);
    doc.text("VetConnect Clinic Management System", 14, 33);
    doc.text("Email: support@vetconnect.pro", 14, 39);
    doc.text("Phone: (02) 123-4567", 14, 45);

    doc.text(`Date: ${date}`, 14, 60);
    doc.text(`Plan: ${plan}`, 14, 67);
    doc.text(`Amount: ${amount}`, 14, 74);
    doc.text(`Status: ${status}`, 14, 81);

    autoTable(doc, {
      startY: 90,
      head: [["Description", "Amount"]],
      body: [[plan, amount]],
      theme: "grid",
      headStyles: { fillColor: [52, 152, 219] },
    });

    doc.text("Thank you for subscribing to VetConnect!", 14, 140);
    doc.text("We appreciate your continued trust.", 14, 146);
    doc.save(`Invoice_${plan}_${date}.pdf`);
  };

  const handleUpgradePlan = async (planId) => {
    try {
      if (planId === 3) return alert("Free Trial does not require payment.");
      const checkoutUrl = await createPaymentIntent(null, userId, planId);
      window.location.href = checkoutUrl;
    } catch (err) {
      alert("Payment failed");
    }
  };

  const isFreeTrial = subscription?.plan_name === "Free Trial";

  return (
    <div className="relative h-auto bg-white flex justify-center items-center font-roboto p-4">
      {/* 🔔 Expiration Modal */}
      {showExpiredModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl shadow-lg text-center w-[90%] md:w-[400px]">
            <h2 className="text-2xl font-bold text-red-600 mb-3">
              Subscription Expired
            </h2>
            <p className="text-gray-700 mb-6">
              Your current subscription has expired. Please renew to continue
              using VetConnect.
            </p>
            <button
              onClick={() => handleUpgradePlan(subscription?.plan_id || 1)}
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 mr-3"
            >
              Renew Now
            </button>
            <button
              onClick={() => setShowExpiredModal(false)}
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* 🔴 Cancel Modal */}
      {showCancelModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl shadow-lg w-[90%] max-w-[520px]">
            <h3 className="text-xl font-semibold mb-2">Cancel Subscription</h3>
            <p className="text-gray-700 mb-4">
              Would you like to cancel immediately or at the end of your billing
              period?
            </p>

            <div className="space-y-3 mb-6">
              <label className="flex items-start gap-3 p-3 border rounded cursor-pointer hover:bg-gray-50">
                <input
                  type="radio"
                  name="cancel-mode"
                  value="period_end"
                  checked={cancelMode === "period_end"}
                  onChange={() => setCancelMode("period_end")}
                  className="mt-1"
                />
                <div>
                  <div className="font-medium">Cancel at period end</div>
                  <div className="text-sm text-gray-600">
                    You’ll keep access until{" "}
                    <strong>{subscription?.end_date}</strong>.
                  </div>
                </div>
              </label>

              <label className="flex items-start gap-3 p-3 border rounded cursor-pointer hover:bg-gray-50">
                <input
                  type="radio"
                  name="cancel-mode"
                  value="now"
                  checked={cancelMode === "now"}
                  onChange={() => setCancelMode("now")}
                  className="mt-1"
                />
                <div>
                  <div className="font-medium text-red-700">Cancel now</div>
                  <div className="text-sm text-gray-600">
                    Access will stop immediately.
                  </div>
                </div>
              </label>
            </div>

            <div className="flex justify-end gap-3">
              <button
                onClick={closeCancelModal}
                className="px-4 py-2 rounded border hover:bg-gray-50"
              >
                Back
              </button>
              <button
                onClick={confirmCancel}
                className="px-4 py-2 rounded bg-red-600 text-white hover:bg-red-700"
              >
                Confirm Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 🧱 Main Container */}
      <div className="w-full bg-[#D9D9D9] rounded-[30px] shadow-lg p-4 relative">
        {/* 🟢 Free Trial Banner */}
        {isFreeTrial && (
          <div className="bg-green-200 border border-green-500 rounded-md p-3 mb-4 text-center text-green-800 font-semibold">
            You are currently on a 3-month Free Trial.
          </div>
        )}

        {/* 🧩 Plan Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 justify-center">
          {plans.map((plan) => (
            <div
              key={plan.plan_id}
              className={`rounded-[25px] p-4 ${
                subscription?.plan_name === plan.name
                  ? "bg-[#9fd39f] border-2 border-green-600"
                  : "bg-[#BABABA]"
              }`}
            >
              <div className="flex flex-col justify-between h-full">
                <div className="space-y-2">
                  <div className="text-[20px] md:text-[24px] font-semibold text-black">
                    {plan.name}
                  </div>
                  <div className="text-[14px] md:text-[16px] text-black">
                    {plan.billing_cycle === "yearly"
                      ? `₱${plan.price}/year`
                      : plan.price === 0
                      ? "Free for 3 months"
                      : `₱${plan.price}/month`}
                  </div>
                  <p className="text-sm">{plan.description}</p>

                  <button
                    onClick={() => handleUpgradePlan(plan.plan_id)}
                    disabled={
                      subscription?.plan_name === plan.name || plan.price === 0
                    }
                    className={`mt-3 w-full md:w-[208px] h-[36px] rounded text-[16px] md:text-[18px] ${
                      subscription?.plan_name === plan.name
                        ? "bg-gray-400 text-white cursor-not-allowed"
                        : plan.price === 0
                        ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                        : "bg-white border border-gray-600 hover:bg-gray-100"
                    }`}
                  >
                    {subscription?.plan_name === plan.name
                      ? "Current Plan"
                      : plan.price === 0
                      ? "Free Trial"
                      : "Subscribe"}
                  </button>
                </div>

                {subscription?.plan_name === plan.name && (
                  <>
                    <div className="text-[14px] text-black mt-2">
                      {subscription?.days_remaining ?? 0} days remaining
                    </div>
                    {subscription?.effective_status !== "cancelled" && (
                      <button
                        onClick={openCancelModal}
                        className="mt-3 w-full md:w-[208px] h-[36px] rounded bg-red-50 border border-red-400 text-red-700 hover:bg-red-100"
                      >
                        Cancel Subscription
                      </button>
                    )}
                  </>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* ⚙️ Auto renew */}
        {!isFreeTrial && (
          <>
            <div className="flex items-center gap-2 mt-6">
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
            <p className="text-[16px] md:text-[18px] mt-2">
              Automatically renews your plan when it expires.
            </p>
          </>
        )}

        {/* 🧾 Billing History */}
        <div className="overflow-x-auto mt-6">
          <table className="w-full border border-[#989898] text-[10px] md:text-[12px] font-[400]">
            <thead className="bg-[#989898] text-left text-white">
              <tr>
                <th>Date</th>
                <th>Details</th>
                <th>Amount</th>
                <th>Status</th>
                <th>Invoice</th>
              </tr>
            </thead>
            <tbody>
              {billingHistory.length === 0 ? (
                <tr>
                  <td colSpan="5" className="text-center py-4 text-gray-600">
                    No billing history yet
                  </td>
                </tr>
              ) : (
                billingHistory.map((item, i) => (
                  <tr
                    key={i}
                    className={`${i % 2 === 0 ? "bg-white" : "bg-[#D9D9D9]"} ${
                      item.status !== "paid" ? "opacity-70" : ""
                    }`}
                  >
                    <td>{item.date}</td>
                    <td>{item.details}</td>
                    <td className="font-bold">₱{item.amount}</td>
                    <td
                      className={`font-semibold ${
                        item.status === "paid"
                          ? "text-green-600"
                          : item.status === "pending"
                          ? "text-yellow-600"
                          : "text-red-600"
                      }`}
                    >
                      {item.status?.toUpperCase()}
                    </td>
                    <td>
                      {item.invoice_url ? (
                        <a
                          href={`${import.meta.env.VITE_API_BASE}${
                            item.invoice_url
                          }`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 underline"
                        >
                          View PDF
                        </a>
                      ) : (
                        <span
                          onClick={() => handlePrintInvoice(item)}
                          className="text-gray-600 underline cursor-pointer"
                        >
                          Generate
                        </span>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
