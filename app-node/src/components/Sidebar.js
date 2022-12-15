import React, { useEffect, useState } from 'react';
import { useAuthContext } from 'context/AuthContext';
import Link from 'next/link';
import Image from 'next/image';
import { FaBuilding, FaUserTie, FaHome, FaGem, FaHeart } from 'react-icons/fa';
import { CgProfile } from 'react-icons/cg';
import { useRouter } from 'next/router';

function Sidebar() {
  const { logout } = useAuthContext();
  const apiUrl = process.env.NEXT_PUBLIC_WORDPRESS_URL;
  const siteUrl = process.env.SITE_URL;
  const [company, setCompany] = useState('');
  const router = useRouter();

  const [jobs, setJobs] = useState(false);
  const [packages, setPackages] = useState(false);

  useEffect(() => {
    setCompany(sessionStorage.getItem('company'));
  }, []);

  return (
    <>
      <div className="sidebar">
        <div className="sidebar__header">
          <div
            className="sidebar__header__logo"
            onClick={() => router.push('/jobs/admin')}
          >
            <CgProfile className="sidebar__header__logo__icon" />
          </div>
        </div>

        <div className="sidebar__content">
          <ul className="sidebar__content__list">
            <li className="sidebar__content__list__item">
              <Link href={'/jobs/admin'}>
                <a>All jobs</a>
              </Link>

              <div className="sidebar__content__list__item__sublist">
                <div className="sidebar__content__list__item__sublist__item">
                  <Link href={'/jobs/admin/create'}>
                    <a>Post job</a>
                  </Link>
                </div>
                <div className="sidebar__content__list__item__sublist__item">
                  <Link href={'/applications'}>
                    <a>All Applications</a>
                  </Link>
                </div>
              </div>
            </li>

            <li className="sidebar__content__list__item">
              <Link href={'/mypackages'}>
                <a>Packages</a>
              </Link>
            </li>
            <li className="sidebar__content__list__item">
              <Link href={'/mycompany'}>
                <a>Manage company</a>
              </Link>
            </li>
            <li className="sidebar__content__list__item">
              <Link href={'/myaccount'}>
                <a>My Account</a>
              </Link>
            </li>
            <li className="sidebar__content__list__item">
              <a
                target={'_blank'}
                href={`/directory/${company.replaceAll(' ', '-')}`}
                rel="noreferrer"
              >
                Website
              </a>
            </li>
            <li className="sidebar__content__list__item">
              <button
                className="sidebar__content__list__item__button"
                onClick={() => logout()}
              >
                Logout
              </button>
            </li>
          </ul>
        </div>

        <div className="sidebar__footer">
          <div className="sidebar__footer__logo">
            <img
              alt="logo"
              src={`${apiUrl}/wp-content/uploads/2022/05/Purple_muovo_logo.svg`}
            />
          </div>
          <h1>Contact support</h1>
          <h3>The penthouse</h3>
          <h3>Ewropa Business Center</h3>
          <h3>Birkirkara, Malta</h3>
          <h3>+356 2017 3007</h3>
          <h3>info@muovo.eu</h3>
        </div>
        <div className="sidebar__copyrightfooter">
          2022 Muovo All rights reserved. A brand
          <strong> Broadwing Ltd.</strong>
        </div>
      </div>
    </>
  );
}

export default Sidebar;
