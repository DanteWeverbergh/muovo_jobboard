import axios from 'axios';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import Cookies from 'js-cookie';

function EditAccount() {
  const apiUrl = process.env.NEXT_PUBLIC_WORDPRESS_URL;
  const [currentUser, setCurrentUser] = useState({});

  useEffect(() => {
    //get current user

    const headers = {
      headers: {
        Authorization: `Bearer ${Cookies.get('token')}`,
      },
    };
    axios.get(`${apiUrl}/wp-json/rs/v1/user/me`, headers).then((res) => {
      setCurrentUser(res.data);
    });
  }, []);

  const intialValues = {
    //
    firstName: currentUser.firstName,
    lastName: currentUser.lastName,
    email: currentUser.email,
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    console.log(data);

    if (!data.firstName) {
      data.firstName = intialValues.firstName;
    }
    if (!data.lastName) {
      data.lastName = intialValues.lastName;
    }
    if (!data.email) {
      data.email = intialValues.email;
    }

    const headers = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${Cookies.get('token')}`,
      },
    };

    axios
      .put(`${apiUrl}/wp-json/rs/v1/user/update`, data, headers)
      .then((res) => {
        console.log(res);
        alert('profile updated!');
      });
  };
  //console.log(errors);

  return (
    <>
      <div className="editAccount">
        <div className="formdiv">
          <form className="form" onSubmit={handleSubmit(onSubmit)}>
            <input
              type="text"
              placeholder="firstname"
              {...register('firstName', {})}
              className="form__input"
              defaultValue={intialValues.firstName}
            />
            <input
              type="text"
              placeholder="lastname"
              {...register('lastName', {})}
              className="form__input"
              defaultValue={intialValues.lastName}
            />
            <input
              type="text"
              placeholder="email"
              {...register('email', {})}
              className="form__input"
              defaultValue={intialValues.email}
            />
            <Link href={'/auth/forgotpassword'} passHref>
              <div className="form__input password">
                <a>Password</a>
              </div>
            </Link>

            <input type="submit" className="form__button" />
          </form>
        </div>
      </div>
    </>
  );
}

export default EditAccount;
