const PlanPage = () => {
  return (
    <div>
      {/* Clinic Details Section */}
      <h2 className="text-lg font-semibold text-gray-800">Clinic Name:</h2>
      <div className="ml-4">
        <p className="text-gray-700">Jo Capang Vetter</p>
      </div>

      <h2 className="text-lg font-semibold text-gray-800">Contact Email:</h2>
      <div className="ml-4">
        <p className="text-gray-700">Jo_Capang_Vetter@gmail.com</p>
      </div>

      <h2 className="text-lg font-semibold text-gray-800">Address:</h2>
      <div className="ml-4">
        <p className="text-gray-700">Torres St., Davao City, Davao Del Sur</p>
      </div>

      <h2 className="text-lg font-semibold text-gray-800">Phone Number:</h2>
      <div className="ml-4">
        <p className="text-gray-700">09123456789</p>
      </div>

      {/* Divider */}
      <div className="border-t border-gray-200 my-6"></div>

      {/* Action Buttons */}
      <div className="flex justify-end space-x-4">
        <button className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50">
          Cancel
        </button>
        <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
          Confirm
        </button>
      </div>
    </div>
  );
};

export default PlanPage;
