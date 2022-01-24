import React, { useState } from "react";
import "./App.css";
import ChatBody from "./components/ChatBody";
import SideMenu from "./components/SideMenu";

function App() {
  const [inactive, setInactive] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [modelId, setModelId] = useState(null);
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
        changeModelId={(id) => {
          setModelId(id);
        }}
      />
      <div className={`container ${inactive ? "inactive" : ""}`} />
      <ChatBody
        modelId={modelId}
        darkMode={darkMode}
      />
    </div>
  );
}

export default App;
