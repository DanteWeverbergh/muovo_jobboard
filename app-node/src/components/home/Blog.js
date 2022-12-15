import axios from 'axios';
import React, { useEffect, useState } from 'react';
import BlogCard from '../cards/BlogCard';

function Blog() {
  const apiUrl = process.env.NEXT_PUBLIC_WORDPRESS_URL;

  const [posts, setPosts] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [homeContent, setHomeContent] = useState({});

  useEffect(() => {
    //

    axios.get(`${apiUrl}/wp-json/rs/v1/pages/home/?=home`).then((res) => {
      //console.log('home', res.data);
      setHomeContent(res.data);
    });

    axios.get(`${apiUrl}/wp-json/rs/v1/blog/?per_page=3&page=1`).then((res) => {
      setPosts(res.data);
      setIsLoaded(true);
    });
  }, []);
  return (
    <>
      <div className="blogHome">
        <div className="blogHome__heading">
          <div>
            <img
              className="blogHome__logo"
              src={`${apiUrl}/wp-content/uploads/2022/05/HrTalks_logo.svg`}
              alt="hrtalks_logo"
            />
          </div>
          <p className="blogHome__info">{homeContent.blog}</p>
        </div>

        <div className="blogHome__cards">
          {isLoaded &&
            posts.map((post) => <BlogCard key={post.id} post={post} />)}
        </div>
      </div>
    </>
  );
}

export default Blog;
