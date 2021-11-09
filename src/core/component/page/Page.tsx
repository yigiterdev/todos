import './_page.scss';

import React from 'react';
import classNames from 'classnames';

import PageHeader from './header/PageHeader';

export interface PageMetaAttributes {
  title?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogURL?: string;
}

interface PageProps {
  children: React.ReactNode;
  customClassName?: string;
  shouldDisplayFooter?: boolean;
  metaAttributes?: PageMetaAttributes | undefined;
}

function Page({
  children,
  customClassName,
  shouldDisplayFooter = true,
  metaAttributes,
}: PageProps) {
  return (
    <div className={classNames('page', customClassName)}>
      <PageHeader />

      {children}
    </div>
  );
}

export default Page;
