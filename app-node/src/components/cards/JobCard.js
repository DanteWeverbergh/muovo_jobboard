import Link from 'next/link';
import React, { useEffect } from 'react';
import { FaRegCalendarAlt } from 'react-icons/fa';
import { useRouter } from 'next/router';

function JobCard({ job, featured }) {
  const router = useRouter();

  useEffect(() => {
    const jobType = job.title.toLowerCase().replace(/\s/g, '');
  }, []);

  const removeHTML = (str) => {
    var tmp = document.createElement('DIV');
    tmp.innerHTML = str;
    return tmp.textContent || tmp.innerText || '';
  };

  return (
    <>
      <div className={`jobCard ${featured && 'featured'}`}>
        <div className={`jobCard__header ${featured && 'featured'}`}>
          <div className="jobCard__header__info">
            <div className={`margin ${featured && 'featured'}`}></div>
            <div className="jobCard__header__company">
              <Link href={`/directory/${job.company}`}>
                <a>{job.company}</a>
              </Link>
            </div>
            <div className="jobCard__header__sector">
              Job
              <div className="jobCard__header__sector__name">
                <Link
                  href={`/sectors/${job.sector[0]
                    .replace(/ /g, '-')
                    .toLowerCase()}`}
                >
                  <a>{job.sector[0]}</a>
                </Link>
              </div>
            </div>
          </div>
          <div className="jobCard__header__companyLogo">
            <img src="https://picsum.photos/100" alt="company logo" />
          </div>
        </div>
        <div className={`jobCard__content ${featured && 'featured'}`}>
          <h4 className="jobCard__content__title">
            <Link href={`/jobs/${job.slug}-${job.id}`}>
              <a> {job.title}</a>
            </Link>
          </h4>
          <div className="jobCard__content__info">
            <h5 className="jobCard__content__info__location">Location</h5>
            <h5 className="jobCard__content__info__jobType">Full time</h5>
            <h5 className="jobCard__content__info__salary">
              Competitive salary
            </h5>
          </div>
          <p className="jobCard__content__excerpt">
            {removeHTML(job.jobDescription)}
          </p>
        </div>
        <div className={`jobCard__line ${featured && 'featured'}`}></div>
        <div className={`jobCard__footer ${featured && 'featured'}`}>
          <div className="jobCard__footer__time">
            <FaRegCalendarAlt className="jobCard__footer__time__icon" />
            Added {job.date}
          </div>
          <Link href={`/jobs/${job.slug}-${job.id}`}>
            <a>
              <button className="btn-y">View</button>
            </a>
          </Link>
        </div>
      </div>
    </>
  );
}

export default JobCard;
