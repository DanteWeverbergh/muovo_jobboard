import axios from 'axios';
import React, { useEffect, useState } from 'react';
import BlogSidebar from '../../components/blog/BlogSidebar';
import Featured from '../../components/blog/Featured';
import BlogCard from '../../components/cards/BlogCard';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import CopyrightFooter from '../../components/Footer/CopyrightFooter';
import BlogHeader from '../../components/blog/BlogHeader';
import Spinner from '../../components/Spinner';
import Pagination from '../../components/blog/Pagination';
import Head from 'next/head';
import { delLocale } from 'next/dist/shared/lib/router/router';
import { MdSettingsBackupRestore } from 'react-icons/md';

function Index() {
  const apiUrl = process.env.NEXT_PUBLIC_WORDPRESS_URL;
  const [posts, setPosts] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(6);
  const [screenWidth, setScreenWidth] = useState('');

  useEffect(() => {
    console.log('djljklqd');

    console.log(window.innerWidth);
    setScreenWidth(window.innerWidth);

    const changeWidth = () => {
      setScreenWidth(window.innerWidth);
      //console.log(window.innerWidth);
    };
    window.addEventListener('resize', changeWidth);

    //
    axios
      .get(
        `${apiUrl}/wp-json/rs/v1/blog/?per_page=${perPage}&page=${currentPage}`
      )
      .then((res) => {
        setPosts(res.data);
        setIsLoaded(true);
      });
  }, []);

  useEffect(() => {
    axios
      .get(
        `${apiUrl}/wp-json/rs/v1/blog/?per_page=${perPage}&page=${currentPage}`
      )
      .then((res) => {
        setPosts(res.data);
        setIsLoaded(true);
      });

    window.scrollTo({ behavior: 'smooth', top: '0px' });
  }, [currentPage]);

  return (
    <>
      <Head>
        <title>Muovo - HrTalks</title>
      </Head>

      <Header />

      <BlogHeader screenWidth={screenWidth} />

      <div className="contentContainer">
        {isLoaded ? (
          <div className="blogContent">
            <div>
              <div className="blogCards">
                {isLoaded &&
                  posts.map((post) => <BlogCard key={post.id} post={post} />)}
              </div>
              <Pagination
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                perPage={perPage}
                type={'hr-talks'}
              />
            </div>

            <BlogSidebar posts={posts} setPosts={setPosts} />
          </div>
        ) : (
          <Spinner />
        )}
      </div>

      <Footer />
      <CopyrightFooter />
    </>
  );
}

export default Index;
