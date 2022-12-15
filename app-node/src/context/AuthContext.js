import axios from 'axios';
import { createContext, useState, useContext, useEffect } from 'react';
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';

export const AuthContext = createContext({});

export const useAuthContext = () => useContext(AuthContext);

export const AuthContextProvider = ({ children }) => {
  //states
  const [jwtToken, setJwtToken] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const apiUrl = process.env.NEXT_PUBLIC_WORDPRESS_URL;
  const [userRole, setUserRole] = useState('');

  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState({});

  //
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const router = useRouter();

  useEffect(() => {
    //console.log('cookie');
    //
    async function loadUserFromCookies() {
      const token = Cookies.get('token');
      if (token) {
        //console.log('Logged in');

        const headers = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };

        axios
          .get(`${apiUrl}/wp-json/rs/v1/user/me`, headers)
          .then((res) => {
            // console.log(res.data);
            sessionStorage.setItem('role', res.data.role);
            setUserRole(res.data.role);
            setUser(res.data);
            // console.log('got user!');
          })
          .catch((err) => {
            // console.log(err.response.data.message);
          });

        axios
          .get(`${apiUrl}/wp-json/rs/v1/user/company`, headers)
          .then((res) => {
            sessionStorage.setItem('company', res.data);
          })
          .catch((err) => {
            // console.log(err.response.data.message);
          });

        /*
        axios
          .post(`${apiUrl}/wp-json/jwt-auth/v1/token/validate`, headers)
          .then((res) => {
            console.log(res);
          });
          */
      }

      setLoading(false);
    }

    loadUserFromCookies();
  }, []);

  const login = async (loginData) => {
    axios.get(`${apiUrl}/wp-json`).then((res) => {
      // console.log('json', res.data);
    });

    //
    await axios
      .post(`${apiUrl}/wp-json/jwt-auth/v1/token`, loginData)
      .then((res) => {
        const { token, user_nicename, user_email } = res.data;

        if (token) {
          setJwtToken(token);
          //console.log('got token!');
          //set token in cookie
          Cookies.set('token', token, { expires: 60 });

          const headers = {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          };

          axios.get(`${apiUrl}/wp-json/rs/v1/user/me`, headers).then((res) => {
            if (res.data.role === 'jobseeker') {
              window.location.pathname = '/';
            } else {
              window.location.pathname = '/jobs/admin';
            }
          });
        }
      })
      .catch((err) => {
        // console.log(err);
        //console.log(err.response.data.message);
        setError(err.response.data.message);
      });
  };

  const loginWithoutRedirect = async (loginData) => {
    //
    await axios
      .post(`${apiUrl}/wp-json/jwt-auth/v1/token`, loginData)
      .then((res) => {
        const { token, user_nicename, user_email } = res.data;

        if (token) {
          setJwtToken(token);
          //console.log('got token!');
          //set token in cookie
          Cookies.set('token', token, { expires: 60 });
        }
      })
      .catch((err) => {
        // console.log(err.response.data.message);
        setError(err.response.data.message);
      });
  };

  const logout = () => {
    setJwtToken('');

    //remove cookie
    Cookies.remove('token');
    setUser(null);

    sessionStorage.removeItem('company');
    sessionStorage.removeItem('role');

    // console.log('logged out!');

    window.location.pathname = '/';
  };

  /**
   *
   * Get user role of user
   */

  const getUserDetails = async (token) => {
    //

    const tok = `Bearer ${token}`;
    // console.log(tok);

    const headers = {
      headers: {
        Authorization: tok,
      },
    };

    await axios
      .get(`${apiUrl}/wp-json/rs/v1/user/company`, headers)
      .then((res) => {
        sessionStorage.setItem('company', res.data);

        console.log(res.data);

        return res.data;
      })
      .then((err) => {
        // console.log(err.response.data.message);
      });
  };

  /**
   * Register
   */

  const registerCompanyAdmin = (data) => {
    //
    //console.log(data);

    const loginData = {
      username: data.email,
      password: data.password,
    };

    const registerData = {
      username: data.firstName + data.lastName,
      email: data.email,
      password: data.password,
      role: 'companyadmin',
      first_name: data.firstName,
      last_name: data.lastName,
      companyName: data.companyName,
    };

    axios
      .post(`${apiUrl}/wp-json/rs/v1/register/company`, registerData)
      .then((res) => {
        // console.log('................');
        //console.log(res.data);
        //console.log('................');

        //get company id back
        alert('succes, wait for approval of your companyname');
      })
      .catch((err) => {
        // console.log(err.response.data.message);
      });
  };

  const registerCv = (file, setCvUrl) => {
    //register jobskeer
    //cv upload

    var formData = new FormData();
    formData.append('file', file);

    const headers = {
      headers: {
        'Content-type': 'multipart/form-data',
      },
    };

    axios
      .post(`${apiUrl}/wp-json/rs/v1/cv`, formData, headers)
      .then((res) => {
        // console.log('backend', res.data.message);
        alert('cv uploaded');
        //setMessage(res.data.message);
        const url = res.data;

        setCvUrl(url);

        // next step of register process
        window.location.pathname = '/auth/register/jobseeker';
      })
      .catch((err) => {
        //console.log(err);
        // setError(err.response.data.message);
      });
  };

  const jobseekerRegister = (data, cvUrl) => {
    //

    const registerData = {
      username: data.firstName + data.lastName,
      cvUrl,
      ...data,
    };

    // console.log(registerData);

    axios
      .post(`${apiUrl}/wp-json/rs/v1/register/jobseeker`, registerData)
      .then((res) => {
        // console.log(res.data);

        const user_id = res.data.message;

        const loginData = {
          username: data.email,
          password: data.password,
        };

        axios
          .post(`${apiUrl}/wp-json/jwt-auth/v1/token`, loginData)
          .then((res) => {
            //  console.log(res.data.token);

            const headers = {
              headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${res.data.token}`,
              },
            };

            const acfData = {
              fields: {
                cv_url: cvUrl,
              },
            };

            axios
              .post(
                `${apiUrl}/wp-json/acf/v3/users/${user_id}`,
                acfData,
                headers
              )
              .then((res) => {
                // console.log(res.data);
                alert('succes!');
                router.back();
              })
              .catch((err) => {
                //console.log(err.response.data.message);
              });
          })
          .catch((err) => {
            // console.log(err.response.data.message);
          });
      })
      .catch((err) => {
        //console.log(err.response.data.message);
      });
  };

  const forgotPassword = (email) => {
    //
    // console.log(apiUrl);

    axios
      .post(`${apiUrl}/wp-json/bdpwr/v1/reset-password`, {
        email: email,
      })
      .then((res) => {
        // console.log(res.data);
        setMessage(res.data);
      })
      .catch((err) => {
        // console.log(err.response.data.message);
      });
  };

  const SetNewPassword = (data) => {
    //

    axios
      .post(`${apiUrl}/wp-json/bdpwr/v1/set-password`, data)
      .then((res) => {
        // console.log(res.data);
        setMessage(res.data);
      })
      .catch((err) => {
        //   console.log(err.response.data.message);
        setError(err.response.data.message);
      });
  };

  const contextValue = {
    jwtToken,
    isLoggedIn,
    login,
    logout,
    registerCompanyAdmin,
    getUserDetails,
    registerCv,
    isAuthenticated: !!user,
    error,
    setError,
    message,
    setMessage,
    forgotPassword,
    SetNewPassword,
    jobseekerRegister,
    loginWithoutRedirect,
    userRole,
    user,
  };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export const ProtectRoute = ({ children }) => {
  const { isAuthenticated, isLoading } = useAuth();
  if (
    isLoading ||
    (!isAuthenticated && window.location.pathname !== '/login')
  ) {
    return <div>Loading...</div>;
  }
  return children;
};
