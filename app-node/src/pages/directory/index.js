import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Header from '../../components/Header';
import { client } from 'client';
import CompanyCards from '../../components/cards/CompanyCards';
import Link from 'next/link';
import Footer from '../../components/Footer';
import CopyrightFooter from '../../components/Footer/CopyrightFooter';
import Spinner from '../../components/Spinner';
import Head from 'next/head';

function Index() {
  const [companies, setCompanies] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  const apiUrl = process.env.NEXT_PUBLIC_WORDPRESS_URL;

  useEffect(() => {
    //

    axios
      .get(`${apiUrl}/wp-json/rs/v1/companies`)
      .then((res) => {
        //console.log(res.data);
        setCompanies(res.data);
      })
      .then((err) => {
        //console.log(err.response.data.message);
      });

    setIsLoaded(true);
  }, []);

  return (
    <>
      <Head>
        <title>Muovo - directory</title>
      </Head>
      <Header />

      {isLoaded ? (
        <div className="container">
          <div className="companyOverview">
            {isLoaded &&
              companies.map((company) => (
                <CompanyCards key={company.id} company={company} />
              ))}
          </div>
        </div>
      ) : (
        <Spinner />
      )}

      <Footer />
      <CopyrightFooter />
    </>
  );
}

export default Index;
