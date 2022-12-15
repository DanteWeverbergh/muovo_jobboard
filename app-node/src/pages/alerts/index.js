import React, { useEffect, useState } from 'react';
import AlertCard from '../../components/cards/AlertCard';
import CopyrightFooter from '../../components/Footer/CopyrightFooter';
import Header from '../../components/Header';
import { FaTrash, FaSave } from 'react-icons/fa';
import axios from 'axios';
import Cookies from 'js-cookie';
import AlertSelect from '../../components/alerts/Select';
import SectorSelect from '../../components/alerts/SectorSelect';
import Footer from '../../components/Footer';

function Index() {
  const apiUrl = process.env.NEXT_PUBLIC_WORDPRESS_URL;

  const [sectors, setSectors] = useState([]);
  const [numberOfAlerts, setNumberOfAlerts] = useState(1);
  const [isLoaded, setIsLoaded] = useState(false);
  const [sector, setSector] = useState('');
  const [alerts, setAlerts] = useState([]);
  const [frequency, setFrequency] = useState('');

  const [newAlert, setNewAlert] = useState(false);
  const [alertDeleted, setAlertDeleted] = useState(false);

  useEffect(() => {
    //create alert first time

    if (sector && frequency) {
      console.log(sector.value);
      console.log(frequency.value);
      const token = Cookies.get('token');

      const headers = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const data = {
        sector: sector,
        frequency: frequency,
      };

      axios
        .post(`${apiUrl}/wp-json/rs/v1/alerts/sector`, data, headers)
        .then((res) => {
          console.log(res.data);
          alert(`Alert for ${sector} activated!`);
          setNewAlert(true);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [sector, frequency]);

  useEffect(() => {
    let unmounted = false;
    const token = Cookies.get('token');
    const headers = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    axios.get(`${apiUrl}/wp-json/rs/v1/alerts/user`, headers).then((res) => {
      console.log('alerts:', res.data);

      if (!unmounted) {
        setAlerts(res.data);
      }
    });

    axios.get(`${apiUrl}/wp-json/rs/v1/taxonomy/sectors`).then((res) => {
      if (!unmounted) {
        setSectors(res.data);
      }
    });

    setIsLoaded(true);

    return () => {
      unmounted = true;
    };
    //
  }, []);

  useEffect(() => {
    //
    if (newAlert === true) {
      let unmounted = false;
      const token = Cookies.get('token');
      const headers = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      axios.get(`${apiUrl}/wp-json/rs/v1/alerts/user`, headers).then((res) => {
        console.log('alerts:', res.data);

        if (!unmounted) {
          setAlerts(res.data);
        }
      });

      axios.get(`${apiUrl}/wp-json/rs/v1/taxonomy/sectors`).then((res) => {
        if (!unmounted) {
          setSectors(res.data);
        }
      });

      setIsLoaded(true);
      setNewAlert(false);

      return () => {
        unmounted = true;
      };
    }
  }, [newAlert]);

  const saveAlert = () => {
    //
    console.log('save');
  };

  const deleteAlert = (id) => {
    //

    console.log(id);

    const token = Cookies.get('token');
    const headers = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    axios
      .delete(`${apiUrl}/wp-json/rs/v1/alerts/delete/?id=${id}`, headers)
      .then((res) => {
        console.log(res.message);
        alert('alert deleted');

        setAlertDeleted(true);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    //
    if (alertDeleted) {
      console.log('deleteteeetetete');

      const token = Cookies.get('token');
      const headers = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      axios.get(`${apiUrl}/wp-json/rs/v1/alerts/user`, headers).then((res) => {
        console.log('alerts:', res.data);

        setAlerts(res.data);
      });
    }
  }, [alertDeleted]);

  const updateAlert = (id) => {
    //
    console.log('update alert', id);
  };

  return (
    <>
      <Header />

      <div className="marginHeader"></div>
      <h2>Job alerts</h2>

      <div className="alert">
        <table className="alert__table">
          <thead className="alert__table__header">
            <tr className="alert__table__header__row">
              <th className="alert__table__header__row__cell">
                <label className="custom-checkbox">
                  <input type={'checkbox'} />
                  <span className="checkmark"></span>
                </label>
              </th>
              <th className="alert__table__header__row__cell">SECTOR</th>
              <th className="alert__table__header__row__cell">FREQUENCY</th>
              <th className="alert__table__header__row__cell"></th>
            </tr>
          </thead>
          <tbody className="alert__table__body">
            {isLoaded &&
              alerts.map((alert) => (
                <tr key={alert.alert_id} className="alert__table__body__row">
                  <td className="alert__table__body__row__cell">
                    <div>
                      <input type={'checkbox'} />
                    </div>
                  </td>
                  <td className="alert__table__body__row__cell">
                    <select className="alert__table__body__row__cell__select">
                      <option>{alert.sector[0]}</option>
                      {isLoaded &&
                        sectors.map((s) => (
                          <option
                            key={s.id}
                            className="alert__table__body__row__cell__select"
                          >
                            {s.sector}
                          </option>
                        ))}
                    </select>
                  </td>
                  <td className="alert__table__body__row__cell">
                    <select className="alert__table__body__row__cell__select">
                      <option>Frequency ... </option>
                      <option>Instant</option>
                      <option>Daily</option>
                      <option>3 Days</option>
                      <option>7 Days</option>
                    </select>
                  </td>
                  <td className="alert__table__body__row__cell">
                    <FaTrash
                      className="alert__table__body__row__cell__icon"
                      onClick={() => deleteAlert(alert.alert_id)}
                    />
                  </td>
                </tr>
              ))}

            {[...Array(numberOfAlerts)].map((el, index) => (
              <>
                <tr className="alert__table__body__row">
                  <td className="alert__table__body__row__cell">
                    <div>
                      <input type={'checkbox'} />
                    </div>
                  </td>
                  <td className="alert__table__body__row__cell">
                    <SectorSelect sector={sector} setSector={setSector} />
                  </td>
                  <td className="alert__table__body__row__cell">
                    <AlertSelect
                      frequency={frequency}
                      setFrequency={setFrequency}
                    />
                  </td>
                  <td className="alert__table__body__row__cell">
                    <FaTrash
                      className="alert__table__body__row__cell__icon"
                      onClick={() => setNumberOfAlerts(numberOfAlerts - 1)}
                    />
                  </td>
                </tr>
              </>
            ))}
          </tbody>
        </table>

        <button
          className="alert__button"
          onClick={() => setNumberOfAlerts(numberOfAlerts + 1)}
        >
          Add more
        </button>
      </div>

      <Footer />
      <CopyrightFooter />
    </>
  );
}

export default Index;
