import { match } from 'assert';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { MdNavigateNext, MdNavigateBefore } from 'react-icons/md';

function Pagination({ page, setPage, type, perPage }) {
  const [amount, setAmount] = useState();
  const [pageNumber, setPageNumber] = useState(page);
  const apiUrl = process.env.NEXT_PUBLIC_WORDPRESS_URL;
  useEffect(() => {
    //

    //console.log(perPage);

    axios
      .get(`${apiUrl}/wp-json/rs/v1/jobs/number/?type=${type}`)
      .then((res) => {
        setAmount(parseInt(res.data));
      });
  }, []);

  const previousPage = () => {
    //
    if (page === 1) {
      console.log('page 1');
    } else {
      setPage((page -= 1));
    }
  };

  const nextPage = () => {
    if (page === Math.ceil(amount / perPage)) {
      console.log('top');
    } else {
      setPage((page += 1));
    }
  };

  return (
    <>
      <div className="pagination">
        <MdNavigateBefore
          className="pagination__icon"
          onClick={() => previousPage()}
        />

        <div className="pagination__numbers">
          <div className="pagination__numbers__number">{page}</div>
        </div>

        <MdNavigateNext
          className="pagination__icon"
          onClick={() => nextPage()}
        />
      </div>
    </>
  );
}

export default Pagination;
