import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Footer from '../../components/Footer';
import CopyrightFooter from '../../components/Footer/CopyrightFooter';
import Header from '../../components/Header';
import Cookies from 'js-cookie';
import Spinner from '../../components/Spinner';
import NothingHere from '../../components/cards/NothingHere';

function Index() {
  const apiUrl = process.env.NEXT_PUBLIC_WORDPRESS_URL;
  const [isLoaded, setIsLoaded] = useState(false);
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    //
    const token = Cookies.get('token');
    const headers = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    axios
      .get(`${apiUrl}/wp-json/rs/v1/applications/jobseeker`, headers)
      .then((res) => {
        console.log(res.data);
        setApplications(res.data);
        setIsLoaded(true);
      })
      .catch((err) => {
        console.log(err.response.data.message);
      });
  }, []);

  return (
    <>
      <Header />
      <div className="mainContainer">
        <div className="myApplications">
          <h1 className="myApplications__title">My applications</h1>

          {isLoaded && applications.length > 0 ? (
            <>
              <div>
                <table className="table">
                  <thead className="table__header">
                    <tr className="table__header__row">
                      <th className="table__header__row__cell">Date & Time</th>
                      <th className="table__header__row__cell">Job</th>
                      <th className="table__header__row__cell">Company</th>
                    </tr>
                  </thead>
                  <tbody className="table__body">
                    {isLoaded &&
                      applications.map((application) => (
                        <tr key={application.id} className="table__body__row">
                          <td className="table__body__row__cell">
                            {application.date}
                          </td>
                          <td className="table__body__row__cell">
                            {application.job}
                          </td>
                          <td className="table__body__row__cell">
                            {application.company}
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </>
          ) : (
            <div>
              {isLoaded && applications.length === 0 ? (
                <>
                  <div>
                    <NothingHere
                      text={"You don't have any applications yet."}
                    />
                  </div>
                </>
              ) : (
                <Spinner />
              )}
            </div>
          )}
        </div>
      </div>
      <Footer />
      <CopyrightFooter />
    </>
  );
}

export default Index;
