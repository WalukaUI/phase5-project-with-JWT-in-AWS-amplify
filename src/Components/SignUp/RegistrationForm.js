import React, { useState } from "react";

function RegistrationForm({
  handleValidity,
  handleAddPatient,
  errors,
  sendEmail,
  confirmationNumber,
  locations,
  isValiedEmail,
}) {
  const [doNotshowInput, setDoNotshowInput] = useState(true);

  function enableInputs(e) {
    if (e.target.value === "none") {
      setDoNotshowInput(true);
    } else {
      setDoNotshowInput(false);
    }
  }

  return (
    <div className="signupContainer">
      <h4>Create your account</h4>
      <form onSubmit={sendEmail}>
        <div className="row signupInnerContainer">
          <div className="col col-sm-12 col-md-6 signUpformInnerDiv1">
            <input
              name="message"
              id="confirmEmail"
              type="number"
              style={{ display: "none" }}
              value={confirmationNumber}
              onChange={handleAddPatient}
            />

            <label>
              Select a Clinic Location
              <select
                className="form-select"
                id="clinicSelection"
                name="clinic_location"
                aria-label="Default select example"
                onChange={(e) => {
                  handleAddPatient(e);
                  let clinicmessage =
                    document.getElementById("clinicTagMesssage");
                  clinicmessage.innerHTML = "Clinic Selected";
                  clinicmessage.style.color = "green";
                  enableInputs(e);
                }}
                required
              >
                <option value="none">Select a Location</option>
                {locations? locations.map((loc) => (
                  <option value={loc.id} key={loc.id}>
                    {loc.name}
                  </option>
                )):<option value="none">Please wait, Locations are loading</option>}
              </select>
              <p id="clinicTagMesssage" style={{ color: "red" }}>
                Please select a clinic location
              </p>
            </label>

            <label>
              First Name
              <input
                className="form-control form-control-sm newData"
                disabled={doNotshowInput}
                type="text"
                name="first_name"
                maxLength="20"
                minLength="6"
                placeholder="First Name"
                onChange={handleValidity}
                required
              />
              <p className="messageTag"></p>
            </label>

            <label>
              Last Name
              <input
                className="form-control form-control-sm newData"
                disabled={doNotshowInput}
                type="text"
                name="last_name"
                maxLength="20"
                minLength="6"
                placeholder="Last Name"
                onChange={handleValidity}
                required
              />
              <p className="messageTag"></p>
            </label>
            <label>
              Email
              <input
                className="form-control form-control-sm newData"
                disabled={doNotshowInput}
                type="text"
                name="email"
                maxLength="50"
                minLength="6"
                placeholder="Email"
                onChange={handleValidity}
                required
              />
              <p className="messageTag"></p>
            </label>
          </div>

          <div className="col col-sm-12 col-md-6 signUpformInnerDiv2">
            <label>
              Username
              <input
                className="form-control form-control-sm newData"
                disabled={doNotshowInput}
                name="username"
                maxLength="30"
                minLength="6"
                placeholder="Username"
                onChange={handleValidity}
                required
              />
              <p className="messageTag"></p>
            </label>
            <label>
              Password
              <input
                disabled={doNotshowInput}
                type="password"
                name="password"
                autoComplete="on"
                maxLength="50"
                minLength="6"
                className="form-control"
                onChange={handleAddPatient}
                placeholder="Password"
                required
              />
            </label>
            <label>
              Password Verification
              <input
                disabled={doNotshowInput}
                type="password"
                name="password_confirmation"
                autoComplete="on"
                maxLength="50"
                minLength="6"
                className="form-control"
                onChange={handleAddPatient}
                placeholder="Re-enter your Password"
                required
              />
              <p className="pwmessageTag"></p>
            </label>
            {isValiedEmail ? (
              <button
                className=" btn btn-success createPatientBtn"
                type="submit"
              >
                Submit
              </button>
            ) : (
              ""
            )}
          </div>
        </div>
      </form>
      <div>
        {errors
          ? errors.map((e) => (
              <p style={{ color: "red", marginBottom: "10px" }} key={e}>
                {e}
              </p>
            ))
          : null}
      </div>
    </div>
  );
}

export default RegistrationForm;
