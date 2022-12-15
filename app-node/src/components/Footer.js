import axios from 'axios';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import MailchimpSubscribe from 'react-mailchimp-subscribe';
import MailchimpFormContainer from './Mailchimp/MailchimpFormContainer';

function Footer() {
  const apiUrl = process.env.NEXT_PUBLIC_WORDPRESS_URL;
  const siteUrl = process.env.SITE_URL;
  const mailChimpUrl = process.env.NEXT_PUBLIC_MAILCHIMP_URL;
  const [sectors, setSectors] = useState([]);
  const [useFull, setUseFull] = useState([]);
  const [advertise, setAdvertise] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    //
    axios.get(`${apiUrl}/wp-json/menus/v1/menus/footer-menu-1`).then((res) => {
      setSectors(res.data.items);
    });

    axios.get(`${apiUrl}/wp-json/menus/v1/menus/footer-menu-2`).then((res) => {
      setAdvertise(res.data.items);
    });

    axios.get(`${apiUrl}/wp-json/menus/v1/menus/footer-menu-3`).then((res) => {
      setUseFull(res.data.items);
      //console.log(res.data.items);
    });

    setIsLoaded(true);
  }, []);

  return (
    <>
      <div className="newsletter">
        <div className="newsletter__text">
          <h1>Newsletters</h1>
          <h3>Most popular gaming digital nft market place</h3>
        </div>

        <div className="newsletter__form">
          <MailchimpFormContainer />
        </div>
      </div>
      <div className="footer">
        <div className="footer__column">
          <img
            className="footer__logo"
            src={`${apiUrl}/wp-content/uploads/2022/05/Purple_muovo_logo.svg`}
            alt="logo"
          />

          <ul className="footer__column__list">
            <li className="footer__column__list__item">The penthouse</li>
            <li className="footer__column__list__item">
              Exropa Business Center
            </li>
            <li className="footer__column__list__item">Birkirkara, Malta</li>
            <li className="footer__column__list__item">+356 2017 3007 </li>
            <li className="footer__column__list__item">info@muovo.eu</li>
          </ul>
        </div>
        <div className="footer__column">
          <h1>Browse for jobs</h1>
          <ul className="footer__column__list">
            {isLoaded &&
              sectors.map((sector) => (
                <li key={sector.ID} className="footer__column__list__item">
                  <Link href={`/sectors/${sector.slug}`}>
                    <a> {sector.title}</a>
                  </Link>
                </li>
              ))}
          </ul>
        </div>
        <div className="footer__column">
          <h1>Advertise jobs</h1>
          <ul className="footer__column__list">
            {isLoaded &&
              advertise.map((a) => (
                <li key={a.ID} className="footer__column__list__item">
                  <Link href={`/sectors/${a.slug}`}>
                    <a> {a.title}</a>
                  </Link>
                </li>
              ))}
          </ul>
        </div>
        <div className="footer__column">
          <h1>Usefull links</h1>
          <ul className="footer__column__list">
            {isLoaded &&
              useFull.map((u) => (
                <li key={u.ID} className="footer__column__list__item">
                  <Link href={`/${u.slug}`}>
                    <a> {u.title}</a>
                  </Link>
                </li>
              ))}
          </ul>
        </div>
      </div>
    </>
  );
}

export default Footer;
