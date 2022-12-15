import Link from 'next/link';
import React from 'react';

function NothingHere({ text, type }) {
  return (
    <>
      <div className="nothinghere">
        {text}

        <div>
          {type === 'job' && (
            <Link href={'/jobs/admin/create'}>
              <a className="nothinghere__button"> Create your first job</a>
            </Link>
          )}
        </div>
      </div>
    </>
  );
}

export default NothingHere;
