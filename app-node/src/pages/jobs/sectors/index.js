import axios from 'axios';
import React, { useEffect, useState } from 'react';
import SectorCard from '../../../components/cards/SectorCard';
import Footer from '../../../components/Footer';
import CopyrightFooter from '../../../components/Footer/CopyrightFooter';
import Header from '../../../components/Header';
import Spinner from '../../../components/Spinner';

function Index() {
  const [sectors, setSectors] = useState([]);
  const apiUrl = process.env.NEXT_PUBLIC_WORDPRESS_URL;
  const [isLoaded, setIsLoaded] = useState('');

  useEffect(() => {
    //Get all sectors
    axios.get(`${apiUrl}/wp-json/rs/v1/taxonomy/sectors`).then((res) => {
      setSectors(res.data);
      console.log(res.data);
    });

    setIsLoaded(true);
  }, []);

  return (
    <>
      <Header />
      {isLoaded ? (
        <>
          <div className="cardsContainer">
            <div className="sectorCards">
              {isLoaded &&
                sectors.map((sector) => (
                  <SectorCard key={sector.id} sector={sector} />
                ))}
            </div>
          </div>
        </>
      ) : (
        <Spinner />
      )}

      <Footer />
      <CopyrightFooter />
    </>
  );
}

export default Index;
