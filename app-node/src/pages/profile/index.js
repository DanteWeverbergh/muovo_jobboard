import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import Footer from '../../components/Footer';
import CopyrightFooter from '../../components/Footer/CopyrightFooter';
import Header from '../../components/Header';
import EditAccount from '../../components/profile/EditAccount';
import CurrentCv from '../../components/profile/jobseeker/CurrentCv';
import JobSeekerAlerts from '../../components/profile/jobseeker/JobSeekerAlerts';
import UpdateCv from '../../components/profile/jobseeker/UpdateCv';
import Sidebar from '../../components/Sidebar';

function Index() {
  const [role, setRole] = useState('');
  const [isLoaded, setIsLoaded] = useState(false);
  const [cvUrl, setCvUrl] = useState(
    'http://localhost:10009/wp-content/uploads/2022/05/Highlighted-Cards.pdf'
  );
  const router = useRouter();

  useEffect(() => {
    //

    setRole(sessionStorage.getItem('role'));
    setIsLoaded(true);

    if (sessionStorage.getItem('role') === 'companyadmin') {
      router.push('/myaccount');
    }
  }, []);

  return (
    <>
      <>
        <Header />

        <h1 className="profile__title">My account</h1>
        <div className="profileContainer">
          <div>
            <EditAccount />
            <UpdateCv cvUrl={cvUrl} setCvUrl={setCvUrl} />
          </div>

          <CurrentCv cvUrl={cvUrl} setCvUrl={setCvUrl} />
        </div>
        <Footer />
        <CopyrightFooter />
      </>
    </>
  );
}

export default Index;
