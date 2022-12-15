import React from 'react';
import PackageCards from '../../../components/cards/PackageCards';
import Sidebar from '../../../components/Sidebar';

function Index() {
  return (
    <>
      <Sidebar />
      <div className="dashboardContainer">
        <div className="pricing">
          <PackageCards title={'1 job Listing'} price={'80'} />
          <PackageCards
            title={'5 job Listings'}
            price={'350'}
            isSelected={true}
          />
          <PackageCards title={'10 job Listings'} price={'600'} />
        </div>
      </div>
    </>
  );
}

export default Index;
