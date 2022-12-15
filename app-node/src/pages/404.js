import React from 'react';
import Header from '../components/Header';
import CopyrightFooter from '../components/Footer/CopyrightFooter';
import Link from 'next/link';
import Head from 'next/head';

function NotFound() {
  return (
    <>
      <Head>
        <title>404 - Not Found</title>
      </Head>

      <div className="notFound">
        <Header />

        <div className="notFound__container">
          <h1>404 - Not found</h1>
          <Link href={'/home'}>
            <a>Go back to home page</a>
          </Link>
        </div>

        <CopyrightFooter />
      </div>
    </>
  );
}

export default NotFound;
