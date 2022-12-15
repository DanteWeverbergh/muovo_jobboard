import Link from 'next/link';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useAuthContext } from '../../context/AuthContext';

function RegisterJobseeker({ cvUrl }) {
  const { jobseekerRegister } = useAuthContext();

  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    jobseekerRegister(data, cvUrl);
  };
  console.log(errors);

  return (
    <>
      <div className="formdiv">
        <form onSubmit={handleSubmit(onSubmit)} className="form" method="POST">
          {/** 
          <input
            {...register('cv', { required: true })}
            type="file"
            className="form__input"
          />
          */}

          <input
            type="email"
            placeholder="email"
            {...register('email', { required: false })}
            className="form__input"
          />
          <input
            type="password"
            placeholder="password"
            {...register('password', { required: false })}
            className="form__input"
          />
          <input
            type="text"
            placeholder="first name"
            {...register('firstName', { required: false })}
            className="form__input"
          />
          <input
            type="text"
            placeholder="last name"
            {...register('lastName', { required: false })}
            className="form__input"
          />

          <input type="submit" className="form__button" />
        </form>
      </div>
    </>
  );
}

export default RegisterJobseeker;
