import MailchimpSubscribe from 'react-mailchimp-subscribe';
import NewsletterForm from './NewsletterForm';

const NewsletterSubscribe = () => {
  // const MAILCHIMP_URL = process.env.NEXT_PUBLIC_MAILCHIMP_URL;
  const MAILCHIMP_URL =
    'https://app.us11.list-manage.com/subscribe/post?u=0fbc5f3462d2f33f3bdf9f856&amp;id=5d45bb3017&amp;f_id=002998e0f0';

  return (
    <MailchimpSubscribe
      url={MAILCHIMP_URL}
      render={(props) => {
        const { subscribe, status, message } = props || {};
        return (
          <NewsletterForm
            status={status}
            message={message}
            onSubscribe={(formData) => subscribe(formData)}
          />
        );
      }}
    />
  );
};

export default NewsletterSubscribe;
