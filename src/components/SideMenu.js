import React, { useEffect, useState } from "react";
import logo from "../assets/logo/chatbotAcecom.png";
import logoDark from "../assets/logo/chatbotAcecomDark.png";
import logoComp from "../assets/logo/chatbotAcecomp.png";
import logoCompDark from "../assets/logo/chatbotAcecompDark.png"
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
    message: "Esta interactuando con el tutorial oficial de Tensorflow"
    /*exact: true,
    to: "/",
    iconClassName: "bi bi-speedometer2",*/
  },
  {
    name: "Pytorch",
    image: pytorch,
    message: "Esta interactuando con el tutorial oficial de Pytorch"
    /*exact: true,
    to: `/content`,
    iconClassName: "bi bi-speedometer2",
    subMenus: [
      { name: "Courses", to: "/content/courses" },
      { name: "Videos", to: "/content/videos" },
    ],*/
  },
  {
    name: "BoW",
    image: bow,
    message: "Esta interactuando con un modelo que usa Bag Of Words"
    /*to: `/design`, iconClassName: "bi bi-vector-pen"*/
  },
  {
    name: "DialoGPT",
    image: dialogpt,
    message: "Esta interactuando con DialoGPT-medium-joshua, alojado en HuggingFace"
    /*exact: true,
    to: `/content-2`,
    iconClassName: "bi bi-speedometer2",
    subMenus: [
      { name: "Courses", to: "/content-2/courses" },
      { name: "Videos", to: "/content-2/videos" },
    ],*/
  },
  {
    name: "Blender Bot",
    image: blenderbot,
    message: "Esta interactuando con Blender Bot, el chatbot más avanzado!"
    /*to: `/design-2`, iconClassName: "bi bi-vector-pen"*/
}
];

export let dark = false;
const SideMenu = (props) => {
  const [collapse, setCollapse] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [model, setModel] = useState(null);
  const [message, setMessage] = useState(null);
  //export const dark = darkMode;
  useEffect(() => {
    //if (collapse, darkMode) {
    //  removeActiveClassFromSubMenu();
    //}

    props.onCollapse(collapse, dark);
  }, [collapse, dark]);

  useEffect(() => {
    const indexModel = menuItems.map(e => e.name).indexOf(model);
    if (indexModel !== -1) setMessage(menuItems[indexModel].message);
  }, [model]);

  //just an improvment and it is not recorded in video :(
  const removeActiveClassFromSubMenu = () => {
    document.querySelectorAll(".sub-menu").forEach((el) => {
      el.classList.remove("active");
    });
  };

  /*just a little improvement over click function of menuItem
    Now no need to use expand state variable in MenuItem component
  */
  /* NO TOCAR!!!!!!!*/
  /*useEffect(() => {
    let menuItems = document.querySelectorAll(".menu-item");
    menuItems.forEach((el) => {
      el.addEventListener("click", (e) => {
        const next = el.nextElementSibling;
        removeActiveClassFromSubMenu();
        menuItems.forEach((el) => el.classList.remove("active"));
        el.classList.toggle("active");
        console.log(next);
        if (next !== null) {
          next.classList.toggle("active");
        }
      });
    });
  }, []);*/

  /* parte izquierda */
  return (
    <div className={`${darkMode ? "dark" : ""} side-menu ${collapse ? "inactive" : ""}`}>
      {/* flecha de compresión */}
      <div className="fondo">
        <img src={`${collapse && darkMode ? fondoCompDark : collapse ? fondoComp : darkMode ? fondoDark : fondo}`} alt="fondo" />
      </div>
      <div onClick={() => setCollapse(!collapse)} className="toggle-menu-btn" />
      <div className="top-section">
        {/*logo*/}
        <div className="logo">
          <img src={`${collapse && darkMode ? logoCompDark : collapse ? logoComp : darkMode ? logoDark : logo}`} alt="chatbotAcecom" />
        </div>
        <div className={`${darkMode ? "dark" : ""} main-menu`}>
          <div className="grid-container">
            {menuItems.map((menuItem, index) => (
              <div key={index} className={`${darkMode ? "dark" : ""} grid-item`} onClick={() => setModel(menuItem.name)}>
                <div className="circle" style={{ background: darkMode ? "#132668" : "#112B88" }}>
                  <img alt="model selected" src={menuItem.image} />
                </div> {`${collapse ? "" : menuItem.name}`}
              </div>
            ))}

          </div>
          {collapse ? (
            <div className="switch-container">
              <span style={{ color: darkMode ? "grey" : "white" }}>☀︎ </span>
              <div className="switch-checkbox">
                <label className="switch">
                  <input type="checkbox" onChange={() => { setDarkMode(!darkMode); dark = !darkMode }} alt="switchMode" />
                  <span className={`${darkMode ? "dark" : ""} slider`}> </span>
                </label>
              </div>
            </div>
          ) : (
            <div className="inferior">
              <div className="mensaje">
                <div className="comentarios">
                  <div className={`${darkMode ? "dark" : ""} burbuja`}>
                    {
                      message ? (
                        message
                      ) : (
                        <p>Hola, puedes empezar a interactual con algun chatbot!</p>
                      )
                    }
                  </div>
                </div>
                <div className="switch-container">
                  <span style={{ color: darkMode ? "grey" : "white" }}>☀︎ </span>
                  <div className="switch-checkbox">
                    <label className="switch">
                      <input type="checkbox" onChange={() => { setDarkMode(!darkMode); dark = !darkMode }} />
                      <span className={`${darkMode ? "dark" : ""} slider`}> </span>
                    </label>
                  </div>
                </div>
                <div className="lemur">
                  <img src={lemur} alt="lemur"/>
                </div>
              </div>
              <div className="lemur">
                <img src={lemur} alt="lemur" />
              </div>
            </div>
          )}


          {/*
          <ul>
            {menuItems.map((menuItem, index) => (
              <MenuItem
                /*key={index}*/
                /*name={menuItem.name}*/
                /*exact={menuItem.exact}
                to={menuItem.to}
                subMenus={menuItem.subMenus || []}
                iconClassName={menuItem.iconClassName}
                onClick={(e) => {
                  if (collapse) {
                    setCollapse(false);
                  }
                }} 
              />
            ))}

            {/*} <li>
              <a className="menu-item">
                <div className="menu-icon">
                  <i class="bi bi-speedometer2"></i>
                </div>
                <span>Dashboard</span>
              </a>
            </li>
            <MenuItem
              name={"Content"}
              subMenus={[{ name: "Courses" }, { name: "Videos" }]}
              />*/}
          {/*<li>
              <a className="menu-item">
                <div className="menu-icon">
                  <i class="bi bi-vector-pen"></i>
                </div>
                <span>Design</span>
              </a>
            </li> 
          </ul>*/}
        </div>
      </div>
    </div>
  );
};
export default SideMenu;