import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import BASE_URL from "../../constraints/URL";
import EmailVerificationWindow from "./VerificationWindow";
import RegistrationForm from "./RegistrationForm";
import emailjs from "emailjs-com";
import "./SignUp.css";
import "./Spinner.css";

function SignUp({ locations, setUser }) {
  const [newPatient, setNewPatient] = useState({});
  const [errors, setErrors] = useState(null);
  const [confirmationNumber, setConfirmationNumber] = useState("");
  const [confirmWindow, setConfirmWindow] = useState(false);
  const [isValiedEmail, setIsValiedEmail] = useState(false);
  const [showErrormsg, setShowErrormsg] = useState(false);
  const attempts = useRef(3);

  const history = useNavigate();
  let allInputs = document.querySelectorAll(".newData");
  let messageTags = document.querySelectorAll(".messageTag");
  let pwmessageTags = document.querySelectorAll(".pwmessageTag");

  //POST newpatient-----------------------

  function createNewPatient() {
    fetch(BASE_URL + `/patients`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(newPatient),
    }).then((res) => {
      if (res.ok) {
        res.json().then((user) => {
          setUser(user.patient);
          localStorage.setItem("role", "patient");
          localStorage.setItem("token", user.token);
        });
      } else {
        res.json().then((err) => {
          setErrors(err.error);
        });
      }
    });
  }

  //Send email------------------------------

  async function sendEmail(e) {
    e.preventDefault();
    if (!isValiedEmail) return requiredField();
    if (newPatient.password !== newPatient.password_confirmation) {
      pwmessageTags[0].textContent = "Password does not match";
      pwmessageTags[0].style.color = "red";
      return;
    }
    await emailjs
      .sendForm(
        "service_dchmott",
        "template_vq1x7nj",
        e.target,
        "user_lKVMUZPYGwUDtHBAdsLEn"
      )
      .then(
        (result) => {
          console.log(result.text);
          setConfirmWindow(!confirmWindow);
        },
        (error) => {
          console.log(error.text);
          for (let i = 0; i < messageTags.length; i++) {
            messageTags[i].innerHTML = "";
          }
        }
      );
    e.target.reset();
  }
  //-----------Supportive functions------------------------------

  function handleAddPatient(e) {
    e.preventDefault();
    if (e.target.name === "password_confirmation") {
      pwmessageTags[0].textContent = "";
    }
    setConfirmationNumber(Math.floor(1000 + Math.random() * 9000));
    let newPatientObj = {
      ...newPatient,
      [e.target.name]: e.target.value,
      role: "patient",
    };
    setNewPatient(newPatientObj);
  }

  
  //handle submit verification
  function handleConfirmation(e) {
    e.preventDefault();
    let enteredconfirmationNumber =
      document.getElementById("confirmNumber").value;
    let sentNumber = parseInt(confirmationNumber);
    let enteredNumber = parseInt(enteredconfirmationNumber);
    let attemptsRemaining = document.getElementById("attemptsRemaining");
    if (sentNumber === enteredNumber) {
      setConfirmWindow(!confirmWindow);
      setConfirmationNumber("");
      createNewPatient();
      history(`/`);
    } else if (attempts.current === 1) {
      setConfirmWindow(!confirmWindow);
      window.location.reload();
    } else {
      setShowErrormsg(true);
      e.target.reset();
      alert("Wrong Number, Please enter confirmation number again");
      attempts.current = attempts.current - 1;
      attemptsRemaining.innerText = attempts.current;
    }
  }
  //handle cancle virification
  function handleCancle(e) {
    e.preventDefault();
    setConfirmWindow(!confirmWindow);
    window.location.reload();
  }
  //-----------form validation-------------------------------------------
  function requiredField() {
    prompt("Please Enter a Valied email Address");
  }

  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  function handleValidity(e) {
    e.preventDefault();

    for (let i = 0; i < allInputs.length; i++) {
      allInputs[i].addEventListener("input", (h) => {
        let str = h.target.value;
        // let regex = /\d/; //check numbers in the input value...

        if (h.target.name === "email") {
          if (h.target.checkValidity() && validateEmail(h.target.value)) {
            handleAddPatient(e);
            messageTags[i].textContent = "Email Address Accepted";
            messageTags[i].style.color = "green";
            setIsValiedEmail(true);
          } else {
            if (str.length > 0) {
              messageTags[i].textContent =
                "Please enter a valied email address";
              messageTags[i].style.color = "#d926cc";
              setIsValiedEmail(false);
            } else {
              messageTags[i].textContent = h.target.validationMessage;
              messageTags[i].style.color = "red";
              setIsValiedEmail(false);
            }
          }
        } else if (h.target.name === "username") {
          if (h.target.checkValidity()) {
            handleAddPatient(e);
            messageTags[i].textContent = "Accepted";
            messageTags[i].style.color = "green";
          } else {
            messageTags[i].textContent = h.target.validationMessage;
            messageTags[i].style.color = "red";
          }
        } else {
          if (!/^[a-zA-Z]*$/g.test(h.target.value)) {
            messageTags[i].textContent = "Invalid characters";
            messageTags[i].style.color = "red";
          } else if (str.length === 0) {
            messageTags[i].textContent = h.target.validationMessage;
            messageTags[i].style.color = "red";
          } else {
            handleAddPatient(e);
            messageTags[i].textContent = "Accepted";
            messageTags[i].style.color = "green";
          }
        }
      });
    }
  }

  //--------------------------------------------------

  return confirmWindow ? (
    <EmailVerificationWindow
      handleConfirmation={handleConfirmation}
      handleCancle={handleCancle}
      showErrormsg={showErrormsg}
    />
  ) : (
    <RegistrationForm
      handleValidity={handleValidity}
      handleAddPatient={handleAddPatient}
      errors={errors}
      sendEmail={sendEmail}
      confirmationNumber={confirmationNumber}
      locations={locations}
      isValiedEmail={isValiedEmail}
    />
  );
}
export default SignUp;
