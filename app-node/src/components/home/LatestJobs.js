import React, { useEffect, useState } from 'react';
import JobCard from '../cards/JobCard';
import axios from 'axios';

function LatestJobs() {
  const [jobs, setJobs] = useState([]);
  const apiUrl = process.env.NEXT_PUBLIC_WORDPRESS_URL;
  const [isLoaded, setIsLoaded] = useState([]);
  useEffect(() => {
    //
    const perPage = 3;
    const page = 1;

    axios
      .get(`${apiUrl}/wp-json/rs/v1/jobs/?per_page=${perPage}&page=${page}`)
      .then((res) => {
        setJobs(res.data);
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });

    setIsLoaded(true);
  }, []);

  return (
    <>
      <h1 className="home__title">Latest jobs</h1>
      <div className="container">
        <div className="jobs">
          {isLoaded && jobs.map((job) => <JobCard key={job.id} job={job} />)}
        </div>
      </div>
    </>
  );
}

export default LatestJobs;
