import React from "react";
import "./SignUp.css";
import "./Spinner.css";

export default function EmailVerificationWindow({
  handleConfirmation,
  handleCancle,
  showErrormsg,
}) {
  return (
    <div className="popupbox">
      <div className="popupinner">
        <div className="confirmNumDiv">
          <form onSubmit={handleConfirmation}>
            <div className="form-group">
              <h4>Please confirm your email </h4>
              <hr />
              <p>
                Please check your emails.
                <br />
                We have sent you a <strong>Confirmation number</strong> to your
                email address
              </p>
              <br />
              <hr />
              <label>
                Enter confirmation number :
                <input id="confirmNumber" defaultValue="" />
              </label>

              <div className="spinner">
                <div class="lds-spinner">
                  <div></div>
                  <div></div>
                  <div></div>
                  <div></div>
                  <div></div>
                  <div></div>
                  <div></div>
                  <div></div>
                  <div></div>
                  <div></div>
                  <div></div>
                  <div></div>
                </div>
              </div>

              <div>
                <p>
                  You have{" "}
                  <span
                    id="attemptsRemaining"
                    style={{ fontSize: "1.5rem", color: "red" }}
                  >
                    3
                  </span>{" "}
                  attempts to enter correct number.
                </p>
                <button type="submit" className="btn btn-success formSubBtn">
                  Confirm
                </button>
                <button
                  className="btn btn-warning formSubBtn"
                  onClick={handleCancle}
                >
                  Cancel
                </button>
              </div>
            </div>
          </form>
        </div>
        {showErrormsg ? (
          <div style={{ textAlign: "center", marginTop: "5%", color: "red" }}>
            <p>Invalied cofimation Number.</p>
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}
