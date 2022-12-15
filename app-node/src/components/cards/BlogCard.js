import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';

function BlogCard({ post }) {
  const router = useRouter();

  useEffect(() => {
    // console.log(post);
  }, []);

  return (
    <>
      <div className="blogCard">
        <div className="blogCard__category">
          <Link
            href={`/hrtalks/category/${post.categories[0].replace(' ', '-')}`}
          >
            <a>{post.categories[0]}</a>
          </Link>
        </div>
        <img className="blogCard__img" src={post.img} alt="blog_image" />
        <div className="blogCard__content">
          <p className="blogCard__content__date">{post.date}</p>
          <h1 className="blogCard__content__title">{post.title}</h1>
          <p className="blogCard__content__excerpt">{post.excerpt}</p>
        </div>
        <div className="blogCard__link">
          <Link
            href={`/hrtalks/${post.title.replace(/ /g, '-').toLowerCase()}-${
              post.id
            }`}
          >
            <a>Read more</a>
          </Link>
        </div>
      </div>
    </>
  );
}

export default BlogCard;
