import axios from 'axios';
import Head from 'next/head';
import Link from 'next/link';
import React from 'react';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';
import Header from '../../components/Header';
import { useAuthContext } from '../../context/AuthContext';

function Login() {
  const apiUrl = process.env.NEXT_PUBLIC_WORDPRESS_URL;
  const { login } = useAuthContext();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    const loginData = {
      username: data.email,
      password: data.password,
    };

    login(loginData);
  };

  const newPassword = async () => {
    console.log('new');

    const { value: recoveryEmail } = await Swal.fire({
      title: 'Input email address',
      input: 'email',
      inputLabel: 'Your email address',
      inputPlaceholder: 'Enter your email address',
    });

    if (recoveryEmail) {
      await axios
        .post(`${apiUrl}/wp-json/bdpwr/v1/reset-password`, {
          email: recoveryEmail,
        })
        .then((res) => {
          Swal.fire(`Recovery mail send to: ${recoveryEmail}`);
        })
        .catch((err) => {
          Swal.fire(`No user was found with the email: ${recoveryEmail}`);
        });
    }
  };

  return (
    <>
      <Head>
        <title>Muovo - Login</title>
      </Head>

      <Header />

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

          <div onClick={() => newPassword()} className="password">
            Forgot password
          </div>

          <input className="form__button" type="submit" />
        </form>
      </div>

      <div className="link">
        <Link href={'/auth/register'}>
          <a>No account yet, Register.</a>
        </Link>
      </div>
    </>
  );
}

export default Login;
