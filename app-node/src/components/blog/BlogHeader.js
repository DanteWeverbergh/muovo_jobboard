import { useRouter } from 'next/router';
import React from 'react';
import { FaSearch } from 'react-icons/fa';

function BlogHeader({ screenWidth }) {
  const router = useRouter();

  const search = (e) => {
    //
    e.preventDefault();
    console.log('search');
  };

  const newsletter = (e) => {
    e.preventDefault();
    console.log('newsletter');
  };

  return (
    <>
      <div className="blogHeader">
        <h1>
          {screenWidth < 1280 ? 'Search on' : 'Subsribe for'}{' '}
          <strong> HR Talks!</strong>
        </h1>

        <div className="margin-left">
          <form
            className="searchHome__form"
            onSubmit={screenWidth < 1280 ? search : newsletter}
          >
            <div className="input">
              <input
                className="searchHome__form__input"
                placeholder={
                  screenWidth < 1280
                    ? 'Search HR Talks'
                    : 'Subscribe on our newsletter'
                }
              />

              <FaSearch
                className="searchHome__form__icon"
                onClick={screenWidth < 1280 ? search : newsletter}
              />
            </div>
          </form>
        </div>

        <div className="blogHeader__categories">
          <h3>Popular Categories</h3>
          <div className="blogHeader__categories__items">
            <div
              className="blogHeader__categories__items__item"
              onClick={() => router.push('/hrtalks/category/career-advice')}
            >
              Career advice
            </div>
            <div
              className="blogHeader__categories__items__item"
              onClick={() =>
                router.push('/hrtalks/category/education-&-training')
              }
            >
              Education & Training
            </div>
            <div
              className="blogHeader__categories__items__item"
              onClick={() => router.push('/hrtalks/category/employer-advice')}
            >
              Employer Advice
            </div>
            <div
              className="blogHeader__categories__items__item"
              onClick={() => router.push('/hrtalks/category/infographics')}
            >
              Infographics
            </div>
            <div
              className="blogHeader__categories__items__item"
              onClick={() => router.push('/hrtalks/category/remote-working')}
            >
              Remote Working
            </div>
            <div
              className="blogHeader__categories__items__item"
              onClick={() => router.push('/hrtalks/category/working-in-malta')}
            >
              Working in Malta
            </div>
            <div
              className="blogHeader__categories__items__item"
              onClick={() => router.push('/hrtalks/category/press-releases')}
            >
              Press Releases
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default BlogHeader;
