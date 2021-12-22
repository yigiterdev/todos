import logoSrc from "../../core/ui/img/todos.png";
import "./_home-page-sidebar.scss";

import {useToast} from "@chakra-ui/react";
import {useHistory} from "react-router-dom";

import {useAppContext} from "../../core/context/AppContext";
import ThemeSwitch from "../../core/component/theme-switch/ThemeSwitch";
import Button from "../../core/component/button/Button";
import {supabase} from "../../supabaseClient";
import webStorage from "../../core/storage/webStorage";
import {getInitialUser} from "../../core/context/appState";

interface HomePageSidebarProps {
  customClassName?: string;
}

function HomePageSidebar({customClassName}: HomePageSidebarProps) {
  const {
    appState: {user},
    dispatchAppStateReducerAction
  } = useAppContext();
  const toast = useToast();
  const history = useHistory();

  return (
    <div className={customClassName}>
      <ThemeSwitch />

      <img src={logoSrc} className={"is-centered home-page-sidebar__logo"} alt={"logo"} />

      <span
        className={"is-centered typography--body-semibold"}
      >{`${user?.username}`}</span>

      <Button
        onClick={signOut}
        customClassName={"home-page-sidebar__logo__signout-button"}
      >
        {"Sign Out"}
      </Button>
    </div>
  );

  async function signOut() {
    try {
      const {error} = await supabase.auth.signOut();

      if (error) throw error;

      webStorage.local.removeItem("user");

      dispatchAppStateReducerAction({
        type: "SET_USER",
        user: getInitialUser()
      });

      toast({
        title: "Logout successful",
        description: "We are going to redirect you login page",
        status: "success",
        position: "bottom-right",
        duration: 2000,
        isClosable: true
      });

      history.push("/login");
    } catch (error) {
      toast({
        title: "Login wasn't successful",
        description: "When you try to logout error occurs",
        status: "error",
        position: "bottom-right",
        duration: 5000,
        isClosable: true
      });
    }
  }
}

export default HomePageSidebar;
