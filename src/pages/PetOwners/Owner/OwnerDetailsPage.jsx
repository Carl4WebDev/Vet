import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link, NavLink } from "react-router-dom";

const mockOwners = [
  {
    id: "1",
    name: "John Doe",
    photo: "https://randomuser.me/api/portraits/men/1.jpg",
    petCount: 3,
    address: "123 Pet Street, Dogville",
    contact: "555-1234",
    email: "john.doe@example.com",
    memberSince: "2022-03-15",
    lastVisit: "2023-06-20",
    pets: [
      { name: "Max", type: "Dog", age: 3, notes: "Neutered" },
      { name: "Whiskers", type: "Cat", age: 5, notes: "Vaccinated" },
      { name: "Snowball", type: "Rabbit", age: 1, notes: "Needs checkup" },
    ],
  },
  {
    id: "2",
    name: "Jane Smith",
    photo: "https://randomuser.me/api/portraits/women/1.jpg",
    petCount: 2,
    address: "456 Cat Lane, Meowtown",
    contact: "555-5678",
    email: "jane.smith@example.com",
    memberSince: "2021-11-10",
    lastVisit: "2023-06-18",
    pets: [
      { name: "Fluffy", type: "Cat", age: 2, notes: "Allergic to fish" },
      { name: "Buddy", type: "Dog", age: 4, notes: "On special diet" },
    ],
  },
];

// Keep your imports and useState/useEffect as-is

export default function OwnerDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [owner, setOwner] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOwner = async () => {
      const foundOwner = mockOwners.find((o) => o.id === id);
      if (foundOwner) setOwner(foundOwner);
      else navigate("/not-found");
      setLoading(false);
    };
    fetchOwner();
  }, [id, navigate]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen ">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* Back Button */}
      <Link to="/pet-owner">
        <button className="mb-4 text-blue-600 hover:underline flex items-center">
          ← Back to Owners
        </button>
      </Link>

      {/* Owner Info + Statistics */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <div className="flex flex-col md:flex-row justify-between">
          {/* Owner Info */}
          <div className="flex items-start gap-4">
            <img
              src={owner.photo}
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
                <strong>Email:</strong> example@gmail.com
              </p>
              <p>
                <strong>Gender:</strong> Male
              </p>
            </div>
          </div>

          {/* Statistics */}
          <div className="mt-6 md:mt-0">
            <h2 className="text-lg font-bold">Statistics</h2>
            <p>
              <strong>Times Visited Clinic:</strong> 1
            </p>
            <p>
              <strong>Number of Pets:</strong> {owner.petCount}
            </p>
            <p>
              <strong>Last Visited:</strong>{" "}
              {new Date(owner.lastVisit).toLocaleDateString()}
            </p>
            <p>
              <strong>Missed Appointment:</strong> 0
            </p>
            <p>
              <strong>Cancelled Appointment:</strong> 1
            </p>
          </div>
        </div>
      </div>

      {/* Pet List */}
      <div>
        <h2 className="text-xl font-semibold text-white bg-black py-2 px-4 rounded-t">
          Pet List
        </h2>
        <div className="bg-gray-800 p-6 rounded-b grid grid-cols-1 sm:grid-cols-2 gap-6">
          {owner.pets.map((pet, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-md p-4 text-center"
            >
              <img
                src="https://cdn-icons-png.flaticon.com/512/616/616408.png" // static dog icon placeholder
                alt={pet.name}
                className="w-20 h-20 mx-auto mb-2"
              />
              <h3 className="text-lg font-bold">{pet.name}</h3>
              <p>
                <strong>Age:</strong> {pet.age} Years Old
              </p>
              <p>
                <strong>Species:</strong> {pet.type}
              </p>
              <NavLink to="/pet-details">
                <p className="text-blue-600 mt-1 underline cursor-pointer">
                  More info
                </p>
              </NavLink>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
