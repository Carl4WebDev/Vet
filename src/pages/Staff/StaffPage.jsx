// src/components/StaffList.jsx
import React, { useState } from "react";
import { FaSearch, FaCalendarAlt } from "react-icons/fa";
import EditStaff from "./Modals/EditStaff";
import AddStaff from "./Modals/AddStaff";

import DeleteModal from "../../components/DeleteModal";

const staffData = [
  {
    id: 1,
    name: "Dr. Jorge M. Martinez",
    staffId: "VET 0001 0001",
    position: "Veterinarian",
    department: "Medical",
    contact: "09123456789",
    email: "jorge123@gmail.com",
  },
  {
    id: 2,
    name: "Jane S. Suarez",
    staffId: "TECH 0001 0001",
    position: "Vet Technician",
    department: "Medical",
    contact: "09123456789",
    email: "suarez123@gmail.com",
  },
];

const StaffPage = () => {
  const [openAddStaff, setOpenAddStaff] = useState(false);
  const [open, setOpen] = useState(false);

  const [startDate, setStartDate] = useState("2024-09-25");
  const [endDate, setEndDate] = useState("2024-09-26");

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  return (
    <div className="w-full max-w-6xl mx-auto bg-white p-4">
      <DeleteModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
      />
      <EditStaff isOpen={open} onClose={() => setOpen(false)} />
      <AddStaff isOpen={openAddStaff} onClose={() => setOpenAddStaff(false)} />
      <h2 className="text-2xl font-semibold mb-4">Staffs</h2>

      {/* Search and Filters */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-4">
        <div className="flex items-center bg-gray-200 rounded px-2 py-1 w-full md:w-1/2">
          <FaSearch className="text-gray-500 mr-2" />
          <input
            type="text"
            className="bg-transparent focus:outline-none w-full"
            placeholder="Search"
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

      {/* Staff Counts */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-4 text-center">
        <div className="bg-gray-100 px-4 py-2 rounded">
          6<br />
          Total Staff
        </div>
        <div className="bg-gray-100 px-4 py-2 rounded">
          2<br />
          Veterinarian
        </div>
        <div className="bg-gray-100 px-4 py-2 rounded">
          1<br />
          Technician
        </div>
        <div className="bg-gray-100 px-4 py-2 rounded">
          3<br />
          Support Staff
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
            {staffData.map((staff) => (
              <tr key={staff.id} className="border-b hover:bg-gray-100">
                <td className="px-4 py-2 whitespace-nowrap">{staff.name}</td>
                <td className="px-4 py-2 whitespace-nowrap">{staff.staffId}</td>
                <td className="px-4 py-2 whitespace-nowrap">
                  {staff.position}
                </td>
                <td className="px-4 py-2 whitespace-nowrap">
                  {staff.department}
                </td>
                <td className="px-4 py-2 whitespace-nowrap">{staff.contact}</td>
                <td className="px-4 py-2 whitespace-nowrap">{staff.email}</td>
                <td className="px-4 py-2 space-x-2 whitespace-nowrap">
                  <button
                    onClick={() => setOpen(true)}
                    className="bg-blue-500 text-white px-2 py-1 text-xs rounded"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => setIsDeleteModalOpen(true)}
                    className="bg-red-400 text-white px-2 py-1 text-xs rounded"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StaffPage;
