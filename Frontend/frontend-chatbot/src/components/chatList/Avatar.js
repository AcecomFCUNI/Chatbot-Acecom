import React from "react";

export default function Avatar(props) {
  return (
    <div className="avatar">
      <div className="avatar-img">
        <img src={props.image} alt="#" />
      </div>
      <span className={`isOnline ${props.isOnline}`}></span>
    </div>
  );
}
