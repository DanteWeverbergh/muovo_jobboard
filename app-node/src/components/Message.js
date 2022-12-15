import React from 'react';
import { useAuthContext } from '../Context/AuthContext';

function Message() {
  const { message } = useAuthContext();

  return (
    <>
      <div className="flex justify-center">
        {message && <p dangerouslySetInnerHTML={{ __html: message }}></p>}
      </div>
    </>
  );
}

export default Message;
