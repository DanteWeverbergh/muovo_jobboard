import React, { useState } from 'react';
import Select from 'react-select';

function AlertSelect({ frequency, setFrequency }) {
  //const [frequency, setFrequency] = useState('');

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
    setFrequency(value);
  };

  const options = [
    { label: 'Instant', value: '0' },
    { label: 'Daily', value: '1' },
    { label: '3 Days', value: '3' },
    { label: 'Weekly', value: '7' },
  ];

  return (
    <>
      {/**
      <Select
        styles={colourStyles}
        options={options}
        customStyles={customStyles}
        onChange={onChangeInput}
      />
       */}

      <select
        className="alert__table__body__row__cell__select"
        onChange={({ target }) => setFrequency(target.value)}
        value={frequency}
      >
        <option value="" disabled selected>
          Select frequency
        </option>
        {options.map((option) => (
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

export default AlertSelect;
