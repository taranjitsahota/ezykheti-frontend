import { X, Tractor, Leaf, Phone, Star } from "lucide-react";
import { useEffect, useRef } from "react";

export default function LearnMoreModal({ onClose }) {
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

  return (
    <div
      className="fixed inset-0 backdrop backdrop-blur backdrop-brightness-50 bg-opacity-60 flex items-center justify-center z-50"
      onClick={handleBackdropClick}
    >
      <div
        ref={modalRef}
        className="bg-white rounded-3xl p-8 w-full max-w-3xl relative shadow-2xl"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-600 hover:text-red-500 transition"
          aria-label="Close Modal"
        >
          <X size={30} />
        </button>

        <h2 className="text-3xl font-bold text-green-600 mb-6 text-center">
          Why Choose Our Farming Solutions?
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex items-start gap-4">
            <Tractor size={40} className="text-green-500" />
            <div>
              <h3 className="font-semibold text-xl mb-1">Easy Equipment Rentals</h3>
              <p className="text-gray-600 text-sm">
                Rent tractors and other farming equipment quickly and affordably with doorstep service.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <Leaf size={40} className="text-green-500" />
            <div>
              <h3 className="font-semibold text-xl mb-1">Expert Agricultural Advice</h3>
              <p className="text-gray-600 text-sm">
                Get guidance on crop management, soil health, and smart farming techniques.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <Phone size={40} className="text-green-500" />
            <div>
              <h3 className="font-semibold text-xl mb-1">24/7 Customer Support</h3>
              <p className="text-gray-600 text-sm">
                Our team is always available to assist you with queries and service requests.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <Star size={40} className="text-green-500" />
            <div>
              <h3 className="font-semibold text-xl mb-1">Trusted by Thousands</h3>
              <p className="text-gray-600 text-sm">
                Join a growing network of satisfied farmers across villages and towns.
              </p>
            </div>
          </div>
        </div>

        <div className="text-center mt-8">
          <button
            onClick={onClose}
            className="bg-green-500 text-white px-6 py-2 rounded-xl hover:bg-green-600 transition shadow-md"
          >
            Get Started
          </button>
        </div>
      </div>
    </div>
  );
}
