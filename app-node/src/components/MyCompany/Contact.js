import React, { useEffect, useState } from 'react';
import { BiWorld } from 'react-icons/bi';
import { MdEmail } from 'react-icons/md';
import { FaPhone } from 'react-icons/fa';
import Swal from 'sweetalert2';
import Cookies from 'js-cookie';
import axios from 'axios';

function Contact({ company, editContact, setEditContact }) {
  const apiUrl = process.env.NEXT_PUBLIC_WORDPRESS_URL;
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [website, setWebsite] = useState('');

  useEffect(() => {
    //
    setPhone(company.phone);
    setEmail(company.email);
    setWebsite(company.website);
  }, []);

  const saveContact = () => {
    const token = Cookies.get('token');
    const headers = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const data = {
      type: 'contact',
      phone,
      email,
      website,
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
        <h3>Contact</h3>
        <div className="manageCompany__header__company__buttons">
          <button
            className="manageCompany__header__company__button"
            onClick={() => setEditContact(!editContact)}
          >
            Edit
          </button>
          {editContact && (
            <button
              className="manageCompany__header__company__button save"
              onClick={() => saveContact()}
            >
              Save
            </button>
          )}

          {editContact && (
            <button
              className="manageCompany__header__company__button cancel"
              onClick={() => setEditContact(!editContact)}
            >
              Cancel
            </button>
          )}
        </div>
      </div>

      {!editContact ? (
        <div>
          <p className="social">
            <FaPhone />
            {company.phone}
          </p>
          <p className="social">
            <MdEmail />
            {company.email}
          </p>
          <a
            className="social"
            href={company.website}
            target="_blank"
            rel="noreferrer"
          >
            <BiWorld />
            {company.website}
          </a>
        </div>
      ) : (
        <div className="manageCompany__inputs">
          <div className="social">
            <FaPhone />
            <input
              className="manageCompany__inputs__input"
              type={'text'}
              value={phone}
              onChange={({ target }) => setPhone(target.value)}
            />
          </div>
          <div className="social">
            <MdEmail />
            <input
              className="manageCompany__inputs__input"
              type={'email'}
              value={email}
              onChange={({ target }) => setEmail(target.value)}
            />
          </div>
          <div className="social">
            <BiWorld />
            <input
              className="manageCompany__inputs__input"
              type={'text'}
              value={website}
              onChange={({ target }) => setWebsite(target.value)}
            />
          </div>
        </div>
      )}
    </>
  );
}

export default Contact;
