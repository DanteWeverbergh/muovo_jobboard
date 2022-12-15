import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

function Detail() {
  const router = useRouter();
  const { company } = router.query;
  const [id, setId] = useState('');
  useEffect(() => {
    //
    console.log('company:', company);
    const parts = company.split('-');
    const answer = parts[parts.length - 1];

    setId(answer);

    console.log('parts:', parts);
  }, []);

  return (
    <>
      <div>
        <h1>Detail</h1>

        <p>name: {company}</p>

        <p>Id: {id}</p>
      </div>
    </>
  );
}

export default Detail;
