import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import BASE_URL from "../../constraints/URL";
import StarRating from "./StarRating";
import "./DocProfile.css";

function DoctorProfile({ user }) {
  const [docProfile, setDocProfile] = useState([]);
  const [docLocations, setDocLocation] = useState([]);
  const [rate, setRate] = useState();

  const params = useParams();

  //-----------------GET Doctor----------------

  useEffect(() => {
    fetch(BASE_URL + `/doctors/${params.id}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    })
      .then((r) => r.json())
      .then((data) => {
        setDocProfile(data);
      });
  }, [params.id]);

  //------------------GET Locations-------------

  useEffect(() => {
    fetch(BASE_URL + `/doctors/${params.id}/locations`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    })
      .then((r) => r.json())
      .then((data) => setDocLocation(data));
  }, [params.id]);
  //-------------POST a comment-----------------

  function handleNewComment(e) {
    e.preventDefault();
    let ss = document.getElementById("commentTextarea").value;
    let obj = {
      comment: `${ss}`,
      doctor_id: parseInt(params.id),
      patient_id: user.id,
      points: rate,
    };

    fetch(BASE_URL + `/comments`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(obj),
    }).then((res) => {
      if (res.ok) {
        res.json().then((user) => {
          fetch(BASE_URL + `/doctors/${params.id}`, {
            method: "GET",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
          })
            .then((r) => r.json())
            .then((data) =>
              setDocProfile(data));
        });
      } else {
        res.json().then((err) => {
          console.log(err.error);
        });
      }
    });

    e.target.reset();
  }

  //---------------Rating calculator------------

  function rating(array) {
    let points = [];
    if (array?.length > 0) {
      array.forEach((e) => points.push(e.points));
      let pointSum = points.reduce((a, b) => a + b, 0);
      let pointaverage = (pointSum / points.length).toFixed(2);
      return pointaverage
    } else {
      return "N/A";
    }
  }

  function handleUpdateRatin(pct) {
    const newRating = pct * 5;
    setRate(newRating);
  }

  return (
    <div className="profile row">
      <div className="row profileTopDiv">
        <div className="col col-sm-12 col-md-4 imageContainer">
          <img
            src={docProfile.image}
            alt="doctor"
            style={{ height: "200px", width: "150px", objectFit: "cover" }}
          />
        </div>
        <div className="col col-sm-12 col-md-4 aboutDoctor">
          <h5>
            {docProfile.first_name} {docProfile.last_name}
          </h5>
          <p>Speciality: {docProfile.speciality}</p>
          <div>
            <h6>Average Ratings: {rating(docProfile.comment)}</h6>
            <StarRating
                  percentage={docProfile.comment ? rating(docProfile.comment) / 5 : 5 / 5}
                />
            <p>
              {docProfile.comment?.length}{" "}
              {docProfile.comment?.length > 1 ? "comments" : "comment"}
            </p>
            <a href="#patientRatings">Comments & Ratings</a>
          </div>
        </div>

        <div className="col col-sm-12 col-md-4 appointmentBtnDiv">
          {docProfile.video_vistits ? (
            <p>
              {" "}
              <img
                src="../video.svg"
                alt="contact"
                style={{ paddingRight: "10px", width: "10%" }}
              />
              Accept video visits
            </p>
          ) : (
            ""
          )}
          {docProfile.isaccept_newpatients ? (
            <p>
              {" "}
              <img
                src="../accept.svg"
                alt="contact"
                style={{ paddingRight: "10px", width: "10%" }}
              />{" "}
              Accept new Patients
            </p>
          ) : (
            ""
          )}

          {user?.role === "patient" ? (
            <Link to={user ? "/newappointment" : "/"}>
              <button className="btn profileBtn">
                Schedule an Appointment
              </button>
            </Link>
          ) : (
            ""
          )}
        </div>
      </div>
      <div className="row profileLinksDiv">
        <div className="col col-sm-12 col-md-6">
          <a href="#about">About</a>
        </div>
        <div className="col col-sm-12 col-md-6">
          <a href="#patientRatings">Ratings and Comments</a>
        </div>
      </div>
      <div
        className="row profileAboutDiv"
        id="about"
        style={{ minHeight: "150px" }}
      >
        <h5>Location and Contact Information</h5>
        <hr />
        {docLocations?.length > 0 ? (
          docLocations.map((location) => (
            <div className="row docAddressContactInfo" key={location.id}>
              <div className="col col-sm-12 col-md-4">
                <p>
                  <b>{location.name}</b>
                </p>
                <p>{location.address_line_one}</p>
                <p>{location.address_line_two}</p>
                <p>{location.city}</p>
                <p>{location.zipcode}</p>
              </div>
              <div className="col col-sm-12 col-md-4">
                <div className="telephoneNum">
                  <img src="/telephone.svg" alt="call" />
                  <p>{location.contact_number}</p>
                </div>
              </div>
              <hr />
              <div className="col col-sm-12 col-md-4"></div>
            </div>
          ))
        ) : (
          <p>N/A</p>
        )}
      </div>

      {user?.role === "patient" ? (
        <div className="row">
          <h5>Write a Comment</h5>
          <hr />
          <div className="form-group">
            <div className="details">
              <div>
                Rating:{" "}
                <StarRating
                  percentage={rate ? rate / 5 : 5 / 5}
                  onClick={handleUpdateRatin}
                />
              </div>
            </div>

            <form onSubmit={handleNewComment}>
              <label>New Comment</label>
              <textarea
                className="form-control"
                id="commentTextarea"
                name="comment"
                rows="3"
                style={{ width: "500px", marginBottom: "10px" }}
                maxLength="200"
                placeholder="Maximum 200 charactors"
              ></textarea>
              <button type="submit" className="btn btn-primary">
                Submit
              </button>
            </form>
          </div>
        </div>
      ) : (
        ""
      )}

      <div className="row" style={{ backgroundColor: "#D6DFC6" }}>
        <h5 id="patientRatings">Doctor Ratings and Comments</h5>
        <hr />
        {docProfile.comment?.length > 0 ? (
          docProfile.comment.map((card) => (
            <div key={card.id}>
              <div>
                <h6>Rating</h6>
                <StarRating
                  percentage={card.points ? card.points/5 : 5 / 5}
                />
              </div>
              <div>
                <h6>Comment</h6>
                <p>{card.comment}</p>
              </div>
            </div>
          ))
        ) : (
          <p>N/A</p>
        )}
      </div>
    </div>
  );
}

export default DoctorProfile;
