import React from "react";

const ConfirmModal = ({
  show,
  onClose,
  message = "Are you sure?",
  buttons = [
    {
      label: "Yes",
      onClick: () => {},
      className: "bg-red-600 text-white hover:bg-red-700",
    },
    {
      label: "Cancel",
      onClick: onClose,
      className: "bg-gray-200 text-black hover:bg-gray-300",
    },
  ],
}) => {
  if (!show) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-[3px]"
      onClick={onClose}
    >
      <div
        className="bg-white p-8 rounded-2xl shadow-2xl text-center space-y-6 transform transition-all duration-300 ease-out scale-100 opacity-100 w-[90%] max-w-md"
        onClick={(e) => e.stopPropagation()}
      >
        <p className="text-lg font-medium">{message}</p>

        <div className="flex justify-center gap-4">
          {buttons.map((btn, index) => (
            <button
              key={index}
              onClick={() => {
                btn.onClick();
                onClose();
              }}
              className={`px-5 py-2 rounded-full cursor-pointer transition-all ${btn.className}`}
            >
              {btn.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
