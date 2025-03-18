import React , { useEffect, useState }from "react";
import {
  Link
 } from "react-router-dom";
import "./Covid19.css"

function CovidInfoByState() {
  const [data, setData] = useState(null);
  const [state, setState]=useState(null)

  useEffect(() => {
    fetch("https://api.covidtracking.com/v1/states/current.json").then((res) => {
      if (res.ok) {
        res.json().then((data) => {
          setData(data);
        });
      } else {
        alert("fetching failed");
      }
    });
  }, []);

  function handleState(e) {
    e.preventDefault()
    setState(e.target.value === "All" ? null : e.target.value)
  }


  if (data === null) return null;
  return (
    <>
    <div style={{paddingTop: "10px", display: "flex", justifyContent: "right"}}>
      <Link className="btn btn-danger" to="/" style={{width: "150px"}}>Close</Link>
      </div>

    <div style={{backgroundColor: "#faebd7"}}>
      <h5 className="covidh5">Check covid status by State</h5>
      <label style={{margin: "5vh"}}>Select State
      <select
        className="form-select"
        name="state"
        aria-label="Default select example"
        onChange={handleState}
      >
         <option value="All">All States</option>
        {data.map((card) => (
          <option value={card.state} key={card.hash}>
            {card.state}
          </option>
        ))}
      </select></label>
      
      <div>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">State</th>
              <th scope="col">Total Tests</th>
              <th scope="col">Negative Results</th>
              <th scope="col">Positive Results</th>
              <th scope="col">Total Hospitalized</th>
              <th scope="col">Total Deaths</th>
            </tr>
          </thead>
          <tbody>
          {data.filter((card)=> state !== null ? card.state === state: card ).map((card)=>{
              return  <tr key ={card.hash}>
              <th style={{textAlign: "left", paddingLeft: "20px"}}>{card.state}</th>
              <td>{card.totalTestResults}</td>
              <td>{card.negativeTestsViral}</td>
              <td>{card.positive}</td>
              <td>{card.hospitalized}</td>
              <td>{card.death}</td>
            </tr>
            })}
          </tbody>
        </table>
      </div>
      </div>
    </>
  );
}

export default CovidInfoByState;
