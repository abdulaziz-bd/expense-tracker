/* eslint-disable react/prop-types */
export default function DeleteModal({ onDeleteClick, onCancelClick }) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 z-10 flex justify-center items-center">
      <div className="bg-white p-5 rounded-md w-96">
        <h2 className="text-xl font-semibold text-gray-800">
          Delete Confirmation
        </h2>
        <p className="text-gray-600">
          Are you sure you want to delete this item?
        </p>
        <div className="flex justify-end gap-2 mt-5">
          <button
            className="bg-red-500 text-white px-4 py-2 rounded-md"
            onClick={onDeleteClick}
          >
            Delete
          </button>
          <button
            className="bg-gray-300 text-gray-800 px-4 py-2 rounded-md"
            onClick={onCancelClick}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
