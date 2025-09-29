export default function OwnerInfoCard({ owner }) {
  return (
    <div className="flex items-start gap-4">
      <img
        src={
          owner.photo || "https://cdn-icons-png.flaticon.com/512/847/847969.png"
        }
        alt={owner.name}
        className="w-20 h-20 rounded-full object-cover"
      />
      <div>
        <h2 className="text-lg font-bold">Pet Owner information</h2>
        <p>
          <strong>Full Name:</strong> {owner.name}
        </p>
        <p>
          <strong>ID:</strong> {owner.id}
        </p>
        <p>
          <strong>Phone Number:</strong> {owner.contact}
        </p>
        <p>
          <strong>Email:</strong> {owner.email}
        </p>
        <p>
          <strong>Gender:</strong> {owner.gender}
        </p>
      </div>
    </div>
  );
}
