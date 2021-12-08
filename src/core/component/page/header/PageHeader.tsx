import "./_page-header.scss";

import ThemeSwitch from "../../theme-switch/ThemeSwitch";

function PageHeader() {
  return (
    <header className={"page-header"}>
      <ThemeSwitch />
    </header>
  );
}

export default PageHeader;
