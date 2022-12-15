import Link from 'next/link';
import React from 'react';
import { FaRegCopyright } from 'react-icons/fa';
import { MdKeyboardArrowUp } from 'react-icons/md';

function CopyrightFooter() {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth', // for smoothly scrolling
    });
  };

  return (
    <>
      <div className="copyrightFooter">
        <div className="copyrightFooter__left">
          <FaRegCopyright className="copyrightFooter__left__icon" />
          <div className="copyrightFooter__left__year">
            {new Date().getFullYear()}
          </div>
          <div>
            Muovo All rights reserved. A brand of{' '}
            <strong>Broadwing Ltd.</strong>
          </div>
        </div>
        <div className="copyrightFooter__right" onClick={() => scrollToTop()}>
          Back to top <MdKeyboardArrowUp />
        </div>
      </div>
    </>
  );
}

export default CopyrightFooter;
