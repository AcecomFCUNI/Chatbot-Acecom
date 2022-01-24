import React, { useState } from "react";
import "./App.css";
import ChatBody from "./components/ChatBody";
import SideMenu from "./components/SideMenu";

function App() {
  const [inactive, setInactive] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  return (
    <div className={`${darkMode ? "dark" : ""} __main`}>
      <SideMenu
        darkMode={darkMode}
        inactive={inactive}
        changeDarkMode={(dm) => {
          setDarkMode(dm);
        }}
        changeInactive={(i) => {
          setInactive(i);
        }}
      />
      <div className={`container ${inactive ? "inactive" : ""}`} />
      <ChatBody darkMode={darkMode} />
    </div>
  );
}

export default App;
