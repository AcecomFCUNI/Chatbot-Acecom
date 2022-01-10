import React, { useState } from "react";
import "./chatBody.css";
import ChatContent from "../chatContent/ChatContent";
import { dark } from "../SideMenu";

export default function ChatBody() {
  return (
    <div className={`${dark ? "dark" : ""} main__chatbody`}>
      <ChatContent
        onCollapse={(dark) => {
          console.log(dark);
          //setDarkMode(darkMode);
        }}
      />
    </div>
  );
}
