import React, { useState } from "react";
import "./PatientCard.css";
import EditPatient from "./EditPatient"

function PatientCard({
  card,
  deletePatient,
  updatePatient,
}) {

  const [display, setDisplay] = useState(false);
  const [updateData, setUpdateData] = useState(null);

  function handleDelete(e) {
    e.preventDefault();
    deletePatient(card.id);
  }

  function toggleDisplay(e) {
    e.preventDefault();
    setUpdateData(card)
    setDisplay(!display);
  }

  return ( !display ?
    <div className="personsCard">
      <div>
        <button className="btn btn-primary" onClick={toggleDisplay}>
          Edit
        </button>

        <p>First Name: {card.first_name}</p>
        <p>Last Name: {card.last_name}</p>
        <p>Clinic: {card.clinic_location}</p>
      </div>
      <div>
        <h6>Contact Details</h6>
        <p>Email: {card.email}</p>
        <p>Telephone Home/Mobile: {card.contact_number}</p>
      </div>

      <br />
      <button className="btn btn-danger" onClick={handleDelete}>
        Delete
      </button>
    </div>:
    <EditPatient  display={display} setDisplay={setDisplay} updatePatient={updatePatient} updateData={updateData} setUpdateData={setUpdateData}/>
  )
}

export default PatientCard;
