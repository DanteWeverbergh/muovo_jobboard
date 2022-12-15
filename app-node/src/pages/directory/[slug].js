import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Header from '../../components/Header';
import axios from 'axios';
import Spinner from '../../components/Spinner';
import BackButton from '../../components/BackButton';
import JobCard from '../../components/cards/JobCard';
import CopyrightFooter from '../../components/Footer/CopyrightFooter';

import Head from 'next/head';

import { BiWorld } from 'react-icons/bi';
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
  FaYoutube,
} from 'react-icons/fa';
import Link from 'next/link';
import Footer from '../../components/Footer';

function Detail() {
  const router = useRouter();
  const { slug } = router.query;

  const apiUrl = process.env.NEXT_PUBLIC_WORDPRESS_URL;
  const siteUrl = process.env.SITE_URL;
  const [id, setId] = useState('');
  const [isLoaded, setIsLoaded] = useState('');
  const [company, setCompany] = useState({});
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    console.log('slug:', slug);

    if (router.isReady) {
      axios
        .get(`${apiUrl}/wp-json/rs/v1/company/slug/?company=${slug}`)
        .then((res) => {
          console.log(res.data);
          setCompany(res.data);

          const data = {
            company: res.data.companyName,
          };

          axios
            .post(
              `${apiUrl}/wp-json/rs/v1/jobs/search/?page=${1}&per_page=${12}`,
              data
            )
            .then((res) => {
              //console.log(res.data);
              setJobs(res.data);
            });
        });

      setIsLoaded(true);
    }
  }, [router.isReady]);

  const schemaData = {
    '@context': 'https://schema.org/',
    '@type': 'Organization',
    url: `${siteUrl}/directory/${company.companyName}`,
    email: `${company.email}`,
    location: `${company.location}`,
    logo: '...',
    telephone: `${company.phone}`,
    description: `${company.companyDescription}`,
    name: `${company.companyName}`,
    image: '...',
    sameAs: [`${company.facebook}, ${company.instagram}, ${company.linkedin}`],
  };

  return (
    <>
      <Head>
        {isLoaded && (
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
          />
        )}
        {isLoaded && <title>{`company - ${company.companyName}`}</title>}
      </Head>

      <Header />
      <div className="marginHeader"></div>

      <BackButton />

      <div className="container">
        {isLoaded ? (
          <div>
            <div className="companyDetail">
              <div className="companyDetail__header">
                <h1 className="companyDetail__header__title">
                  {company.companyName}
                </h1>
                <div className="companyDetail__header__socials">
                  {company.website && (
                    <Link href={company.website} passHref={true}>
                      <a className="aElement">
                        <BiWorld className="companyDetail__header__socials__icon" />
                      </a>
                    </Link>
                  )}

                  {company.facebook && (
                    <Link href={company.facebook} passHref={true}>
                      <a className="aElement">
                        <FaFacebookF className="companyDetail__header__socials__icon" />
                      </a>
                    </Link>
                  )}

                  {company.twitter && (
                    <Link href={company.twitter} passHref={true}>
                      <a className="aElement">
                        <FaTwitter className="companyDetail__header__socials__icon" />
                      </a>
                    </Link>
                  )}

                  {company.instagram && (
                    <Link href={company.instagram} passHref={true}>
                      <a className="aElement">
                        <FaInstagram className="companyDetail__header__socials__icon" />
                      </a>
                    </Link>
                  )}

                  {company.linkedin && (
                    <Link href={company.linkedin} passHref={true}>
                      <a className="aElement">
                        <FaLinkedinIn className="companyDetail__header__socials__icon" />
                      </a>
                    </Link>
                  )}

                  {company.youtube && (
                    <Link href={company.youtube} passHref={true}>
                      <a className="aElement">
                        <FaYoutube className="companyDetail__header__socials__icon" />
                      </a>
                    </Link>
                  )}
                </div>
              </div>
              <p
                dangerouslySetInnerHTML={{ __html: company.companyDescription }}
              ></p>
            </div>

            <h1>Jobs from {company.companyName}</h1>

            <div className="jobs">
              {isLoaded &&
                jobs.map((job) => <JobCard key={job.id} job={job} />)}
            </div>
          </div>
        ) : (
          <Spinner />
        )}
      </div>

      <Footer />
      <CopyrightFooter />
    </>
  );
}

export default Detail;
