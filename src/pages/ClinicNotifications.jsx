import { useEffect, useState } from "react";
import { FaBell, FaCheckCircle, FaTimesCircle } from "react-icons/fa";

export default function ClinicNotifications() {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  // 📨 Simulated Fetch (replace with real API)
  useEffect(() => {
    const fetchNotifications = async () => {
      setLoading(true);
      // Example dummy data — replace this with your backend call
      const data = [
        {
          id: 1,
          title: "New Appointment Booked",
          message:
            "A new appointment has been booked by John Doe for Max (Dog).",
          type: "appointment",
          created_at: "2025-10-03T14:30:00Z",
          is_read: false,
        },
        {
          id: 2,
          title: "Inventory Alert",
          message: "Low stock alert for Rabies Vaccine. Please restock soon.",
          type: "inventory",
          created_at: "2025-10-03T09:15:00Z",
          is_read: true,
        },
        {
          id: 3,
          title: "Payment Received",
          message: "Payment of ₱1,200.00 has been successfully processed.",
          type: "billing",
          created_at: "2025-10-02T17:45:00Z",
          is_read: true,
        },
      ];
      setTimeout(() => {
        setNotifications(data);
        setLoading(false);
      }, 500);
    };

    fetchNotifications();
  }, []);

  // 📅 Format date
  const formatDate = (isoString) => {
    const date = new Date(isoString);
    return date.toLocaleString("en-PH", {
      dateStyle: "medium",
      timeStyle: "short",
    });
  };

  // 📌 Mark notification as read (simulate)
  const markAsRead = (id) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, is_read: true } : n))
    );
  };

  return (
    <div className="w-full max-w-5xl mx-auto p-4 bg-white rounded shadow">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <FaBell className="text-xl text-gray-800" />
          <h1 className="text-2xl font-semibold">Clinic Notifications</h1>
        </div>
        {notifications.length > 0 && (
          <button
            onClick={() =>
              setNotifications((prev) =>
                prev.map((n) => ({ ...n, is_read: true }))
              )
            }
            className="text-sm bg-gray-800 text-white px-3 py-1 rounded hover:bg-gray-700 transition"
          >
            Mark All as Read
          </button>
        )}
      </div>

      {loading ? (
        <p className="text-center py-10 text-gray-500">
          Loading notifications...
        </p>
      ) : notifications.length === 0 ? (
        <p className="text-center py-10 text-gray-500">
          No notifications available.
        </p>
      ) : (
        <ul className="space-y-3">
          {notifications.map((notif) => (
            <li
              key={notif.id}
              className={`flex flex-col sm:flex-row justify-between items-start sm:items-center p-4 rounded-lg border ${
                notif.is_read
                  ? "bg-gray-50 border-gray-200"
                  : "bg-blue-50 border-blue-300"
              }`}
            >
              <div>
                <h3 className="text-base font-semibold text-gray-800">
                  {notif.title}
                </h3>
                <p className="text-gray-600 text-sm">{notif.message}</p>
                <p className="text-xs text-gray-400 mt-1">
                  {formatDate(notif.created_at)}
                </p>
              </div>

              <div className="flex items-center gap-3 mt-2 sm:mt-0">
                {notif.is_read ? (
                  <span className="flex items-center text-green-600 text-xs gap-1">
                    <FaCheckCircle /> Read
                  </span>
                ) : (
                  <button
                    onClick={() => markAsRead(notif.id)}
                    className="text-blue-600 text-xs font-medium hover:underline"
                  >
                    Mark as Read
                  </button>
                )}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
