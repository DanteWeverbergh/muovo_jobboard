import React, { useState } from 'react';
import { css } from '@emotion/react';
import DotLoader from 'react-spinners/DotLoader';

const override = css`
  display: block;
  margin: 0 auto;
  border-color: #5e5eaa;
`;

function Spinner() {
  let [color, setColor] = useState('#5e5eaa');
  const [loading, setLoading] = useState(true);

  return (
    <>
      <DotLoader color={color} loading={loading} css={override} size={250} />
    </>
  );
}

export default Spinner;
