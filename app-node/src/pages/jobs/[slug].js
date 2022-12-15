import React, { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/router';
import Header from '../../components/Header';
import axios from 'axios';
import BackButton from '../../components/BackButton';
import Spinner from '../../components/Spinner';
import Cookies from 'js-cookie';
import Link from 'next/link';
import Swal from 'sweetalert2';
import LoginPopup from '../../components/auth/LoginPopup';
import { BiWorld } from 'react-icons/bi';
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
  FaYoutube,
} from 'react-icons/fa';
import { useAuthContext } from '../../context/AuthContext';

import Head from 'next/head';
import mobileCompanyCards from '../../components/jobs/mobile/mobileCompanyCards';
import Footer from '../../components/Footer';
import CopyrightFooter from '../../components/Footer/CopyrightFooter';

function Detail() {
  // CommonJS

  const { loginWithoutRedirect } = useAuthContext();

  const router = useRouter();
  const { slug } = router.query;
  const [job, setJob] = useState({});
  const [userRole, setUserRole] = useState('');
  const [isLoaded, setIsLoaded] = useState(false);
  const apiUrl = process.env.NEXT_PUBLIC_WORDPRESS_URL;
  const siteUrl = process.env.SITE_URL;
  const [currentUser, setCurrentUser] = useState({});
  const [message, setMessage] = useState('');
  const [applied, setApplied] = useState(false);
  const [companyId, setCompanyId] = useState('');
  const [company, setCompany] = useState({});
  const [companyLoaded, setCompanyLoaded] = useState(false);
  const [id, setId] = useState('');

  const [canApply, setCanApply] = useState(false);
  const [hasApplied, setHasApplied] = useState(false);

  const bottom = useRef(null);

  useEffect(() => {
    setUserRole(sessionStorage.getItem('role'));
  }, []);

  useEffect(() => {
    //

    if (router.isReady) {
      const parts = slug.split('-');
      const jobId = parts[parts.length - 1];
      console.log(jobId);
      setId(jobId);

      if (jobId) {
        axios
          .post(`${apiUrl}/wp-json/rs/v1/jobs/id`, { id: jobId })
          .then((res) => {
            setJob(res.data);
            console.log('job', res.data);

            axios
              .get(
                `${apiUrl}/wp-json/rs/v1/company/id/?id=${res.data.companyId}`
              )
              .then((res) => {
                //console.log(res.data);
                setCompanyId(res.data);
                setCompany(res.data);
              });

            setCompanyLoaded(true);

            const users = res.data.applied;
            // console.log(users);

            /*
            if (users.some((e) => e.jobseeker_id === '29')) {
              setApplied(true);
            }
            */
          })
          .catch((err) => {
            console.log(err);
          });

        setIsLoaded(true);
      }
    }
  }, [router.isReady]);

  useEffect(() => {
    if (job) {
      console.log('ko..........');

      const token = Cookies.get('token');

      const headers = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      axios.get(`${apiUrl}/wp-json/rs/v1/user/current`, headers).then((res) => {
        const userId = res.data;

        const appliedUsers = job.applied;
        if (Array.isArray(appliedUsers)) {
          if (appliedUsers.some((a) => a['jobseeker_id'] == userId)) {
            console.log('not apply');
            setCanApply(false);
          } else {
            console.log('others, can apply');
            setCanApply(true);
          }
        } else {
          console.log('first, can apply');
          setCanApply(true);
        }
      });
    }

    //
  }, [job]);

  const apply = () => {
    //apply for job

    //check if user is logged in

    const token = Cookies.get('token');

    if (token) {
      if (userRole != 'jobseeker') {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: "You can't apply for a job as a company admin",
        });
      } else {
        const headers = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };

        //apply for the job

        /*
        if (canApply) {
          console.log('can apply');
        } else {
          console.log('cannont apply');
        }
        */

        if (canApply) {
          const data = {
            //user id -> in backend
            companyId: job.companyId,
            jobId: id,
            companyName: job.company,
            jobTitle: job.jobTitle,
          };

          axios
            .post(`${apiUrl}/wp-json/rs/v1/jobs/apply`, data, headers)
            .then((res) => {
              console.log(res.data);
              Swal.fire(
                'Good job!',
                `You applied for ${job.jobTitle}`,
                'success'
              );

              setCanApply(false);
            })
            .catch((err) => {
              console.log(err);
            });

          //
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'You already applied for this position!',
          });
        }
      }
    }
  };

  const schemaData = {
    '@context': 'https://schema.org',
    '@type': 'JobPosting',
    title: `${job.jobTitle}`,
    description: `${job.jobDescription}`,
    url: `${siteUrl}/jobs/${job.slug}-${job.id}`,
    skills: `${job.skills}`,
    industry: `${job.sector}`,
    datePosted: `${job.data}`,
    validThrough: '',
    employmentType: `${job.jobType}`,
    jobLocation: {
      '@type': 'Place',
      adress: {
        name: '',
        adressLocality: '',
        postalCode: '',
        streetAdress: '',
      },
    },
    // check if job is remote then
    jobLocationType: `${job.sector ? 'TELECOMMUTE' : ''}`,
    hiringOrganization: {
      '@type': 'Organization',
      name: `${job.company}`,
    },
    baseSalary: {
      '@type': 'MonetaryAmount',
      currency: 'EUR',
      value: {
        '@type': 'QuantitativeValue',
        minValue: 'minimum',
        maxValue: 'maximum',
        unitText: 'hhlhh',
      },
    },
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
        <title>Muovo - Jobs - detail</title>
      </Head>
      <Header />
      <div className="marginHeader"></div>

      <BackButton />

      {isLoaded && companyLoaded && company.companyName ? (
        <>
          <div className="detailPage">
            <div className="jobDetails">
              <h1 className="jobDetails__title">{job.jobTitle}</h1>

              <div className="jobDetails__info">
                <div className="jobDetails__info__id">
                  <div className="strong">Job ID:</div> xxxx
                </div>
                <div className="jobDetails__info__type">Full time</div>
                <div className="jobDetails__info__salary">Salary</div>
              </div>

              <div className="mobileApplyBtn">
                <button
                  className="mobileApplyBtn__button"
                  onClick={() => apply()}
                >
                  Apply
                </button>
              </div>

              <div className="jobDetails__content">
                <h3>Job description</h3>
                <h4>Company introduction</h4>
                <p className="jobDetails__content__introduction">
                  Introduction ...
                </p>
                <h4>Job responsibilities and Duties</h4>
                <p
                  dangerouslySetInnerHTML={{ __html: job.jobDescription }}
                  className="jobDetails__content__description"
                ></p>
              </div>
            </div>
            <div className="centerMobile">
              <div className="companyInfo">
                <div className="companyInfoInner stickyCompany">
                  {hasApplied ? (
                    <div>Already applied</div>
                  ) : (
                    <button
                      className="companyInfo__button"
                      onClick={() => apply()}
                    >
                      Apply for this job
                    </button>
                  )}

                  {companyLoaded && (
                    <>
                      <div className="companyInfo__card">
                        <div className="companyInfo__card__image">
                          <img
                            src="https://picsum.photos/200"
                            alt="company-logo"
                          />
                        </div>
                        <h2 className="companyInfo__card__title">
                          {company.companyName}
                        </h2>
                        <div className="companyInfo__card__description">
                          <p
                            dangerouslySetInnerHTML={{
                              __html: company.companyDescription,
                            }}
                          ></p>
                        </div>
                        <div className="companyInfo__card__socials">
                          {company.website && (
                            <Link href={company.website} passHref={true}>
                              <a className="aElement">
                                <BiWorld className="companyInfo__card__socials__icon" />
                              </a>
                            </Link>
                          )}

                          {company.facebook && (
                            <Link href={company.facebook} passHref={true}>
                              <a className="aElement">
                                <FaFacebookF className="companyInfo__card__socials__icon" />
                              </a>
                            </Link>
                          )}

                          {company.twitter && (
                            <Link href={company.twitter} passHref={true}>
                              <a className="aElement">
                                <FaTwitter className="companyInfo__card__socials__icon" />
                              </a>
                            </Link>
                          )}

                          {company.linkedin && (
                            <Link href={company.linkedin} passHref={true}>
                              <a className="aElement">
                                <FaLinkedinIn className="companyInfo__card__socials__icon" />
                              </a>
                            </Link>
                          )}

                          {company.youtube && (
                            <Link href={company.youtube} passHref={true}>
                              <a className="aElement">
                                <FaYoutube className="companyInfo__card__socials__icon" />
                              </a>
                            </Link>
                          )}
                        </div>
                        <div className="companyInfo__card__button">
                          <button
                            onClick={() =>
                              router.push(`/directory/${company.slug}`)
                            }
                          >
                            View all jobs
                          </button>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div ref={bottom}></div>

          <Footer />
          <CopyrightFooter />
        </>
      ) : (
        <Spinner />
      )}
    </>
  );
}

export default Detail;
