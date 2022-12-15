import React, { useEffect, useState } from 'react';

function Status({ type, text }) {
  return (
    <>
      <div className={`status ${type}`}>{text}</div>
    </>
  );
}

export default Status;
