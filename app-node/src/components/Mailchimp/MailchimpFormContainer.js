import React, { useEffect } from 'react';
import MailchimpSubscribe from 'react-mailchimp-subscribe';
import CustomForm from './CustomForm';

function MailchimpFormContainer({ props }) {
  const postUrl = process.env.NEXT_PUBLIC_MAILCHIMP_URL;

  useEffect(() => {}, [postUrl]);
  return (
    <>
      <div className="mc__form-container">
        <MailchimpSubscribe
          url={postUrl}

          /*
          render={({ subscribe, status, message }) => (
            <CustomForm
              status={status}
              messsage={message}
              onValidated={(formData) => subscribe(formData)}
            />
          )}
          */
        />
      </div>
    </>
  );
}

export default MailchimpFormContainer;
