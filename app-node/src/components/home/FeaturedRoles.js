import React, { useEffect, useState } from 'react';
import axios from 'axios';
import JobCard from '../cards/JobCard';
import { FaAngleDown } from 'react-icons/fa';
import { useRouter } from 'next/router';

function FeaturedRoles({ screenWidth }) {
  const [jobs, setJobs] = useState([]);
  const router = useRouter();
  const apiUrl = process.env.NEXT_PUBLIC_WORDPRESS_URL;
  const [isLoaded, setIsLoaded] = useState([]);
  useEffect(() => {
    //
    const perPage = 6;
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
      <div className="featured">
        <h1>
          Featured <strong>roles.</strong>
        </h1>
        <div className="featured__jobs">
          {isLoaded &&
            jobs.map((job) => (
              <JobCard
                key={job.id}
                job={job}
                featured={
                  screenWidth < 1595
                    ? jobs[0].id === job.id || (jobs[1].id === job.id && true)
                    : jobs[0].id === job.id ||
                      jobs[1].id === job.id ||
                      (jobs[2].id === job.id && true)
                }
              />
            ))}
        </div>

        <div onClick={() => router.push('/jobs')} className="featured__more">
          <h4>Find a Job</h4>
          <FaAngleDown className="featured__more__icon" />
        </div>
      </div>
    </>
  );
}

export default FeaturedRoles;
