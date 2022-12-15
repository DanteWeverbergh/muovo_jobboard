import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Select from 'react-select';

function SectorSelect({ sector, setSector }) {
  //const [sector, setSector] = useState('');
  const [options, setOptions] = useState([]);
  const apiUrl = process.env.NEXT_PUBLIC_WORDPRESS_URL;
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    //

    axios.get(`${apiUrl}/wp-json/rs/v1/taxonomy/sectors`).then((res) => {
      console.log(res.data);

      const arr = [];

      res.data.map((sector) =>
        arr.push({ label: sector.sector, value: sector.sector })
      );

      setOptions(arr);
    });

    setIsLoaded(true);
  }, []);

  const colourStyles = {
    control: (styles) => ({ ...styles, backgroundColor: '#ededed' }),
    option: (styles, { isDisabled }) => {
      return {
        ...styles,
        backgroundColor: isDisabled ? 'red' : '#ededed',
        color: '#5e5eaa',
        cursor: isDisabled ? 'not-allowed' : 'default',
      };
    },
  };

  const customStyles = {
    control: (provided, state) => ({
      ...provided,
      background: '#fff',
      minHeight: '30px',
      height: '30px',
      boxShadow: state.isFocused ? null : null,
    }),

    valueContainer: (provided, state) => ({
      ...provided,
      height: '30px',
      padding: '0 6px',
    }),

    input: (provided, state) => ({
      ...provided,
      margin: '0px',
    }),
    indicatorSeparator: (state) => ({
      display: 'none',
    }),
    indicatorsContainer: (provided, state) => ({
      ...provided,
      height: '30px',
    }),
  };

  const onChangeInput = (value) => {
    setSector(value);
  };

  return (
    <>
      {/**
      {isLoaded && (
        <Select
          styles={colourStyles}
          options={options}
          customStyles={customStyles}
          onChange={onChangeInput}
        />
      )}
       */}
      <select
        className="alert__table__body__row__cell__select"
        onChange={({ target }) => setSector(target.value)}
        value={sector}
      >
        <option value="" disabled selected>
          Select sector...
        </option>
        {isLoaded &&
          options.map((option) => (
            <option
              key={option.value}
              value={option.value}
              className="alert__table__body__row__cell__select"
            >
              {option.label}
            </option>
          ))}
      </select>
    </>
  );
}

export default SectorSelect;
