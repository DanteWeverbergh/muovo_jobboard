import Link from 'next/link';
import React from 'react';

function Featured({ post }) {
  return (
    <>
      <div className="featuredPost">
        <img className="featuredPost__img" src={post.img} alt="post_image" />
        <div className="featuredPost__content">
          <div>{post.categories[0]}</div>
          <h1 className="featuredPost__content__title">{post.title}</h1>
          <p className="featuredPost__content__text">{post.content}</p>
          <div className="blogLink">
            <Link
              href={`/hrtalks/detail/?id=${post.id}`}
              as={`/hrtalks/${post.title.replace(/ /g, '-').toLowerCase()}`}
            >
              <a>Read more</a>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default Featured;
