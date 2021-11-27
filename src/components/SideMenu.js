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
import MenuItem from "./MenuItem";


// added more menuItems for testing
export const menuItems = [
  {
    name: "Modelo 1",
    /*exact: true,
    to: "/",
    iconClassName: "bi bi-speedometer2",*/
  },
  {
    name: "Modelo 2",
    /*exact: true,
    to: `/content`,
    iconClassName: "bi bi-speedometer2",
    subMenus: [
      { name: "Courses", to: "/content/courses" },
      { name: "Videos", to: "/content/videos" },
    ],*/
  },
  { name: "Modelo 3", /*to: `/design`, iconClassName: "bi bi-vector-pen"*/ },
  {
    name: "Modelo 4",
    /*exact: true,
    to: `/content-2`,
    iconClassName: "bi bi-speedometer2",
    subMenus: [
      { name: "Courses", to: "/content-2/courses" },
      { name: "Videos", to: "/content-2/videos" },
    ],*/
  },
  { name: "Modelo 5", /*to: `/design-2`, iconClassName: "bi bi-vector-pen"*/ },
  { name: "Modelo 6", /*to: `/design-3`, iconClassName: "bi bi-vector-pen"*/ },
  { name: "Design 4", /*to: `/design-4`, iconClassName: "bi bi-vector-pen"*/ },
];

export let dark = false;
const SideMenu = (props) => {
  const [inactive, setInactive] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  //export const dark = darkMode;
  useEffect(() => {
    //if (inactive, darkMode) {
    //  removeActiveClassFromSubMenu();
    //}

    props.onCollapse(inactive, dark);
  }, [inactive, dark]);

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
    <div className={`${darkMode ? "dark" : ""} side-menu ${inactive ? "inactive" : ""}`}>
      {/* flecha de compresión */}
      <div className="fondo">
        <img src={`${inactive && darkMode ? fondoCompDark : inactive ? fondoComp : darkMode ? fondoDark : fondo}`} alt="fondo"/>
      </div>
      <div onClick={() => setInactive(!inactive)} className="toggle-menu-btn">
        {/*inactive ? (
          <i class="bi bi-arrow-right-square-fill"></i>
        ) : (
          <i className="" ></i>
        )*/}
      </div>
      <div className="top-section">
        {/*logo*/}
        <div className="logo">
          <img src={`${inactive && darkMode ? logoCompDark : inactive ? logoComp : darkMode ? logoDark : logo}`} alt="chatbotAcecom"/>
        </div>
      </div>

      {/* <div className="search-controller">
        <button className="search-btn">
          <i class="bi bi-search"></i>
        </button>

        <input type="text" placeholder="search" />
      </div>

      <div className="divider"></div> */}

      <div className={`${darkMode ? "dark" : ""} main-menu`}>
        <div className="grid-container">
          <div className={`${darkMode ? "dark" : ""} grid-item`}>
              <div className="circle"></div> {`${inactive ? "" : "Modelo 1"}` }
          </div>
          <div className={`${darkMode ? "dark" : ""} grid-item`}>
              <div className="circle"></div> {`${inactive ? "" : "Modelo 2"}` }
          </div>
          <div className={`${darkMode ? "dark" : ""} grid-item`}>
              <div className="circle"></div> {`${inactive ? "" : "Modelo 3"}` }
          </div>  
          <div className={`${darkMode ? "dark" : ""} grid-item`}>
              <div className="circle"></div> {`${inactive ? "" : "Modelo 4"}` }
          </div>
          <div className={`${darkMode ? "dark" : ""} grid-item`}>
              <div className="circle"></div> {`${inactive ? "" : "Modelo 5"}` }
          </div>
        </div>
        {inactive? (
          <div className="switch-container">
            <span style={{ color: darkMode ? "grey" : "white" }}>☀︎ </span>
            <div className="switch-checkbox">
              <label className="switch">
                <input type="checkbox" onChange={() => {setDarkMode(!darkMode); dark = !darkMode}} alt="switchMode"/>
                <span className={`${darkMode ? "dark" : ""} slider`}> </span>
              </label>
            </div>
            <span style={{ color: darkMode ? "white" : "grey" }}> ☽</span>
          </div>
        ) : (
          <div className="inferior">
            <div className="mensaje">
              <div className="comentarios">
                <div className={`${darkMode ? "dark" : ""} burbuja`}>
                  <p>Lorem ipsum dolor sit amet.</p>
                </div>
              </div>
              <div className="switch-container">
                <span style={{ color: darkMode ? "grey" : "white" }}>☀︎ </span>
                <div className="switch-checkbox">
                  <label className="switch">
                    <input type="checkbox" onChange={() => {setDarkMode(!darkMode); dark = !darkMode}}/>
                    <span className={`${darkMode ? "dark" : ""} slider`}> </span>
                  </label>
                </div>
                <span style={{ color: darkMode ? "white" : "grey" }}> ☽</span>
              </div>
            </div>
            <div className="lemur">
              <img src={lemur} alt="lemur"/>
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
                if (inactive) {
                  setInactive(false);
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
      {/*
      <div className="side-menu-footer">
        <div className="avatar">
          <img src={user} alt="user" />
        </div>
        <div className="user-info">
          <h5>Rizwan Khan</h5>
          <p>rizwankhan@gmail.com</p>
        </div>
      </div>*/}
    </div>
  );
};
export default SideMenu;