import React, { useState } from 'react';
import RegisterCompany from '../../../components/auth/RegisterCompany';
import Header from '../../../components/Header';
import { FaUserTie, FaBuilding } from 'react-icons/fa';
import RegisterJobseeker from '../../../components/auth/RegisterJobseeker';
import Link from 'next/link';
import CvForm from '../../../components/auth/CvForm';
import Head from 'next/head';
import Footer from '../../../components/Footer';
import CopyrightFooter from '../../../components/Footer/CopyrightFooter';

function Index() {
  const [company, setCompany] = useState(false);

  return (
    <>
      <Head>
        <title>Muovo - Register</title>
      </Head>
      <Header />
      <div className="selectRole">
        <div onClick={() => setCompany(true)}>
          <div className={`selectRole__card ${company && 'active'}`}>
            <FaBuilding className="selectRole__card__icon" />
            <p className="selectRole__card__text">Company</p>
          </div>
        </div>
        <div onClick={() => setCompany(false)}>
          <div className={`selectRole__card ${!company && 'active'}`}>
            <FaUserTie className="selectRole__card__icon" />
            <p className="selectRole__card__text">Jobseeker</p>
          </div>
        </div>
      </div>

      {company ? <RegisterCompany /> : <CvForm />}

      <div className="link">
        <Link href={'/auth/login'}>
          <a>Already have an account, please login.</a>
        </Link>
      </div>

      <Footer />
      <CopyrightFooter />
    </>
  );
}

export default Index;
