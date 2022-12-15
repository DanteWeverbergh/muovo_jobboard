import axios from 'axios';
import { useRouter } from 'next/router';
import React from 'react';
import { MdClose } from 'react-icons/md';
import Modal from 'react-modal';
import EmploymentSelect from './forms/EmploymentSelect';
import MultiSelect from './forms/MultiSelect';

function SearchModal({
  searchModal,
  setSearchModal,
  searchTerm,
  setSearchSectors,
  searchSectors,
  setSeachTerm,
  setResetFilters,
  setNoJobsFound,
  setJobs,
  setAmount,
}) {
  const router = useRouter();
  const apiUrl = process.env.NEXT_PUBLIC_WORDPRESS_URL;

  //Styles modal
  const customStyles = {
    overlay: {
      backgroundColor: 'rgba(130, 130, 130, 0.75)',
    },
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      border: 'none',
    },
  };

  const handleChange = () => {
    setChecked(!checked);
  };

  const closeModal = () => {
    //
    console.log('close modal');
    setSearchModal(false);
    setResetFilters(true);
  };

  const searchJobs = (e) => {
    e.preventDefault();
    console.log('search jobs');

    console.log('......................');
    console.log(searchSectors);
    console.log('......................');

    if (searchTerm && !searchSectors[0].label) {
      router.push({
        query: { searchTerm: searchTerm },
      });
    } else if (!searchTerm && searchSectors[0].label) {
      //
      router.push({
        query: { sectors: searchSectors[0].label },
      });
    } else {
      router.push({
        query: { searchTerm: searchTerm, sectors: searchSectors[0].label },
      });
    }

    console.log('searchtrem', searchTerm);
    console.log('sectors', searchSectors);

    const sec = [];
    if (searchSectors.length != 0) {
      searchSectors.map((sector) => sec.push(sector.value));
    }

    const query = {
      searchTerm: searchTerm,
      sectors: sec,
    };

    console.log(query);

    axios
      .post(`${apiUrl}/wp-json/rs/v1/jobs/search/?page=1&per_page=9`, query)
      .then((res) => {
        console.log('axios', res.data);
        if (res.data != 0) {
          setNoJobsFound(false);
          setJobs(res.data);
          setAmount(res.data.length);

          console.log(res.data);
        } else {
          setNoJobsFound(true);
          console.log('........................');
        }
      });

    setSearchModal(false);
  };

  return (
    <>
      <Modal isOpen={searchModal} style={customStyles} ariaHideApp={false}>
        <div className="searchModal">
          <button className="searchModal__button" onClick={() => closeModal()}>
            <MdClose className="icon" />
          </button>

          <form onSubmit={searchJobs} className="searchModal__form">
            <input
              type={'text'}
              placeholder="search..."
              className="searchModal__form__input"
              value={searchTerm}
              onChange={({ target }) => setSeachTerm(target.value)}
            />

            <div className="searchModal__form__selects">
              <MultiSelect setSearchSectors={setSearchSectors} />
              <EmploymentSelect />
            </div>

            <div className="searchModal__form__selects"></div>

            <div className="searchModal__form__checkboxes">
              <div>
                <input
                  className="searchModal__form__checkboxes__checkbox"
                  type="checkbox"
                  placeholder="Full-time"
                  onChange={handleChange}
                  name="fullTime"
                />
                <label
                  className="searchModal__form__checkboxes__label"
                  htmlFor="fullTime"
                >
                  Full time
                </label>
              </div>
              <div>
                <input
                  className="searchModal__form__checkboxes__checkbox"
                  type="checkbox"
                  placeholder="Part-time"
                  onChange={handleChange}
                  name="partTime"
                />
                <label
                  className="searchModal__form__checkboxes__label"
                  htmlFor="partTime"
                >
                  Part time
                </label>
              </div>
              <div>
                <input
                  className="searchModal__form__checkboxes__checkbox"
                  type="checkbox"
                  placeholder="Remote"
                  onChange={handleChange}
                  name="remote"
                />
                <label
                  className="searchModal__form__checkboxes__label"
                  htmlFor="remote"
                >
                  Remote
                </label>
              </div>
              <div>
                <input
                  className="searchModal__form__checkboxes__checkbox"
                  type="checkbox"
                  placeholder="Flexible"
                  onChange={handleChange}
                  name="flexible"
                />
                <label
                  className="searchModal__form__checkboxes__label"
                  htmlFor="flexible"
                >
                  Flexible
                </label>
              </div>
            </div>

            <div className="searchModal__form__buttonDiv">
              <input
                type="submit"
                className="searchModal__form__button"
                value={'Find Job'}
              />
            </div>
          </form>
        </div>
      </Modal>
    </>
  );
}

export default SearchModal;
