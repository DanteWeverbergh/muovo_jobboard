import React, { useEffect, useState, useCallback } from 'react';
import { FileUploader } from 'react-drag-drop-files';
import { useDropzone } from 'react-dropzone';
import { useAuthContext } from '../../../context/AuthContext';
import Cookies from 'js-cookie';
import axios from 'axios';

function UpdateCv({ setCvUrl }) {
  useDropzone({
    accept: {
      'application/pdf': ['.pdf', '.PDF'],
    },
  });

  const apiUrl = process.env.NEXT_PUBLIC_WORDPRESS_URL;
  // const [file, setFile] = useState(null);

  const { registerCv } = useAuthContext();

  const onDrop = useCallback((acceptedFiles) => {
    const token = Cookies.get('token');
    // Do something with the files
    console.log(acceptedFiles[0]);
    // registerCv(acceptedFiles[0]);

    var formData = new FormData();
    formData.append('file', acceptedFiles[0]);

    const headers = {
      headers: {
        'Content-type': 'multipart/form-data',
        Authorization: `Bearer${token}`,
      },
    };

    axios
      .post(`${apiUrl}/wp-json/rs/v1/cv/update`, formData, headers)
      .then((res) => {
        console.log('.........................', res.data);
        console.log('succes');
        setCvUrl(res.data);

        const acfData = {
          fields: {
            cv_url: res.data,
          },
        };

        const authHeader = {
          headers: {
            Authorization: `Bearer${token}`,
          },
        };

        axios
          .get(`${apiUrl}/wp-json/rs/v1/user/details`, authHeader)
          .then((res) => {
            const userId = res.data.id;

            axios
              .post(
                `${apiUrl}/wp-json/acf/v3/users/${userId}`,
                acfData,
                authHeader
              )
              .then((res) => {
                console.log(res.data);
                alert('succes!');
              })
              .catch((err) => {
                console.log(err.response.data.message);
              });
          });
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  useEffect(() => {
    console.log('update cv');
  }, []);

  const handleChange = (file) => {
    setFile(file);
  };

  return (
    <>
      {/**
      <FileUploader
        handleChange={handleChange}
        label={'cv'}
        name="file"
        types={fileTypes}
        class="drop_zone"
        hoverTitle="Drop files here"
      />
       */}

      <div className="drag">
        <div className="dragDrop">
          <div {...getRootProps()}>
            <input {...getInputProps()} />
            {isDragActive ? (
              <p>Drop the files here ...</p>
            ) : (
              <p>Drag or drop your cv (pdf)</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default UpdateCv;
