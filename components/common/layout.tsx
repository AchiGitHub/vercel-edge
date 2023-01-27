import React, { ReactNode } from 'react';
import Head from 'next/head';
import Footer from './footer';
import useDataStore from '../../store';
type Props = {
  children?: ReactNode;
  title?: string;
};

const Layout = ({ children, title = 'ICC' }: Props) => {
  const setSelectedTab = useDataStore((state) => state.setSelectedTab);
  const selectedTab = useDataStore((state) => state.selectedTab);

  return (
    <div>
      <Head>
        <title>{title}</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      {children}
      <Footer setSelectedTab={setSelectedTab} selectedTab={selectedTab} />
    </div>
  );
};

export default Layout;
