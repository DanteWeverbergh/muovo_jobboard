import React from 'react';

function Button({ button, color, size, onClick }) {
  return (
    <>
      <button onClick={onClick} className={`button ${color} ${size}`}>
        {button}
      </button>
    </>
  );
}

export default Button;
