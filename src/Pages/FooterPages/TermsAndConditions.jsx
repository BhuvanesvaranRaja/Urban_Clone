import React, { useEffect } from "react";
import { Heading } from "@chakra-ui/react";
import { Container } from "react-bootstrap";

const TermsAndConditions = () => {
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, []);
  return (
    <>
      <Heading className="fs-2 fw-bolder text-center p-5">
        Terms and Conditions
      </Heading>

      <div className="text-justify m-5 fs-5 ">
        <h2 className="mt-4 fw-bolder fs-4 ">Terms and Conditions</h2>
        <p className="mt-4">
          Welcome to U-Company! These terms and conditions outline the rules and
          regulations for the use of our website. By accessing this website, we
          assume you accept these terms and conditions. Do not continue to use
          U-Company if you do not agree to take all of the terms and conditions
          stated on this page.”). The Privacy Policy and the Supplemental Terms
          form an integral part of these Terms. In the event of a conflict
          between these Terms and the Supplemental Terms with respect to
          applicable Services, the Supplemental Terms will prevail. The
          following terminology applies to these Terms and Conditions, Privacy
          Statement, and Disclaimer Notice and all Agreements: "Client", "You"
          and "Your" refers to you, the person who logs on this website and
          complies with U-Company's terms and conditions. "The Company",
          "Ourselves", "We", "Our" and "Us" refer to U-Company. "Party",
          "Parties", or "Us" refers to both the Client and ourselves, or either
          the Client or ourselves.
        </p>
        <h4 className="mt-4 fw-bolder fs-4 mb-3">Cookies</h4>
        <p>
          We employ the use of cookies.I have just updated to the latest Ang
          15.1.3 and the TS too but it's still the same sluggish response and
          sometimes pressing F12 doesn't even take back you to the source
          variable/method. I understand that these are not treated as issues by
          you guys but what I really don't understand is, these features
          (intellisense/f12, suggestions) were super fast in the earlier
          versions and even the suggestions like switch command, settimeouts,
          etc were coming in milliseconds and now they are taking at least 5
          secs or they even don't show up, so how do you guys prioritize this,
          as a low-level issue, if it is then the Ang or TS frontend devs would
          be frustrated... By accessing U-Company, you agreed to use cookies in
          agreement with U-Company's Privacy Policy.
        </p>
        <h4 className="mt-4 fw-bolder fs-4 mb-3 ">License</h4>
        <p>
          Unless otherwise stated, U-Company and/or its licensors own the
          intellectual property rights for all material on U-Company. All
          intellectual property rights are reserved. You may access this from
          U-Company for your personal use subjected to restrictions set in these
          terms and conditions.
        </p>
        <h4 className="mt-4 fw-bolder fs-4 mb-3 ">
          Hyperlinking to our Content
        </h4>
        <p>
          The following organizations may link to our website without prior
          written approval:
          <ul className="mx-5 mt-3 mb-3">
            <li>Government agencies</li>
            <li>Search engines</li>
            <li>News organizations</li>
            <li>Online directory distributors</li>
            <li>
              Systemwide Accredited Businesses, except soliciting non-profit
              organizations, charity shopping malls, and charity fundraising
              groups which may not hyperlink to our Web site.
            </li>
          </ul>
          These organizations may link to our home page, to publications, or to
          other Website information so long as the link: (a) is not in any way
          deceptive; (b) does not falsely imply sponsorship, endorsement, or
          approval of the linking party and its products and/or services; and
          (c) fits within the context of the linking party's site.
        </p>
      </div>
    </>
  );
};

export default TermsAndConditions;
