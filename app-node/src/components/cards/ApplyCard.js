import React from 'react';
import Status from '../jobs/Status';
import { FaFileDownload } from 'react-icons/fa';

function ApplyCard({ applicant }) {
  return (
    <>
      <div className="ApplyCard">
        <div className="ApplyCard__content">
          <div>
            <h3 className="ApplyCard__content__name">{applicant.full_name}</h3>
            <div className="ApplyCard__content__email">
              <strong>E-mail: </strong>
              {applicant.email}
            </div>
            <div className="ApplyCard__content__phone">
              <strong>PHONE: </strong> {applicant.phone}
            </div>
          </div>

          <div className="hovertext" data-hover="Dowload Cv">
            <a href={applicant.cv_url} download="cv">
              <FaFileDownload className="ApplyCard__content__icon" />
            </a>
          </div>
        </div>
        <div className="ApplyCard__footer">
          <div className="ApplyCard__footer__content">
            <Status type={'rejected-outline'} text="rejected" />
            <Status type={'maybe-outline'} text="maybe" />
            <Status type={'good-outline'} text="good" />
          </div>
        </div>
      </div>
    </>
  );
}

export default ApplyCard;
