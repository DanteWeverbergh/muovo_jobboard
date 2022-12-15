import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { BsFillEyeFill, BsFillEyeSlashFill } from 'react-icons/bs';
import { AiOutlineClose } from 'react-icons/ai';
import Header from '../../components/Header';
import { useAuthContext } from '../../context/AuthContext';

function Newpassword() {
  const router = useRouter();
  const { SetNewPassword } = useAuthContext();

  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');

  const [eye, setEye] = useState(false);
  const [password, setPassword] = useState('');

  useEffect(() => {
    //
  }, []);

  const handldeSubmit = (e) => {
    e.preventDefault();

    const data = {
      email: router.query['email'],
      code: router.query['code'],
      password: password,
    };

    SetNewPassword(data);

    alert('password reseted');
  };

  const generatePassword = () => {
    //
    const randomPassword =
      Math.random().toString(36).slice(2) + Math.random().toString(36).slice(2);

    setPassword(randomPassword);

    navigator.clipboard.writeText(randomPassword);
  };

  return (
    <>
      <Header />
      <div className="text-white-950 text-center text-2xl">
        Choose a new password
      </div>

      <div className="formdiv">
        <form onSubmit={handldeSubmit} className="form">
          <div className="relative">
            <input
              placeholder={'password'}
              type={eye ? 'text' : 'password'}
              name={'password'}
              value={password}
              onChange={({ target }) => setPassword(target.value)}
              id="password"
              className="form__input"
            />

            {eye ? (
              <BsFillEyeFill
                className="text-slate-950 text-2xl absolute right-2 bottom-1"
                onClick={() => {
                  setEye(!eye);
                }}
              />
            ) : (
              <BsFillEyeSlashFill
                className="text-slate-950 text-2xl absolute right-2 bottom-1"
                onClick={() => {
                  setEye(!eye);
                }}
              />
            )}
          </div>

          <div className="generate" onClick={() => generatePassword()}>
            Generate password
          </div>

          <button type="submit" className="form__button">
            Reset password
          </button>
        </form>
      </div>
    </>
  );
}

export default Newpassword;
