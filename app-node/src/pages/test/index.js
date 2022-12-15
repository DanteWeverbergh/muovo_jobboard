import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

function Index() {
  const [id, setId] = useState(26000);
  const [company, setCompany] = useState('company name');

  return (
    <>
      <div className="test">
        <img src="/images/Muovo_arrow.svg" alt="arrow" />
      </div>
    </>
  );
}

export default Index;
