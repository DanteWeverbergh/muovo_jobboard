import React from 'react';
import Swal from 'sweetalert2';
import Cookies from 'js-cookie';
import axios from 'axios';

function Description({
  company,
  description,
  setDescription,
  editDescription,
  setEditDescription,
}) {
  const apiUrl = process.env.NEXT_PUBLIC_WORDPRESS_URL;
  const saveDescription = () => {
    const token = Cookies.get('token');
    const headers = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const data = {
      type: 'description',
      description,
      slug: company.slug,
    };

    axios
      .post(`${apiUrl}/wp-json/rs/v1/company/update`, data, headers)
      .then((res) => {
        console.log(res.data);
        Swal.fire('Succes!', 'You updated your company.', 'success');
      })
      .catch((err) => {
        console.log(err.response.data.message);
      });
  };
  return (
    <>
      <div className="manageCompany__header">
        <div className="manageCompany__header__company">
          <h3>Job description</h3>
          <div className="manageCompany__header__company__buttons">
            <button
              className="manageCompany__header__company__button"
              onClick={() => setEditDescription(!editDescription)}
            >
              Edit
            </button>
            {editDescription && (
              <button
                className="manageCompany__header__company__button save"
                onClick={() => saveDescription()}
              >
                Save
              </button>
            )}

            {editDescription && (
              <button
                className="manageCompany__header__company__button cancel"
                onClick={() => setEditDescription(!editDescription)}
              >
                Cancel
              </button>
            )}
          </div>
        </div>
        {!editDescription ? (
          <p>{company.companyDescription}</p>
        ) : (
          <div>
            <form className="manageCompany__form">
              <textarea
                rows={'8'}
                className="manageCompany__form__textarea"
                placeholder="description"
                value={description}
                name="description"
                onChange={({ target }) => setDescription(target.value)}
              />
            </form>
          </div>
        )}
      </div>
    </>
  );
}

export default Description;
