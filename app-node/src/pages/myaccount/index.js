import axios from 'axios';
import React, { useEffect, useState } from 'react';
import CompanyUsers from '../../components/MyCompany/CompanyUsers';
import Sidebar from '../../components/Sidebar';
import { useAuthContext } from '../../context/AuthContext';

function Index() {
  const apiUrl = process.env.NEXT_PUBLIC_WORDPRESS_URL;
  const { user } = useAuthContext();

  useEffect(() => {
    //
    console.log('user.....');

    console.log('myaccount', user);
  }, []);

  return (
    <>
      <Sidebar />
      <div className="dashboardContainer">
        <div className="manageCompany">
          <h1 className="manageCompany__title">My account</h1>

          <div>Email: {user.email}</div>
          <div>Firstname: {user.firstName}</div>
          <div>Lastname: {user.lastName}</div>
        </div>
      </div>
    </>
  );
}

export default Index;
