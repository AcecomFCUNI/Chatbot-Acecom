import React, { useState } from "react";
import "./App.css";
import ChatBody from "./components/chatBody/ChatBody";
import SideMenu, { dark } from "./components/SideMenu";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {
  const [inactive, setInactive] = useState(false);
  const [_, setDarkMode] = useState(dark);
  return (
    <div className={`${dark ? "dark" : ""} __main`}>
      <Router>
        <SideMenu
          onCollapse={(inactive, dark) => {
            console.log(inactive);
            setInactive(inactive);
            console.log(dark);
            setDarkMode(dark);
          }}
        />
        <div className={`container ${inactive ? "inactive" : ""}`}>

          {/*menuItems.map((menu, index) => (
            <>
              <Route key={menu.name} exact={menu.exact} path={menu.to}>
                <h1>{menu.name}</h1>
              </Route>
              {menu.subMenus && menu.subMenus.length > 0
                ? menu.subMenus.map((subMenu, i) => (
                    <Route key={subMenu.name} path={subMenu.to}>
                      <h1>{subMenu.name}</h1>
                    </Route>
                  ))
                : null}
            </>
                ))*/}

          {/* <Switch>
            <Route exact path={"/"}>
              <Dashboard />
            </Route>
            <Route exact path={"/content"}>
              <Content />
            </Route>
            <Route path={"/content/courses"}>
              <Courses />
            </Route>
            <Route path={"/content/videos"}>
              <Videos />
            </Route>
            <Route path={"/design"}>
              <Design />
            </Route>
            <Route exact path={"/content-2"}>
              <Content2 />
            </Route>
            <Route path={"/content-2/courses"}>
              <Courses2 />
            </Route>
            <Route path={"/content-2/videos"}>
              <Videos2 />
            </Route>
            <Route path={"/design-2"}>
              <Design2 />
            </Route>
          </Switch> */}
        </div>

        <ChatBody
          onCollapse={(dark) => {
            console.log(dark);
            setDarkMode(dark);
          }}
        />

      </Router>
    </div>
  );
}

export default App;
