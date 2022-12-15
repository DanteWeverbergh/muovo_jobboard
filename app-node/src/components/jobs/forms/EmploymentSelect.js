import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Select from 'react-select';

function EmploymentSelect() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [options, setOptions] = useState([{ label: 'test', value: 'test' }]);

  useEffect(() => {
    //
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
      borderColor: '#fff',
      border: 'none',
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

    multiValue: (styles) => ({
      ...styles,
      borderRadius: '10px',
    }),
  };

  const onChangeInput = (value) => {
    setSearchSectors(value);
  };

  return (
    <>
      {isLoaded && (
        <div className="multiSelect">
          <Select
            //https://www.botsplash.com/post/optimize-your-react-select-component-to-smoothly-render-10k-data
            styles={colourStyles}
            isMulti={true}
            options={options}
            onChange={onChangeInput}
            customStyles={customStyles}
            className="react-select-container"
            classNamePrefix="react-select"
            placeholder="Employment type..."
            //menuPlacement="auto"
            maxMenuHeight={180}
          />
        </div>
      )}
    </>
  );
}

export default EmploymentSelect;
