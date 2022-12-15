import axios from 'axios';
import React, { useEffect, useState } from 'react';
import JobCard from '../../components/cards/JobCard';
import Footer from '../../components/Footer';
import Header from '../../components/Header';
import { MdOutlineSearch, MdClose } from 'react-icons/md';

import Spinner from '../../components/Spinner';
import CopyrightFooter from '../../components/Footer/CopyrightFooter';

import Filters from '../../components/jobs/Filters';
import { useRouter } from 'next/router';
import EmploymentSelect from '../../components/jobs/forms/EmploymentSelect';
import SearchModal from '../../components/jobs/SearchModal';
import NoJobsFound from '../../components/jobs/NoJobsFound';
import Head from 'next/head';
import ReactPagination from '../../components/Pagination/Pagination';
import Pagination from '../../components/blog/Pagination';

function Index() {
  const apiUrl = process.env.NEXT_PUBLIC_WORDPRESS_URL;
  const [jobs, setJobs] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const router = useRouter();

  const [search, setSearch] = useState('');
  //pagination
  const [perPage, setPerPage] = useState(12);
  //const [page, setPage] = useState(1);

  //modal
  const [searchModal, setSearchModal] = useState(false);
  const [amount, setAmount] = useState('');
  const [companies, setCompanies] = useState([]);

  const [searching, setSearching] = useState(false);
  const [searchSectors, setSearchSectors] = useState(['Banking']);

  const [resetFilters, setResetFilters] = useState(false);
  //search
  const [searchTerm, setSeachTerm] = useState('');
  const [fullTime, setFullTime] = useState(false);
  const [partTime, setIsPartTime] = useState(false);
  const [isRemote, setIsRemote] = useState(false);
  const [flexible, setFlexible] = useState(false);
  const [checked, setChecked] = useState(false);
  const [EmploymentType, setEmploymentType] = useState('');

  const [noJobsFound, setNoJobsFound] = useState(false);

  const [reloadJobs, setReloadJobs] = useState(false);

  const [searchActive, setSearchActive] = useState(false);

  //pagination
  const [currentPage, setCurrentPage] = useState(1);

  {
    /**
  const handleChange = () => {
    setChecked(!checked);
  };
   */
  }

  //multi select

  //Modal
  const customStyles = {
    overlay: {
      backgroundColor: 'rgba(130, 130, 130, 0.75)',
    },
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      border: 'none',
    },
  };

  useEffect(() => {
    //
    axios
      .get(
        `${apiUrl}/wp-json/rs/v1/jobs/?per_page=${perPage}&page=${currentPage}`
      )
      .then((res) => {
        setJobs(res.data);
      })
      .catch((err) => {
        console.log(err);
      });

    const type = 'jobs';

    axios
      .get(`${apiUrl}/wp-json/rs/v1/jobs/number/?type=${type}`)
      .then((res) => {
        //console.log(res);
        setAmount(parseInt(res.data));

        // console.log('amount', res.data);
      })
      .catch((err) => {
        console.log(err);
      });

    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (router.isReady) {
      console.log('queryyyyy', router.query);
      setSeachTerm(router.query['searchTerm']);
    }
  }, [router.isReady]);

  useEffect(() => {
    //
    axios
      .get(
        `${apiUrl}/wp-json/rs/v1/jobs/?per_page=${perPage}&page=${currentPage}`
      )
      .then((res) => {
        setJobs(res.data);
      })
      .catch((err) => {
        console.log(err);
      });

    setIsLoaded(true);
  }, [perPage, currentPage]);

  useEffect(() => {
    console.log('reset');

    if (resetFilters) {
      axios
        .get(`${apiUrl}/wp-json/rs/v1/jobs/?per_page=${perPage}&page=${page}`)
        .then((res) => {
          setJobs(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [resetFilters]);
  //console.log(errors);

  useEffect(() => {
    //

    if (searchTerm) {
      //
      const query = {
        searchTerm: searchTerm,
      };

      console.log(query);

      axios
        .post(`${apiUrl}/wp-json/rs/v1/jobs/search/?page=1&per_page=9`, query)
        .then((res) => {
          console.log('axios', res.data);
          if (res.data != 0) {
            setNoJobsFound(false);
            setJobs(res.data);
            setAmount(res.data.length);

            console.log(res.data);
          } else {
            setNoJobsFound(true);
            console.log('........................');
          }
        });
    }
  }, [searchTerm]);

  useEffect(() => {
    //reload jobs after reset filter

    if (reloadJobs) {
      axios
        .get(`${apiUrl}/wp-json/rs/v1/jobs/?per_page=${perPage}&page=${page}`)
        .then((res) => {
          setJobs(res.data);
          console.log(res.data);
          setAmount(res.data.length);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [reloadJobs]);

  return (
    <>
      <Head>
        <title>Muovo - Jobs</title>
      </Head>

      <Header />

      {searchActive && (
        <Filters
          searchTerm={searchTerm}
          setSeachTerm={setSeachTerm}
          sectors={searchSectors.length != 0 ? searchSectors : ' '}
          setSearchSectors={setSearchSectors}
          setNoJobsFound={setNoJobsFound}
          setReloadJobs={setReloadJobs}
        />
      )}

      {noJobsFound && <NoJobsFound />}

      {isLoaded && jobs ? (
        <>
          {!noJobsFound && <h2 className="JobTitle">{amount} Jobs</h2>}

          <SearchModal
            searchModal={searchModal}
            setSearchModal={setSearchModal}
            searchTerm={searchTerm}
            setSeachTerm={setSeachTerm}
            searchSectors={searchSectors}
            setSearchSectors={setSearchSectors}
            setResetFilters={setResetFilters}
            setNoJobsFound={setNoJobsFound}
            setJobs={setJobs}
            setAmount={setAmount}
          />

          <div className="searchButton" onClick={() => setSearchModal(true)}>
            <MdOutlineSearch className="searchButton__icon" />
            Search
          </div>

          {!noJobsFound && (
            <>
              <div className="container">
                <div className="jobs">
                  {isLoaded &&
                    jobs.map((job) => <JobCard key={job.id} job={job} />)}
                </div>
              </div>

              <Pagination
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                perPage={perPage}
                type={'jobs'}
              />
            </>
          )}
        </>
      ) : (
        <Spinner />
      )}

      <Footer />
      <CopyrightFooter />
    </>
  );
}

export default Index;
