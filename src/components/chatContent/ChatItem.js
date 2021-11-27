import React from "react";
import Avatar from "../chatList/Avatar";
import { dark } from "../SideMenu";

export default function ChatItem(props) {

  if (props.user == "other"){
    return (
      <div
        style={{ animationDelay: `0.8s` }}
        className={`chat__item ${props.user ? props.user : ""}`}
      >
        <div className="chat__meta">
          <div className={`${dark ? "dark" : ""} chat__item__content`}>
            <div className="chat__msg">{props.msg}</div>
          </div>
          <div className={`${dark ? "dark" : ""} chat__item__content_time_other`}>16 mins ago</div>  
        </div>
        <div className={`${dark ? "dark" : ""} avatar`}>
          <img src={props.image}/>
        </div>
      </div>
    );
  }
  else {
    return (
      <div
        style={{ animationDelay: `0.8s` }}
        className={`chat__item ${props.user ? props.user : ""}`}
      >
        <div className="chat__meta">
          <div className={`${dark ? "dark" : ""} chat__item__content`}>
            <div className="chat__msg">{props.msg}</div>
          </div>
          <div className={`${dark ? "dark" : ""} chat__item__content_time`}>16 mins ago</div>  
        </div>
      </div>
    );
  }
}
