import React from "react";
import "./Covid19.css";
import CovidHomePage from "./CovidHomePage";
import CovidInfoByState from "./CovidStatesInfo";

function Covid19() {
  return (
    <div>
      <div className="popup-box">
        <div className="popup-inner">
          <div className="formDiv row">
            <div className="card text-center covidcard">
              <div className="card-header">
                <ul className="nav nav-tabs card-header-tabs">
                  <li className="nav-item">
                    <a
                      className="nav-link active"
                      href="#covid19HomePage"
                      data-toggle="tab"
                    >
                      Covid Guidlines
                    </a>
                  </li>
                  <li className="nav-item active">
                    <a
                      className="nav-link "
                      href="#covidByState"
                      data-toggle="tab"
                    >
                      Covid infomation  Globaly and By Country
                    </a>
                  </li>
                </ul>
              </div>
              <div className="tab-content">
                <div id="covid19HomePage" className="tab-pane active">

                  <h6>General Guidance of All Clinics</h6>

                  <CovidHomePage />
                </div>
                <div id="covidByState" className="tab-pane">
                  <CovidInfoByState />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  ) 
}

export default Covid19;
