import React, { useCallback, useState } from 'react';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useAuthContext } from '../../context/AuthContext';
import { useDropzone } from 'react-dropzone';
import Cookies from 'js-cookie';
import axios from 'axios';
import RegisterJobseeker from './RegisterJobseeker';

const schema = yup.object().shape({
  files: yup.mixed().test('required', 'Please select a file', (value) => {
    return value && value.length;
  }),
});

function CvForm() {
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm({
    //
    resolver: yupResolver(schema),
  });

  useDropzone({
    accept: {
      'application/pdf': ['.pdf', '.PDF'],
    },
  });

  const { registerCv } = useAuthContext();

  const [cv, setCv] = useState('');
  const [message, setMessage] = useState('');

  const [cvUrl, setCvUrl] = useState('');
  const apiUrl = process.env.NEXT_PUBLIC_WORDPRESS_URL;
  const [loading, setLoading] = useState(false);
  const [cvOk, setCvOk] = useState(false);

  const onDrop = useCallback((acceptedFiles) => {
    console.log(acceptedFiles[0]);
    setCv(acceptedFiles[0].name);

    var formData = new FormData();
    formData.append('file', acceptedFiles[0]);

    const headers = {
      headers: {
        'Content-type': 'multipart/form-data',
      },
    };

    axios
      .post(`${apiUrl}/wp-json/rs/v1/cv`, formData, headers)
      .then((res) => {
        console.log(res.data);

        if (res.data.code === 200) {
          setCvOk(true);
          setCvUrl(res.data.message);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <>
      <div className="drag">
        <div className="dragDrop">
          {cv ? (
            cv
          ) : (
            <div {...getRootProps()}>
              <input {...getInputProps()} />
              {isDragActive ? (
                <p>Drop the files here ...</p>
              ) : (
                <p>Drag or drop your cv, or click to select files.</p>
              )}
            </div>
          )}
        </div>
      </div>

      {cvOk && <RegisterJobseeker cvUrl={cvUrl} />}
    </>
  );
}

export default CvForm;
