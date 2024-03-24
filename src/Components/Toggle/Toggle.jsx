import React, { useContext } from "react";
import Moon from "@iconscout/react-unicons/icons/uil-moon";
import Sun from "@iconscout/react-unicons/icons/uil-sun";
import { themeContext } from "../../Context";
import { Background } from "reactflow";

const Toggle = () => {
  const theme = useContext(themeContext);
  const darkMode = theme.state.darkMode;
  const handleClick = () => {
    // debugger
    theme.dispatch({ type: "toggle" });
  };
  return (
    <div
      className={`flex items-center absolute rounded-2xl p-[2px] md:top-8 md:left-16 top-4 left-8 z-[100] cursor-pointer`}
      style={
        darkMode
          ? { border: "3px solid#f5f5f5" }
          : { border: "3px solid #2a4494" }
      }
      onClick={handleClick}
    >
      <Moon className={`w-5 h-5 text-[${darkMode ? "#f5f5f5" : "#2a4494"}]`} />
      <Sun className={`w-5 h-5 text-[${darkMode ? "#f5f5f5" : "#2a4494"}]`} />
      {/*                              toggle.css mein left ki property aik assign hy ussy delete
                                          krna hy pehly */}
      <div
        className={`rounded-full w-5 h-5  absolute`}
        style={
          darkMode
            ? { left: "2px", background: "#f5f5f5" }
            : { right: "2px", background: "#2a4494" }
        }
      ></div>
    </div>
  );
};

export default Toggle;
