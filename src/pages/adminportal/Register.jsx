import { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import API_BASE_URL from "../../config/api";

const Register = () => {
    const navigate = useNavigate();
    const [countryCodes, setCountryCodes] = useState([]);

    useEffect(() => {
        axios.get(`${API_BASE_URL}/country-codes`)
            .then((response) => {
                setCountryCodes(response.data);
            })
            .catch((error) => {
                console.error("Error fetching country codes:", error);
            });
    }, []);

    const registerSchema = Yup.object().shape({
        name: Yup.string().required("Required"),
        email: Yup.string().email("Invalid email").required("Required"),
        contact_number: Yup.string().required("Required"),
        country_code: Yup.string().required("Required"),
        password: Yup.string().min(8, "Too short").required("Required"),
        password_confirmation: Yup.string()
            .oneOf([Yup.ref("password"), null], "Passwords must match")
            .required("Required"),
    });

    const handleRegister = async (values, { setSubmitting }) => {
        try {
            await axios.post(`${API_BASE_URL}/register-superadmin-admin`, values);
            alert("Registration successful");
            navigate("/");
        } catch (error) {
            alert(error.response?.data?.message || "Registration failed");
        }
        setSubmitting(false);
    };

    return (
        <div className="flex items-center justify-center h-screen bg-gray-100">
            <div className="w-96 p-6 bg-white rounded-lg shadow-md">
                <h2 className="text-2xl font-bold text-center">Register</h2>
                <Formik
                    initialValues={{ name: "", email: "", password: "", password_confirmation: "", country_code: "", contact_number: "" }}
                    validationSchema={registerSchema}
                    onSubmit={handleRegister}
                >
                    {({ values }) => (
                        <Form className="mt-4">
                            <label className="block font-medium">Name</label>
                            <Field name="name" className="w-full px-3 py-2 border rounded" />
                            <ErrorMessage name="name" component="div" className="text-red-500 text-sm" />

                            <label className="block font-medium mt-3">Email</label>
                            <Field name="email" type="email" className="w-full px-3 py-2 border rounded" />
                            <ErrorMessage name="email" component="div" className="text-red-500 text-sm" />

                            <label className="block font-medium mt-3">Country Code</label>
                            <Field as="select" name="country_code" className="w-full px-3 py-2 border rounded">
                                <option value="">Select Country Code</option>
                                {countryCodes.map((country) => (
                                    <option key={country.code} value={country.code}>
                                        {country.name} ({country.code})
                                    </option>
                                ))}
                            </Field>
                            <ErrorMessage name="country_code" component="div" className="text-red-500 text-sm" />

                            <label className="block font-medium mt-3">Contact Number</label>
                            <Field name="contact_number" type="text" className="w-full px-3 py-2 border rounded" />
                            <ErrorMessage name="contact_number" component="div" className="text-red-500 text-sm" />

                            <label className="block font-medium mt-3">Password</label>
                            <Field name="password" type="password" className="w-full px-3 py-2 border rounded" />
                            <ErrorMessage name="password" component="div" className="text-red-500 text-sm" />

                            <label className="block font-medium mt-3">Confirm Password</label>
                            <Field name="password_confirmation" type="password" className="w-full px-3 py-2 border rounded" />
                            <ErrorMessage name="password_confirmation" component="div" className="text-red-500 text-sm" />

                            <label className="block font-medium mt-3">Role</label>
                            <Field as="select" name="role" className="w-full px-3 py-2 border rounded">
                                <option value="">Select Role</option>
                                
                                    <option  value='superadmin'>
                                       {"Superadmin"}
                                    </option>
                                
                            </Field>

                            <button type="submit" className="w-full mt-4 px-3 py-2 bg-blue-500 text-white rounded">
                                Register
                            </button>
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    );
};

export default Register;
