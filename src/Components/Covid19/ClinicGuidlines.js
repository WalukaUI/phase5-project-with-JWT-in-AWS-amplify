import React from "react";
import { Link } from "react-router-dom";

function ClinicGidlines() {
  return (
    <Link to="/covid19" style={{ color: "black", textDecoration: "none" }}>
      <div>
        All Clinic Locations are open,{" "}
        <span href="!#" style={{ color: "red", textDecoration: "underline" }}>
          see covid restrictions
        </span>
      </div>
    </Link>
  );
}

export default ClinicGidlines;
