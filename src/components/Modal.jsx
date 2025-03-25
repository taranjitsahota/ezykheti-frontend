import { useState, useRef, useEffect } from "react";
import { X } from "lucide-react";
import tractor from "../assets/images/farmer.webp";

export default function ContactModal({ onClose }) {
  const [formData, setFormData] = useState({
    farmerName: "",
    contactNumber: "",
    email: "",
    villageName: "",
    areaOfLand: "",
  });

  const modalRef = useRef();

  const handleBackdropClick = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      onClose();
    }
  };

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [onClose]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data Submitted:", formData);
    // Add your API submit logic here
    onClose(); // Close modal after submission
  };

  return (
    <div
      className="fixed inset-0 backdrop backdrop-blur backdrop-filter backdrop-brightness-40 backdrop bg-opacity-60 flex items-center justify-center z-50"
      onClick={handleBackdropClick}
    >
      <div
        ref={modalRef}
        className="bg-white rounded-3xl p-4 flex flex-col md:flex-row w-full max-w-3xl relative shadow-xl"
      >
        <button
          onClick={onClose}
          className="absolute top-3 right-4 text-gray-600 cursor-pointer hover:text-red-500 transition-colors focus:outline-none"
          aria-label="Close Modal"
        >
          <X size={30} />
        </button>

        <div className="w-full py-6 px-6 md:w-1/2 md:pr-6 mb-4 md:mb-0">
          <h2 className="text-xl font-bold mb-4 text-green-600">
            Get in touch with us
          </h2>

          <form onSubmit={handleSubmit} className="space-y-3">
            <div>
              <label className="text-sm font-medium">Farmer Name *</label>
              <input
                name="farmerName"
                value={formData.farmerName}
                onChange={handleChange}
                className="w-full border-b-2 border-green-500 focus:border-green-700 outline-none py-1"
                required
              />
            </div>

            <div>
              <label className="text-sm font-medium">Contact Number *</label>
              <input
                name="contactNumber"
                value={formData.contactNumber}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    contactNumber: e.target.value.replace(/\D/, ""),
                  })
                }
                maxLength={10}
                className="w-full border-b-2 border-green-500 focus:border-green-700 outline-none py-1"
                required
              />
            </div>

            <div>
              <label className="text-sm font-medium">Email (Optional)</label>
              <input
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full border-b border-gray-400 focus:border-green-700 outline-none py-1"
              />
            </div>

            <div>
              <label className="text-sm font-medium">Village Name *</label>
              <input
                name="villageName"
                value={formData.villageName}
                onChange={handleChange}
                className="w-full border-b-2 border-green-500 focus:border-green-700 outline-none py-1"
                required
              />
            </div>

            <div className="w-full mb-6">
              <label className="block text-sm font-medium">
                Area of Land (in Kanal) *
              </label>
              <div className="flex flex-col md:flex-row gap-4 ">
                <input
                  name="areaOfLand"
                  value={formData.areaOfLand}
                  onChange={handleChange}
                  className="w-full border-b-2 border-green-500 focus:border-green-700 outline-none py-1"
                  required
                />
                <select className="border-b-2 border-green-400 py-2 outline-none text-gray-700">
                  <option>in Kanal</option>
                  <option>in Acres</option>
                  <option>in Hectares</option>
                </select>
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-green-500 text-white py-1.5 rounded-xl hover:bg-green-600 transition focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-1"
            >
              SUBMIT
            </button>
          </form>
        </div>
        <div className="hidden md:block w-1/2 mt-8 relative overflow-hidden">
          <img
            src={tractor}
            alt="Farm Equipment"
            className="rounded-2xl w-full h-full object-cover"
          />
          <div className="absolute bottom-8 left-6 right-3 bg-green-500 text-white text-center py-2 w-80 rounded-xl text-xs">
            Find your farming solution here.
          </div>
        </div>
      </div>
    </div>
  );
}
