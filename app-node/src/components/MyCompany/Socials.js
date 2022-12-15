import React, { useEffect, useState } from 'react';
import {
  FaFacebookSquare,
  FaInstagramSquare,
  FaLinkedin,
  FaTwitterSquare,
  FaYoutubeSquare,
} from 'react-icons/fa';
import Cookies from 'js-cookie';
import axios from 'axios';
import Swal from 'sweetalert2';

function Socials({ company, editSocials, setEditSocials }) {
  const apiUrl = process.env.NEXT_PUBLIC_WORDPRESS_URL;
  const [facebook, setFacebook] = useState('');
  const [instagram, setInstagram] = useState('');
  const [twitter, setTwitter] = useState('');
  const [youtube, setYoutube] = useState('');
  const [linkedin, setLinkedin] = useState('');

  useEffect(() => {
    //
    setFacebook(company.facebook);
    setInstagram(company.instagram);
    setTwitter(company.twitter);
    setYoutube(company.youtube);
    setLinkedin(company.linkedin);

    console.log(company);
  }, []);

  const saveSocials = () => {
    //

    const token = Cookies.get('token');
    const headers = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const data = {
      type: 'socials',
      facebook,
      instagram,
      twitter,
      youtube,
      linkedin,
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
        <h3>Socials</h3>
        <div className="manageCompany__header__company__buttons">
          <button
            className="manageCompany__header__company__button"
            onClick={() => setEditSocials(!editSocials)}
          >
            Edit
          </button>
          {editSocials && (
            <button
              className="manageCompany__header__company__button save"
              onClick={() => saveSocials()}
            >
              Save
            </button>
          )}

          {editSocials && (
            <button
              className="manageCompany__header__company__button cancel"
              onClick={() => setEditSocials(!editSocials)}
            >
              Cancel
            </button>
          )}
        </div>
      </div>
      {!editSocials ? (
        <div>
          <p className="social">
            <FaFacebookSquare />{' '}
            <a href={company.facebook} target="_blank" rel="noreferrer">
              Facebook
            </a>
          </p>
          <p className="social">
            <FaInstagramSquare />{' '}
            <a href={company.instagram} target="_blank" rel="noreferrer">
              Instagram
            </a>
          </p>
          <p className="social">
            <FaTwitterSquare />{' '}
            <a href={company.twitter} target="_blank" rel="noreferrer">
              Twitter
            </a>
          </p>
          <p className="social">
            <FaYoutubeSquare />{' '}
            <a href={company.youtube} target="_blank" rel="noreferrer">
              Youtube
            </a>
          </p>
          <p className="social">
            <FaLinkedin />{' '}
            <a href={company.linkedin} target="_blank" rel="noreferrer">
              Linkedin
            </a>
          </p>
        </div>
      ) : (
        <div className="manageCompany__inputs">
          <div className="social">
            <FaFacebookSquare />
            <input
              className="manageCompany__inputs__input"
              type={'text'}
              value={facebook}
              onChange={({ target }) => setFacebook(target.value)}
            />
          </div>
          <div className="social">
            <FaInstagramSquare />
            <input
              className="manageCompany__inputs__input"
              type={'text'}
              value={instagram}
              onChange={({ target }) => setInstagram(target.value)}
            />
          </div>
          <div className="social">
            <FaTwitterSquare />
            <input
              className="manageCompany__inputs__input"
              type={'text'}
              value={twitter}
              onChange={({ target }) => setTwitter(target.value)}
            />
          </div>
          <div className="social">
            <FaYoutubeSquare />
            <input
              className="manageCompany__inputs__input"
              type={'text'}
              value={youtube}
              onChange={({ target }) => setYoutube(target.value)}
            />
          </div>
          <div className="social">
            <FaLinkedin />
            <input
              className="manageCompany__inputs__input"
              type={'text'}
              value={linkedin}
              onChange={({ target }) => setLinkedin(target.value)}
            />
          </div>
        </div>
      )}
    </>
  );
}

export default Socials;
