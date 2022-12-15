import axios from 'axios';
import React, { useEffect, useState } from 'react';
import {
  FaFacebookSquare,
  FaInstagramSquare,
  FaLinkedin,
  FaTwitterSquare,
  FaYoutubeSquare,
} from 'react-icons/fa';
import Header from '../../components/Header';
import Sidebar from '../../components/Sidebar';
import Spinner from '../../components/Spinner';
import { MdLocationOn } from 'react-icons/md';
import Adress from '../../components/MyCompany/Adress';
import Socials from '../../components/MyCompany/Socials';
import Description from '../../components/MyCompany/Description';
import Contact from '../../components/MyCompany/Contact';
import CompanyUsers from '../../components/MyCompany/CompanyUsers';

function Index() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [company, setCompany] = useState('');

  const [editDescription, setEditDescription] = useState(false);
  const [description, setDescription] = useState('');
  const [editAdress, setEditAdress] = useState(false);
  const [editSocials, setEditSocials] = useState(false);
  const [editContact, setEditContact] = useState(false);

  const apiUrl = process.env.NEXT_PUBLIC_WORDPRESS_URL;
  useEffect(() => {
    //
    //console.log(sessionStorage.getItem('company'));

    axios
      .get(
        `${apiUrl}/wp-json/rs/v1/company/slug/?company=${sessionStorage.getItem(
          'company'
        )}`
      )
      .then((res) => {
        console.log(res.data);
        setCompany(res.data);
        setDescription(res.data.companyDescription);
      })
      .catch((err) => {
        console.log(err.response.data.message);
      });

    setIsLoaded(true);
  }, []);

  return (
    <>
      <Sidebar />

      {isLoaded && company ? (
        <>
          <div className="dashboardContainer">
            <div className="manageCompany">
              <h1 className="manageCompany__title">{company.companyName}</h1>

              <Description
                company={company}
                editDescription={editDescription}
                setEditDescription={setEditDescription}
                description={description}
                setDescription={setDescription}
              />

              <Adress
                company={company}
                editAdress={editAdress}
                setEditAdress={setEditAdress}
              />
              <Socials
                company={company}
                editSocials={editSocials}
                setEditSocials={setEditSocials}
              />

              <Contact
                company={company}
                editContact={editContact}
                setEditContact={setEditContact}
              />
              <CompanyUsers />
            </div>
          </div>
        </>
      ) : (
        <Spinner />
      )}
    </>
  );
}

export default Index;
