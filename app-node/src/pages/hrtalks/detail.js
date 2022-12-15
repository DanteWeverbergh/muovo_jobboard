import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Header from '../../components/Header';
import CopyrightFooter from '../../components/Footer/CopyrightFooter';
import axios from 'axios';
import BackButton from '../../components/BackButton';
import Footer from '../../components/Footer';
import Spinner from '../../components/Spinner';

function HrtalksDetail() {
  const router = useRouter();
  const { id } = router.query;
  const apiUrl = process.env.NEXT_PUBLIC_WORDPRESS_URL;
  const [post, setPost] = useState({});
  const [isLoaded, setIsLoaded] = useState(false);
  const [tags, setTags] = useState([]);

  useEffect(() => {
    axios.get(`${apiUrl}/wp-json/rs/v1/blog/id/?id=${id}`).then((res) => {
      // console.log(res.data);
      setPost(res.data);

      console.log(res.data);
      setTags(res.data.tags);

      res.data.tags.map((tag) => console.log(tag));
    });
    setIsLoaded(true);
  }, []);

  return (
    <>
      <Header />

      {isLoaded && post ? (
        <>
          <div className="blogDetail__header">
            <h1 className="blogDetail__header__title">{post.title}</h1>
            <h6>{post.author}</h6>
            <div className="blogDetail__img">
              <div className="img">
                <img src={post.img} alt="imgblog" />
              </div>
            </div>
          </div>

          <div className="blogDetail__content">
            <div>
              <p dangerouslySetInnerHTML={{ __html: post.content }}></p>
            </div>
            <div>{post.video}</div>

            <div>
              <h4 className="tagTitle">Tags</h4>

              <div className="tags">
                {isLoaded &&
                  tags &&
                  tags.map((tag) => (
                    <div className="tag" key={tag}>
                      {tag}
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </>
      ) : (
        <Spinner />
      )}

      <Footer />
      <CopyrightFooter />
    </>
  );
}

export default HrtalksDetail;
