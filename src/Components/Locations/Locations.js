import React, { useState } from "react";
import Carousel from "./Carousel";
import {APIProvider, Map, AdvancedMarker, InfoWindow, useAdvancedMarkerRef} from '@vis.gl/react-google-maps';
import "./Locations.css";
import CardLoadAnimation from "../Doctors/DocCardLoading";
import logo from './hospital logo.png';

function Locations({ locations }) {
  const [searchTearm, setSearchTearm] = useState("");
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [mapdiv, setmapdiv] = useState(false);
  const [markerRef, marker] = useAdvancedMarkerRef();
  //supportive functions---------------------

  function activateSearch(e) {
    e.preventDefault();
    setSearchTearm(e.target.value);
  }

  function mouseOverAction(e) {
    setSelectedPlace(e);
    console.log(selectedPlace);
    
    if (mapdiv !== true) {
      setmapdiv(true);
    }
  }

  return (
    <div>
      <div className="row locationDiv">
        <div className="col col-sm-12 col-md-6 mapDiv">
          <div style={{ position: "sticky", top: "0"}}>
              {mapdiv?
                    <APIProvider apiKey={process.env.REACT_APP_GMAPKEY}>
                      <Map
                        style={{width: '50vw', height: '100vh'}}
                        mapId="1256"
                        defaultCenter={{lat: 38.63217176910362, lng: -90.19383204054196 }}
                        defaultZoom={10}
                        gestureHandling={'greedy'}
                        disableDefaultUI={true}
                        zoomControl={true}
                        >
                          {locations?.map((card)=>(
                          <AdvancedMarker 
                          position={{ lat: card.latitude, lng: card.longitude }} 
                          onClick={() => setSelectedPlace(card)}
                          ><img src={logo} width={32} height={32} />
                            </AdvancedMarker>
                          ))}
                                  <InfoWindow position={{ lat: selectedPlace.latitude, lng: selectedPlace.longitude }} >
                                  <h6>{selectedPlace.address_line_two} </h6><br/><br/>
                                  {selectedPlace.contact_number}
                                </InfoWindow>
                        
                      </Map>

                    </APIProvider>
              :<Carousel />}
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
                    onMouseOver={() => mouseOverAction(location)}
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
