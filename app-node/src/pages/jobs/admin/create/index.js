import React, { useEffect, useState } from 'react';
import JobCard from '../../../../components/cards/JobCard';
import Sidebar from '../../../../components/Sidebar';
import { useForm } from 'react-hook-form';
import JobForm from '../../../../components/jobs/forms/JobForm';
import Cookies from 'js-cookie';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useRouter } from 'next/router';

function Create() {
  const apiUrl = process.env.NEXT_PUBLIC_WORDPRESS_URL;
  const router = useRouter();
  const [packages, setPackages] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  const [selectedPackageId, setSelectedPackageId] = useState('');
  const [selectedPackage, setSelectedPackage] = useState('');
  const [packageLoaded, setPackageLoaded] = useState(false);
  const [sectors, setSectors] = useState([]);

  const [next, setNext] = useState(false);

  useEffect(() => {
    //
    const token = Cookies.get('token');
    const headers = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    axios.get(`${apiUrl}/wp-json/rs/v1/packages`, headers).then((res) => {
      console.log(res.data);
      setPackages(res.data);
    });

    axios.get(`${apiUrl}/wp-json/rs/v1/taxonomy/sectors`).then((res) => {
      console.log(res.data);

      setSectors(res.data);
    });
  }, []);

  useEffect(() => {
    if (packages.length != 0) {
      var inputOptions = {};
      inputOptions['0'] = 'Create post without package (not public).';

      packages.map((p) => {
        inputOptions[p.id] = `${p.jobsPosted === null ? '0' : p.jobsPosted}/${
          p.jobCount
        } - ${p.title}`;
      });

      Swal.fire({
        title: 'Choose a package for this job',
        input: 'select',
        inputOptions: inputOptions,
        inputPlaceholder: 'Select package from dropdown...',
        showCancelButton: true,
        confirmButtonText: 'Next',
        showLoaderOnConfirm: true,
        confirmButtonColor: '#5e5eaa',

        allowOutsideClick: () => !Swal.isLoading(),
      }).then((result) => {
        console.log(result);

        if (result.isConfirmed) {
          setSelectedPackageId(result.value);
          setNext(true);
        } else {
          router.push('/jobs/admin');
        }
      });

      setIsLoaded(true);
    }
  }, [packages]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    console.log('..................');
    console.log(data);
    console.log(parseInt(selectedPackageId));

    const jobData = {
      ...data,
      jobPackageId: parseInt(selectedPackageId),
    };

    console.log('jobData', jobData);

    const token = Cookies.get('token');

    const headers = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    };

    axios
      .post(`${apiUrl}/wp-json/rs/v1/jobs/create`, jobData, headers)
      .then((res) => {
        console.log(res.data);

        if (res.data.code === 200) {
          router.push('/jobs/admin');
        }
      })
      .catch((err) => {
        alert(err);
      });
  };

  //console.log(errors);

  const intialValues = {
    title: '',
    jobDescription: '',
    jobType: '',
  };

  useEffect(() => {
    if (selectedPackageId) {
      const pa = packages.find((p) => p.id === parseInt(selectedPackageId));
      setSelectedPackage(pa);
      setPackageLoaded(true);
    }
  }, [selectedPackageId]);

  return (
    <>
      <Sidebar />
      <div className="dashboardContainer">
        <div>Choose package for this job</div>

        <div>
          {packageLoaded &&
            selectedPackage &&
            `${selectedPackage.title} - ${
              selectedPackage.jobsPosted === null
                ? '0'
                : selectedPackage.jobsPosted
            }/${selectedPackage.jobCount}`}
        </div>
        {next && (
          <JobForm
            handleSubmit={handleSubmit}
            register={register}
            onSubmit={onSubmit}
            intialValues={intialValues}
            sectors={sectors}
          />
        )}
      </div>
    </>
  );
}

export default Create;
