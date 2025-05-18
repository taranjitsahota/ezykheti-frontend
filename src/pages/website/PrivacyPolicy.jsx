import React from "react";
import greenlines from "../../assets/images/line_vector.png";
import { useTranslation } from "react-i18next";

export default function PrivacyPolicy() {
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

        <div className=" gap-4">
          {/* Content */}
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-snug mt-20 mb-6">
            Privacy Policy for Ezykheti Agri Services Pvt Ltd <br />
            <br />
          </h1>
          <p className="text-gray-700 text-lg md:text-xl">
            Last Updated: <strong>18/05/2025</strong>
          </p>
        </div>
      </div>
      <div className="p-6 w-full mx-auto text-gray-800 leading-relaxed">
       

        {/* Section 1 */}
        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-2 text-green-800">
            1. Introduction
          </h2>
          <p className="mb-2">
            Welcome to <strong>Ezykheti Agri Services</strong> ("we," "us," or
            "our"). We are committed to protecting your privacy and the security
            of your personal and agricultural data.
          </p>
          <p className="mb-2">
            This Privacy Policy explains how we collect, use, and protect your
            information on our website{" "}
            <a
              href="https://www.ezykheti.com"
              className="text-blue-600 underline"
            >
              www.ezykheti.com
            </a>{" "}
            and related services, in accordance with Indian laws including the{" "}
            <em>Information Technology Act, 2000</em> and the{" "}
            <em>Digital Personal Data Protection Act, 2023 (DPDPA)</em>.
          </p>
          <p>
            By using our services, you agree to this policy. If not, kindly
            refrain from using the platform.
          </p>
        </section>

        {/* Section 2 */}
        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-2 text-green-800">
            2. Information We Collect
          </h2>

          <div className="mb-4">
            <h3 className="font-semibold text-lg">A. Personal Information</h3>
            <ul className="list-disc list-inside ml-4 text-gray-700">
              <li>Full name</li>
              <li>Contact details (phone number, email, address)</li>
              <li>Farmer ID/Aadhaar (if required for government schemes)</li>
              <li>Payment and bank details (for transactions)</li>
            </ul>
          </div>

          <div className="mb-4">
            <h3 className="font-semibold text-lg">
              B. Farm & Agricultural Data
            </h3>
            <ul className="list-disc list-inside ml-4 text-gray-700">
              <li>Land location & size</li>
              <li>Crop details (type, yield, season)</li>
              <li>Soil health reports</li>
              <li>Pest/disease history</li>
              <li>Irrigation & equipment details</li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-lg">
              C. Automated & Technical Data
            </h3>
            <ul className="list-disc list-inside ml-4 text-gray-700">
              <li>IP address, browser type, device details</li>
              <li>Cookies & usage analytics (see Section 6)</li>
            </ul>
          </div>
        </section>

        {/* Section 3 */}
        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-2 text-green-800">
            3. How We Use Your Information
          </h2>
          <ul className="list-disc list-inside ml-4 text-gray-700">
            <li>
              Provide agri-services (e.g., equipment rentals, crop advisory,
              market linkages).
            </li>
            <li>Process payments and deliver orders.</li>
            <li>
              Send service updates, weather alerts, or govt. scheme information
              (SMS/email).
            </li>
            <li>Improve farming recommendations using data analytics.</li>
            <li>
              Comply with Indian agricultural and tax laws (e.g., Income Tax
              Act, GST).
            </li>
          </ul>
        </section>

        {/* Section 4 */}
        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-2 text-green-800">
            4. Data Sharing & Disclosure
          </h2>
          <ul className="list-disc list-inside ml-4 text-gray-700">
            <li>
              <strong>Service Partners:</strong> Logistics, payment gateways
              (Razorpay/UPI), or agri-tech firms (with consent).
            </li>
            <li>
              <strong>Government Authorities:</strong> Mandatory reporting under
              FSSAI, PM-KISAN, or state agri-departments.
            </li>
            <li>
              <strong>Analytics Providers:</strong> Google Analytics (anonymized
              data only).
            </li>
          </ul>
        </section>

        {/* Section 5 */}
        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-2 text-green-800">
            5. Data Security Measures
          </h2>
          <ul className="list-disc list-inside ml-4 text-gray-700">
            <li>Encryption: SSL-secured transactions.</li>
            <li>Access Controls: Limited to authorized personnel.</li>
            <li>
              Retention: Data is stored as per Indian laws and deleted when no
              longer needed.
            </li>
          </ul>
        </section>

        {/* Section 6 */}
        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-2 text-green-800">
            6. Cookies & Tracking
          </h2>
          <p className="mb-2">We use cookies to:</p>
          <ul className="list-disc list-inside ml-4 text-gray-700 mb-2">
            <li>Remember user preferences.</li>
            <li>Analyze site traffic via Google Analytics.</li>
          </ul>
          <p>
            You can disable cookies in browser settings, but some features may
            not work.
          </p>
        </section>

        {/* Section 7 */}
        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-2 text-green-800">
            7. Your Rights Under Indian Law
          </h2>
          <ul className="list-disc list-inside ml-4 text-gray-700 mb-2">
            <li>Access, correct, or request deletion of your data.</li>
            <li>Opt out of promotional messages (SMS/email).</li>
            <li>
              Withdraw consent via email:{" "}
              <a
                className="text-blue-600 underline"
                href="mailto:admin@ezykheti.com"
              >
                admin@ezykheti.com
              </a>
            </li>
          </ul>
          <p className="text-sm text-gray-600">
            Note: Certain data may be retained for legal compliance (e.g.,
            invoices under GST laws).
          </p>
        </section>

        {/* Section 8 */}
        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-2 text-green-800">
            8. Third-Party Links
          </h2>
          <p className="text-gray-700">
            Our Site may link to mandi rates portals, weather services, or govt.
            schemes. We are not responsible for their privacy practices.
          </p>
        </section>

        {/* Section 9 */}
        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-2 text-green-800">
            9. Policy Updates
          </h2>
          <p className="text-gray-700">
            We may revise this policy to reflect legal changes. Check this page
            periodically.
          </p>
        </section>

        {/* Section 10 */}
        <section>
          <h2 className="text-2xl font-semibold mb-2 text-green-800">
            10. Grievance Officer
          </h2>
          <p className="text-gray-700">
            <strong>Name:</strong> Keshav Dwivedi
            <br />
            <strong>Email:</strong>{" "}
            <a
              className="text-blue-600 underline"
              href="mailto:admin@ezykheti.com"
            >
              admin@ezykheti.com
            </a>
            <br />
            <strong>Phone:</strong> +91 6239007239
            <br />
            <strong>Address:</strong> VPO Budhi Pind, Tehsil Dasuya, Distt:
            Hoshiarpur-144212, Punjab
          </p>
        </section>
      </div>
    </div>
  );
}
