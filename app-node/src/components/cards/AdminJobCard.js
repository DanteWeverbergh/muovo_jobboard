import axios from 'axios';
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { FaUser } from 'react-icons/fa';
import Swal from 'sweetalert2';

function AdminJobCard({ job }) {
  const apiUrl = process.env.NEXT_PUBLIC_WORDPRESS_URL;
  const router = useRouter();
  useEffect(() => {
    //
    console.log(job.active);
  }, []);

  const closeJob = () => {
    //

    const token = Cookies.get('token');

    const headers = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const data = {
      jobId: job.id,
      package_id: job.package_id,
    };

    axios
      .post(`${apiUrl}/wp-json/rs/v1/jobs/close`, data, headers)
      .then((res) => {
        console.log(res.data);
        alert(res.data);
      })
      .catch((err) => {
        console.log(err.response.data.message);
      });
  };

  const renewJob = () => {
    //

    const token = Cookies.get('token');

    const headers = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const data = {
      jobId: job.id,
      package_id: job.package_id,
    };

    axios
      .post(`${apiUrl}/wp-json/rs/v1/jobs/renew`, data, headers)
      .then((res) => {
        console.log(res.data);
        alert(res.data);
      })
      .catch((err) => {
        console.log(err.response.data.message);
        Swal.fire('Oops!', err.response.data.message, 'error');
      });
  };

  return (
    <>
      <div className="AdminJobCard">
        <div className="AdminJobCard__header">
          <div className="flex">
            <div className="AdminJobCard__header__status">status</div>
            <div
              className={`AdminJobCard__header__status__${
                job.active ? 'green' : 'red'
              }`}
            ></div>
          </div>
          <div className="AdminJobCard__header__applications">
            {job.applications === null ? '0' : job.applications.length}{' '}
            <FaUser />
            <br /> Applications
          </div>
        </div>
        <div className="AdminJobCard__content">
          <h1 className="AdminJobCard__content__title">{job.title}</h1>
          <div>
            <div>Posted: {job.date_posted} </div>
            <div> Expires: {job.active_until}</div>
          </div>
        </div>

        <div className="AdminJobCard__footer">
          <div className="">posted by: ...</div>
          <div className="AdminJobCard__footer__buttons">
            <button
              onClick={() =>
                router.push(`/jobs/admin/edit/${job.slug}-${job.id}`)
              }
            >
              EDIT
            </button>
            <button onClick={() => closeJob()}>CLOSE</button>
            <button onClick={() => renewJob()}>RENEW</button>
          </div>
        </div>
      </div>
    </>
  );
}

export default AdminJobCard;
