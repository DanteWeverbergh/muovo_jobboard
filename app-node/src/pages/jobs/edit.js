import React, { useEffect, useState } from 'react';
import Header from '../../components/Header';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import Sidebar from '../../components/Sidebar';

function Edit() {
  const router = useRouter();
  const { id } = router.query;
  const [job, setJob] = useState('');
  const apiUrl = process.env.NEXT_PUBLIC_WORDPRESS_URL;

  useEffect(() => {
    if (id) {
      console.log(id);

      axios
        .post(`${apiUrl}/wp-json/rs/v1/jobs/id`, { id: id })
        .then((res) => {
          setJob(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [id]);

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
  const onSubmit = (data) => console.log(data);
  console.log(errors);

  return (
    <>
      <Header />

      <div className="content">
        <h2>Edit job</h2>

        <div className="formdiv">
          <form onSubmit={handleSubmit(onSubmit)} className="form">
            <input
              defaultValue={intialValues.title}
              type="text"
              placeholder="title"
              {...register('title', { required: true })}
              className="form__input"
            />
            <textarea
              rows={'20'}
              defaultValue={intialValues.jobDescription}
              {...register('Job Description', { required: true })}
              className="form__textarea"
            />

            <select
              {...register('Job type')}
              className="form__input"
              defaultValue={intialValues.jobType}
            >
              <option value="Full time">Full time</option>
              <option value="Part time">Part time</option>
              <option value="Casual">Casual</option>
            </select>

            <input type="submit" className="form__button" />
          </form>
        </div>
      </div>
    </>
  );
}

export default Edit;
