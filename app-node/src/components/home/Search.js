import React, { useEffect, useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import FeaturedSearch from './FeaturedSearch';
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';

function Search() {
  const [searchTerm, setSearchTerm] = useState('');
  const router = useRouter();
  const [screenWidth, setScreenWidth] = useState('');
  const [isMobile, setIsMobile] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    router.push(
      `/jobs/?searchTerm=${searchTerm.toLowerCase().replace(/\s/g, '-')}`
    );

    console.log(searchTerm);
  };

  return (
    <>
      <div className="searchHome">
        <h1 className="searchHome__title">
          Find the <strong> right</strong> job for you!
        </h1>

        <form className="searchHome__form" onSubmit={handleSubmit}>
          <div className="input">
            <input
              className="searchHome__form__input"
              placeholder="Search jobs, keywords, companies or locations"
              value={searchTerm}
              onChange={({ target }) => setSearchTerm(target.value)}
            />

            <FaSearch
              className="searchHome__form__icon"
              onClick={handleSubmit}
            />
          </div>
        </form>

        <h3>Featured Job Searches:</h3>
        <div className="searchHome__featured">
          <FeaturedSearch
            setSearchTerm={setSearchTerm}
            search={'Work from home'}
          />
          <FeaturedSearch setSearchTerm={setSearchTerm} search={'Accounting'} />
          <FeaturedSearch
            setSearchTerm={setSearchTerm}
            search={'Wordpress developer'}
          />
          <FeaturedSearch
            setSearchTerm={setSearchTerm}
            search={'Sales Executive'}
            isMobile={isMobile}
          />
          <FeaturedSearch setSearchTerm={setSearchTerm} search={'Compliance'} />
          <FeaturedSearch
            setSearchTerm={setSearchTerm}
            search={'Administrator'}
            isMobile={isMobile}
          />
          <FeaturedSearch
            setSearchTerm={setSearchTerm}
            search={'Financial Services'}
            isMobile={isMobile}
          />
          <FeaturedSearch
            setSearchTerm={setSearchTerm}
            search={'Maltese Speaking'}
            isMobile={isMobile}
          />
        </div>
      </div>
    </>
  );
}

export default Search;
