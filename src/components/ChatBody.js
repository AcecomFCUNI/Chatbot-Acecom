import React from "react";
import ChatContent from "./ChatContent";

export default function ChatBody(props) {
  const { darkMode } = props;
  return (
    <div className={`${darkMode ? "dark" : ""} main__chatbody`}>
      <ChatContent darkMode={darkMode} />
    </div>
  );
}