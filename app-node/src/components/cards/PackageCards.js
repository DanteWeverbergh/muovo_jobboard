import React from 'react';
import Button from '../buttons/Button';
import { MdArrowForwardIos } from 'react-icons/md';
import Cookies from 'js-cookie';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useRouter } from 'next/router';

function PackageCards({ title, price, description, isSelected }) {
  const apiUrl = process.env.NEXT_PUBLIC_WORDPRESS_URL;
  const router = useRouter();

  const buyNow = (jobs) => {
    //get the amount of jobs from the title
    const parts = jobs.split(' ');
    const number = parts[0];

    //axios Authorization
    const token = Cookies.get('token');

    if (token) {
      const headers = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const data = {
        //
        jobCount: number,
      };

      axios
        .post(`${apiUrl}/wp-json/rs/v1/packages/buy`, data, headers)
        .then((res) => {
          console.log(res.data.code);
          if (res.data.code === 200) {
            Swal.fire('Good job!', 'You can now post jobs!', 'success');
          }
        })
        .catch((err) => {
          console.log(err.response.data.message);
        });

      console.log('buy now!', number, 'jobs');
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'You need to be logged in to buy packages.',
        confirmButtonText: 'Login',
        confirmButtonColor: '#5e5eaa',
        denyButtonText: 'register',
        showDenyButton: true,
        denyButtonColor: '#ffcc51',
        showCancelButton: true,
        cancelButtonColor: '#bab7b7',
      }).then((result) => {
        if (result.isConfirmed) {
          router.push('/auth/login');
        } else if (result.isDenied) {
          router.push('/auth/register');
        }
      });
    }
  };

  return (
    <>
      <div className={`packageCards ${isSelected && 'selected'}`}>
        <h2 className="packageCards__title">{title}</h2>
        <div className="packageCards__content">
          <p className="packageCards__content__info">
            Job Listing on Muovo.eu for 30 days <br />
            Exposure on 15+ social media pages & groups *<br />
            Email notifications to Job Seekers
            <br />
            Monthly Mailshot Blasts
            <br />
            Change of job details at any time before expiry
            <br />
            Listing on Premium Employer Directory
            <br />
          </p>

          <div className="packageCards__content__price">
            <h2>{price}.00€ </h2>
            <div className="packageCards__content__price__info">
              €{price} per job
            </div>
          </div>

          <div className="flex-center">
            <button
              className="packageCards__content__button"
              onClick={() => {
                buyNow(title);
              }}
            >
              BUY NOW <MdArrowForwardIos />
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default PackageCards;
