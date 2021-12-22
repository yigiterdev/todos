import "./_page.scss";

import React, {useEffect} from "react";
import classNames from "classnames";

import PageHeader from "./header/PageHeader";
import {setMetaAttributes} from "./utils/pageUtils";

export interface PageMetaAttributes {
  title?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogURL?: string;
}

interface PageProps {
  children: React.ReactNode;
  customClassName?: string;
  metaAttributes?: PageMetaAttributes | undefined;
  shouldDisplayHeader?: boolean;
}

function Page({
  children,
  customClassName,
  metaAttributes,
  shouldDisplayHeader = true
}: PageProps) {
  useEffect(() => {
    if (metaAttributes) {
      setMetaAttributes(metaAttributes);
    }
  }, [metaAttributes]);

  return (
    <div className={classNames("page", customClassName)}>
      {shouldDisplayHeader && <PageHeader />}

      {children}
    </div>
  );
}

export default Page;
