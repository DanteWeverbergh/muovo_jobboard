import axios from 'axios';
import React, { useEffect, useState } from 'react';

function SearchBar({ search, setSearch, perPage, setPerPage }) {
  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(search);
  };

  const [companies, setCompanies] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const apiUrl = process.env.NEXT_PUBLIC_WORDPRESS_URL;

  useEffect(() => {
    let unmounted = false;

    axios.get(`${apiUrl}/wp-json/rs/v1/companies`).then((res) => {
      if (!unmounted) {
        setCompanies(res.data);
        console.log(res.data);
      }

      // console.log(res.data);
    });

    setIsLoaded(true);

    return () => {
      unmounted = true;
    };
  }, []);

  return (
    <>
      <div className="search">
        <form onSubmit={handleSubmit} className="searchform">
          <div className="searchform__item">
            <label className="searchform__item__label">Search</label>
            <input
              type={'text'}
              placeholder="Search keywords"
              onChange={({ target }) => setSearch(target.value)}
              value={search}
              className="searchform__item__item"
            />
          </div>

          <div className="searchform__item">
            <label className="searchform__item__label">Company</label>
            <select className="searchform__item__select">
              {isLoaded &&
                companies.map((company) => (
                  <option key={company.id}>{company.title}</option>
                ))}
            </select>
          </div>

          <div className="searchform__item">
            <label className="searchform__item__label">Jobs per page</label>
            <select
              className="searchform__item__select"
              onChange={({ target }) => setPerPage(target.value)}
              value={perPage}
              name={perPage}
            >
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={15}>15</option>
            </select>
          </div>

          <button type="submit" className="searchform__button">
            Search
          </button>
        </form>
      </div>
    </>
  );
}

export default SearchBar;
