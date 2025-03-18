import React, { useState } from "react";
import Carousel from "./Carousel";
import "./Locations.css";
import CardLoadAnimation from "../Doctors/DocCardLoading";


function Locations({ locations }) {
  const [searchTearm, setSearchTearm] = useState("");
  const mapdiv = false;

  //supportive functions---------------------

  function activateSearch(e) {
    e.preventDefault();
    setSearchTearm(e.target.value);
  }
  return (
    <div>
      <div className="row locationDiv">
        <div className="col col-sm-12 col-md-6 mapDiv">
          <div style={{ position: "sticky", top: "0" }}>

              <Carousel />
            
          </div>
        </div>
        <div className="col col-sm-12 col-md-6 locationInnerDiv">
          <div className="serchLocation">
            <form>
              <input
                type="text"
                className="form-control"
                placeholder="Search Location by City Name"
                onChange={activateSearch}
              />
            </form>
          </div>
          {locations
            ? locations
                .filter((card) =>
                  card.name.toLowerCase().includes(searchTearm.toLowerCase())
                )
                .map((location) => (
                  <div
                    key={location.id}
                    className="locationCard"
                  >
                    <div className="row locationDetails">
                      <div className="col col-sm-12 col-md-4 locationImage">
                        <img src={location.image} alt="location" />
                        <div className="vl"></div>
                      </div>
                      <div className="col col-sm-6 col-md-4 locationAddress">
                        <h6>{location.name}</h6>
                        <p>{location.address_line_one}</p>
                        <p>{location.address_line_two}</p>
                        <span>{location.city} ,</span>
                        <span>{location.zipcode}</span>
                      </div>
                      <div className="col col-sm-6 col-md-4 locationContactDetls">
                        <p>Tel. : {location.contact_number}</p>
                        {!mapdiv ? (
                          <img
                            src="./taphere.gif"
                            alt="touch"
                            style={{ width: "40%" }}
                          />
                        ) : null}
                      </div>
                    </div>
                  </div>
                ))
            : <CardLoadAnimation/>}
        </div>
      </div>
    </div>
  );
}

export default Locations;
