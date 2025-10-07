// src/pages/Owner/OwnerDetailPage.js
import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link, useLocation } from "react-router-dom";
import { getOwnerStats } from "../../../api/get/getOwnerStats";
import OwnerInfoCard from "./OwnerInfoCard";
import OwnerStatsCard from "./OwnerStatsCard";
import PetList from "./PetList";

export default function OwnerDetailPage() {
  const { clientId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  // ✅ If passed via NavLink, use it. Otherwise null → fallback fetch.
  const [owner, setOwner] = useState(location.state?.owner || null);
  const [loading, setLoading] = useState(!location.state?.owner);

  useEffect(() => {
    if (owner) return; // already got from state, skip fetch

    const fetchOwner = async () => {
      try {
        const data = await getOwnerStats(clientId);
        if (!data) {
          navigate("/not-found");
        } else {
          setOwner(data);
        }
      } catch (err) {
        console.error("Error loading owner:", err);
        navigate("/not-found");
      } finally {
        setLoading(false);
      }
    };
    fetchOwner();
  }, [clientId, navigate, owner]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen ">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!owner) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-gray-600">Owner not found</p>
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
          <OwnerInfoCard owner={owner} />
          <OwnerStatsCard owner={owner} />
        </div>
      </div>

      {/* Pet List */}
      <PetList pets={owner.pets || []} />
      {console.log(owner.pets)}
    </div>
  );
}
