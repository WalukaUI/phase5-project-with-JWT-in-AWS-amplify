import React, { useState } from "react";
import "./Appointments.css";
import Loading from "../Doctors/DocCardLoading"
import { DayPicker } from "react-day-picker";
import "react-day-picker/style.css";

function AppointmentCard({
  card,
  user,
  deleteAppointment,
  editAppointment,
  doctors
}) {
  const [updatedAppointment, setUpdatedAppointment] = useState(null);
  const [display, setDisplay] = useState(true);
  const [selected, setSelectedDate] = useState(null);

  function filterDoctorName() {
    let filteredDoc = doctors.filter((doc) => doc.id === card.doctor_id);
    let fname = filteredDoc[0].first_name;
    let lname = filteredDoc[0].last_name;
    return fname + " " + lname;
  }
  function handleDelete(e) {
    e.preventDefault();
    deleteAppointment(card.id);
  }

  function handleEditAppointment(e) {
    e.preventDefault();
    let newCard={...card};
    delete newCard['patient']
    delete newCard['patientname']
    setDisplay(!display);
    setUpdatedAppointment(card);
  }
  function handleChange(e) {
    e.preventDefault();
    let newData = { ...updatedAppointment, [e.target.name]: e.target.value };
    setUpdatedAppointment(newData);
  }

  function handleEdit(e) {
    e.preventDefault();
    setDisplay(!display);
    editAppointment({ ...updatedAppointment, date: selected });
  }

  function taketime2(){
    var number= card.time
    var output = [];
    while (number) {
     output.push(number % 10);
     number = Math.floor(number/10);
    }
   let lasttwoNums=output.reverse().slice(-2).join('')
   let firstTwoNums=output.slice(0,2).join('')
   let hours=parseInt(firstTwoNums)
   let bookedtime=`${firstTwoNums}.${lasttwoNums} ${hours > 11? "pm": "am"}`
   return bookedtime
  }
  if (card === null) return <Loading/> 


  return display ? (
    <div>
      <div className=" row appointmentCard">
        <div className="col col-md-6 col-sm-12">
          <p>
            <b>Date:</b> {card.date}
          </p>
          <p>
            <b>Time:</b>{taketime2()}
          </p>
          <p>
          <strong> {user?.role === "patient" ? "Doctor Name:":"Patient Name:"}</strong> {user?.role === "patient" ? filterDoctorName():card.patient.first_name + " "+card.patient.last_name}
          </p>
        </div>
        <div className="col col-md-6 col-sm-12 appointmentBtnsContainer">
          <div>
          <button className="btn chnageAppBtn appointmentPageBtns" onClick={handleEditAppointment}><span><img
                          src="./changeApointment.gif"
                          alt="contact"
                          style={{ paddingRight: "10px" }}
                        /></span>
            Change Appointment
          </button>
          </div>
          <div>
          <button className="btn deleteAppBtn appointmentPageBtns" onClick={handleDelete}><span><img
                          src="./trash.gif"
                          alt="contact"
                          style={{ paddingRight: "10px" }}
                        /></span>
            Delete Appointment
          </button>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <>
      <div className="popup-box">
        <div className="popup-innerBox">
          <div className="formDiv">
            <form onSubmit={handleEdit}>
              <div className="form-group newAppointmentForm">
                <h4 style={{ color: "#00235B", paddingBottom: "20px" }}>Update Appointment</h4>
                <label>Select a Doctor</label>
                <select
                  className="form-select"
                  name="doctor_id"
                  value={updatedAppointment.doctor_id}
                  aria-label="Default select example"
                  onChange={handleChange}
                >
                  {doctors.map((card) => (
                    <option value={card.id} key={card.id}>
                      {card.first_name} {card.last_name}
                    </option>
                  ))}
                </select>
                <label>Select a Date</label>
                <div>
                <DayPicker selected={selected} 
                className="form-select" 
                dateFormat="dd/MM/yy" 
                name="date" 
                onChange={(date) => setSelectedDate(date)} 
                filterDate={(date)=>date.getDay() !== 6 && date.getDay() !== 0}
                />
                </div>
                <label>Time</label>
                <select
                  className="form-select"
                  name="time"
                  aria-label="Default select example"
                  onChange={handleChange}
                  disabled={!selected}
                >
                  <option value="0900">9.00 am - 10.00 am</option>
                  <option value="1000">10.00 am - 11.00 am</option>
                  <option value="1100">11.00 am - 12.00 pm</option>
                  <option value="1300">1.00 pm - 2.00 pm</option>
                </select>
                <div>
                  <button type="submit" className="btn btn-success formSubBtn" disabled={!selected}>
                    Update
                  </button>
                  <button
                    className="btn btn-warning formSubBtn"
                    onClick={() => setDisplay(!display)}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default AppointmentCard;

