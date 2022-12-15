import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';

function CompanyCards({ company }) {
  const router = useRouter();

  useEffect(() => {});

  return (
    <>
      <Link
        //href={`directory/${company.title}`}
        /*
        href={`/directory/detail/?id=${company.id}`}
        as={`directory/${company.title.toLowerCase()}`}
        */

        href={`/directory/${company.slug}`}
      >
        <a>
          <div
            className="companyCard"
            /*
        onClick={() => router.push(`/directory/detail/?id=${company.id}`)}
        */
          >
            <div className="companyCard__logo">
              <img alt="Company logo" src="https://picsum.photos/90" />
            </div>
            <div className="companyCard__content">
              <div className="companyCard__content__company">
                <h3 className="companyCard__content__company__name">
                  {company.title}
                </h3>
                <div className="companyCard__content__company__sector">
                  {company.sectors.map((sector) => (
                    <p key={sector}>{sector}</p>
                  ))}
                </div>
              </div>
              <div className="companyCard__content__vacancies">
                <p className="companyCard__content__vacancies__number">
                  <strong>{company.vacancies} </strong>
                  <br /> vacancies
                </p>
              </div>
            </div>
          </div>
        </a>
      </Link>
    </>
  );
}

export default CompanyCards;
