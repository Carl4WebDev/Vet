import React from "react";

export default function PetOwnerCard({ owner }) {
  return (
    <div className="bg-gray-200 rounded-lg p-4 shadow-md flex items-center gap-4">
      <img
        src={owner.photo}
        alt={owner.name}
        className="w-20 h-20 rounded-full object-cover"
      />
      <div>
        <p>
          <strong>Name:</strong> {owner.name}
        </p>
        <p>
          <strong>No. Pet:</strong> {owner.petCount}
        </p>
        <p>
          <strong>ID:</strong> {owner.id}
        </p>
        <p>
          <strong>Address:</strong> {owner.address}
        </p>
        <p>
          <strong>Contact Number:</strong> {owner.contact}
        </p>
      </div>
    </div>
  );
}
