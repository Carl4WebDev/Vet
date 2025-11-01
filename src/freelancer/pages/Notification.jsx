import { useEffect, useState } from "react";
import { FaBell, FaCheckCircle } from "react-icons/fa";
import { getVetAnnouncements } from "../api/notification/getVetAnnouncements";

export default function Notifications() {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVetAnnouncements = async () => {
      try {
        setLoading(true);
        const data = await getVetAnnouncements();

        // ✅ Normalize incoming data
        const formatted = (data || []).map((item) => ({
          id: item.announcement_id,
          title: item.title,
          message: item.content,
          category: item.category,
          priority: item.priority,
          status: item.status,
          created_at: item.created_at,
          start_datetime: item.start_datetime,
          end_datetime: item.end_datetime,
          is_read: false, // default to unread
        }));

        setNotifications(formatted);
      } catch (err) {
        console.error("Failed to load vet announcements:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchVetAnnouncements();
  }, []);

  // 📅 Format readable date
  const formatDate = (isoString) => {
    if (!isoString) return "N/A";
    const date = new Date(isoString);
    return date.toLocaleString("en-PH", {
      dateStyle: "medium",
      timeStyle: "short",
    });
  };

  // ✅ Mark single as read
  const markAsRead = (id) =>
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, is_read: true } : n))
    );

  // ✅ Mark all as read
  const markAllAsRead = () =>
    setNotifications((prev) => prev.map((n) => ({ ...n, is_read: true })));

  return (
    <div className="w-full max-w-5xl mx-auto p-4 bg-white rounded shadow">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <FaBell className="text-xl text-gray-800" />
          <h1 className="text-2xl font-semibold">Veterinarian Announcements</h1>
        </div>

        {notifications.length > 0 && (
          <button
            onClick={markAllAsRead}
            className="text-sm bg-gray-800 text-white px-3 py-1 rounded hover:bg-gray-700 transition"
          >
            Mark All as Read
          </button>
        )}
      </div>

      {loading ? (
        <p className="text-center py-10 text-gray-500">
          Loading announcements...
        </p>
      ) : notifications.length === 0 ? (
        <p className="text-center py-10 text-gray-500">
          No announcements available.
        </p>
      ) : (
        <ul className="space-y-3">
          {notifications.map((notif) => (
            <li
              key={notif.id}
              className={`flex flex-col sm:flex-row justify-between items-start sm:items-center p-4 rounded-lg border ${
                notif.is_read
                  ? "bg-gray-50 border-gray-200"
                  : "bg-green-50 border-green-300"
              }`}
            >
              <div>
                <h3 className="text-base font-semibold text-gray-800">
                  {notif.title}
                </h3>
                <p className="text-gray-600 text-sm">{notif.message}</p>

                <p className="text-xs text-gray-500 mt-1">
                  🗂 Category: {notif.category} | 🔺 Priority:{" "}
                  {notif.priority || "N/A"}
                </p>

                <p className="text-xs text-gray-400 mt-1">
                  Published: {formatDate(notif.created_at)}
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
