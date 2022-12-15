import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { IoMdCheckmark, IoMdClose, IoMdAdd, IoMdRemove } from 'react-icons/io';
import Cookies from 'js-cookie';
import Spinner from '../../Spinner';

function JobSeekerAlerts() {
  const [alerts, setAlerts] = useState(1);
  const [sectors, setSectors] = useState([]);

  const [sector, setSector] = useState('');
  const [frequency, setFrequency] = useState('');
  const [myAlerts, setMyAlerts] = useState([]);

  const [isLoaded, setIsLoaded] = useState('');
  const apiUrl = process.env.NEXT_PUBLIC_WORDPRESS_URL;

  useEffect(() => {
    //

    let unmounted = false;
    //get all sectors
    axios.get(`${apiUrl}/wp-json/rs/v1/taxonomy/sectors`).then((res) => {
      if (!unmounted) {
        setSectors(res.data);
      }
    });

    //get all alerts from user

    const headers = {
      headers: {
        Authorization: `Bearer ${Cookies.get('token')}`,
      },
    };

    axios.get(`${apiUrl}/wp-json/rs/v1/alerts/user`, headers).then((res) => {
      res.data.map((alert) => {
        if (alert.user_id == 29) {
          setMyAlerts(alert);
          setIsLoaded(true);
        }
      });
    });

    return () => {
      unmounted = true;
    };
  }, []);

  const sectorSubmit = (e) => {
    e.preventDefault();
  };

  const save = () => {
    console.log(frequency);

    const headers = {
      headers: {
        Authorization: `Bearer ${Cookies.get('token')}`,
      },
    };

    const data = {
      frequency: parseInt(frequency),
      sector: sector,
    };

    console.log(data);

    axios
      .post(`${apiUrl}/wp-json/rs/v1/alerts/sector`, data, headers)
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err.response.data.message);
      });
  };

  const close = () => {
    console.log('close');
  };

  const removeAlert = () => {
    //
  };

  return (
    <>
      {isLoaded ? (
        <div className="alerts">
          <h3 className="alerts__title">Alerts</h3>
          <table className="table">
            <thead className="table__head">
              <tr className="table__head__row">
                <th>Sectors</th>
                <th>Frequency</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody className="table__body">
              {[...Array(alerts)].map((el, index) => (
                <>
                  <tr className="table__body__row">
                    <td className="table__body__row__item">
                      <form onSubmit={sectorSubmit}>
                        <select
                          name="sector"
                          value={frequency}
                          onChange={({ target }) => setSector(target.value)}
                        >
                          {isLoaded &&
                            sectors.map((sector) => (
                              <option key={sector.id} value={sector.sector}>
                                {sector.sector}
                              </option>
                            ))}
                        </select>
                      </form>
                    </td>
                    <td className="table__body__row__item">
                      <select
                        name="frequency"
                        value={frequency}
                        onChange={({ target }) => setFrequency(target.value)}
                      >
                        <option value={0}>Instant</option>
                        <option value={1}>Daily summary</option>
                        <option value={3}>3 Day summary</option>
                        <option value={7}>Weekly summary</option>
                        <option value={30}>Monthly summary</option>
                      </select>
                    </td>
                    <td className="table__body__row__item">
                      <div className="table__body__row__item__icons">
                        <IoMdCheckmark
                          className="table__body__row__item__icons__icon save"
                          onClick={() => save()}
                        />
                        <IoMdClose
                          className="table__body__row__item__icons__icon close"
                          onClick={() => close()}
                        />
                      </div>
                    </td>
                  </tr>
                </>
              ))}
            </tbody>
          </table>

          {alerts != 1 && (
            <IoMdRemove
              className="alerts__icon"
              onClick={() => setAlerts(alerts - 1)}
            />
          )}

          <IoMdAdd
            className="alerts__icon"
            onClick={() => setAlerts(alerts + 1)}
          />

          {alerts}
        </div>
      ) : (
        <Spinner />
      )}
    </>
  );
}

export default JobSeekerAlerts;
