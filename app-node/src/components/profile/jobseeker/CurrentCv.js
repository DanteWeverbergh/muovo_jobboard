import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import axios from 'axios';

function CurrentCv({}) {
  const apiUrl = process.env.NEXT_PUBLIC_WORDPRESS_URL;
  const token = Cookies.get('token');
  const [cvUrl, setCvUrl] = useState('');
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    //

    const headers = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    axios.get(`${apiUrl}/wp-json/rs/v1/user/data`, headers).then((res) => {
      console.log('.........');
      console.log('cv', res.data);

      setCvUrl(res.data);
    });

    setIsLoaded(true);
  }, []);

  return (
    <>
      {isLoaded && (
        <div className="cv">
          {/** 
          <iframe src={cvUrl} height="" width="" title="cv" />
          */}
          <object
            data={`${cvUrl}#toolbar=0&navpanes=0&scrollbar=0`}
            type="application/pdf"
          >
            <embed src={cvUrl} type="application/pdf" />
          </object>
          <div className="downloadBtn">
            <a href={cvUrl} download>
              Download
            </a>
          </div>
        </div>
      )}
    </>
  );
}

export default CurrentCv;
