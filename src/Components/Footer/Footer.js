import React from "react";
import "./Footer.css";

function Footer() {
  return (
    <div className="footerMainDiv">
      <div className="col col-sm-12 col-md-4 footerDiv1">
        <img
          src="../hospital logo.png"
          alt="Logo"
          style={{ width: "25%", marginLeft: "10px" }}
        />
        <p>Hospital</p>
        <p>615, Loies Street</p>
        <p>Saint Louis, Missouri 63341</p>
        <p>314-251-5000</p>
      </div>
      <div className="col col-sm-12 col-md-4 footerDiv2">
        <h6>USEFUL LINKS</h6>
        <p>About us</p>
        <p>Careers</p>
        <p>Health Information</p>
        <p>Schedule an Appointment</p>
        <p>Healthcare Education</p>
        <p>Schedule an Appointment</p>
      </div>
      <div className="col col-sm-12 col-md-4 footerDiv3">
        <h6>Follow us on Scial Media</h6>

        <img
          src="../facebook.svg"
          alt="Logo"
          style={{ width: "10%", marginLeft: "15px" }}
        />
        <img
          src="../twitter.svg"
          alt="Logo"
          style={{ width: "10%", marginLeft: "15px" }}
        />
        <img
          src="../instagram.svg"
          alt="Logo"
          style={{ width: "10%", marginLeft: "15px" }}
        />
        <div className="iconCredits">
          Icons made by{" "}
          <a
            href="https://www.flaticon.com/authors/dinosoftlabs"
            title="DinosoftLabs"
          >
            DinosoftLabs
          </a>{" "}
          from{" "}
          <a href="https://www.flaticon.com/" title="Flaticon">
            www.flaticon.com
          </a>
        </div>
        <div className="iconCredits">
          Icons made by{" "}
          <a href="https://www.flaticon.com/authors/monkik" title="monkik">
            monkik
          </a>{" "}
          from{" "}
          <a href="https://www.flaticon.com/" title="Flaticon">
            www.flaticon.com
          </a><br></br>
          <a href="https://www.flaticon.com/free-icons/arrows" title="arrows icons">Arrows icons created by th studio - Flaticon</a>
        </div>
      </div>
    </div>
  );
}

export default Footer;
