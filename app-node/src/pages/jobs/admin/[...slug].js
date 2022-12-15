import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import CopyrightFooter from '../../../components/Footer/CopyrightFooter';
import Header from '../../../components/Header';
import axios from 'axios';
import Swal from 'sweetalert2';
import { RiTableFill, RiBankCard2Fill } from 'react-icons/ri';
import AdminJobCard from '../../../components/cards/AdminJobCard';
import Status from '../../../components/jobs/Status';
import { FaFileDownload } from 'react-icons/fa';
import { HiDotsVertical } from 'react-icons/hi';
import ApplyCard from '../../../components/cards/ApplyCard';
import Cookies from 'js-cookie';
import Sidebar from '../../../components/Sidebar';

function Applicant() {
  const router = useRouter();
  const [view, setView] = useState('table');
  const apiUrl = process.env.NEXT_PUBLIC_WORDPRESS_URL;
  const [applications, setApplications] = useState([]);
  const [job, setJob] = useState({});
  const [statusChanged, setStatusChanged] = useState(false);

  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    //

    if (router.isReady) {
      {
        const slug = router.query.slug[0].split('-');
        console.log(slug);

        const jobId = slug[slug.length - 1];

        const token = Cookies.get('token');

        const headers = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };

        const data = {
          jobId: jobId,
        };

        axios
          .post(`${apiUrl}/wp-json/rs/v1/applications/job`, data, headers)
          .then((res) => {
            console.log(res.data);
            setApplications(res.data);
          });

        setIsLoaded(true);
      }
    }
  }, [router.isReady]);

  useEffect(() => {
    if (statusChanged) {
      const slug = router.query.slug[0].split('-');
      console.log(slug);

      const jobId = slug[slug.length - 1];

      const token = Cookies.get('token');

      const headers = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const data = {
        jobId: jobId,
      };

      axios
        .post(`${apiUrl}/wp-json/rs/v1/applications/job`, data, headers)
        .then((res) => {
          console.log(res.data);
          setApplications(res.data);
        });

      setIsLoaded(true);
      setStatusChanged(false);
    }
  }, [statusChanged]);

  const dots = (id, name, jobId, applicationId) => {
    Swal.fire({
      title: name,
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: 'Good',
      denyButtonText: `Maybe`,
      cancelButtonText: 'Rejected',
      confirmButtonColor: '#B1D3B9',
      denyButtonColor: '#FFD0A0',
      cancelButtonColor: '#FF9898',
      input: 'textarea',
      inputPlaceholder: 'Email message',
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
        console.log('good');

        axios
          .post(
            `${apiUrl}/wp-json/rs/v1/application/status`,
            { status: 'good', applicationId: applicationId },
            headers
          )
          .then((res) => {
            console.log(res.data);
            setStatusChanged(true);
          })
          .catch((err) => {
            console.log(err.response.data.message);
          });
      } else if (result.isDenied) {
        axios
          .post(
            `${apiUrl}/wp-json/rs/v1/application/status`,
            { status: 'maybe', applicationId: applicationId },
            headers
          )
          .then((res) => {
            console.log(res.data);
            setStatusChanged(true);
          })
          .catch((err) => {
            console.log(err.response.data.message);
          });
      } else if (result.isDismissed) {
        axios
          .post(
            `${apiUrl}/wp-json/rs/v1/application/status`,
            { status: 'rejected', applicationId: applicationId },
            headers
          )
          .then((res) => {
            console.log(res.data);
            setStatusChanged(true);
          })
          .catch((err) => {
            console.log(err.response.data.message);
          });
      }
    });
  };

  return (
    <>
      <Sidebar />

      <div className="dashboardContainer">
        <div className="view">
          <h1>Applications</h1>
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

        {view === 'table' && isLoaded ? (
          <div className="">
            <table className="table">
              <thead className="table__header">
                <tr className="table__header__row">
                  <th className="table__header__row__cell">Job</th>
                  <th className="table__header__row__cell">NAME</th>
                  <th className="table__header__row__cell">E-MAIL</th>
                  <th className="table__header__row__cell">PHONE</th>
                  <th className="table__header__row__cell">DATE APPLIED</th>
                  <th className="table__header__row__cell">CV</th>
                  <th className="table__header__row__cell">STATUS</th>
                  <th className="table__header__row__cell"></th>
                </tr>
              </thead>
              <tbody className="table__body">
                {isLoaded &&
                  applications.length > 0 &&
                  applications.map((applicant) => (
                    <tr className="table__body__row" key={applicant.ID}>
                      <td className="table__body__row__cell">
                        {/** 
                        <input type={'checkbox'} />
                        */}
                        {applicant.job_title}
                      </td>
                      <td className="table__body__row__cell">
                        {applicant.full_name}
                      </td>
                      <td className="table__body__row__cell">
                        {applicant.email}
                      </td>
                      <td className="table__body__row__cell">
                        {applicant.phone}
                      </td>
                      <td className="table__body__row__cell">
                        {applicant.date}
                      </td>
                      <td className="table__body__row__cell">
                        <a href={applicant.cv_url} download>
                          <FaFileDownload className="table__body__row__cell__icon" />
                        </a>
                      </td>
                      <td className="table__body__row__cell">
                        <Status
                          type={applicant.status}
                          text={applicant.status}
                        />
                      </td>
                      <td className="table__body__row__cell">
                        <HiDotsVertical
                          className="table__body__row__cell__icon"
                          onClick={() =>
                            dots(
                              applicant.ID,
                              applicant.full_name,
                              job.id,
                              applicant.application_id
                            )
                          }
                        />
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="cardsFlex">
            {isLoaded &&
              applications.map((applicant) => (
                <ApplyCard applicant={applicant} key={applicant.ID} />
              ))}
          </div>
        )}
      </div>
    </>
  );
}

export default Applicant;
