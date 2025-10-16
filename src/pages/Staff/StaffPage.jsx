import React, { useState, useEffect } from "react";
import { FaSearch, FaCalendarAlt } from "react-icons/fa";
import EditStaff from "./Modals/EditStaff";
import AddStaff from "./Modals/AddStaff";
import DeleteModal from "../../components/DeleteModal";

import AddVeterinarian from "./Modals/AddVeterinarian";
import EditVeterinarian from "./Modals/EditVeterinarian";

import { getClinicStaff } from "../../api/get/getClinicStaff";
import { addStaff } from "../../api/post/addStaff";
import { editStaff } from "../../api/put/editStaff";
import { deleteStaff } from "../../api/delete/deleteStaff";

import { getVeterinarians } from "../../updated-api/vets/getVeterinarians";
import { addVeterinarian } from "../../updated-api/vets/addVeterinarian";
import { editVeterinarian } from "../../updated-api/vets/editVeterinarian";
import { deleteVeterinarian } from "../../updated-api/vets/deleteVeterinarian";

import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

const StaffPage = () => {
  const clinicId = localStorage.getItem("clinic_id") || 1;

  // STAFF STATES
  const [staffState, setStaffState] = useState({ list: [], counts: {} });
  const [loadingStaff, setLoadingStaff] = useState(true);
  const [openAddStaff, setOpenAddStaff] = useState(false);
  const [openEditStaff, setOpenEditStaff] = useState(false);
  const [isDeleteStaffModal, setIsDeleteStaffModal] = useState(false);
  const [selectedStaff, setSelectedStaff] = useState(null);

  // VETERINARIAN STATES
  const [vets, setVets] = useState([]);
  const [loadingVets, setLoadingVets] = useState(true);
  const [openAddVet, setOpenAddVet] = useState(false);
  const [openEditVet, setOpenEditVet] = useState(false);
  const [isDeleteVetModal, setIsDeleteVetModal] = useState(false);
  const [selectedVet, setSelectedVet] = useState(null);

  // FILTERS
  const [searchTerm, setSearchTerm] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  /* -------------------- FETCH DATA -------------------- */
  const fetchStaff = async () => {
    setLoadingStaff(true);
    const data = await getClinicStaff(clinicId);
    setStaffState(data);
    setLoadingStaff(false);
  };

  const fetchVeterinarians = async () => {
    setLoadingVets(true);
    const res = await getVeterinarians(clinicId);
    setVets(res.data || []);
    setLoadingVets(false);
  };

  useEffect(() => {
    fetchStaff();
    fetchVeterinarians();
  }, [clinicId]);

  const { list, counts } = staffState;

  /* -------------------- STAFF CRUD -------------------- */
  const handleAddStaff = async (newStaff) => {
    await addStaff({ ...newStaff, clinic_id: clinicId });
    await fetchStaff();
  };

  const handleEditStaff = async (updatedData) => {
    await editStaff(selectedStaff.staff_id, updatedData);
    setOpenEditStaff(false);
    setSelectedStaff(null);
    await fetchStaff();
  };

  const handleDeleteStaff = async () => {
    await deleteStaff(selectedStaff.staff_id);
    setIsDeleteStaffModal(false);
    setSelectedStaff(null);
    await fetchStaff();
  };

  /* -------------------- VET CRUD -------------------- */
  const handleAddVet = async (newVet) => {
    await addVeterinarian({ ...newVet, clinic_id: clinicId });
    await fetchVeterinarians();
  };

  const handleEditVet = async (updatedVet) => {
    await editVeterinarian(selectedVet.vet_id, updatedVet);
    setOpenEditVet(false);
    setSelectedVet(null);
    await fetchVeterinarians();
  };

  const handleDeleteVet = async () => {
    await deleteVeterinarian(selectedVet.vet_id);
    setIsDeleteVetModal(false);
    setSelectedVet(null);
    await fetchVeterinarians();
  };

  /* -------------------- FILTERING -------------------- */
  const filterData = (dataList) => {
    return dataList.filter((item) => {
      const matchesSearch =
        item.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.position?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.department?.toLowerCase().includes(searchTerm.toLowerCase());

      const createdAt = item.created_at ? new Date(item.created_at) : null;
      const start = startDate ? new Date(startDate) : null;
      const end = endDate ? new Date(endDate) : null;

      let matchesDate = true;
      if (start && createdAt) matchesDate = createdAt >= start;
      if (end && createdAt) matchesDate = matchesDate && createdAt <= end;

      return matchesSearch && matchesDate;
    });
  };

  const filteredStaff = filterData(list);
  const filteredVets = filterData(vets);

  /* -------------------- EXPORT PDF -------------------- */
  const handleExportPDF = (title, data, fileName) => {
    const doc = new jsPDF({
      orientation: "landscape",
      unit: "pt",
      format: "A4",
    });
    doc.setFontSize(16);
    doc.text(title, 40, 40);

    const tableRows = data.map((item) => [
      item.name,
      item.email || "-",
      item.position || "-",
      item.department || "-",
      item.contact_number || "-",
      new Date(item.created_at).toLocaleDateString(),
    ]);

    autoTable(doc, {
      head: [
        ["Name", "Email", "Position", "Department", "Contact", "Date Added"],
      ],
      body: tableRows,
      startY: 60,
      styles: { fontSize: 10, cellPadding: 5 },
      headStyles: { fillColor: [80, 80, 80], textColor: 255 },
      alternateRowStyles: { fillColor: [245, 245, 245] },
    });

    doc.save(fileName);
  };

  return (
    <div className="w-full max-w-6xl mx-auto bg-white p-4">
      {/* 🗑️ Delete Modals */}
      <DeleteModal
        isOpen={isDeleteStaffModal}
        onClose={() => setIsDeleteStaffModal(false)}
        onDelete={handleDeleteStaff}
      />
      <DeleteModal
        isOpen={isDeleteVetModal}
        onClose={() => setIsDeleteVetModal(false)}
        onDelete={handleDeleteVet}
      />

      {/* ✏️ Edit Modals */}
      <EditStaff
        isOpen={openEditStaff}
        onClose={() => setOpenEditStaff(false)}
        onEditStaff={handleEditStaff}
        selectedStaff={selectedStaff}
      />
      <EditVeterinarian
        isOpen={openEditVet}
        onClose={() => setOpenEditVet(false)}
        onEditVeterinarian={handleEditVet}
        selectedVeterinarian={selectedVet}
      />

      {/* ➕ Add Modals */}
      <AddStaff
        isOpen={openAddStaff}
        onClose={() => setOpenAddStaff(false)}
        onAddStaff={handleAddStaff}
      />
      <AddVeterinarian
        isOpen={openAddVet}
        onClose={() => setOpenAddVet(false)}
        onAddVeterinarian={handleAddVet}
      />

      {/* ================= STAFF TABLE ================= */}
      <h2 className="text-2xl font-semibold mb-4">Staffs</h2>

      {/* Filters */}
      <div className="flex flex-wrap justify-between gap-3 mb-4">
        <div className="flex items-center bg-gray-200 rounded px-2 py-1 w-full md:w-1/2">
          <FaSearch className="text-gray-500 mr-2" />
          <input
            type="text"
            placeholder="Search staff..."
            className="bg-transparent focus:outline-none w-full"
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
            onClick={() =>
              handleExportPDF("Staff List", filteredStaff, "staff_list.pdf")
            }
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded text-sm"
          >
            📄 Export PDF
          </button>
          <button
            onClick={() => setOpenAddStaff(true)}
            className="bg-black text-white px-4 py-2 rounded text-sm"
          >
            Add New Staff
          </button>
        </div>
      </div>

      {/* Staff Table */}
      <div className="overflow-x-auto mb-8">
        <table className="min-w-full border-collapse text-sm">
          <thead>
            <tr className="bg-gray-600 text-white">
              <th className="p-3 text-left">Name</th>
              <th className="p-3 text-left">Email</th>
              <th className="p-3 text-left">Position</th>
              <th className="p-3 text-left">Department</th>
              <th className="p-3 text-left">Contact</th>
              <th className="p-3 text-left">Action</th>
            </tr>
          </thead>
          <tbody>
            {loadingStaff ? (
              <tr>
                <td colSpan="6" className="text-center p-4">
                  Loading staff...
                </td>
              </tr>
            ) : filteredStaff.length === 0 ? (
              <tr>
                <td colSpan="6" className="text-center p-4">
                  No staff found
                </td>
              </tr>
            ) : (
              filteredStaff.map((staff) => (
                <tr key={staff.staff_id} className="border-b hover:bg-gray-100">
                  <td className="p-3">{staff.name}</td>
                  <td className="p-3">{staff.email}</td>
                  <td className="p-3">{staff.position}</td>
                  <td className="p-3">{staff.department}</td>
                  <td className="p-3">{staff.contact_number}</td>
                  <td className="p-3 space-x-2">
                    <button
                      className="bg-blue-500 text-white px-2 py-1 text-xs rounded"
                      onClick={() => {
                        setSelectedStaff(staff);
                        setOpenEditStaff(true);
                      }}
                    >
                      Edit
                    </button>
                    <button
                      className="bg-red-400 text-white px-2 py-1 text-xs rounded"
                      onClick={() => {
                        setSelectedStaff(staff);
                        setIsDeleteStaffModal(true);
                      }}
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

      {/* ================= VETERINARIAN TABLE ================= */}
      <h2 className="text-2xl font-semibold mb-4">Veterinarians</h2>

      <div className="flex justify-end gap-3 mb-4">
        <button
          onClick={() =>
            handleExportPDF(
              "Veterinarian List",
              filteredVets,
              "veterinarians.pdf"
            )
          }
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded text-sm"
        >
          📄 Export PDF
        </button>
        <button
          onClick={() => setOpenAddVet(true)}
          className="bg-black text-white px-4 py-2 rounded text-sm"
        >
          Add Veterinarian
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse text-sm">
          <thead>
            <tr className="bg-gray-700 text-white">
              <th className="p-3 text-left">Name</th>
              <th className="p-3 text-left">Specialization</th>
              <th className="p-3 text-left">Email</th>
              <th className="p-3 text-left">Department</th>
              <th className="p-3 text-left">Contact</th>
              <th className="p-3 text-left">Action</th>
            </tr>
          </thead>
          <tbody>
            {loadingVets ? (
              <tr>
                <td colSpan="6" className="text-center p-4">
                  Loading veterinarians...
                </td>
              </tr>
            ) : filteredVets.length === 0 ? (
              <tr>
                <td colSpan="6" className="text-center p-4">
                  No veterinarians found
                </td>
              </tr>
            ) : (
              filteredVets.map((vet) => (
                <tr key={vet.vet_id} className="border-b hover:bg-gray-100">
                  <td className="p-3">{vet.name}</td>
                  <td className="p-3">{vet.specialization}</td>
                  <td className="p-3">{vet.email}</td>
                  <td className="p-3">{vet.department}</td>
                  <td className="p-3">{vet.contact_number}</td>
                  <td className="p-3 space-x-2">
                    <button
                      className="bg-blue-500 text-white px-2 py-1 text-xs rounded"
                      onClick={() => {
                        setSelectedVet(vet);
                        setOpenEditVet(true);
                      }}
                    >
                      Edit
                    </button>
                    <button
                      className="bg-red-400 text-white px-2 py-1 text-xs rounded"
                      onClick={() => {
                        setSelectedVet(vet);
                        setIsDeleteVetModal(true);
                      }}
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
