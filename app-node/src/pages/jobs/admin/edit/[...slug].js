import axios from 'axios';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import JobForm from '../../../../components/jobs/forms/JobForm';
import Sidebar from '../../../../components/Sidebar';
import { useForm } from 'react-hook-form';
import Spinner from '../../../../components/Spinner';
import BackButton from '../../../../components/BackButton';
import Cookies from 'js-cookie';

function EditJob() {
  const router = useRouter();
  const { slug } = router.query;
  const apiUrl = process.env.NEXT_PUBLIC_WORDPRESS_URL;
  const [job, setJob] = useState({});
  const [isLoaded, setIsLoaded] = useState(false);
  const [jobId, setJobId] = useState('');

  useEffect(() => {
    //
    if (router.isReady) {
      //

      const parts = slug[0].split('-');
      const jobId = parts[parts.length - 1];
      setJobId(jobId);

      axios
        .post(`${apiUrl}/wp-json/rs/v1/jobs/id`, { id: jobId })
        .then((res) => {
          console.log(res.data);
          setJob(res.data);
        });
    }

    setIsLoaded(true);
  }, [router.isReady]);

  const intialValues = {
    title: job.jobTitle,
    jobDescription: job.jobDescription,
    jobType: job.jobType,
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    console.log(data);
    //
    const token = Cookies.get('token');
    const headers = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    };

    const editData = {
      ...data,
      jobId: jobId,
    };

    axios
      .put(`${apiUrl}/wp-json/rs/v1/job/update`, editData, headers)
      .then((res) => {
        console.log(res.data);

        if (res.data.code === 200) {
          router.push('/jobs/admin');
        }
      })
      .catch((err) => {
        alert(err);
      });
  };
  console.log(errors);

  return (
    <>
      <Sidebar />
      <div className="dashboardContainer">
        {isLoaded && job.jobTitle ? (
          <>
            <BackButton />
            <h1 className="editTitle">Edit: {job.jobTitle}</h1>

            <JobForm
              handleSubmit={handleSubmit}
              register={register}
              onSubmit={onSubmit}
              intialValues={intialValues}
              type={'edit'}
            />
          </>
        ) : (
          <Spinner />
        )}
      </div>
    </>
  );
}

export default EditJob;
