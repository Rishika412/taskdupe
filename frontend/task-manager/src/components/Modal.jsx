import React from "react";

const Modal = ({ children, isOpen, onClose, title }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-40 flex justify-center items-center px-2">
      <div className="relative bg-white dark:bg-gray-700 rounded-lg shadow-lg w-full max-w-2xl max-h-full overflow-y-auto">
        {/* Modal Header */}
        <div className="flex items-center justify-between p-4 border-b">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white">
            {title}
          </h3>
          <button
            type="button"
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 dark:hover:text-white focus:outline-none"
          >
            <svg
              className="w-5 h-5"
              aria-hidden="true"
              fill="none"
              viewBox="0 0 14 14"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m1 1 6 6m0 6 6M7 7l6-6M7 7l-6 6"
              />
            </svg>
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-4 md:p-5 space-y-4">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;