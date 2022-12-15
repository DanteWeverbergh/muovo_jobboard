import React, { useEffect, useState } from 'react';
import axios from 'axios';
import CompanyCards from '../cards/CompanyCards';
import {
  MdOutlineKeyboardArrowLeft,
  MdOutlineKeyboardArrowRight,
} from 'react-icons/md';
import { FaAngleDown } from 'react-icons/fa';
import { useRouter } from 'next/router';

function Directory({ screenWidth }) {
  const [companies, setCompanies] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const router = useRouter();

  const apiUrl = process.env.NEXT_PUBLIC_WORDPRESS_URL;

  useEffect(() => {
    //
    const page = 1;
    const perPage = screenWidth <= 768 ? 4 : 6;

    console.log('changewidt......');

    axios
      .get(
        `${apiUrl}/wp-json/rs/v1/companies/?page=${page}&per_page=${perPage}`
      )
      .then((res) => {
        //console.log(res.data);
        setCompanies(res.data);
      })
      .then((err) => {
        //console.log(err.response.data.message);
      });

    setIsLoaded(true);
  }, [screenWidth]);

  return (
    <>
      <div className="directory">
        <h1 className="directory__title">
          Employer <strong>directory.</strong>
        </h1>
        <h3 className="directory__subtitle">Lorem ipsum dolor sit amet</h3>

        <div className="directory__container">
          <div className="directory__cards">
            {isLoaded &&
              companies.map((company) => (
                <CompanyCards key={company.id} company={company} />
              ))}
          </div>

          <div
            className="directory__container__more "
            onClick={() => router.push('/directory')}
          >
            <h4>Explore hiring companies</h4>
            <FaAngleDown className="featured__more__icon" />
          </div>
        </div>
      </div>
    </>
  );
}

export default Directory;
