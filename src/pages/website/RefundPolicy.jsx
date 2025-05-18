import React from "react";
import greenlines from "../../assets/images/line_vector.png";
import { useTranslation } from "react-i18next";

export default function RefundPolicy() {
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
            Ezykheti Agri Services – Refund Policy <br />
            <br />
          </h1>
          <p className="text-gray-700 text-lg md:text-xl">
            Last Updated: <strong>18/05/2025</strong>
          </p>
        </div>
      </div>
      <div className="p-6 w-full mx-auto text-gray-800 leading-relaxed">

        {/* Intro */}
        <section className="mb-10">
          <p className="mb-2">
            This Refund Policy outlines the terms and conditions under which
            users of the Ezykheti Agri Services mobile app and website
            (collectively, the "Platform") may request refunds for services or
            transactions.
          </p>
          <p>By using our Platform, you agree to comply with this policy.</p>
        </section>

        {/* Section 1: Eligibility */}
        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-2 text-green-800">
            1. Eligibility for Refunds
          </h2>

          <div className="mb-4">
            <h3 className="font-semibold text-lg">
              A. Service Cancellation by Ezykheti
            </h3>
            <p>
              If we cancel a service (e.g., equipment rental, agri-consultation)
              due to unavailability, mechanical or technical issues, a full
              refund will be issued.
            </p>
          </div>

          <div className="mb-4">
            <h3 className="font-semibold text-lg">
              B. User-Requested Cancellations
            </h3>
            <ul className="list-disc list-inside ml-4 text-gray-700">
              <li>
                <strong>Before Service Delivery:</strong> Full refund if user
                cancels the service at least two hours before the scheduled
                time.
              </li>
              <li>
                <strong>Within Two Hours of Service Time:</strong> 20%
                cancellation charge will apply.
              </li>
              <li>
                <strong>After Partial Use:</strong> Service cannot be cancelled
                or refunded.
              </li>
              <li>
                <strong>After Service Delivery:</strong> No refund will be
                issued.
              </li>
            </ul>
          </div>

          <div className="mb-4">
            <h3 className="font-semibold text-lg">
              C. Natural and Environmental Impacts
            </h3>
            <ul className="list-disc list-inside ml-4 text-gray-700">
              <li>
                If weather or a natural calamity impacts the service, users can
                cancel anytime for a full refund.
              </li>
              <li>
                If payment fails but is still debited from your account, we will
                verify and refund within 7–10 business days.
              </li>
              <li>
                All verified refunds are processed within two business days.
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-lg">D. Subscription Plans</h3>
            <ul className="list-disc list-inside ml-4 text-gray-700">
              <li>Annual subscriptions can be cancelled before renewal.</li>
              <li>No refund is provided for the unused subscription period.</li>
            </ul>
          </div>
        </section>

        {/* Section 2: Non-Refundable */}
        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-2 text-green-800">
            2. Non-Refundable Cases
          </h2>
          <ul className="list-disc list-inside ml-4 text-gray-700">
            <li>
              Services already rendered (e.g., completed farm visits, lab
              tests).
            </li>
            <li>Digital products (e.g., reports, advisory content).</li>
            <li>
              Discounted or promotional purchases marked "Non-Refundable."
            </li>
          </ul>
        </section>

        {/* Section 3: Refund Process */}
        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-2 text-green-800">
            3. Refund Process
          </h2>
          <ol className="list-decimal list-inside ml-4 text-gray-700 mb-4">
            <li>
              <strong>Request Submission:</strong> Submit a refund request via:
              <ul className="list-disc list-inside ml-6">
                <li>
                  Email:{" "}
                  <a
                    className="text-blue-600 underline"
                    href="mailto:admin@ezykheti.com"
                  >
                    admin@ezykheti.com
                  </a>
                </li>
                <li>App: “Help & Support” section</li>
              </ul>
              Include: Transaction ID, reason, and proof (if applicable).
            </li>
            <li>
              <strong>Verification:</strong> Our team will review within two
              business days.
            </li>
            <li>
              <strong>Approval & Processing:</strong> Approved refunds will be
              credited via the original payment method within two business days
              (bank processing times may vary).
            </li>
          </ol>
        </section>

        {/* Section 4: Partial Refunds */}
        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-2 text-green-800">
            4. Partial Refunds & Service Credits
          </h2>
          <p>
            In some cases, a partial refund or service credit may be offered
            instead of cash.
          </p>
        </section>

        {/* Section 5: Dispute Resolution */}
        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-2 text-green-800">
            5. Dispute Resolution
          </h2>
          <p className="mb-2">Unresolved refund issues may be escalated to:</p>
          <ul className="list-disc list-inside ml-4 text-gray-700">
            <li>
              Grievance Officer:{" "}
              <a
                className="text-blue-600 underline"
                href="mailto:admin@ezykheti.com"
              >
                admin@ezykheti.com
              </a>
            </li>
            <li>Consumer Forum: Under Consumer Protection Act, 2019 (India)</li>
          </ul>
        </section>

        {/* Section 6: Contact */}
        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-2 text-green-800">
            6. Contact Us
          </h2>
          <p className="text-gray-700">
            For refund-related queries:
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
            Hoshairpur-144212, Punjab
          </p>
        </section>

        {/* Note */}
        <p className="text-sm text-gray-500 mt-4">
          Note: This policy is subject to change. Check for updates
          periodically.
        </p>
      </div>
    </div>
  );
}
