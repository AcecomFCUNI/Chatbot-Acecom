import React from "react";
import moment from "moment";
import "moment/locale/es";

moment.locale("es");

export default function ChatItem(props) {
  const { darkMode } = props;
  if (props.user === "other") {
    return (
      <div
        style={{ animationDelay: `0.8s` }}
        className={`chat__item ${props.user ? props.user : ""}`}
      >
        <div className="chat__meta">
          <div className={`${darkMode ? "dark" : ""} chat__item__content`}>
            <div className="chat__msg">{props.msg}</div>
          </div>
          <div
            className={`${
              darkMode ? "dark" : ""
            } chat__item__content_time_other`}
          >
            {moment(props.timecreate).fromNow()}
          </div>
        </div>
        <div className={`${darkMode ? "dark" : ""} avatar`}>
          <img alt="bot" src={props.image} />
        </div>
      </div>
    );
  } else {
    return (
      <div
        style={{ animationDelay: `0.8s` }}
        className={`chat__item ${props.user ? props.user : ""}`}
      >
        <div className="chat__meta">
          <div className={`${darkMode ? "dark" : ""} chat__item__content`}>
            <div className="chat__msg">{props.msg}</div>
          </div>
          <div className={`${darkMode ? "dark" : ""} chat__item__content_time`}>
            {moment(props.timecreate).fromNow()}
          </div>
        </div>
      </div>
    );
  }
}
