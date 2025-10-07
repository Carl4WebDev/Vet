const API_BASE = import.meta.env.VITE_API_BASE;

export async function getAppointmentsByVet(vetId, searchTerm = "") {
  try {
    let url = `${API_BASE}/appointments/vet-appointments/${vetId}`;

    if (searchTerm) {
      // Determine if searchTerm is a year, month, or full date
      const yearRegex = /^\d{4}$/; // e.g. 2025
      const yearMonthRegex = /^\d{4}-(0[1-9]|1[0-2])$/; // e.g. 2025-10
      const fullDateRegex = /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/; // e.g. 2025-10-11
      const monthNameRegex = /^[a-zA-Z]+$/; // e.g. October

      if (fullDateRegex.test(searchTerm)) {
        url += `?date=${searchTerm}`;
      } else if (yearMonthRegex.test(searchTerm)) {
        const [year, month] = searchTerm.split("-");
        url += `?month=${month}&year=${year}`;
      } else if (yearRegex.test(searchTerm)) {
        url += `?year=${searchTerm}`;
      } else if (monthNameRegex.test(searchTerm.toLowerCase())) {
        const months = {
          january: "01",
          february: "02",
          march: "03",
          april: "04",
          may: "05",
          june: "06",
          july: "07",
          august: "08",
          september: "09",
          october: "10",
          november: "11",
          december: "12",
        };
        const monthNumber = months[searchTerm.toLowerCase()];
        if (monthNumber) {
          const currentYear = new Date().getFullYear();
          url += `?month=${monthNumber}&year=${currentYear}`;
        }
      }
    }

    const res = await fetch(url);
    if (!res.ok) throw new Error("Failed to fetch appointments");

    const data = await res.json();
    return data.data;
  } catch (error) {
    console.error("Error fetching appointments:", error);
    return [];
  }
}
