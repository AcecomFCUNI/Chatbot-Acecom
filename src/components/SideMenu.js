import React, { useEffect, useState } from "react";
import logo from "../assets/logo/chatbotAcecom.png";
import logoDark from "../assets/logo/chatbotAcecomDark.png";
import logoComp from "../assets/logo/chatbotAcecomp.png";
import logoCompDark from "../assets/logo/chatbotAcecompDark.png";
import fondo from "../assets/fondo.png";
import fondoDark from "../assets/fondoDark.png";
import fondoComp from "../assets/fondoComp.png";
import fondoCompDark from "../assets/fondoCompDark.png";
import lemur from "../assets/lemur.png";
import tensorflow from "../assets/tensorflow.png";
import pytorch from "../assets/pytorch.png";
import dialogpt from "../assets/dialogpt.png";
import bow from "../assets/bow.png";
import blenderbot from "../assets/blenderbot.png";

const menuItems = [
  {
    name: "Tensorflow",
    image: tensorflow,
    message: "Esta interactuando con el tutorial oficial de Tensorflow",
    selected: false,
  },
  {
    name: "Pytorch",
    image: pytorch,
    message: "Esta interactuando con el tutorial oficial de Pytorch",
    selected: false,
  },
  {
    name: "BoW",
    image: bow,
    message: "Esta interactuando con un modelo que usa Bag Of Words",
    selected: false,
  },
  {
    name: "DialoGPT",
    image: dialogpt,
    message:
      "Esta interactuando con DialoGPT-medium-joshua, alojado en HuggingFace",
    selected: false,
  },
  {
    name: "Blender Bot",
    image: blenderbot,
    message: "Esta interactuando con Blender Bot, el chatbot más avanzado!",
    selected: false,
  },
];

const SideMenu = (props) => {
  const { changeDarkMode, changeInactive, darkMode, inactive } = props;

  const [modelName, setModelName] = useState(null);
  const [message, setMessage] = useState(null);

  useEffect(() => {
    const indexModel = menuItems.map((e) => e.name).indexOf(modelName);
    if (indexModel !== -1) setMessage(menuItems[indexModel].message);
  }, [modelName]);

  let selectModelChat = (e) => {
    for (
      let index = 0;
      index < e.currentTarget.parentNode.children.length;
      index++
    ) {
      e.currentTarget.parentNode.children[index].classList.remove("active");
    }
    e.currentTarget.classList.add("active");
  };

  /* parte izquierda */
  return (
    <div
      className={`${darkMode ? "dark" : ""} side-menu ${
        inactive ? "inactive" : ""
      }`}
    >
      {/* flecha de compresión */}
      <div className="fondo">
        <img
          src={`${
            inactive && darkMode
              ? fondoCompDark
              : inactive
              ? fondoComp
              : darkMode
              ? fondoDark
              : fondo
          }`}
          alt="fondo"
        />
      </div>
      <div
        onClick={() => changeInactive(!inactive)}
        className="toggle-menu-btn"
      />
      <div className="top-section">
        {/*logo*/}
        <div className="logo">
          <img
            src={`${
              inactive && darkMode
                ? logoCompDark
                : inactive
                ? logoComp
                : darkMode
                ? logoDark
                : logo
            }`}
            alt="chatbotAcecom"
          />
        </div>
        <div className={`${darkMode ? "dark" : ""} main-menu`}>
          <div className="grid-container">
            {menuItems.map((menuItem, index) => (
              <div
                key={index}
                className={`${darkMode ? "dark" : ""} grid-item ${
                  menuItems[index].selected ? "active" : ""
                }`}
                onClick={(e) => {
                  setModelName(menuItem.name);
                  selectModelChat(e);
                  menuItems.forEach((element) => {
                    element.selected = false;
                  });
                  menuItems[index].selected = true;
                }}
              >
                <div
                  className="circle"
                  style={{ background: darkMode ? "#132668" : "#112B88" }}
                >
                  <img alt="model selected" src={menuItem.image} />
                </div>{" "}
                {`${inactive ? "" : menuItem.name}`}
              </div>
            ))}
          </div>
          {inactive ? (
            <div className="switch-container">
              <span style={{ color: darkMode ? "grey" : "white" }}>☀︎ </span>
              <div className="switch-checkbox">
                <label className="switch">
                  <input
                    type="checkbox"
                    onChange={() => {
                      changeDarkMode(!darkMode);
                    }}
                    alt="switchMode"
                  />
                  <span className={`${darkMode ? "dark" : ""} slider`}> </span>
                </label>
              </div>
            </div>
          ) : (
            <div className="inferior">
              <div className="mensaje">
                <div className="comentarios">
                  <div className={`${darkMode ? "dark" : ""} burbuja`}>
                    {message ? (
                      message
                    ) : (
                      <p>
                        Hola, puedes empezar a interactual con algun chatbot!
                      </p>
                    )}
                  </div>
                </div>
                <div className="switch-container">
                  <span style={{ color: darkMode ? "grey" : "white" }}>
                    ☀︎{" "}
                  </span>
                  <div className="switch-checkbox">
                    <label className="switch">
                      <input
                        type="checkbox"
                        onChange={() => {
                          changeDarkMode(!darkMode);
                        }}
                      />
                      <span className={`${darkMode ? "dark" : ""} slider`}>
                        {" "}
                      </span>
                    </label>
                  </div>
                </div>
              </div>
              <div className="lemur">
                <img src={lemur} alt="lemur" />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
export default SideMenu;
