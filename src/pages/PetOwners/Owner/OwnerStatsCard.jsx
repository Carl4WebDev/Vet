export default function OwnerStatsCard({ owner }) {
  return (
    <div className="mt-6 md:mt-0">
      <h2 className="text-lg font-bold">Statistics</h2>
      <p>
        <strong>Times Visited Clinic:</strong> {owner.times_visited_clinic}
      </p>
      <p>
        <strong>Number of Pets:</strong> {owner.pet_count}
      </p>
      <p>
        <strong>Last Visited:</strong>{" "}
        {owner.last_visit
          ? new Date(owner.last_visit).toLocaleDateString()
          : "N/A"}
      </p>
      <p>
        <strong>Missed Appointment:</strong> {owner.missed_appointments}
      </p>
      <p>
        <strong>Cancelled Appointment:</strong> {owner.cancelled_appointments}
      </p>
    </div>
  );
}
