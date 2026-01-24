import React, { useState } from "react";
import "./Doctors.css";
import Doctor from "./DoctorCard";
import CardLoadAnimation from "./DocCardLoading";

function Doctors({ doctors }) {
  const [searchTearm, setSearchTearm] = useState("");
  const [docSpeciality, setSpeciality] = useState("");
  const [acceptNewPatients, setAcceptNewPatients] = useState(false);
  const [videoVisits, setVideoVisits] = useState(false);
  const [dragger,setDragger]=useState(false)



  function activeSearch(e) {
    e.preventDefault();
    setSearchTearm(e.target.value);
  }


const containers=document.querySelectorAll(".container");
const draggables=document.querySelectorAll(".draggable");
const maindraggableDiv=document.getElementById("dragAndDropMainDiv");

if(dragger){
  maindraggableDiv.addEventListener("mouseover", (e) => {
    let innetTxt=document.querySelector('.blankContainer').textContent
    if(innetTxt===""){
       setAcceptNewPatients(false)
       setVideoVisits(false)
    }else if(innetTxt==="Accepting Video Visits"){
      setVideoVisits(true)
      setAcceptNewPatients(false)
    }else if(innetTxt==="Accepting New Patients"){
      setVideoVisits(false)
      setAcceptNewPatients(true)
    }else{
      setVideoVisits(true)
      setAcceptNewPatients(true)
    }
   })
 }
draggables.forEach(draggable=> {
    draggable.addEventListener("dragstart" || "touchstart", ()=>{
        draggable.classList.add("dragging")
    })
    draggable.addEventListener("dragend" || "touchend", ()=>{
        draggable.classList.remove("dragging")
    })
})

containers.forEach(container =>{
    container.addEventListener("dragover" || "touchmove",(e)=>{
        e.preventDefault()
        let draggable=document.querySelector(".dragging")
        container.appendChild(draggable)
    })
})
  return (
    <div>
      <div className="row doctorMainDiv" style={{ marginRight: "0" }}>
        <div className="col col-sm-12 col-md-3 docSearchDiv">
          <form>
          <h6>Search Doctors by Name</h6>
            <input
              type="text"
              onChange={activeSearch}
              className="form-control"
              placeholder="Doctor name"
            />
                       <div className="filterBySpeciality">
                <br></br>
                <p>
                  <strong>Speciality</strong>
                </p>
                <label>Select a Doctor by Speciality</label>
                <select
                  className="form-select"
                  name="speciality"
                  aria-label="Default select example"
                  onChange={(e) => setSpeciality(e.target.value)}
              
                >
                  <option value="All">All</option>
                  <option value="Dermatology">Dermatology</option>
                  <option value="Family medicine">Family medicine</option>
                  <option value="Anesthesiology">Anesthesiology</option>
                  <option value="Pediatrics">Pediatrics</option>
                  <option value="Preventive medicine">
                    Preventive medicine
                  </option>
                </select>
              </div>
            <div className="serchFilter">
              <br></br>
              <h6>Narrow Your Results</h6>
              <p>Drag and drop filters to blank area</p>
              <div className="dragAndDropMainDiv" id="dragAndDropMainDiv" onMouseDown={()=>setDragger(true)} >
                <div className="container">
                  <p className="draggable btn btn-light" draggable="true" onTouchStart={()=>setDragger(true)}>Accepting New Patients</p>
                  <p className="draggable btn btn-light" draggable="true" onTouchStart={()=>setDragger(true)}>Accepting Video Visits</p>
                </div>
                <div className="excahngeIconDiv">
                <img className="excahngeIcon" src="exchange.png" alt="arrow" />
                </div>
                <div className="container blankContainer" id="blankContainer" data-text="Drag and drop filters">
                </div>
              </div>
            </div>
          </form>
        </div>
        <div className="col col-sm-12 col-md-9 formnput">
          {doctors === null ? (
            <div>
            <CardLoadAnimation />
            </div>
          ) : (
            doctors
              .filter((card) =>
                card.last_name.toLowerCase().includes(searchTearm.toLowerCase()) || card.first_name.toLowerCase().includes(searchTearm.toLowerCase())
              )
              .filter((card) =>
                acceptNewPatients ? card.isaccept_newpatients === true : card
              )
              .filter((card) =>
                videoVisits ? card.video_vistits === true : card
              )
              .filter((card) => {
                switch (docSpeciality) {
                  case "Dermatology":
                    return card.speciality === "Dermatology";
                  case "Family medicine":
                    return card.speciality === "Family medicine";
                  case "Anesthesiology":
                    return card.speciality === "Anesthesiology";
                  case "Preventive medicine":
                    return card.speciality === "Preventive medicine";
                  case "Pediatrics":
                    return card.speciality === "Pediatrics";
                  default:
                    return card;
                }
              })
              .map((card) => <Doctor key={card.id} card={card} />)
          )}
        </div>
      </div>
    </div>
  );
}
export default Doctors;