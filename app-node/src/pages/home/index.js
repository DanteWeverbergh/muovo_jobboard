import axios from 'axios';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import JobCard from '../../components/cards/JobCard';
import CopyrightFooter from '../../components/Footer/CopyrightFooter';
import Header from '../../components/Header';
import Spinner from '../../components/Spinner';
import Button from '../../components/buttons/Button';
import Head from 'next/head';

function Index() {
  const [jobs, setJobs] = useState([]);
  const apiUrl = process.env.NEXT_PUBLIC_WORDPRESS_URL;
  const [isLoaded, setIsLoaded] = useState([]);
  const [page, setPage] = useState([]);
  const [yoastMeta, setYoastMeta] = useState([]);

  useEffect(() => {
    //
    const perPage = 3;
    const page = 1;

    axios
      .get(`${apiUrl}/wp-json/rs/v1/jobs/?per_page=${perPage}&page=${page}`)
      .then((res) => {
        setJobs(res.data);
      })
      .catch((err) => {
        // console.log(err);
      });

    axios
      .get(`${apiUrl}/wp-json/wp/v2/pages/200`)
      .then((res) => {
        setPage(res.data);
        const meta = res.data.yoast_meta;
        setYoastMeta(meta);

        /*
        console.log(
          'yoast',
          res.data.yoast_meta.map((meta_value) => meta_value.property)
        );
        */
      })
      .catch((err) => {
        // console.log(err);
      });

    setIsLoaded(true);
  }, []);

  return (
    <>
      {isLoaded ? (
        <>
          <Head>
            <title>{page.yoast_title}</title>
            {yoastMeta.map((meta_value) => {
              return (
                <meta
                  key={meta_value.name || meta_value.property}
                  name={meta_value.name || meta_value.property}
                  content={meta_value.content}
                />
              );
            })}
          </Head>

          <Header />

          <div className="home">
            <div></div>
            <h1 className="home__title">Latest jobs</h1>

            <div className="container">
              <div className="jobs">
                {isLoaded &&
                  jobs.map((job) => <JobCard key={job.id} job={job} />)}
              </div>
            </div>
          </div>

          <CopyrightFooter />
        </>
      ) : (
        <Spinner />
      )}
    </>
  );
}

export default Index;
