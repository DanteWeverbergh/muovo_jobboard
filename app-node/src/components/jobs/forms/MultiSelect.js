import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Select from 'react-select';

function MultiSelect({ setSearchSectors }) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [sectors, setSectors] = useState([]);
  const [options, setOptions] = useState([{ label: 'test', value: 'test' }]);

  useEffect(() => {
    const apiUrl = process.env.NEXT_PUBLIC_WORDPRESS_URL;
    //get all the sectors
    axios.get(`${apiUrl}/wp-json/rs/v1/taxonomy/sectors`).then((res) => {
      setSectors(res.data);

      console.log(res.data);

      const arr = [];

      res.data.map((sector) =>
        arr.push({ label: sector.sector, value: sector.sector })
      );

      console.log('arr', arr);

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
            placeholder="sectors..."
            //menuPlacement="auto"
            maxMenuHeight={180}
          />
        </div>
      )}
    </>
  );
}

export default MultiSelect;
