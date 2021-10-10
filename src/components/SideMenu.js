import React, { useEffect, useState } from "react";
import logo from "../assets/logo/webscript.png";
import user from "../assets/user.jpg";

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

const SideMenu = (props) => {
  const [inactive, setInactive] = useState(false);

  useEffect(() => {
    if (inactive) {
      removeActiveClassFromSubMenu();
    }

    props.onCollapse(inactive);
  }, [inactive]);

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
  useEffect(() => {
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
  }, []);

  /* parte izquierda */
  return (
    <div className={`side-menu ${inactive ? "inactive" : ""}`}>
      <div className="top-section">
        {/*logo*/}
        <div className="logo">
          <img src={logo} alt="webscript" />
        </div>
        {/* flecha de compresión */}
        <div onClick={() => setInactive(!inactive)} className="toggle-menu-btn">
          {inactive ? (
            <i class="bi bi-arrow-right-square-fill"></i>
          ) : (
            <i className="" ></i>
          )}
        </div>
      </div>

      {/* <div className="search-controller">
        <button className="search-btn">
          <i class="bi bi-search"></i>
        </button>

        <input type="text" placeholder="search" />
      </div>

      <div className="divider"></div> */}

      <div className="main-menu">
        <div class="grid-container">
          <div class="grid-item">
              <div class="circle"></div> Modelo 1 
          </div>
          <div class="grid-item">
              <div class="circle"></div> Modelo 2 
          </div>
          <div class="grid-item">
              <div class="circle"></div> Modelo 3 
          </div>  
          <div class="grid-item">
              <div class="circle"></div> Modelo 4 
          </div>
          <div class="grid-item">
              <div class="circle"></div> Modelo 5 
          </div>
          <div class="grid-item">
              <div class="circle"></div> Modelo 6 
          </div>  
      </div>
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
              }} */
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
          </li> */}
        </ul>
      </div>

      <div className="side-menu-footer">
        <div className="avatar">
          <img src={user} alt="user" />
        </div>
        <div className="user-info">
          <h5>Rizwan Khan</h5>
          <p>rizwankhan@gmail.com</p>
        </div>
      </div>
    </div>
  );
};

export default SideMenu;
