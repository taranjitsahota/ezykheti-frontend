import { useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { X,Eye, EyeOff } from "lucide-react";
import { Fragment } from "react";

const Modal = ({ isOpen, onClose, title, fields, onSubmit }) => {
  const [formData, setFormData] = useState({});
  const [showPasswordFields, setShowPasswordFields] = useState({});
  const [loading, setLoading] = useState(false);

  const togglePasswordVisibility = (field) => {
    setShowPasswordFields((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  const handleChange = (e, name) => {
    setFormData((prev) => ({ ...prev, [name]: e.target.value }));
  };

 const handleSubmit = async () => {
    setLoading(true);
    try {
      await onSubmit(formData);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Transition show={isOpen} as={Fragment}>
      <Dialog onClose={onClose} className="relative z-50">
        <div
          className="fixed inset-0 bg-black/30 backdrop-blur-sm"
          aria-hidden="true"
        />

        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel className="relative bg-white w-full max-w-md rounded-2xl shadow-lg p-6 z-10">
            <div className="flex justify-between items-center mb-4">
              <Dialog.Title className="text-lg font-semibold">
                {title}
              </Dialog.Title>
              <button
                onClick={onClose}
                className="text-gray-500 hover:text-gray-700 cursor-pointer"
              >
                <X />
              </button>
            </div>

            <div className="space-y-4">
              {fields.map(({ name, label, type = "text", placeholder }) => (
                <div key={name}>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {label}
                  </label>
                  <div className="relative">
                    <input
                      type={
                        type === "password" && showPasswordFields[name]
                          ? "text"
                          : type
                      }
                      name={name}
                      placeholder={placeholder || label}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 pr-10"
                      onChange={(e) => handleChange(e, name)}
                    />
                    {type === "password" && (
                      <button
                        type="button"
                        onClick={() => togglePasswordVisibility(name)}
                        className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-600"
                      >
                        {showPasswordFields[name] ? (
                          <EyeOff size={20} />
                        ) : (
                          <Eye size={20} />
                        )}
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 text-right">
              <button
                onClick={handleSubmit}
                disabled={loading}
                className={`admin-wrapper bg-[var(--primary-color)] text-white px-4 py-2 rounded-lg hover:bg-green-700 transition cursor-pointer ${
                  loading ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                {loading ? "Submitting..." : "Submit"}
              </button>
            </div>
          </Dialog.Panel>
        </div>
      </Dialog>
    </Transition>
  );
};

export default Modal;
