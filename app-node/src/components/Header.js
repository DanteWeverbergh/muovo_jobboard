import { useAuthContext } from 'context/AuthContext';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

import { FaUserCircle, FaAngleDown, FaAngleUp } from 'react-icons/fa';
import Modal from './modals/HeaderModal';
import Cookies from 'js-cookie';
import Swal from 'sweetalert2';
import { RiRouterFill } from 'react-icons/ri';
import { AiOutlineMenu } from 'react-icons/ai';
import MobileMenu from './Header/MobileMenu';
import { HiMenu } from 'react-icons/hi';

function Header() {
  const { isLoggedIn, logout, userRole } = useAuthContext();
  const [modal, setModal] = useState(false);
  const [role, setRole] = useState('');
  const router = useRouter();
  const apiUrl = process.env.NEXT_PUBLIC_WORDPRESS_URL;
  const siteUrl = process.env.SITE_URL;

  const [jobDropDown, setJobDropDown] = useState(false);

  const [mobileMenu, setMobileMenu] = useState(false);
  const [screenWidth, setScreenWidth] = useState('');
  const [isHovering, setIsHovering] = useState(false);
  const [sticky, setSticky] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);

  const handleMouseOver = () => {
    setIsHovering(true);
    //setModal(true);
  };

  const handleMouseOut = () => {
    setIsHovering(false);
    //setModal(false);
  };

  useEffect(() => {
    const token = Cookies.get('token');
    if (token) {
      setLoggedIn(true);
    }

    setScreenWidth(window.innerWidth);

    //
    const changeWidth = () => {
      setScreenWidth(window.innerWidth);
    };

    const resizeHeaderOnScroll = () => {
      const scrollHeight = window.scrollY;
      const shrinkOn = 200;

      // console.log('........', scrollHeight, '........');

      if (scrollHeight > shrinkOn) {
        setSticky(true);
      } else {
        setSticky(false);
      }
    };

    window.addEventListener('resize', changeWidth);
    window.addEventListener('scroll', resizeHeaderOnScroll);
  }, []);

  const applyNow = () => {
    const token = Cookies.get('token');
    if (token) {
      router.push('/jobs');
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'You need to be logged in for this!',
        confirmButtonText: 'Login',
      }).then((result) => {
        if (result.isConfirmed) {
          setModal(true);
        }
      });
    }
  };

  const postAJob = () => {
    const token = Cookies.get('token');
    if (token) {
      router.push('/jobs/admin/create');
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'You need to be logged in for this!',
        confirmButtonText: 'Login',
      }).then((result) => {
        if (result.isConfirmed) {
          setModal(true);
        }
      });
    }
  };

  return (
    <>
      {screenWidth > 1280 ? (
        <>
          <header className={sticky && 'sticky'}>
            <div className={`header ${sticky && 'sticky'} `}>
              <div className="header__logo">
                <Link href={'/'}>
                  <a>
                    <img
                      src={`${apiUrl}/wp-content/uploads/2022/05/Purple_muovo_logo.svg`}
                      alt="logo"
                      className={sticky && 'sticky'}
                    />
                  </a>
                </Link>
              </div>

              <ul className="header__nav">
                <li
                  className={`header__nav__item ${
                    router.pathname === '/jobs' && 'active'
                  }`}
                  onMouseOver={handleMouseOver}
                  onMouseOut={handleMouseOut}
                >
                  <Link href={'/jobs'}>
                    <a className="header__nav__item__link ">
                      Jobs
                      <FaAngleDown />
                    </a>
                  </Link>

                  <ul className="header__nav__item__list">
                    <li className="header__nav__item__list__item">
                      <Link href={'/jobs/sectors'}>
                        <a>Sector</a>
                      </Link>
                    </li>
                    <li className="header__nav__item__list__item">
                      <Link href={'/jobs/sectors'}>
                        <a>Sector</a>
                      </Link>
                    </li>
                    <li className="header__nav__item__list__item">
                      <Link href={'/jobs/sectors'}>
                        <a>Sector</a>
                      </Link>
                    </li>
                  </ul>
                </li>
                <li
                  className={`header__nav__item ${
                    router.pathname === '/directory' && 'active'
                  }`}
                >
                  <Link href={'/directory'}>
                    <a className="header__nav__item__link">Directory</a>
                  </Link>
                </li>
                <li
                  className={`header__nav__item ${
                    router.pathname === '/pricing' && 'active'
                  }`}
                >
                  <Link href={'/pricing'}>
                    <a className="header__nav__item__link ">Pricing</a>
                  </Link>
                </li>
                <li
                  className={`header__nav__item ${
                    router.pathname === '/hrtalks' && 'active'
                  }`}
                >
                  <Link href={'/hrtalks'}>
                    <a className="header__nav__item__link">
                      HR Talks <FaAngleDown />
                    </a>
                  </Link>
                </li>

                <li className="header__nav__item">
                  <button
                    className="header__nav__item__button purple"
                    onClick={() => postAJob()}
                  >
                    Post a job
                  </button>
                </li>
                <li className="header__nav__item">
                  <button
                    className="header__nav__item__button yellow"
                    onClick={() => applyNow()}
                  >
                    Apply now
                  </button>
                </li>
                <li className="header__nav__item">
                  <FaUserCircle
                    className={`profile ${!loggedIn && 'nogLoggedIn'}`}
                    onClick={() => setModal(!modal)}
                    onMouseOver={handleMouseOver}
                    onMouseOut={handleMouseOut}
                  />
                  {modal && <Modal />}
                </li>
              </ul>
            </div>
          </header>
        </>
      ) : (
        <div className="headerMobile">
          <div className="headerMobile__inner">
            <div className="headerMobile__logo">
              <Link href={'/'}>
                <a>
                  <img
                    src={`${apiUrl}/wp-content/uploads/2022/05/Purple_muovo_logo.svg`}
                    alt="logo"
                  />
                </a>
              </Link>
            </div>

            <div className="mobileIcons">
              <FaUserCircle
                className={`profile ${!loggedIn && 'nogLoggedIn'}`}
                onClick={() => router.push('profile')}
                onMouseOver={handleMouseOver}
                onMouseOut={handleMouseOut}
              />

              <HiMenu
                className="headerMobile__icon"
                onClick={() => setMobileMenu(!mobileMenu)}
              />
            </div>
          </div>
          {mobileMenu && (
            <div className="headerMobile__nav">
              <MobileMenu />
            </div>
          )}
        </div>
      )}
    </>
  );
}

export default Header;
