import React, { useEffect, useState } from "react";
import BASE_URL from "../../constraints/URL";
import PatientCard from "./PatientCard";
import CardLoadAnimation from "../Doctors/DocCardLoading";
import "./Patients.css";

function Patients({ locations, user }) {
  const [patients, setPatients] = useState(null);
  const [editBtn, setEditBtn] = useState(false);
  const [searchTearm, setSearchTearm] = useState("");
  const [clinic, setClinic] = useState(false);

  //GET---------------------------------

  useEffect(() => {
    fetch(BASE_URL + `/doctors/${user?.id}/patients`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      credentials: "include",
    }).then((res) => {
      if (res.ok) {
        res.json().then((data) => {
          setPatients(data);
        });
      }
    });
  }, [user?.id]);

  //DELETE----------------------------

  function deletePatient(id) {
    fetch(BASE_URL + `/patients/${id}`, {
      method: "DELETE",
      credentials: "include",
    });
    const newPatientsList = patients.filter((person) => person.id !== id);
    setPatients(newPatientsList);
  }

  //PATCH--------------------------------

  function updatePatient(patientObject) {


    fetch(BASE_URL + `/patients/${patientObject.id}`, {
      method: "PATCH",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(patientObject),
    }).then((res) => {
      if (res.ok) {
        res.json().then((patient) => {
          const newPatients = patients.filter((person) => person.id !== patientObject.id);
          setPatients([...newPatients, patient]);
        });
      } else {
        res.json().then((err) => {
          console.log(err.error);
        });
      }
    });
  }

  function activateSearch(e) {
    e.preventDefault();
    setSearchTearm(e.target.value);
  }
  function handleSearch(e) {
    e.preventDefault();
    if (e.target.value === "false") {
      setClinic(null);
    } else {
      let valu = parseInt(e.target.value);
      setClinic(valu);
    }
  }

  return (
    <div className="patientMainDiv">
      <div className="patientInnerDiv">
        <form className="patientSearchForm">
          <div className="row serachPatientinnerDiv">
            <div className="col col-sm-12 col-md-3">
              <input
                type="text"
                className="form-control"
                placeholder="Last name"
                onChange={activateSearch}
              />
            </div>
            <div className="col col-sm-12 col-md-3">
              <button className="btn btn-primary searchBtn">Search</button>
            </div>
            <div className="col col-sm-12 col-md-3">
              <h6>Serach your patients </h6>
              <h6>⬅ By name or Location ➡ </h6>
            </div>
            <div className="col col-sm-12 col-md-3">
              <ul>
                <li className="serchTearms">
                  <label>
                    Search patients by Location
                    <select
                      className="form-select"
                      name="id"
                      aria-label="Default select example"
                      onChange={handleSearch}
                    >
                      <option value={false}>All</option>
                      {locations.map((card) => (
                        <option value={card.id} key={card.id + 100}>
                          {card.name}
                        </option>
                      ))}
                    </select>
                  </label>
                </li>
              </ul>
            </div>
          </div>
        </form>
        <div className="patientCardDiv grids">
          {patients === null ? (
            <CardLoadAnimation />
          ) : (
            patients
              .filter((patient) =>
                patient.last_name
                  .toLowerCase()
                  .includes(searchTearm.toLocaleLowerCase())
              )
              .filter((patient) =>
                clinic ? parseInt(patient.clinic_location) === clinic : patient
              )
              .map((card) => (
                <PatientCard
                  key={card.id + 200}
                  card={card}
                  deletePatient={deletePatient}
                  updatePatient={updatePatient}
                  editBtn={editBtn}
                  setEditBtn={setEditBtn}
                />
              ))
          )}
        </div>
      </div>
    </div>
  );
}

export default Patients;
