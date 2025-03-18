import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../DocLogin&PatientLogin.css";
import BASE_URL from "../../../constraints/URL";

function DoctorLogin({ setUser }) {
  const [docEmail, setDocEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState(null);

  const history = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();

    //login

    fetch(BASE_URL + `/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({
        email: docEmail,
        password: password,
        doctor: true,
      }),
    }).then((res) => {
      if (res.ok) {
        res.json().then((user) => {
          setUser(user);
          setDocEmail("");
          setPassword("");
          setErrors(null);
          localStorage.setItem("role", "doctor");
          localStorage.setItem("token", user.token);
          history("/");
        });
      } else {
        res.json().then((err) => {
          setErrors(err.error);
        });
      }
    });
  }

  return (
    <div className="row docloginMain">
      <div className="sidenav col col-md-6 col-sm-12">
        <div className="login-main-text">
          <h2>
            Doctor
            <br /> Login Page
          </h2>
          <p>Login here to access.This login is only for Doctors.</p>
        </div>
      </div>
      <div className="main col col-md-6 col-sm-12 docInputFields">
        {
          <div>
            {errors ? (
              <p style={{ color: "red", marginTop: "10px" }}>{errors}</p>
            ) : null}
          </div>
        }
        <form onSubmit={handleSubmit}>
          <div>
            <label>email</label>
            <input
              type="text"
              className="form-control"
              placeholder="email"
              value={docEmail}
              onChange={(e) => setDocEmail(e.target.value)}
            />
          </div>
          <div>
            <label>Password</label>
            <input
              type="password"
              className="form-control"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button type="submit" className="btn btn-success">
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
export default DoctorLogin;
