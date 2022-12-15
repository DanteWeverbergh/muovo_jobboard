import Link from 'next/link';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useAuthContext } from '../../context/AuthContext';

function RegisterCompany() {
  const { registerCompanyAdmin } = useAuthContext();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    //
    registerCompanyAdmin(data);
  };

  return (
    <>
      <div className="formdiv">
        <form onSubmit={handleSubmit(onSubmit)} className="form">
          <input
            type="email"
            placeholder="email"
            {...register('email', { required: true })}
            className="form__input"
          />
          {errors.email && <p className="form__error">Email is required</p>}
          <input
            type="password"
            placeholder="password"
            {...register('password', { required: true })}
            className="form__input"
          />
          {errors.password && (
            <p className="form__error">Password is required</p>
          )}
          <input
            type="text"
            placeholder="first name"
            {...register('firstName', { required: true })}
            className="form__input"
          />
          {errors.firstName && (
            <p className="form__error">First name is required</p>
          )}
          <input
            type="text"
            placeholder="last name"
            {...register('lastName', { required: true })}
            className="form__input"
          />
          {errors.lastName && (
            <p className="form__error">Last name is required</p>
          )}
          <input
            type="text"
            placeholder="company name"
            {...register('companyName', { required: true })}
            className="form__input"
          />
          {errors.companyName && (
            <p className="form__error">Company name is required</p>
          )}

          <input type="submit" className="form__button" />
        </form>
      </div>
    </>
  );
}

export default RegisterCompany;
