import logoSrc from "../../core/ui/img/todos.png";
import "./_home-page-sidebar.scss";

import {useToast} from "@chakra-ui/react";
import {useHistory} from "react-router-dom";

import {useAppContext} from "../../core/context/AppContext";
import ThemeSwitch from "../../core/component/theme-switch/ThemeSwitch";
import Button from "../../core/component/button/Button";
import {supabase} from "../../supabaseClient";
import webStorage from "../../core/storage/webStorage";

interface HomePageSidebarProps {
  customClassName?: string;
}

function HomePageSidebar({customClassName}: HomePageSidebarProps) {
  const {
    appState: {user}
  } = useAppContext();
  const toast = useToast();
  const history = useHistory();

  const usera = supabase.auth.user();

  console.log(usera);

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

      toast({
        title: "Logout successful",
        description: "We are going to redirect you login page",
        status: "success",
        position: "top",
        duration: 2000,
        isClosable: true
      });
      setInterval(() => {
        history.push("/login");
        // eslint-disable-next-line
      }, 2000);
    } catch (error) {
      toast({
        title: "Login wasn't successful",
        description: "When you try to logout error occurs",
        status: "error",
        position: "top",
        duration: 5000,
        isClosable: true
      });
    }
  }
}

export default HomePageSidebar;
