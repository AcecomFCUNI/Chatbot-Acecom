import React, { useState, createRef, useEffect } from "react";
import LinearProgress from '@mui/material/LinearProgress';

import botAcecom from "../../assets/botAcecom.png"
import "./chatContent.css";
import ChatItem from "./ChatItem";
import { dark } from "../SideMenu";

const URL = "https://chatbot-acecom.herokuapp.com/nlp"; //"http://localhost:8000/nlp";



let chatItms = [
  {
    key: 1,
    image: botAcecom,
    type: "other",
    msg: "Hola, comencemos con nuestra conversación!",
    timecreate: new Date()
  }
];


export default function ChatContent(props) {
  let messagesEndRef = createRef(null);

  const [state, setState] = useState({ chat: chatItms, msg: "" });
  const [darkMode, setDarkMode] = useState(dark);
  let [loading, setLoading] = useState(false);

  useEffect(() => {
    props.onCollapse(darkMode);
    setDarkMode(dark)
  }, [dark]);

  useEffect(() => {
    scrollToBottom();
  }, [state.chat])

  let scrollToBottom = () => {
    messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
  };

  let handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      dialogProcess();
    }
  }

  let onStateChange = (e) => {
    setState({ ...state, msg: e.target.value });
  };

  let executeQuery = async () => {
    let payload = {
      modelId: "3",
      query: state.msg,
    };
    const response = await fetch(URL, {
      method: "POST",
      mode: "cors",
      cache: "no-cache",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": "true"
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
      timecreate: new Date()
    });
    setState({ msg: "", chat: [...chatItms] });
    setLoading(true);

    executeQuery()
      .then((response) => {
        chatItms.push({
          key: chatItms.length + 1,
          type: "other",
          msg: response.data,
          image: botAcecom,
          timecreate: new Date()
        });
        setState({ msg: "", chat: [...chatItms] });
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="main__chatcontent">
      {
            loading ? (
              <LinearProgress />
            ) :
              (
                ''
              )
          }
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
                  onCollapse={(dark) => {
                    console.log(dark);
                    //setDarkMode(dark);
                  }}
                />
              );
            }
            else {
              return (
                <ChatItem
                  animationDelay={index + 2}
                  key={itm.key}
                  user={itm.type}
                  msg={itm.msg}
                  timecreate={itm.timecreate}
                  onCollapse={(dark) => {
                    console.log(dark);
                    //setDarkMode(dark);
                  }}
                />
              );
            }

          })}
          <div ref={messagesEndRef} />
        </div>
      </div>
      <div className="content__footer">
        <div className={`${dark ? "dark" : ""} sendNewMessage`}>
          <input
            type="text"
            placeholder="Escribir mensaje aquí"
            onChange={onStateChange}
            onKeyDown={handleKeyDown}
            value={state.msg}
          />
          <button className="btnSendMsg" onClick={dialogProcess}>
            <i className="fa fa-paper-plane"><div id="triangulo" /></i>
          </button>
        </div>
      </div>
    </div>
  );
}
