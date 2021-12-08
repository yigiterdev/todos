import logoSrc from "../../core/ui/img/todos.png";
import "./_home-page-sidebar.scss";

import {useAppContext} from "../../core/context/AppContext";
import ThemeSwitch from "../../core/component/theme-switch/ThemeSwitch";

interface HomePageSidebarProps {
  customClassName?: string;
}

function HomePageSidebar({customClassName}: HomePageSidebarProps) {
  const {
    appState: {user}
  } = useAppContext();

  return (
    <div className={customClassName}>
      <ThemeSwitch />

      <img src={logoSrc} className={"is-centered home-page-sidebar__logo"} alt={"logo"} />

      <span
        className={"is-centered typography--body-semibold"}
      >{`${user?.name} ${user?.surname}`}</span>
    </div>
  );
}

export default HomePageSidebar;
