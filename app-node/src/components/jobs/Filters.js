import React, { useEffect } from 'react';
import { GrClose } from 'react-icons/gr';
import { useRouter } from 'next/router';

function Filters({
  searchTerm,
  sectors,
  setSeachTerm,
  setSearchSectors,
  setNoJobsFound,
  setReloadJobs,
}) {
  const router = useRouter();
  useEffect((sectors) => {
    //
    console.log('.............');
    console.log('filters', sectors);
    console.log('.............');
  }, []);

  const resetFilters = () => {
    console.log('reset filters');
    setSeachTerm('');
    setSearchSectors('');
    setNoJobsFound(false);
    setReloadJobs(true);
    router.push({});
  };

  return (
    <>
      <div className="jobFilters">
        <div className="filters__searchTerm">Searchterm: {searchTerm}</div>
        <div> Sectors: </div>
        <div>Full time</div>
        <GrClose className="jobFilters__icon" onClick={() => resetFilters()} />
      </div>
    </>
  );
}

export default Filters;
