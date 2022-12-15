import React, { useState } from 'react';
import MailchimpSubscribe from 'react-mailchimp-subscribe';

function CustomForm({ status, message, onValidated }) {
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(email);
    email &&
      email.indexOf('@') > -1 &&
      onValidated({
        EMAIL: email,
      });
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="inputDiv">
          <input
            type={'email'}
            className="newsletter__form__input"
            placeholder="Enter Email Adress"
            onChange={({ target }) => setEmail(target.value)}
            value={email}
            name="email"
          />
          <input
            className="newsletter__form__button"
            type={'submit'}
            value="Subscribe"
          />
        </div>
      </form>

      {status === 'error' && (
        <div
          className="mc__alert mc__alert--error"
          dangerouslySetInnerHTML={{ __html: message }}
        />
      )}
      {status === 'success' && (
        <div
          className="mc__alert mc__alert--success"
          dangerouslySetInnerHTML={{ __html: message }}
        />
      )}
    </>
  );
}

export default CustomForm;
