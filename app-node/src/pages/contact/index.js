import React from 'react';
import Header from '../../components/Header';
import { useForm } from 'react-hook-form';
import CopyrightFooter from '../../components/Footer/CopyrightFooter';
import axios from 'axios';
import Swal from 'sweetalert2';
import Head from 'next/head';
import Footer from '../../components/Footer';

function Index() {
  const apiUrl = process.env.NEXT_PUBLIC_WORDPRESS_URL;
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    console.log(data);

    axios.post(`${apiUrl}/wp-json/rs/v1/contact`, data).then((res) => {
      //console.log(res.data);
      Swal.fire('Email send!', res.data.message, 'success');
    });
  };
  return (
    <>
      <Head>
        <title>Muovo - contact</title>
      </Head>

      <Header />
      <div className="contact">
        <form onSubmit={handleSubmit(onSubmit)} className="contact__form">
          <div className="contact__form__inputs">
            <input
              className="contact__form__inputs__input"
              type="text"
              placeholder="firstname"
              {...register('firstName', { required: true })}
            />

            <input
              className="contact__form__inputs__input"
              type="text"
              placeholder="lastname"
              {...register('lastName', { required: true })}
            />
          </div>
          <div className="contact__form__inputs">
            <input
              className="contact__form__inputs__input"
              type="text"
              placeholder="Subject"
              {...register('subject', { required: true })}
            />

            <input
              className="contact__form__inputs__input"
              type="text"
              placeholder="Email"
              {...register('email', { required: true })}
            />
          </div>

          <textarea
            className="contact__form__textarea"
            placeholder="Start typing your message here..."
            rows={16}
            {...register('message', { required: true })}
          />

          <input
            className="contact__form__button"
            type="submit"
            value={'Send message'}
          />
        </form>

        <div className="contact__map">
          <iframe
            width="600"
            height="550"
            id="gmap_canvas"
            src="https://maps.google.com/maps?q=rocksteady%20birkirkira&t=&z=15&ie=UTF8&iwloc=&output=embed"
            frameBorder="0"
            scrolling="no"
            marginHeight="0"
            marginWidth="0"
          ></iframe>
        </div>
      </div>

      <Footer />

      <CopyrightFooter />
    </>
  );
}

export default Index;
