import "./_theme-switch.scss";

import {Switch} from "@hipo/react-ui-toolkit";
import {MdModeNight} from "react-icons/md";
import {BsSunFill} from "react-icons/bs";

import {useAppContext} from "../../context/AppContext";

function ThemeSwitch() {
  const {
    appState: {theme},
    dispatchAppStateReducerAction
  } = useAppContext();

  return (
    <div className={"theme-switch"}>
      <Switch isToggledOn={theme === "dark-theme"} onToggle={handleSwitch} />

      {theme === "dark-theme" ? <BsSunFill /> : <MdModeNight />}
    </div>
  );

  function handleSwitch() {
    dispatchAppStateReducerAction({
      type: "CHANGE_THEME"
    });
  }
}

export default ThemeSwitch;
