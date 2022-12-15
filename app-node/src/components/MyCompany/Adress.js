import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import axios from 'axios';
import Swal from 'sweetalert2';

function Adress({ company, editAdress, setEditAdress }) {
  const apiUrl = process.env.NEXT_PUBLIC_WORDPRESS_URL;
  const [adressline_1, setAdressline_1] = useState();
  const [adressline_2, setAdressline_2] = useState();
  const [postcode, setPostCode] = useState('');
  const [town, setTown] = useState('');
  const [country, setCountry] = useState('');
  const [latitude, setLatitude] = useState();
  const [longitude, setLongitude] = useState();

  useEffect(() => {
    //
    console.log('adress');
    setAdressline_1(company.adressline_1);
    setAdressline_2(company.adressline_2);
    setPostCode(company.postcode);
    setTown(company.town);
    setCountry(company.location);
  }, []);

  const saveAddress = () => {
    console.log('save adress');

    const token = Cookies.get('token');
    const headers = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const data = {
      type: 'address',
      adressline_1,
      adressline_2,
      postcode,
      town,
      country,
      latitude,
      longitude,
      slug: company.slug,
    };

    axios
      .post(`${apiUrl}/wp-json/rs/v1/company/update`, data, headers)
      .then((res) => {
        console.log(res.data);
        Swal.fire('Succes!', 'You updated your company.', 'success');
      })
      .catch((err) => {
        console.log(err.response.data.message);
      });
  };

  return (
    <>
      <div className="manageCompany__header__company">
        <h3>Address</h3>
        <div className="manageCompany__header__company__buttons">
          <button
            className="manageCompany__header__company__button"
            onClick={() => setEditAdress(!editAdress)}
          >
            Edit
          </button>
          {editAdress && (
            <button
              className="manageCompany__header__company__button save"
              onClick={() => saveAddress()}
            >
              Save
            </button>
          )}

          {editAdress && (
            <button
              className="manageCompany__header__company__button cancel"
              onClick={() => setEditAdress(!editAdress)}
            >
              Cancel
            </button>
          )}
        </div>
      </div>
      {!editAdress ? (
        <div>
          <p>{`${company.adressline_1}, ${company.adressline_2}`} </p>
          <p>
            {company.postcode}, {company.town}
          </p>
          <p>{company.location}</p>
        </div>
      ) : (
        <div className="manageCompany__inputs">
          <input
            className="manageCompany__inputs__input"
            type={'text'}
            value={adressline_1}
            onChange={({ target }) => setAdressline_1(target.value)}
            placeholder="adressline 1"
          />
          <input
            className="manageCompany__inputs__input"
            type={'text'}
            value={adressline_2}
            onChange={({ target }) => setAdressline_2(target.value)}
            placeholder="adressline 2"
          />

          <input
            className="manageCompany__inputs__input"
            type={'text'}
            value={postcode}
            onChange={({ target }) => setPostCode(target.value)}
            placeholder="postcode"
          />
          <input
            className="manageCompany__inputs__input"
            type={'text'}
            value={town}
            onChange={({ target }) => setTown(target.value)}
            placeholder="town"
          />

          <input
            className="manageCompany__inputs__input"
            type={'text'}
            value={country}
            onChange={({ target }) => setCountry(target.value)}
            placeholder="country"
          />

          <input
            className="manageCompany__inputs__input"
            type={'text'}
            value={latitude}
            onChange={({ target }) => setLatitude(target.value)}
            placeholder="latitude"
          />

          <input
            className="manageCompany__inputs__input"
            type={'text'}
            value={longitude}
            onChange={({ target }) => setLongitude(target.value)}
            placeholder="longitude"
          />
        </div>
      )}
    </>
  );
}

export default Adress;
