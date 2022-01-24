import React from "react";
import ChatContent from "./ChatContent";

export default function ChatBody(props) {
  const { darkMode, modelId } = props;
  return (
    <div className={`${darkMode ? "dark" : ""} main__chatbody`}>
      <ChatContent modelId={modelId} darkMode={darkMode} />
    </div>
  );
}
