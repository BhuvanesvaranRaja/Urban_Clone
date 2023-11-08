import React, { useEffect } from "react";
import { Container } from "react-bootstrap";

const Law = () => {
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, []);
  return (
    <>
      <h1 className="mt-5 text-center fw-bolder fs-4 mb-4 p-5">
        Law Enforcement
      </h1>
      <hr />
      <div className="text-justify m-5 p-4  fs-5">
        <p>
          U-company is committed to cooperating with law enforcement while
          respecting user privacy and data protection laws. If you are a law
          enforcement agency seeking information from U-company, please follow
          the procedures below.
        </p>
        <h2>Information Requests</h2>
        <p>
          All law enforcement information requests must be submitted in writing,
          either through email or postal mail, and must include the following
          information:
        </p>
        <ul className="p-5">
          <li>Official letterhead or government agency email address</li>
          <li>The name of the requesting agency</li>
          <li>Contact information for the requesting officer</li>
          <li>A detailed description of the information requested</li>
          <li>The reason for the request</li>
          <li>
            The relevant law or legal authority under which the request is made
          </li>
          <li>
            The specific user accounts or data for which the information is
            requested
          </li>
        </ul>
        <h2>Response to Requests</h2>
        <p>
          U-company will review all information requests and will respond in
          accordance with applicable laws and regulations. We may seek
          additional information or clarification if necessary.
        </p>
        <p>
          In the event that a request does not comply with the applicable laws
          or regulations, or if it lacks the necessary documentation, we may
          request the law enforcement agency to resubmit the request in
          compliance with our guidelines.
        </p>
        <p>
          U-company may disclose user information only to the extent required by
          law or legal process and will make reasonable efforts to notify
          affected users, unless prohibited by law or court order.
        </p>
        <h2>Contact Information</h2>
        <p>
          For all law enforcement inquiries or requests, please contact our
          legal team at the following email address:
        </p>
        <p>Email: legal@u-company.com</p>
        <p>
          Please allow a reasonable time for us to review and respond to your
          request.
        </p>
      </div>
    </>
  );
};

export default Law;
