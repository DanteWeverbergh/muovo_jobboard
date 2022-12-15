import axios from 'axios';
import { post } from 'jquery';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import BlogCard from '../../../components/cards/BlogCard';
import Footer from '../../../components/Footer';
import CopyrightFooter from '../../../components/Footer/CopyrightFooter';
import Header from '../../../components/Header';
import Spinner from '../../../components/Spinner';

function CategoryArchive() {
  const router = useRouter();
  const apiUrl = process.env.NEXT_PUBLIC_WORDPRESS_URL;

  const [category, setCategory] = useState('');
  const [posts, setPosts] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [noPosts, setNoPosts] = useState(false);

  useEffect(() => {
    if (router.isReady) {
      const page = 1;
      const per_page = 6;

      setCategory(router.query.category.replace('-', ' '));

      axios
        .post(
          `${apiUrl}/wp-json/rs/v1/blog/category/?page=${page}&per_page=${per_page}`,
          { category: router.query.category.replace('-', ' ') }
        )
        .then((res) => {
          setPosts(res.data);
          if (res.data.length === 0) {
            setNoPosts(true);
          }
        });

      setIsLoaded(true);
      console.log(posts);
    }
  }, [router.isReady]);

  return (
    <>
      <Header />

      <div className="categoryArchive">
        <h1 className="categoryArchive__title">{category}</h1>

        {isLoaded && noPosts && <h1>No posts found in this category</h1>}

        <div className="categoryArchive__cards">
          {isLoaded && posts ? (
            posts.map((post) => <BlogCard key={post.id} post={post} />)
          ) : (
            <Spinner />
          )}
        </div>
      </div>

      <Footer />
      <CopyrightFooter />
    </>
  );
}

export default CategoryArchive;
