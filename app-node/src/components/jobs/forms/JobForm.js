import ReactDOM from 'react-dom';
import { useEffect, useRef, useState } from 'react';
import WysiwygEditor from '../../wysiwygEditor';

function JobForm({
  handleSubmit,
  register,
  onSubmit,
  intialValues,
  sectors,
  type,
}) {
  return (
    <>
      <div className="dashboardformdiv">
        <form onSubmit={handleSubmit(onSubmit)} className="dashboardform">
          <div className="dashboardform__item">
            <label className="dashboardform__label">Job Title</label>
            <input
              defaultValue={intialValues.title}
              type="text"
              placeholder="title"
              {...register('jobTitle', { required: true })}
              className="dashboardform__input"
            />
          </div>

          <div className="dashboardform__item">
            <label className="dashboardform__label">Job Description</label>
            <textarea
              rows={'20'}
              defaultValue={intialValues.jobDescription}
              {...register('jobDescription', { required: true })}
              className="dashboardform__textarea"
            />
          </div>

          <div className="dashboardform__item">
            <label className="dashboardform__label">Employment type</label>
            <select
              {...register('jobType')}
              className="dashboardform__select"
              defaultValue={intialValues.jobType}
            >
              <option value="full-time">Full time</option>
              <option value="part-time">Part time</option>
              <option value="casual">Casual</option>
            </select>
          </div>

          <div className="dashboardform__item">
            <label className="dashboardform__label">Job Type</label>
            <select {...register('remote')} className="dashboardform__select">
              <option value="no">On location</option>
              <option value="hybrid">Hybrid</option>
              <option value="remote">Remote</option>
            </select>
          </div>

          {type != 'edit' && (
            <div className="dashboardform__item">
              <label className="dashboardform__label">Sector</label>
              <select {...register('sector')} className="dashboardform__select">
                {sectors.map((sector) => (
                  <option value={sector.sector} key={sector.id}>
                    {sector.sector}
                  </option>
                ))}
              </select>
            </div>
          )}

          <input type="submit" className="dashboardform__button" />
        </form>
      </div>
    </>
  );
}

export default JobForm;
