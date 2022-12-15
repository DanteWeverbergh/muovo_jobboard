import axios from 'axios';
import React, { useEffect, useState } from 'react';
import MyPackageCards from '../../components/cards/MyPackageCards';
import Sidebar from '../../components/Sidebar';
import Cookies from 'js-cookie';
import Link from 'next/link';
import NothingHere from '../../components/cards/NothingHere';

function Index() {
  const [packages, setPackages] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const apiUrl = process.env.NEXT_PUBLIC_WORDPRESS_URL;

  useEffect(() => {
    //
    const token = Cookies.get('token');
    const headers = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    axios.get(`${apiUrl}/wp-json/rs/v1/packages`, headers).then((res) => {
      console.log(res.data);
      setPackages(res.data);
      setIsLoaded(true);
    });
  }, []);

  return (
    <>
      <Sidebar />

      <div className="dashboardContainer">
        <div className="packages__header">
          <h1>Packages</h1>
          <Link href={'/mypackages/buy'}>
            <a>Buy packages</a>
          </Link>
        </div>

        {isLoaded && packages.length === 0 && (
          <NothingHere
            text={"You don't have any Packages yet. "}
            type="package"
          />
        )}
        <table className="table">
          <thead className="table__header">
            <tr className="table__header__row">
              <th className="table__header__row__cell">Package</th>
              <th className="table__header__row__cell">Expires</th>
              <th className="table__header__row__cell">Jobs posted</th>
            </tr>
          </thead>
          <tbody className="table__body">
            {isLoaded &&
              packages &&
              packages.map((p) => (
                <tr className="table__body__row" key={p.id}>
                  <td className="table__body__row__cell">{p.title}</td>
                  <td>{p.packageExpires}</td>
                  <td>{`${p.jobsPosted === null ? '0' : p.jobsPosted} / ${
                    p.jobCount
                  } `}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default Index;
