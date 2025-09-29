import React, { useState, useEffect } from "react";
import { FaSearch, FaCalendarAlt } from "react-icons/fa";
import EditStaff from "./Modals/EditStaff";
import AddStaff from "./Modals/AddStaff";
import DeleteModal from "../../components/DeleteModal";

import { getClinicStaff } from "../../api/get/getClinicStaff";
import { addStaff } from "../../api/post/addStaff";
import { editStaff } from "../../api/put/editStaff";
import { deleteStaff } from "../../api/delete/deleteStaff";

const StaffPage = () => {
  const [openAddStaff, setOpenAddStaff] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const [selectedStaff, setSelectedStaff] = useState(null);

  const [searchTerm, setSearchTerm] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const clinicId = localStorage.getItem("clinic_id") || 1;
  const [staffState, setStaffState] = useState({ list: [], counts: {} });
  const [loading, setLoading] = useState(true);

  // 🔄 Fetch Staff Data
  const fetchStaff = async () => {
    setLoading(true);
    const data = await getClinicStaff(clinicId);
    setStaffState(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchStaff();
  }, [clinicId]);

  const { list, counts } = staffState;

  // ➕ Add Staff
  const handleAddStaff = async (newStaff) => {
    try {
      await addStaff({ ...newStaff, clinic_id: clinicId });
      await fetchStaff();
    } catch (error) {
      console.error("Failed to add staff", error);
    }
  };

  // ✏️ Edit Staff
  const handleEditStaff = async (updatedData) => {
    try {
      await editStaff(selectedStaff.staff_id, updatedData);
      setOpenEditModal(false);
      setSelectedStaff(null);
      await fetchStaff();
    } catch (error) {
      console.error("Failed to edit staff", error);
    }
  };

  // 🗑️ Delete Staff
  const handleDeleteStaff = async () => {
    try {
      if (selectedStaff) {
        await deleteStaff(selectedStaff.staff_id);
        setIsDeleteModalOpen(false);
        setSelectedStaff(null);
        await fetchStaff();
      }
    } catch (error) {
      console.error("Failed to delete staff", error);
    }
  };

  // 🔍 Filter Logic (frontend)
  const filteredList = list.filter((staff) => {
    const matchesSearch =
      staff.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (staff.position &&
        staff.position.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (staff.department &&
        staff.department.toLowerCase().includes(searchTerm.toLowerCase()));

    // If staff was added with created_at date in DB, use it here; if not, no filtering
    const staffDate = staff.created_at ? new Date(staff.created_at) : null;
    const start = startDate ? new Date(startDate) : null;
    const end = endDate ? new Date(endDate) : null;

    let matchesDate = true;
    if (start && staffDate) matchesDate = staffDate >= start;
    if (end && staffDate) matchesDate = matchesDate && staffDate <= end;

    return matchesSearch && matchesDate;
  });

  return (
    <div className="w-full max-w-6xl mx-auto bg-white p-4">
      {/* 🗑️ Delete Modal */}
      <DeleteModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onDelete={handleDeleteStaff}
      />

      {/* ✏️ Edit Modal */}
      <EditStaff
        isOpen={openEditModal}
        onClose={() => setOpenEditModal(false)}
        onEditStaff={handleEditStaff}
        selectedStaff={selectedStaff}
      />

      {/* ➕ Add Modal */}
      <AddStaff
        isOpen={openAddStaff}
        onClose={() => setOpenAddStaff(false)}
        onAddStaff={handleAddStaff}
      />

      <h2 className="text-2xl font-semibold mb-4">Staffs</h2>

      {/* 🔍 Search and Filters */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-4">
        <div className="flex items-center bg-gray-200 rounded px-2 py-1 w-full md:w-1/2">
          <FaSearch className="text-gray-500 mr-2" />
          <input
            type="text"
            className="bg-transparent focus:outline-none w-full"
            placeholder="Search by name, position, or department"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex flex-wrap gap-2 md:gap-4">
          <div className="flex items-center gap-2 bg-gray-200 px-3 py-1 rounded">
            <FaCalendarAlt />
            <input
              type="date"
              className="bg-transparent focus:outline-none"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />
          </div>
          <div className="flex items-center gap-2 bg-gray-200 px-3 py-1 rounded">
            <FaCalendarAlt />
            <input
              type="date"
              className="bg-transparent focus:outline-none"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
            />
          </div>
          <button
            onClick={() => setOpenAddStaff(true)}
            className="bg-black text-white px-4 py-2 rounded text-sm"
          >
            Add New Staff
          </button>
        </div>
      </div>

      {/* 🟡 Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mb-6">
        <div className="bg-white shadow rounded-lg p-4 text-center">
          <p className="text-gray-500 text-sm">Total Staff</p>
          <p className="text-2xl font-bold">{counts.total_staff || 0}</p>
        </div>
        <div className="bg-white shadow rounded-lg p-4 text-center">
          <p className="text-gray-500 text-sm">Veterinarians</p>
          <p className="text-2xl font-bold">{counts.veterinarian_count || 0}</p>
        </div>
        <div className="bg-white shadow rounded-lg p-4 text-center">
          <p className="text-gray-500 text-sm">Technicians</p>
          <p className="text-2xl font-bold">{counts.technician_count || 0}</p>
        </div>
        <div className="bg-white shadow rounded-lg p-4 text-center">
          <p className="text-gray-500 text-sm">Support Staff</p>
          <p className="text-2xl font-bold">
            {counts.support_staff_count || 0}
          </p>
        </div>
      </div>

      {/* Staff Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse text-sm">
          <thead>
            <tr className="bg-gray-600 text-white">
              <th className="p-2 md:p-4 text-left whitespace-nowrap">
                Staff Name
              </th>
              <th className="p-2 md:p-4 text-left whitespace-nowrap">
                Staff ID
              </th>
              <th className="p-2 md:p-4 text-left whitespace-nowrap">
                Position
              </th>
              <th className="p-2 md:p-4 text-left whitespace-nowrap">
                Department
              </th>
              <th className="p-2 md:p-4 text-left whitespace-nowrap">
                Contact Number
              </th>
              <th className="p-2 md:p-4 text-left whitespace-nowrap">
                Email Address
              </th>
              <th className="p-2 md:p-4 text-left whitespace-nowrap">Action</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="7" className="text-center p-4">
                  Loading...
                </td>
              </tr>
            ) : filteredList.length === 0 ? (
              <tr>
                <td colSpan="7" className="text-center p-4">
                  No staff found
                </td>
              </tr>
            ) : (
              filteredList.map((staff) => (
                <tr
                  key={`${staff.staff_id}-${staff.name}`}
                  className="border-b hover:bg-gray-100"
                >
                  <td className="px-4 py-2 whitespace-nowrap">{staff.name}</td>
                  <td className="px-4 py-2 whitespace-nowrap">
                    {staff.staff_id}
                  </td>
                  <td className="px-4 py-2 whitespace-nowrap">
                    {staff.position}
                  </td>
                  <td className="px-4 py-2 whitespace-nowrap">
                    {staff.department || "-"}
                  </td>
                  <td className="px-4 py-2 whitespace-nowrap">
                    {staff.contact_number || "-"}
                  </td>
                  <td className="px-4 py-2 whitespace-nowrap">
                    {staff.email || "-"}
                  </td>
                  <td className="px-4 py-2 space-x-2 whitespace-nowrap">
                    <button
                      onClick={() => {
                        setSelectedStaff(staff);
                        setOpenEditModal(true);
                      }}
                      className="bg-blue-500 text-white px-2 py-1 text-xs rounded"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => {
                        setSelectedStaff(staff);
                        setIsDeleteModalOpen(true);
                      }}
                      className="bg-red-400 text-white px-2 py-1 text-xs rounded"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StaffPage;
