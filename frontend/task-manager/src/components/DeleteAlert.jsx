import React from 'react';

const DeleteAlert = ({ content, onDelete }) => {
  return (
    <div>
      <p className="text-sm">{content}</p>
      <div className="flex justify-end mt-6">
        <button
          type="button"
          onClick={onDelete}
          className="flex items-center justify-center gap-1.5  px-4 py-2 text-white bg-red-600 rounded hover:bg-red-700 transition"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default DeleteAlert;

