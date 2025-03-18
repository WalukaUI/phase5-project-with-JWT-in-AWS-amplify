import React from "react";
import "./Comments.css"

function Comments() {

  return (
    <div>
      <div className="row commentDiv">
        <div className="col col-sm-12 col-md-6 mapDiv">
          <div>
            <h3>google Map</h3>
          </div>
        </div>
        <div className="col col-sm-12 col-md-6 commentInnerDiv">
        
          {comments
            ? comments.map((comment) => (
                <div key={comment.id}>
               <div className="row commentDetails">
                  <div  className="col col-sm-6 col-md-4 commentImage">
                    <img src="https://icon-library.com/images/image-icon/image-icon-16.jpg" alt="comment"/>
                    <div className="vl"></div>
                  </div>
                  <div  className="col col-sm-12 col-md-4 commentAddress">
                    <h6>{comment.name}</h6>
                    <p>{comment.address_line_one}</p>
                    <p>{comment.address_line_two}</p>
                    <span>{comment.city} ,</span>
                    <span>{comment.zipcode}</span>
                  </div>
                  <div  className="col col-sm-12 col-md-4 commentContactDetls">
                    <p>Tel. : {comment.contact_number}</p>
                  </div>
                </div>
                </div>
              ))
            : ""}
              
        </div>
      </div>
    </div>
  );
}

export default Comments;
