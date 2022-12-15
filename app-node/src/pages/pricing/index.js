import React from 'react';
import PackageCards from '../../components/cards/PackageCards';
import Footer from '../../components/Footer';
import CopyrightFooter from '../../components/Footer/CopyrightFooter';
import Header from '../../components/Header';
import Sidebar from '../../components/Sidebar';

function index() {
  return (
    <>
      <Header />

      <div className="pricing">
        <PackageCards title={'1 job Listing'} price={'80'} />
        <PackageCards
          title={'5 job Listings'}
          price={'350'}
          isSelected={true}
        />
        <PackageCards title={'10 job Listings'} price={'600'} />
      </div>

      <Footer />
      <CopyrightFooter />
    </>
  );
}

export default index;
