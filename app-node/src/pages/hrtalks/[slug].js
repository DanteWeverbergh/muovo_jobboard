import axios from 'axios';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import Footer from '../../components/Footer';
import CopyrightFooter from '../../components/Footer/CopyrightFooter';
import Header from '../../components/Header';
import Spinner from '../../components/Spinner';

function BlogDetail() {
  const router = useRouter();
  const [blogId, setBlogId] = useState('');
  const { slug } = router.query;
  const [post, setPost] = useState({});
  const [tags, setTags] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const apiUrl = process.env.NEXT_PUBLIC_WORDPRESS_URL;

  useEffect(() => {
    if (router.isReady) {
      const parts = slug.toString().split('-');
      const blogId = parts[parts.length - 1];
      console.log(blogId);
      setBlogId(blogId);
    }
  }, [router.isReady]);

  useEffect(() => {
    //
    if (blogId) {
      //

      axios.get(`${apiUrl}/wp-json/rs/v1/blog/id/?id=${blogId}`).then((res) => {
        // console.log(res.data);
        setPost(res.data);

        console.log(res.data);
        setTags(res.data.tags);

        res.data.tags.map((tag) => console.log(tag));
      });
      setIsLoaded(true);
    }
  }, [blogId]);

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

export default BlogDetail;
