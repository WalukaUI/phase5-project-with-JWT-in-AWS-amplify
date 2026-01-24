import React from "react";
import "./Covid19.css";
import {
   Link
  } from "react-router-dom";

function CovidHomePage() {
  return (
    <>
      <div className="conditions">
          <div>
        <ul>
          <li>
            All patients are required to wear face masks, when clinically
            feasible and appropriate, throughout their hospitalization,
            including in patient rooms when others are present and while outside
            of patient rooms (e.g., radiology, hallway, during transport to
            procedure, etc.) per the MedStar Health Universal Masking Protocol.
          </li>
          <li>
            All visitors, professional support persons, clergies, and support
            persons for patients with disabilities:
            <ul>
              <li>
                Must check in at the front desk and wear a face mask throughout
                the duration of their visit (gaiters and face masks with an
                exhalation valve are not permitted). They are expected to bring
                their own face mask. If they do not have one, a face mask will
                be provided.
              </li>
              <li>
                Will be screened for a history of COVID-19 and for COVID-like
                symptoms, such as fever, cough, shortness of breath, sore
                throat, sudden loss of taste or smell, vomiting or diarrhea..
                <ul>
                A visitor with a history of COVID-19 may be permitted if asymptomatic or symptoms have improved:
                 <li>10 days after positive COVID-19 test collection date if visitor did not require hospitalization.</li>
                 <li>20 days after positive COVID-19 test collection date if visitor required hospitalization</li>
                </ul>
              </li>

            </ul>
          </li>
          <li>
          Must follow proper infection prevention practices, including masking, hand hygiene, and physical distancing and other PPE if applicable. Visitor vaccination status does 
          not impact these requirements or this policy in any way.
          </li>
          <li>
          Approved visitors, professional support persons, and support persons for patients with disabilities for Patients with Confirmed COVID-19 or Persons Under Investigation (PUI) must don Personal Protective Equipment (PPE) provided by the hospitals—procedure mask, isolation gown, goggles or face shield 
          (eye protection), and gloves; and must not be ill or show symptoms of illness.
          </li>
          <li>
          End of life is defined as death is anticipated within hours to days. This policy remains in effect if the end-of-life period extends after the first end of life visit. End-of-life visitors may be anyone identified by the patient or patient’s surrogate to include children under the age of 18, who will be accompanied and supervised by an adult.
          </li>
        </ul>
        
      </div>
      <Link className="btn btn-success" to="/" style={{width: "150px", marginBottom: "20px"}}>Accept</Link>
      </div>
    </>
  );
}

export default CovidHomePage;
