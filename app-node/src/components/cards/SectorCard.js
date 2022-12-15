import axios from 'axios';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

function SectorCard({ sector }) {
  const router = useRouter();
  const apiUrl = process.env.NEXT_PUBLIC_WORDPRESS_URL;
  const [amount, setAmount] = useState('');

  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    //

    axios
      .post(`${apiUrl}/wp-json/rs/v1/jobs/search/?per_page=99&?page=1`, {
        sectors: sector.sector,
      })
      .then((res) => {
        setAmount(res.data.length);
      });

    setIsLoaded(true);
  }, []);

  return (
    <>
      <div
        onClick={() =>
          router.push(
            `/sectors/${sector.sector.replace(/ /g, '-').toLowerCase()}`
          )
        }
        className="sectorCard"
      >
        <h1 className="sectorCard__title">{sector.sector}</h1>

        <div className="sectorCard__amount">{isLoaded && amount}</div>
      </div>
    </>
  );
}

export default SectorCard;
