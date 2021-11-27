import React, { useState } from "react";
import "./chatBody.css";
import ChatList from "../chatList/ChatList";
import ChatContent from "../chatContent/ChatContent";
import UserProfile from "../userProfile/UserProfile";
import SideMenu, {dark} from "../SideMenu";

export default function ChatBody() {
  return (
    <div className={`${dark ? "dark" : ""} main__chatbody`}>
      {//<ChatList />
      }
      <ChatContent 
        onCollapse={(dark) => {
          console.log(dark);
          //setDarkMode(darkMode);
        }}
      />
      {//<UserProfile />
      }
    </div>
  );
}
