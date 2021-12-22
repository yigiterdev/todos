import "./_page-header.scss";

import logoSrc from "../../../ui/img/todos--bigger.png";

import ThemeSwitch from "../../theme-switch/ThemeSwitch";

function PageHeader() {
  return (
    <header className={"page-header"}>
      <img src={logoSrc} className={"page-header__logo"} alt={"logo"} />

      <ThemeSwitch />
    </header>
  );
}

export default PageHeader;
