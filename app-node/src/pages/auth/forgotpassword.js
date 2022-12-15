import React, { useEffect, useState } from 'react';
import Header from '../../components/Header';
import BackButton from '../../components/BackButton';
import { useAuthContext } from '../../context/AuthContext';
import Footer from '../../components/Footer';
import CopyrightFooter from '../../components/Footer/CopyrightFooter';

function Forgotpassword() {
  const [email, setEmail] = useState('');
  const { setError, setMessage, forgotPassword } = useAuthContext();

  const handleSubmit = (e) => {
    e.preventDefault();

    forgotPassword(email);

    alert('pasword reseet mail sent!');
  };

  useEffect(() => {
    //
    setError('');
    setMessage('');
  }, []);

  return (
    <>
      <Header />

      <div className="forgotPassword">
        <h1>Reset password</h1>

        <div className="forgotPassword__formDiv">
          <form
            className="forgotPassword__formDiv__form"
            onSubmit={handleSubmit}
          >
            <label
              className="forgotPassword__formDiv__form__label"
              htmlFor="email"
            >
              Email
            </label>
            <input
              type={'email'}
              placeholder="email"
              className="forgotPassword__formDiv__form__input"
              onChange={({ target }) => setEmail(target.value)}
              value={email}
              name="email"
            />
            <button
              type="submit"
              className="forgotPassword__formDiv__form__button"
            >
              Send mail
            </button>
          </form>
        </div>
      </div>
      <Footer />
      <CopyrightFooter />
    </>
  );
}

export default Forgotpassword;
