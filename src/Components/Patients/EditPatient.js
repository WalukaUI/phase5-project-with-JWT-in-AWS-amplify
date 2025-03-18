import React from "react";
import "./EditPatient.css";

function EditPatient({
  display,
  setDisplay,
  updateData,
  updatePatient,
  setUpdateData
}) {


  function handleChangeData(e) {
    e.preventDefault();
    let newData = { ...updateData, [e.target.name]: e.target.value };
    setUpdateData(newData);
  }

  function triggerUpdate(e) {
    e.preventDefault();
    updatePatient(updateData)
    setDisplay(!display);
  }
  if (!updateData) return null;
  const editPatient = updateData;

  return (
    <>
      <div className="personsCard patientForm">
        <div className="popup-box">
          <div className="popup-inner" style={{backgroundColor: "#F2EFDA"}}>
            <div className="formDiv div1form">
            <h5>Update Patient Details</h5>
              <form>
                <div>
                  <label>First Name
                  <input
                    name="first_name"
                    className="form-control editPatientInput"
                    value={editPatient?.first_name}
                    onChange={handleChangeData}
                  /></label>
                  <label>Last Name
                  <input
                    name="last_name"
                    className="form-control editPatientInput"
                    value={editPatient?.last_name}
                    onChange={handleChangeData}
                  /></label>
                  <label>Clinic Location
                  <input
                  className="form-control editPatientInput"
                    name="clinic_location"
                    value={editPatient?.clinic_location}
                    onChange={handleChangeData}
                  /></label>
                </div>
                <div>
                  <h6>Contact Details</h6>
                  <label>Email Address
                  <input
                  className="form-control editPatientInput"
                    name="email"
                    value={editPatient?.email}
                    onChange={handleChangeData}
                  /></label>
                  <label>Telephone #
                  <input
                  className="form-control editPatientInput"
                    name="contact_number"
                    value={editPatient?.contact_number}
                    onChange={handleChangeData}
                  /></label>
                </div>

                <br />
                <button
                  className="btn btn-success"
                  type="submit"
                  onClick={triggerUpdate}
                >
                  Save
                </button>
                <button
                  className="btn btn-warning"
                  onClick={() => setDisplay(!display)}
                >
                  Cancel
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default EditPatient;
