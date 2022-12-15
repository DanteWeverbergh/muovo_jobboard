import React from 'react';
import RegisterJobseeker from '../../../components/auth/RegisterJobseeker';
import Header from '../../../components/Header';
import Head from 'next/head';
import CopyrightFooter from '../../../components/Footer/CopyrightFooter';
import Footer from '../../../components/Footer';

function jobseeker() {
  return (
    <>
      <Head>
        <title>Muovo - Register jobseeker</title>
      </Head>
      <Header />

      <RegisterJobseeker />

      <CopyrightFooter />
      <Footer />
    </>
  );
}

export default jobseeker;
