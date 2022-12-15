import Link from 'next/link';
import React, { useState } from 'react';
import { FaAngleDown } from 'react-icons/fa';

function MobileMenu() {
  const [jobsMenu, setJobsMenu] = useState(false);
  const [hrTalksMenu, setHrTalksMenu] = useState(false);

  return (
    <>
      <ul className="headerMobile__nav__list">
        <li className="headerMobile__nav__list__item">
          <Link href={'/jobs'}>
            <a>Jobs</a>
          </Link>
          <FaAngleDown
            className="headerMobile__nav__list__item__icon"
            onClick={() => setJobsMenu(!jobsMenu)}
          />

          {jobsMenu && (
            <ul className="headerMobile__nav__list__item__list">
              <li className="headerMobile__nav__list__item__list__item">
                <Link href={'/jobs/sectors'}>
                  <a>Sectors</a>
                </Link>
              </li>
            </ul>
          )}
        </li>
        <li className="headerMobile__nav__list__item">
          <Link href="/directory">
            <a>Directory</a>
          </Link>
        </li>
        <li className="headerMobile__nav__list__item">
          <Link href={'/pricing'}>
            <a>Pricing</a>
          </Link>
        </li>
        <li className="headerMobile__nav__list__item">
          {' '}
          <Link href={'/hrtalks'}>
            <a>HrTalks</a>
          </Link>
          <FaAngleDown className="headerMobile__nav__list__item__icon" />
        </li>
        <li className="headerMobile__nav__list__item">
          <Link href="/">
            <a>Profile</a>
          </Link>
        </li>
      </ul>
    </>
  );
}

export default MobileMenu;
