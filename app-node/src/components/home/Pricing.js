import React from 'react';
import PackageCards from '../cards/PackageCards';

function Pricing() {
  return (
    <>
      <div className="pricing home">
        <PackageCards title={'1 job Listing'} price={'80'} />
        <PackageCards
          title={'5 job Listings'}
          price={'350'}
          isSelected={true}
        />
        <PackageCards title={'10 job Listings'} price={'600'} />
      </div>
    </>
  );
}

export default Pricing;
