import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import emailjs from "emailjs-com";

const Modal = ({ isOpen, onClose }) => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setShow(true);
      document.body.style.overflow = "hidden"; // Prevent background scroll
    } else {
      setTimeout(() => setShow(false), 8000); // Delay hiding for transition effect
      document.body.style.overflow = "auto"; // Restore scroll
    }
  }, [isOpen]);

  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [onClose]);

  if (!show) return null;

  const sendEmail = (values, { resetForm }) => {
    emailjs
      .send(
        "your_service_id", // Replace with EmailJS Service ID
        "your_template_id", // Replace with EmailJS Template ID
        values,
        "your_user_id" // Replace with EmailJS User ID
      )
      .then(() => {
        alert("Message sent successfully!");
        resetForm();
        onClose();
      })
      .catch((err) => console.error("Email send error:", err));
  };

  return createPortal(
    <>
      {/* Transparent overlay with blur effect */}
      <div
        className={`fixed inset-0 bg-black/30 backdrop-blur-md flex justify-center items-center z-50 transition-opacity duration-500 ease-in-out ${
          isOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
      ></div>

      {/* Modal Content */}
      <div
        className={`fixed inset-0 flex justify-center items-center z-50 transition-opacity duration-500 ease-in-out ${
          isOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        onClick={onClose}
      >
        <div
          className={`bg-white p-6 rounded-lg shadow-xl w-full max-w-md relative transform transition-transform duration-500 ease-out ${
            isOpen ? "scale-100 opacity-100" : "scale-90 opacity-0"
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close Button */}
          <button
            className="absolute top-2 right-2 text-gray-600 hover:text-black"
            onClick={onClose}
          >
            ✕
          </button>

          {/* Modal Title */}
          <h2 className="text-xl font-semibold mb-4">Book a Car</h2>

          {/* Form inside the Modal */}
          <Formik
            initialValues={{
              name: "",
              email: "",
              phone: "",
              carType: "",
              carName: "",
              location: "",
            }}
            validationSchema={Yup.object({
              name: Yup.string().required("Required"),
              email: Yup.string().email("Invalid email").required("Required"),
              phone: Yup.string()
                .matches(/^\d{10}$/, "Invalid phone number")
                .required("Required"),
              carType: Yup.string().required("Required"),
              carName: Yup.string().required("Required"),
              location: Yup.string().required("Required"),
            })}
            onSubmit={sendEmail}
          >
            {({ isSubmitting }) => (
              <Form className="flex flex-col space-y-3">
                <Field
                  name="name"
                  placeholder="Your Name"
                  className="border p-2 rounded"
                />
                <ErrorMessage
                  name="name"
                  component="div"
                  className="text-red-500 text-sm"
                />

                <Field
                  name="email"
                  type="email"
                  placeholder="Email"
                  className="border p-2 rounded"
                />
                <ErrorMessage
                  name="email"
                  component="div"
                  className="text-red-500 text-sm"
                />

                <Field
                  name="phone"
                  placeholder="Phone Number"
                  className="border p-2 rounded"
                />
                <ErrorMessage
                  name="phone"
                  component="div"
                  className="text-red-500 text-sm"
                />

                <Field
                  name="carType"
                  placeholder="Car Type (e.g. SUV, Sedan)"
                  className="border p-2 rounded"
                />
                <ErrorMessage
                  name="carType"
                  component="div"
                  className="text-red-500 text-sm"
                />

                <Field
                  name="carName"
                  placeholder="Car Name (e.g. Toyota Camry)"
                  className="border p-2 rounded"
                />
                <ErrorMessage
                  name="carName"
                  component="div"
                  className="text-red-500 text-sm"
                />

                <Field
                  name="location"
                  placeholder="Pickup Location"
                  className="border p-2 rounded"
                />
                <ErrorMessage
                  name="location"
                  component="div"
                  className="text-red-500 text-sm"
                />

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                  {isSubmitting ? "Submitting..." : "Submit"}
                </button>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </>,
    document.body
  );
};

export default Modal;
