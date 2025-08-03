import { useRef, useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { X } from "lucide-react";
import tractor from "../assets/images/farmer.webp";
import { apiRequest } from "../utils/apiService";
import { toast } from "react-toastify";

export default function ContactModal({ onClose }) {
  const [submitLoading, setSubmitLoading] = useState(false);
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

  const formik = useFormik({
    initialValues: {
      farmerName: "",
      contactNumber: "",
      email: "",
      villageName: "",
      pincode: "",
      district: "",
      areaOfLand: "",
      landUnit: "in_kanal",
    },
    validationSchema: Yup.object({
      farmerName: Yup.string().required("Farmer name is required"),
      contactNumber: Yup.string()
        .matches(/^[0-9]{10}$/, "Must be 10 digits")
        .required("Contact number is required"),
      email: Yup.string().email("Invalid email").nullable(),
      villageName: Yup.string().required("Village name is required"),
      areaOfLand: Yup.string().required("Area of land is required"),
    }),
    onSubmit: async (values, { resetForm }) => {
      const data = {
        name: values.farmerName,
        email: values.email,
        phone: values.contactNumber,
        village_name: values.villageName,
        pincode: values.pincode,
        district: values.district,
        area_of_land: values.areaOfLand,
        land_unit: values.landUnit,
      };

      try {
        setSubmitLoading(true);
        const response = await apiRequest({
          url: "/contact-form", // replace with your actual endpoint
          method: "post",
          data,
        });

        if (response.success) {
          toast.success("Form submitted successfully!");
          resetForm();
          onClose();  // Close the modal only after successful form submission
        } else {
          toast.error(response.data.message || "Failed to submit.");
        }
      } catch (error) {
        const msg = error?.response?.data?.message || "Something went wrong.";
        toast.error(msg);
      } finally {
        setSubmitLoading(false);
      }
    },
  });

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

          <form onSubmit={formik.handleSubmit} className="space-y-3">
            <div>
              <label className="text-sm font-medium">Farmer Name *</label>
              <input
                name="farmerName"
                onChange={formik.handleChange}
                value={formik.values.farmerName}
                className="w-full border-b-2 border-green-500 focus:border-green-700 outline-none py-1"
              />
              {formik.touched.farmerName && formik.errors.farmerName && (
                <p className="text-xs text-red-600">
                  {formik.errors.farmerName}
                </p>
              )}
            </div>

            <div>
              <label className="text-sm font-medium">Contact Number *</label>
              <input
                name="contactNumber"
                maxLength={10}
                onChange={(e) => {
                  formik.setFieldValue(
                    "contactNumber",
                    e.target.value.replace(/\D/, "")
                  );
                }}
                value={formik.values.contactNumber}
                className="w-full border-b-2 border-green-500 focus:border-green-700 outline-none py-1"
              />
              {formik.touched.contactNumber && formik.errors.contactNumber && (
                <p className="text-xs text-red-600">
                  {formik.errors.contactNumber}
                </p>
              )}
            </div>

            <div>
              <label className="text-sm font-medium">Email (Optional)</label>
              <input
                name="email"
                type="email"
                onChange={formik.handleChange}
                value={formik.values.email}
                className="w-full border-b border-gray-400 focus:border-green-700 outline-none py-1"
              />
              {formik.touched.email && formik.errors.email && (
                <p className="text-xs text-red-600">{formik.errors.email}</p>
              )}
            </div>

            <div>
              <label className="text-sm font-medium">Village Name *</label>
              <input
                name="villageName"
                onChange={formik.handleChange}
                value={formik.values.villageName}
                className="w-full border-b-2 border-green-500 focus:border-green-700 outline-none py-1"
              />
              {formik.touched.villageName && formik.errors.villageName && (
                <p className="text-xs text-red-600">
                  {formik.errors.villageName}
                </p>
              )}
            </div>

            <div className="w-full mb-6">
              <label className="block text-sm font-medium">
                Area of Land (in Kanal) *
              </label>
              <div className="flex flex-col md:flex-row gap-4">
                <input
                  name="areaOfLand"
                  onChange={formik.handleChange}
                  value={formik.values.areaOfLand}
                  className="w-full border-b-2 border-green-500 focus:border-green-700 outline-none py-1"
                />
                <select
                  name="landUnit"
                  value={formik.values.landUnit}
                  onChange={formik.handleChange}
                  className="border-b-2 border-green-400 py-2 outline-none text-gray-700"
                >
                  <option value="in_kanal">in Kanal</option>
                  <option value="in_acres">in Acres</option>
                  <option value="in_hectares">in Hectares</option>
                </select>
              </div>
              {formik.touched.areaOfLand && formik.errors.areaOfLand && (
                <p className="text-xs text-red-600">
                  {formik.errors.areaOfLand}
                </p>
              )}
            </div>

            <button
              type="submit"
              className="w-full bg-green-500 text-white py-1.5 rounded-xl hover:bg-green-600 transition focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-1"
              disabled={submitLoading}
            >
              {submitLoading ? "Submitting..." : "SUBMIT"}
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
