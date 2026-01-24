import React from "react";
import "./Loading.css";

function CardLoadAnimation() {
  return (
    <div>
      <div className="card is-loading animatedCard">
        <div className="aniCardcontent">
          <div>
            <img className="loadingImg" alt=""/>
          </div>
          <div className="lodetextDiv">
            <h2 className="cardH2">{}</h2>
            <p className="cardP">It is pritty slooowwwww huh, It will take 90 seconds to load.</p>
          </div>
        </div>
      </div>
      <div className="card is-loading animatedCard">
        <div className="aniCardcontent">
          <div>
            <img className="loadingImg" alt=""/>
          </div>
          <div className="lodetextDiv">
            <h2 className="cardH2">{}</h2>
            <p className="cardP">Backend has been hosted on render.com</p>
          </div>
        </div>
      </div>
      <div className="card is-loading animatedCard">
        <div className="aniCardcontent">
          <div>
            <img className="loadingImg" alt="" />
          </div>
          <div className="lodetextDiv">
            <h2 className="cardH2">{}</h2>
            <p className="cardP">Here is what Render.com Says</p>
          </div>
        </div>
      </div>
      <div className="card is-loading animatedCard">
        <div className="aniCardcontent">
          <div>
            <img className="loadingImg" alt=""/>
          </div>
          <div className="lodetextDiv">
            <h2 className="cardH2">{}</h2>
            <p className="cardP">---"This can cause a response delay of up to 30 seconds for the first request that comes in after a period of inactivity"---</p>
          </div>
        </div>
      </div>
    </div>
  );
}
export default CardLoadAnimation;
