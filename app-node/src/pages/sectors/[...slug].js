import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Header from '../../components/Header';
import axios from 'axios';
import JobCard from '../../components/cards/JobCard';
import BackButton from '../../components/BackButton';
import Footer from '../../components/Footer';
import CopyrightFooter from '../../components/Footer/CopyrightFooter';
import Pagination from '../../components/blog/Pagination';

function Sector() {
  const router = useRouter();
  const { slug } = router.query;
  const apiUrl = process.env.NEXT_PUBLIC_WORDPRESS_URL;
  const [jobs, setJobs] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    //
    if (slug) {
      console.log(slug.toString().replaceAll('-', ' '));

      const data = {
        sectors: slug,
      };

      console.log(data);

      axios
        .post(
          `${apiUrl}/wp-json/rs/v1/jobs/search/?page=${currentPage}&per_page=${12}`,
          data
        )
        .then((res) => {
          console.log(res.data);
          setJobs(res.data);
        });

      setIsLoaded(true);
    }
  }, [slug]);

  return (
    <>
      <Header />

      <div className="sector">
        <div className="sector__header">
          <h1>All jobs in {slug}</h1>
        </div>

        <div className="container">
          <div className="jobs">
            {isLoaded && jobs.map((job) => <JobCard key={job.id} job={job} />)}
          </div>
        </div>

        {isLoaded && (
          <Pagination
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            perPage={12}
            type={'jobs'}
            amount={jobs.length}
          />
        )}
      </div>

      <Footer />
      <CopyrightFooter />
    </>
  );
}

export default Sector;
