import React from 'react';
import { FaSearch } from 'react-icons/fa';

function FeaturedSearch({ search, setSearchTerm, isMobile }) {
  return (
    <>
      <div
        onClick={() => setSearchTerm(search)}
        className={` ${!isMobile ? 'FeaturedSearch' : 'none'}`}
      >
        <FaSearch className="FeaturedSearch__icon" />
        {search}
      </div>
    </>
  );
}

export default FeaturedSearch;
