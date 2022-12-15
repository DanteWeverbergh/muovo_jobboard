import React from 'react';
import { MdArrowBackIos } from 'react-icons/md';
import { useRouter } from 'next/router';

function BackButton() {
  const router = useRouter();
  return (
    <>
      <div className="backButton" onClick={() => router.back()}>
        <MdArrowBackIos className="backButton__icon" />
      </div>
    </>
  );
}

export default BackButton;
