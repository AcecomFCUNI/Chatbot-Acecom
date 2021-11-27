import React, { useState } from "react";

const Switch = (props) => {
    const [inactive, setInactive] = useState(false);
    const [darkMode, setDarkMode] = useState(false);
    useEffect(() => {
        //if (inactive, darkMode) {
        //  removeActiveClassFromSubMenu();
        //}
    
        props.onCollapse(inactive, darkMode);
      }, [inactive, darkMode]);
};

export const darkMode = ;
export default Switch;