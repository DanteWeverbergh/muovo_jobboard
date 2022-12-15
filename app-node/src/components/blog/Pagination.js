import StarterKit from '@tiptap/starter-kit';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from 'react-icons/md';

function Pagination({ currentPage, setCurrentPage, perPage, type, amount }) {
  const [pageLimit, setpageLimit] = useState(3);
  const [pages, setPages] = useState('');
  const apiUrl = process.env.NEXT_PUBLIC_WORDPRESS_URL;
  //const [currentPage, setCurrentPage] = useState(1);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    //

    console.log('.....Pagination......');
    console.log(currentPage);
    console.log(perPage);
    console.log(type);
    console.log('amount', amount);

    axios.get(`${apiUrl}/wp-json/rs/v1/amount/?type=${type}`).then((res) => {
      const total = parseInt(res.data);
      console.log('total', total);

      setPages(Math.round(total / perPage));

      //les then 3 pages -> change pagelimit
      if (Math.round(total / perPage) <= pageLimit) {
        setpageLimit(Math.round(total / perPage));
      }

      console.log('pages', Math.round(total / perPage));
    });
    setIsLoaded(true);
  }, []);

  //pagination function

  const goToNextPage = () => {
    setCurrentPage((page) => page + 1);
  };

  const goToPreviousPage = () => {
    setCurrentPage((page) => page - 1);
  };

  const changePage = (e) => {
    const pageNumber = Number(e.target.textContent);
    setCurrentPage(pageNumber);
  };

  const getPaginationGroup = () => {
    //
    let start = Math.floor((currentPage - 1) / pageLimit) * pageLimit;
    return new Array(pageLimit).fill().map((_, idx) => start + idx + 1);
  };

  return (
    <>
      {/* {getPaginationGroup().map((item, index) => (
            <button
              key={index}
              onClick={changePage}
              className={`paginationItem ${
                currentPage === item ? 'paginationActive' : null
              }`}
            >
              <span>{item}</span>
            </button>
          ))} */}

      {isLoaded && (
        <div className="blogPagination">
          <button
            onClick={goToPreviousPage}
            className={`prev ${currentPage === 1 ? 'disabled' : ''}`}
            disabled={currentPage === 1 ? true : false}
          >
            <MdKeyboardArrowLeft />
          </button>

          {currentPage > pageLimit && (
            <>
              <div onClick={() => setCurrentPage(1)}>1</div>
              <div>...</div>
            </>
          )}

          {currentPage === pages ? (
            <>
              <button
                className={
                  currentPage === 1
                    ? 'paginationItem paginationActive'
                    : 'paginationItem'
                }
              >
                <span>{currentPage - 2}</span>
              </button>
            </>
          ) : (
            <button
              className={
                currentPage === 1
                  ? 'paginationItem paginationActive'
                  : 'paginationItem'
              }
            >
              <span>{currentPage === 1 ? currentPage : currentPage - 1}</span>
            </button>
          )}

          {currentPage === pages ? (
            <button
              className={
                currentPage === 1
                  ? 'paginationItem paginationActive'
                  : 'paginationItem'
              }
            >
              <span>{currentPage - 1}</span>
            </button>
          ) : (
            <>
              <button
                onClick={() =>
                  setCurrentPage(
                    currentPage === 1 ? currentPage + 1 : currentPage
                  )
                }
                className={
                  currentPage === 1
                    ? 'paginationItem '
                    : 'paginationItem paginationActive'
                }
              >
                <span>{currentPage === 1 ? currentPage + 1 : currentPage}</span>
              </button>
            </>
          )}

          {currentPage === pages ? (
            <button className="paginationItem paginationActive">
              <span>{currentPage}</span>
            </button>
          ) : (
            <>
              <button className="paginationItem">
                <span>
                  {currentPage === 1 ? currentPage + 2 : currentPage + 1}
                </span>
              </button>
              <div>...</div>
              <div onClick={() => setCurrentPage(pages)}>{pages}</div>
            </>
          )}

          <button
            onClick={goToNextPage}
            className={`next ${currentPage === pages ? 'disabled' : ''}`}
          >
            <MdKeyboardArrowRight
              disabled={currentPage === pages ? true : false}
            />
          </button>
        </div>
      )}
    </>
  );
}

export default Pagination;
