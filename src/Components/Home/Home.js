import React from "react";
import "./Home.css";

function Home() {

    return(<>
<div className="searchBox">
          <h2>The Care you Expected</h2>
          <div>
            <h6>How can we help you today?</h6>
          </div>
        </div>

                <div className="row mainLowerSection">
                <div className="col  col-sm-12 col-md-6  covidInfo">
                  <h4>Covid 19</h4>
                  <p>
                    Our Hospital is offering first and second dose COVID-19 appointments to
                    anyone age 12 and older in most of the communities we serve. we are
                    also offering third dose COVID-19 vaccine appointments for
                    moderately to severely immunocompromised individuals, individuals
                    over the age of 65, individuals 18-64 with chronic conditions and
                    individuals 18-64 who are considered high risk due to their
                    occupation.
                    <br />
                    We encourage you to schedule a COVID-19 vaccine appointment at the
                    location nearest you(go to Locations page). Patients ages 12-17 should only schedule
                    appointments at locations providing the Pfizer vaccine and must
                    have a parent or guardian present to be vaccinated.
                    <br />
                    Want to learn more about getting a COVID-19 vaccination or restrictions Read our
                    covid 19 guidlines.
                  </p>
                </div>
                <div className="col  col-sm-12 col-md-6 infoCards">
                  <div className="info1">
                    <h6>
                      <img alt="appointment" src="../appointment.png" />
                      Make an Appointment
                    </h6>
                    <p>Find Doctors Right Here and Make an Appointment </p>
                    <hr />
                  </div>
                  <div className="info2">
                    <h6>
                      <img alt="appointment" src="../doctor.png" />
                      All Doctors
                    </h6>
                    <p>
                      Search for Doctors based on location, reviews & more. Find &
                      book an office visit with a Doctor, or video chat with them from
                      home. In-Person & Online
                    </p>
                    <hr />
                  </div>
                  <div className="info3">
                    <h6>
                      <img alt="appointment" src="../appointment.png" />
                      Learn more about us
                    </h6>
                    <p>Click here to learn more about our hospital</p>
                  </div>
                </div>
              </div>
              </>
    )
}

export default Home