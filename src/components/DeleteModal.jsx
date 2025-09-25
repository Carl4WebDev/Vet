import React from "react";

const DeleteModal = ({ isOpen, onClose, onDelete }) => {
  if (!isOpen) return null;

  const handleOutsideClick = (e) => {
    if (e.target.id === "modalBackdrop") {
      onClose();
    }
  };

  return (
    <div
      id="modalBackdrop"
      onClick={handleOutsideClick}
      className="fixed inset-0 z-50  flex items-center justify-center"
    >
      <div className="bg-white rounded-xl p-6 w-80 border-2 relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-3 text-gray-500 text-xl"
        >
          &times;
        </button>
        <h2 className="text-lg font-semibold mb-4 text-center">
          Are you sure you want to delete this?
        </h2>
        <div className="flex justify-between mt-4">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
          >
            Cancel
          </button>
          <button
            onClick={onDelete}
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
          >
            Confirm Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
