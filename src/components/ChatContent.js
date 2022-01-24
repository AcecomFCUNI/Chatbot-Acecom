import React, { useState, createRef, useEffect } from "react";
import LinearProgress from "@mui/material/LinearProgress";

import botAcecom from "../assets/botAcecom.png";
import ChatItem from "./ChatItem";
import { HEROKU_BACKEND, LOCAL_BACKEND } from "./../config";

let chatItms = [
  {
    key: 1,
    image: botAcecom,
    type: "other",
    msg: "Hola, comencemos con nuestra conversación!",
    timecreate: new Date(),
  },
];

export default function ChatContent(props) {
  const { darkMode, modelId } = props;
  let messagesEndRef = createRef(null);

  const [state, setState] = useState({ chat: chatItms, msg: "" });
  let [loading, setLoading] = useState(false);

  useEffect(() => {
    // scrollToBottom
    messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
  }, [state.chat, messagesEndRef]);

  let handleKeyDown = (event) => {
    if (event.key === "Enter") {
      dialogProcess();
    }
  };

  let onStateChange = (e) => {
    setState({ ...state, msg: e.target.value });
  };

  let executeQuery = async () => {
    let payload = {
      modelId,
      query: state.msg,
    };
    const response = await fetch(HEROKU_BACKEND + "nlp", {
      method: "POST",
      mode: "cors",
      cache: "no-cache",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": "true",
      },
      body: JSON.stringify(payload),
    });
    return response.json();
  };

  let dialogProcess = () => {
    chatItms.push({
      key: chatItms.length + 1,
      type: "",
      msg: state.msg,
      image: "",
      timecreate: new Date(),
    });
    setState({ msg: "", chat: [...chatItms] });

    if (modelId) {
      setLoading(true);

      executeQuery()
        .then((response) => {
          chatItms.push({
            key: chatItms.length + 1,
            type: "other",
            msg: response.data,
            image: botAcecom,
            timecreate: new Date(),
          });
          setState({ msg: "", chat: [...chatItms] });
          setLoading(false);
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      chatItms.push({
        key: chatItms.length + 1,
        type: "other",
        msg: "Necesita seleccionar un modelo!!",
        image: botAcecom,
        timecreate: new Date(),
      });
      setState({ msg: "", chat: [...chatItms] });
    }
  };

  return (
    <div className="main__chatcontent">
      {loading ? <LinearProgress /> : ""}
      <div className="content__body">
        <div className="chat__items">
          {state.chat.map((itm, index) => {
            if (itm.type === "other") {
              return (
                <ChatItem
                  animationDelay={index + 2}
                  key={itm.key}
                  user={itm.type}
                  msg={itm.msg}
                  timecreate={itm.timecreate}
                  image={itm.image}
                  darkMode={darkMode}
                />
              );
            } else {
              return (
                <ChatItem
                  animationDelay={index + 2}
                  key={itm.key}
                  user={itm.type}
                  msg={itm.msg}
                  timecreate={itm.timecreate}
                  darkMode={darkMode}
                />
              );
            }
          })}
          <div ref={messagesEndRef} />
        </div>
      </div>
      <div className="content__footer">
        <div className={`${darkMode ? "dark" : ""} sendNewMessage`}>
          <input
            type="text"
            placeholder="Escribir mensaje aquí"
            onChange={onStateChange}
            onKeyDown={handleKeyDown}
            value={state.msg}
          />
          <button className="btnSendMsg" onClick={dialogProcess}>
            <i className="fa fa-paper-plane">
              <div id="triangulo" />
            </i>
          </button>
        </div>
      </div>
    </div>
  );
}
