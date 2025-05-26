import React, { useState } from "react";
import { Link } from "react-router-dom";
import BASE_URL from "../../constraints/URL";
import "./Profile.css";

function PatientProfile({ user, appointments, locations, setUser }) {
  const [popup, setPopup] = useState(false);
  const [updateUserData, setUpdateUserData] = useState(null);
  const [errors, setErrors] = useState(null);
  const token = localStorage.getItem('token');
  //PATCH User-------------------------------
  
  function triggerEdit(e) {
    e.preventDefault();
    setPopup(!popup);
    fetch(BASE_URL + `/patients/${user.id}`, {
      method: "PATCH",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "Authorization": token,
      },
      body: JSON.stringify(updateUserData),
    }).then((res) => {
      if (res.ok) {
        res.json().then((patient) => {
          setUser(patient)
        });
      } else {
        res.json().then((err) => {
          setErrors(err.error);
        });
      }
    });
  }

  //show user appointments--------------------

  function showUserAppointments(id) {
    let appointment = appointments?.map((card) => card.patient_id === id);
    return appointment ? (
      <div>
        <p>
          {appointment.length > 1
            ? `You have ${appointment.length} appointments `
            : "You have 1 appointment"}
        </p>
      </div>
    ) : (
      <p>You do not have any appointments</p>
    );
  }

  //show users clinic location---------------

  function showUserClinicName(id) {
    let nn = [];
    locations.map((card) => (card.id === id ? nn.push(card.name) : null));
    return nn[0];
  }
  //Supportive Functions------------------------
  function triggerEditWindow(e) {
    e.preventDefault();
    setPopup(!popup);
    setUpdateUserData(user);
  }

  function handleChange(e) {
    e.preventDefault();
    let newData = { ...updateUserData, [e.target.name]: e.target.value, role: "patient"};
    setUpdateUserData(newData);
  }

  const editUser = updateUserData;

  return (
    <div className="profile">
      <form onSubmit={triggerEdit}>
        <div className="row profileDetails">
          <h5><span><img
                          src="./profile.png"
                          alt="contact"
                          style={{ paddingRight: "10px" }}
                        /></span>Your Profile</h5>
          <hr />
          <div className="col col-sm-12 col-md-5">
            <div style={{display: "flex"}}>
            <p>
              <b>First Name :</b></p>
              {popup ? (
                <label><input
                class="form-control"
                  value={editUser.first_name}
                  name="first_name"
                  onChange={handleChange}
                /></label>
              ) : (
                user.first_name
              )}
            </div>
            <div style={{display: "flex"}}>
            <p>
              <b>Last Name :</b></p>
              {popup ? (
                <label><input
                class="form-control"
                  value={editUser.last_name }
                  name="last_name"
                  onChange={handleChange}
                /></label>
              ) : (
                user.last_name
              )}
            
            </div>
            <div style={{display: "flex"}}>
            <p>
              <b>User name :</b></p>
              {popup ? (
                <label><input
                class="form-control"
                  value={user.username ? editUser.username : "N/A"}
                  name="username"
                  onChange={handleChange}
                /></label>
              ) : (
                user.username ? user.username: "N/A"
              )}
            </div>
            <p>
              <b>Clinic Location :</b>
              {popup ? (
                <label>
                  <select
                    className="form-select"
                    name="clinic_location"
                    value={
                      user.clinic_location ? editUser.clinic_location : "N/A"
                    }
                    aria-label="Default select example"
                    onChange={handleChange}
                  >
                    {locations.map((card) => (
                      <option value={card.id} key={card.id}>
                        {card.name}
                      </option>
                    ))}
                  </select>
                </label>
              ) : (
                 user.clinic_location? showUserClinicName(parseInt(user.clinic_location)): "N/A"
              )}
            </p>
          </div>
          <div className="col col-sm-12 col-md-5">
          <div style={{display: "flex"}}>
            <p>
              <b>Contact Number:</b>{" "}</p>
              {popup ? (
                <label><input
                class="form-control"
                  value={editUser?.contact_number}
                  name="contact_number"
                  onChange={handleChange}
                /></label>
              ) : (
                user.contact_number? user.contact_number:"N/A"
              )}
            </div>
            <div style={{display: "flex"}}>
            <p>
              <b>Email Address:</b>{" "}</p>
              {popup ? (
                <label><input
                class="form-control"
                  value={editUser.email}
                  name="email"
                  onChange={handleChange}
                /></label>
              ) : (
                user.email
              )}
            </div>
          </div>
          <div className="col col-sm-12 col-md-2 editProfileDiv">
            {popup ? (
              <button className="btn profileSaveBtn" type="submit">
                Save
              </button>
            ) : (
              <button
                className="btn profileEditBtn"
                onClick={triggerEditWindow}
              >
                Edit profile
              </button>
            )}

            {popup ? (
              <button
                className="btn profileCancelBtn"
                onClick={triggerEditWindow}
              >
                Cancel
              </button>
            ) : (
              <Link to="/"><button className="btn profileCancelBtn">Cancel</button></Link>
            )}
          </div>
        </div>
      </form>
      <hr />
      <div style={{width: "100%", height: "50px"}}>
        {errors
          ? errors.map((e) => (
              <p style={{ color: "red", marginBottom: "10px" }} key={e}>{e}</p>
            ))
          : null}
      </div>
      <div className="row profileAppointments">
        <h5><span><img
                          src="./smallCalender.png"
                          alt="contact"
                          style={{ paddingRight: "10px" }}
                        /></span>Appointments</h5>
        <span><img
                          src="./appointments.png"
                          alt="contact"
                          style={{ paddingRight: "10px" }}
                        /></span>
        {showUserAppointments(user?.id)}
        <Link to="/appointments">
          <button className="btn profileNewAppointmentBtn btn-info">
            Your Appointments
          </button>
        </Link>
      </div>
    </div>
  );
}

export default PatientProfile;
