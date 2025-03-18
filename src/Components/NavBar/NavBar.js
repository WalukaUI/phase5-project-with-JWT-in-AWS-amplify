import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./NavBar.css";
import { UserContext } from "../Maindiv";

function NavBar({ logout, getAddress, setAddress }) {
  const history = useNavigate();
  const user = useContext(UserContext);

  function handlelogout(e) {
    e.preventDefault();
    logout();
    history("/LogoutLandingPage");
  }

  return (
    <div className="navBarMainDiv">
      <div className="logoDiv">
        <div id="cssmenu">
          <ul>
            <li>
              <span>
                <img
                  src="../menu.png"
                  alt="Logo"
                  style={{ width: "30px", marginRight: "5px" }}
                />
                Menu<i className="arrow"></i>
              </span>
              <ul className="dropdown">
                <li>
                  <Link to="/doctors">Doctors</Link>
                </li>
                <li>
                  <Link to="/locations">Locations</Link>
                </li>
                {user ? (
                  <li>
                    <span>
                      Appointments <i className="arrow"></i>
                    </span>
                    <ul className="dropdown">
                      <li>
                        <Link to="/appointments">All Apointments</Link>
                      </li>
                      <li>
                        {user.role === "patient" ? (
                          <Link to="/newappointment">New Appointment</Link>
                        ) : (
                          ""
                        )}
                      </li>
                    </ul>
                  </li>
                ) : (
                  ""
                )}
                <li>
                  <span>
                    Other
                    <i className="arrow"></i>
                  </span>
                  <ul className="dropdown">
                    <li>
                      <Link to="/">About us</Link>
                    </li>
                    <li>
                      <Link to="/">Careers</Link>
                    </li>
                  </ul>
                </li>
              </ul>
            </li>
          </ul>
        </div>
        <div>
          <Link to="/">
            <img
              src="../hospital logo.png"
              alt="Logo"
              style={{ width: "80px", marginLeft: "10px" }}
            />
          </Link>
        </div>
      </div>
      <div className="mainLinksDiv">
        <div>
          <Link to="/doctors" className="nav-bar-links"><span><img
                          src="./doctors.png"
                          alt="contact"
                          style={{ paddingRight: "10px", marginBottom: "10px" }}
                        />Doctors</span>
          </Link>
        </div>

        <div>
          <Link to="/locations" className="nav-bar-links"><span><img
                          src="./location.png"
                          alt="contact"
                          style={{ paddingRight: "10px", marginBottom: "15px" }}
                        />Locations</span>
          </Link>
        </div>
        {user ? (
          user.role === "doctor" ? (
            <>
              <div>
                <Link to="/appointments" className="nav-bar-links">
                        Appointments
                </Link>
              </div>
              <div>
                <Link to="/patients" className="nav-bar-links">
                  Patients
                </Link>
              </div>
            </>
          ) : (
            <div>
              <Link to="/appointments" className="nav-bar-links">
              <span><img
                          src="./apointmentsGray.png"
                          alt="contact"
                          style={{ paddingRight: "10px", marginBottom: "10px" }}
                        />Appointments</span>
              </Link>
            </div>
          )
        ) : (
          ""
        )}

        {user ? (
          <Link
            className="btn btn-warning"
            to="/doctorlogin"
            onClick={handlelogout}
          >
           🔐 Log Out
          </Link>
        ) : (
          <Link
            className="btn btn-outline-primary styled-button"
            to="/doctorlogin"
          >
            Doctor Log in
          </Link>
        )}
        <Link
          className={user ? "changeDisplay" : "btn btn-primary styled-button"}
          to="/patientlogin"
        >
          Patient Log in
        </Link>
      </div>

      <div className="loginLogoutDiv">
        <div className="loggedUsername">
          <h6>
            {user
              ? `You are logged in as ${user.first_name}`
              : "🔑 Login to make an Appointment"}
          </h6>
        </div>
        <div style={{ textAlign: "center" }} className="accountSettingsDiv">
          {user ? (
            <Link to="/profile" className="btn"><span><img
            src="./settings.png"
            alt="contact"
            style={{ paddingRight: "10px", marginBottom: "10px" }}
          />Account Settings</span>
              
            </Link>
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
}

export default NavBar;
