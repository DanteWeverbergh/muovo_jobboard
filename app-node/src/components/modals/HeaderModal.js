import React, { useEffect, useState } from 'react';
import { useAuthContext } from '../../context/AuthContext';
import { useForm } from 'react-hook-form';
import Cookies from 'js-cookie';
import Link from 'next/link';

function HeaderModal() {
  const { logout, login, error, setError } = useAuthContext();
  const [loggedIn, setIsLoggedIn] = useState(false);
  const [role, setRole] = useState('');

  useEffect(() => {
    const token = Cookies.get('token');
    setError('');

    setRole(sessionStorage.getItem('role'));

    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

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

  return (
    <>
      <div className="headerModal">
        {!loggedIn ? (
          <>
            {error && <div className="error">{error}</div>}

            <form
              onSubmit={handleSubmit(onSubmit)}
              className="headerModal__form"
            >
              <label htmlFor="email" className="headerModal__form__label">
                Email
              </label>
              <input
                className="headerModal__form__input"
                type="email"
                placeholder="email"
                {...register('email', { required: true })}
              />
              <label htmlFor="password" className="headerModal__form__label">
                Password
              </label>
              <input
                className="headerModal__form__input"
                type="password"
                placeholder="password"
                {...register('password', { required: true })}
              />

              <div className="forgotPasswordLink">
                <Link href={'/auth/forgotpassword'}>
                  <a>Forgot password</a>
                </Link>
              </div>

              <div className="authButtons">
                <input
                  className="headerModal__form__button"
                  type="submit"
                  value={'Login'}
                />
                <Link href={'/auth/register'}>
                  <a>Register</a>
                </Link>
              </div>
            </form>
          </>
        ) : (
          <div className="notLoggedIn">
            <ul className="headerModal__list">
              <li>
                <Link href={'/profile'}>
                  <a>Profile</a>
                </Link>
              </li>
              <li>
                <Link href={'/alerts'}>
                  <a>Alerts</a>
                </Link>
              </li>
              {role === 'jobseeker' && (
                <li>
                  <Link href={'/myapplications'}>
                    <a>My Applications</a>
                  </Link>
                </li>
              )}
              {role === 'companyadmin' && (
                <li>
                  <Link href={'/jobs/admin'}>
                    <a>Dashboard</a>
                  </Link>
                </li>
              )}

              <li>
                <button className="logoutButton" onClick={() => logout()}>
                  Logout
                </button>
              </li>
            </ul>
          </div>
        )}
      </div>
    </>
  );
}

export default HeaderModal;
