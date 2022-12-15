import axios from 'axios';

import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import { MdKeyboardArrowRight } from 'react-icons/md';

function BlogSidebar({ posts, setPosts }) {
  const [categories, setCategories] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const apiUrl = process.env.NEXT_PUBLIC_WORDPRESS_URL;
  const [jobs, setJobs] = useState([]);
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    //
    axios.get(`${apiUrl}/wp-json/rs/v1/taxonomy/categories`).then((res) => {
      //console.log(res.data);
      setCategories(res.data);
    });

    axios
      .get(`${apiUrl}/wp-json/rs/v1/jobs/?per_page=10&page=1`)
      .then((res) => {
        setJobs(res.data);
      });

    setIsLoaded(true);
  }, []);

  const handleSearch = (e) => {
    //
    e.preventDefault();

    axios
      .post(`${apiUrl}/wp-json/rs/v1/blog/search`, {
        searchTerm: searchTerm,
      })
      .then((res) => {
        //console.log(res.data);
        setPosts(res.data);
      })
      .catch((err) => {
        console.log(err.response.data.message);
      });

    console.log(searchTerm);
  };

  return (
    <>
      <div className="sidebarBlog">
        <img
          className="sidebarBlog__logo"
          src={`${apiUrl}/wp-content/uploads/2022/05/HrTalks_logo.svg`}
          alt="hrtalks_logo"
        />

        <form className="sidebarBlog__form" onSubmit={handleSearch}>
          <div>
            <input
              placeholder="Search HR Talks"
              onChange={({ target }) => setSearchTerm(target.value)}
            />
            <button type="submit">
              <FaSearch />
            </button>
          </div>
        </form>

        <div className="sidebarBlog__categories">
          <h3 className="sidebarBlog__categories__title">Categories</h3>
          <ul className="sidebarBlog__categories__list">
            {isLoaded &&
              categories.map((category) => (
                <li
                  className="sidebarBlog__categories__list__item"
                  key={category.id}
                  onClick={() =>
                    router.push(
                      `/hrtalks/sectors/${category.category.replace(' ', '-')}`
                    )
                  }
                >
                  {category.category} <MdKeyboardArrowRight />
                </li>
              ))}
          </ul>
        </div>

        <div className="sidebarBlog__subscribe">
          <h4>Subscribe for HR talks</h4>
          <form className="sidebarBlog__form">
            <input placeholder="email" />
            <button>Sign up</button>
          </form>
        </div>

        <div className="sidebarBlog__jobs">
          <h1>Latest careers</h1>
          <h4>Top 10 jobs this week</h4>
          <ul className="sidebarBlog__jobs__list">
            {isLoaded &&
              jobs.map((job) => (
                <li key={job.id} className="sidebarBlog__jobs__list__item">
                  {job.title}
                </li>
              ))}
          </ul>
        </div>
      </div>
    </>
  );
}

export default BlogSidebar;
