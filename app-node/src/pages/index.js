import axios from 'axios';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import JobCard from '../components/cards/JobCard';
import CopyrightFooter from '../components/Footer/CopyrightFooter';
import Header from '../components/Header';
import Spinner from '../components/Spinner';
import Button from '../components/buttons/Button';
import Head from 'next/head';
import Search from '../components/home/Search';
import FeaturedRoles from '../components/home/FeaturedRoles';
import { FaSearch, FaAngleDown } from 'react-icons/fa';
import Directory from '../components/home/Directory';
import Pricing from '../components/home/Pricing';
import Blog from '../components/home/Blog';
import Footer from '../components/Footer';

function Index() {
  const [jobs, setJobs] = useState([]);
  const apiUrl = process.env.NEXT_PUBLIC_WORDPRESS_URL;
  const [isLoaded, setIsLoaded] = useState([]);
  const [page, setPage] = useState([]);
  const [yoastMeta, setYoastMeta] = useState([]);

  const [schema, setSchema] = useState('');
  const [screenWidth, setScreenWidth] = useState('');

  useEffect(() => {
    //
    const perPage = 3;
    const page = 1;

    setScreenWidth(window.innerWidth);

    const changeWidth = () => {
      setScreenWidth(window.innerWidth);
    };

    axios
      .get(`${apiUrl}/wp-json/wp/v2/pages/200`)
      .then((res) => {
        setPage(res.data);
        const meta = res.data.yoast_meta;
        setYoastMeta(meta);

        /*
        console.log(
          'yoast',
          res.data.yoast_meta.map((meta_value) => meta_value.property)
        );
        */
      })
      .catch((err) => {
        // console.log(err);
      });

    axios.get(`${apiUrl}/wp-json/wp/v2/pages/200`).then((res) => {
      console.log(res.data);
      const schema = res.data.yoast_head_json.schema;

      console.log('schema', schema);
      setSchema(schema);
    });

    window.addEventListener('resize', changeWidth);

    setIsLoaded(true);
  }, []);

  return (
    <>
      {isLoaded ? (
        <>
          <Head>
            {isLoaded && (
              <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
              />
            )}
            <title>{page.yoast_title}</title>
            {yoastMeta.map((meta_value) => {
              return (
                <meta
                  key={meta_value.name || meta_value.property}
                  name={meta_value.name || meta_value.property}
                  content={meta_value.content}
                />
              );
            })}
          </Head>

          <Header />

          <Search />
          <FeaturedRoles screenWidth={screenWidth} />
          <Directory screenWidth={screenWidth} />
          <Pricing />
          <Blog />

          <Footer />
          <CopyrightFooter />
        </>
      ) : (
        <Spinner />
      )}
    </>
  );
}

export default Index;
