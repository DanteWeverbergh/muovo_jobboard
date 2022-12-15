import React from 'react';
import PackageCards from '../../components/cards/PackageCards';
import Sidebar from '../../components/Sidebar';

function index() {
  return (
    <>
      <Sidebar />
      <div className="content">
        <div className="cards">
          <PackageCards title={'1 job Listing'} price={'80'} />
          <PackageCards title={'5 job Listings'} price={'350'} />
          <PackageCards title={'10 job Listings'} price={'600'} />
        </div>
      </div>
    </>
  );
}

export default index;
