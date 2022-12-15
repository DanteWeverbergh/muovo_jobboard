import React, { useEffect } from 'react';
import Swal from 'sweetalert2';
import { useRouter } from 'next/router';

function LoginPopup(loginPopUp) {
  const Swal = require('sweetalert2');
  const router = useRouter();

  useEffect(() => {
    //
    const popUp = async () => {
      Swal.fire({
        title: 'Login Form',
        html: `<input type="email" id="login" class="swal2-input" placeholder="Email">
            <input type="password" id="password" class="swal2-input" placeholder="Password">`,
        confirmButtonText: 'Sign in',
        focusConfirm: false,
        preConfirm: () => {
          const login = Swal.getPopup().querySelector('#login').value;
          const password = Swal.getPopup().querySelector('#password').value;
          if (!login || !password) {
            Swal.showValidationMessage(`Please enter login and password`);
          }
          return { login: login, password: password };
        },
      }).then((result) => {
        Swal.fire(
          `
              Login: ${result.value.login}
              Password: ${result.value.password}
            `.trim()
        );
      });
    };

    popUp();
  }, []);

  return (
    <>
      <div></div>
    </>
  );
}

export default LoginPopup;
