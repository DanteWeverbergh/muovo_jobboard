import axios from 'axios';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import Header from '../../components/Header';
import Sidebar from '../../components/Sidebar';
import { useAuthContext } from '../../context/AuthContext';
import { FaPlus, FaUser, FaStar, FaRegStar } from 'react-icons/fa';
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';
import { HiDotsVertical } from 'react-icons/hi';
import TableModal from '../../components/modals/TableModal';
import { AiTwotonePlusCircle } from 'react-icons/ai';
import { RiTableFill, RiBankCard2Fill } from 'react-icons/ri';
import AdminJobCard from '../../components/cards/AdminJobCard';
import Swal from 'sweetalert2';
import Spinner from '../../components/Spinner';
import NothingHere from '../../components/cards/NothingHere';

function Index() {
  const apiUrl = process.env.NEXT_PUBLIC_WORDPRESS_URL;
  const router = useRouter();
  const [jobs, setJobs] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [companyName, setCompanyName] = useState('');
  const [view, setView] = useState('table');

  const { getUserDetails } = useAuthContext();

  const [page, setPage] = useState(1);

  useEffect(() => {
    //
    const token = Cookies.get('token');

    const headers = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    //get company
    axios
      .get(`${apiUrl}/wp-json/rs/v1/user/company`, headers)
      .then((res) => {
        console.log(res.data);
        const company = res.data;
        sessionStorage.setItem('company', res.data);

        axios
          .post(`${apiUrl}/wp-json/rs/v1/jobs/company`, { company: company })
          .then((res) => {
            // console.log('jobs', res.data);
            setJobs(res.data);
            console.log(res.data);
            setIsLoaded(true);
          });
      })
      .catch((err) => {
        console.log(err.response.data.message);
      });

    //setIsLoaded(true);
  }, []);

  // const addMonth = (date) => {
  //   const oldDate = Date.parse(date);

  //   return date;
  // };

  const dots = (jobTitle) => {
    Swal.fire({
      title: jobTitle,
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: 'Renew',
      denyButtonText: `Close`,
      cancelButtonText: 'Cancel',
      confirmButtonColor: '#B1D3B9',
      denyButtonColor: '#FFD0A0',
      cancelButtonColor: '#FF9898',
    }).then((result) => {
      //console.log(id);
      /* Read more about isConfirmed, isDenied below */
      const token = Cookies.get('token');

      const headers = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      if (result.isConfirmed) {
        console.log('renew');
        // renew job listing
        // job already active -> add 30 days
        axios
          .post(`${apiUrl}/wp-json/rs/v1/jobs/renew`)
          .then((res) => {
            console.log(res.data);
          })
          .catch((err) => {
            console.log(err.response.data.message);
          });
      } else if (result.isDenied) {
        console.log('close');
        // close job listing
        // remove active nutil date

        axios
          .post(`${apiUrl}/wp-json/rs/v1/jobs/close`)
          .then((res) => {
            console.log(res.data);
          })
          .catch((err) => {
            console.log(err.response.data.message);
          });
      } else if (result.isDismissed) {
        console.log('cancel');
      }
    });
  };

  return (
    <>
      <Sidebar />

      {isLoaded ? (
        <>
          <div className="dashboardContainer">
            <div className="view">
              <h1>All Jobs</h1>
              <div>
                <RiTableFill
                  className="view__icon"
                  onClick={() => setView('table')}
                />
                <RiBankCard2Fill
                  className="view__icon"
                  onClick={() => setView('card')}
                />
              </div>
            </div>

            {isLoaded && jobs.length === 0 && (
              <NothingHere text={"You don't have any jobs yet. "} type="job" />
            )}

            <div className="">
              <div>
                {view === 'table' ? (
                  <table className="job__table">
                    <thead className="job__table__header">
                      <tr className="job__table__header__row">
                        <th className="job__table__header__row__cell"></th>
                        <th className="job__table__header__row__cell">
                          JOB TITLE
                        </th>
                        <th className="job__table__header__row__cell">
                          <div className="hovertext" data-hover="Featured jobs">
                            <FaStar />
                          </div>
                        </th>
                        <th className="job__table__header__row__cell">
                          DATE POSTED
                        </th>
                        <th className="job__table__header__row__cell">
                          EXPIRY DATE
                        </th>
                        <th className="job__table__header__row__cell">
                          STATUS
                        </th>

                        <th className="job__table__header__row__cell">
                          <div
                            className="hovertext"
                            data-hover="Amount of applications"
                          >
                            <FaUser className="job__table__haeder__row__cell__icon" />
                          </div>
                        </th>
                        <th className="job__table__header__row__cell"></th>
                      </tr>
                    </thead>

                    <tbody className="job__table__body">
                      {isLoaded &&
                        jobs.map((job) => (
                          <>
                            <tr className="job__table__body__row" key={job.id}>
                              <th className="job__table__body__row__cell">
                                <input type={'checkbox'} />
                              </th>
                              <th
                                className="job__table__body__row__cell"
                                onClick={() =>
                                  router.push(
                                    `/jobs/admin/edit/${job.slug}-${job.id}`
                                  )
                                }
                              >
                                <div className="job__table__body__row__cell__title">
                                  {job.title}
                                </div>
                              </th>
                              <th className="job__table__body__row__cell">
                                <FaRegStar className="job__table__row__cell__star" />
                              </th>
                              <th className="job__table__body__row__cell">
                                {job.date_posted}
                              </th>
                              <th className="job__table__body__row__cell">
                                {job.active_until}
                              </th>
                              <th className="job__table__body__row__cell">
                                <div
                                  className={
                                    job.isActive
                                      ? 'job__table__body__row__cell__status__active'
                                      : 'job__table__body__row__cell__status__expired'
                                  }
                                >
                                  <AiTwotonePlusCircle />{' '}
                                  {job.isActive ? 'Active' : 'Expired'}
                                </div>
                              </th>
                              <th className="job__table__body__row__cell">
                                <div
                                  className="job__table__body__row__cell__applicants click"
                                  onClick={() =>
                                    router.push(
                                      `/jobs/admin/${job.slug}-${job.id}`
                                    )
                                  }
                                >
                                  <div
                                    className="hovertext"
                                    data-hover={`${
                                      job.applications === null
                                        ? '0'
                                        : job.applications.length
                                    } applications`}
                                  >
                                    {job.applications === null
                                      ? '0'
                                      : job.applications.length}
                                  </div>
                                </div>
                              </th>
                              <th className="job__table__body__row__cell">
                                <HiDotsVertical
                                  className="job__table__body__row__cell__icon"
                                  onClick={() => dots(job.title)}
                                />
                              </th>
                            </tr>
                          </>
                        ))}
                    </tbody>
                  </table>
                ) : (
                  <div className="centerCards">
                    <div className="AdminCards">
                      {isLoaded &&
                        jobs.map((job) => (
                          <AdminJobCard key={job.id} job={job} />
                        ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </>
      ) : (
        <Spinner />
      )}
    </>
  );
}

export default Index;
