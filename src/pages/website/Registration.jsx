import React from "react";
import greenlines from "../../assets/images/line_vector.png";
import tractor from "../../assets/images/tenweb_media_sfqvrggfb.webp";
import { useTranslation } from "react-i18next";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useState } from "react";
import { apiRequest } from "../../utils/apiService";
import { toast } from "react-toastify";

const Registration = () => {
  const { i18n, t } = useTranslation();
  const [submitLoading, setSubmitLoading] = useState(false);

  const formik = useFormik({
    initialValues: {
      farmer_name: "",
      phone: "",
      email: "",
      village_name: "",
      pincode: "",
      district: "",
      area_of_land: "",
      land_unit: "in_kanal",
    },
    validationSchema: Yup.object({
      farmer_name: Yup.string().required("Farmer name is required"),
      phone: Yup.string()
        .matches(/^[0-9]{10}$/, "Enter a valid 10-digit number")
        .required("Contact number is required"),
      email: Yup.string().email("Invalid email address").nullable(),
      village_name: Yup.string().required("Village name is required"),
      pincode: Yup.string()
        .matches(/^[0-9]{6}$/, "Enter a valid 6-digit pincode")
        .required("Pincode is required"),
      district: Yup.string().required("District is required"),
      area_of_land: Yup.number()
        .typeError("Area must be a number")
        .positive("Must be positive")
        .required("Area of land is required"),
      land_unit: Yup.string().required("Unit is required"),
    }),
    onSubmit: async (values, { resetForm }) => {
      const data = {
        name: values.farmer_name,
        email: values.email,
        phone: values.phone,
        village_name: values.village_name,
        pincode: values.pincode,
        district: values.district,
        area_of_land: values.area_of_land,
        land_unit: values.land_unit,
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
        } else {
          toast.error(response.message || "Failed to submit.");
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
    <div>
      <div className="relative flex flex-col items-center justify-center text-center mt-10 mb-10 sm:mt-14 sm:mb-14 md:mt-20 md:mb-20 lg:mt-26 lg:mb-38">
        <div
          className="h-full absolute inset-0 bg-center bg-no-repeat"
          style={{
            backgroundImage: `linear-gradient(to bottom, rgba(255,255,255,0.7), rgba(255,255,255,0.9)), url(${greenlines})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            // opacity: ,
            zIndex: -1,
          }}
        ></div>

        <div data-aos="slide-up" className=" gap-4">
          {/* Content */}
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-snug mt-20 mb-6">
            Register <br />
            <br />
          </h1>

          {/* <button className="bg-green-500 text-white px-6 py-3 rounded-full hover:bg-green-600 transition-all">
            Contact Us
          </button>
          <button className="border border-gray-400 text-gray-900 px-6 py-3 rounded-full hover:bg-gray-100 transition-all">
            Know More
          </button> */}
          {/* <p className="text-md md:text-lg text-gray-700 max-w-3xl leading-relaxed mb-8 px-4">
            Ezykheti Agri Services is dedicated to transforming agriculture in
            Punjab by empowering farmers with innovative technology and high-end
            farm machinery. Our mission is to provide world-class solutions when
            finding farm labour is getting harder, hence enhance yields while
            promoting sustainable practices. We recognized the challenges faced
            by farmers and developed a state-of-the-art mobile app for easy
            access to modern farming machinery. Our commitment to exceptional
            service ensures that farmers can leverage advanced equipment without
            heavy financial burdens, ultimately helping them thrive and
            sustainably feed the nation.
          </p> */}
        </div>
      </div>
      <div className="flex flex-col w-full md:flex-row bg-gray-100 p-20">
        {/* Left side - Form and text */}
        <div className="w-full md:w-1/2 flex flex-col justify-center pr-8">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            {t("get_in_touch")}
          </h2>
          <p className="text-md md:text-lg text-gray-700 mb-8">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s..
          </p>

          <form className="space-y-6" onSubmit={formik.handleSubmit}>
            {[
              { name: "farmer_name", type: "text", label: t("farmer_name") },
              {
                name: "phone",
                type: "text",
                label: t("phone"),
              },
              { name: "email", type: "email", label: t("email_optional") },
              { name: "village_name", type: "text", label: t("village_name") },
              { name: "pincode", type: "text", label: t("pincode") },
              { name: "district", type: "text", label: t("district") },
              // { name: "area_of_land", type: "text", label: t("area_of_land") },
            ].map((field) => (
              <div key={field.name}>
                <input
                  type={field.type}
                  name={field.name}
                  placeholder={field.label}
                  value={formik.values[field.name]}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className="w-full border-b-2 border-green-400 outline-none py-2 text-gray-700"
                />
                {formik.touched[field.name] && formik.errors[field.name] && (
                  <p className="text-red-500 text-sm mt-1">
                    {formik.errors[field.name]}
                  </p>
                )}
              </div>
            ))}

            <div className="flex gap-4">
              <div className="w-full">
                <input
                  type="text"
                  name="area_of_land"
                  placeholder={t("area_of_land")}
                  value={formik.values.area_of_land}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className="w-full border-b-2 border-green-400 outline-none py-2 text-gray-700"
                />
                {formik.touched.area_of_land && formik.errors.area_of_land && (
                  <p className="text-red-500 text-sm mt-1">
                    {formik.errors.area_of_land}
                  </p>
                )}
              </div>

              
                <select
                  name="land_unit"
                  value={formik.values.land_unit}
                  onChange={formik.handleChange}
                  className="border-b-2 border-green-400 py-2 px-8 outline-none text-gray-700"
                >
                  <option value="in_kanal">{t("in_kanal")}</option>
                  <option value="in_acres">{t("in_acres")}</option>
                  <option value="in_hectares">{t("in_hectares")}</option>
                </select>
              </div>
           

            <button
              type="submit"
              disabled={submitLoading}
              className={`w-full py-3 rounded-lg text-lg font-semibold text-white ${
                submitLoading
                  ? "bg-green-300"
                  : "bg-green-500 hover:bg-green-600"
              }`}
            >
              {submitLoading ? "Submitting..." : "SUBMIT"}
            </button>
          </form>
        </div>

        {/* Right side - Image with button */}
        <div className="hidden md:flex items-center justify-center w-full md:w-1/2 relative">
          <img
            src={tractor} // Replace with your image path
            alt="Ezykheti"
            className="rounded-xl w-full h-auto object-cover"
            style={{ maxWidth: "100%", maxHeight: "800px" }}
          />
          {/* <button className="absolute top-6 left-6 bg-green-500 text-white px-5 py-2 rounded-md shadow hover:bg-green-600 transition-all">
          Find your farming solution here.
        </button> */}
        </div>
      </div>
    </div>
  );
};

export default Registration;
