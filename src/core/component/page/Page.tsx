import "./_page.scss";

import React from "react";
import classNames from "classnames";

import PageHeader from "./header/PageHeader";

interface PageProps {
  children: React.ReactNode;
  customClassName?: string;
}

function Page({children, customClassName}: PageProps) {
  return (
    <div className={classNames("page", customClassName)}>
      <PageHeader />

      {children}
    </div>
  );
}

export default Page;
