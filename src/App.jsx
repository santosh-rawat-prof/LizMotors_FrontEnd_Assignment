import { useState, useContext } from "react";
import DashBoard from "./DashBoard";
import Toggle from "./Components/Toggle/Toggle";
import { themeContext } from "./Context";

function App() {
  const theme = useContext(themeContext);
  const darkMode = theme.state.darkMode;
  return (
    <>
      <div
        className="h-[100vh]"
        style={{
          backgroundColor: darkMode ? "#1B1C1E" : "#F5F5F5",
          backgroundImage: `url(
            "https://29b2eb86d7.clvaw-cdnwnd.com/18b93d4bb4f77ddec8c75f8adc4f29dc/200000088-599095a8ff/untitled_design__3__gji_icon.ico?ph=29b2eb86d7"
          )`,
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          backgroundSize: "contain",
          backgroundBlendMode: darkMode ? "color-burn" : "color-dodge",
          color: darkMode ? "#F5F5F5" : "#1B1C1E",
        }}
      >
        <Toggle />
        <DashBoard />
      </div>
    </>
  );
}

export default App;
