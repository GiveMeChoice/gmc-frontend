import React from 'react';
import { useRouter } from 'next/router';
import {
  FacebookShareButton,
  FacebookIcon,
  TwitterShareButton,
  TwitterIcon,
  WhatsappShareButton,
  WhatsappIcon,
  FacebookMessengerShareButton,
  FacebookMessengerIcon,
  EmailShareButton,
  EmailIcon,
} from 'next-share';

interface Props {
  title: string;
}

const PostSocialShare: React.FC<Props> = ({ title }) => {
  const route = `https://gmc-frontend-prelaunch.vercel.app/${
    useRouter().asPath
  }`;
  return (
    <div className="space-x-1">
      <FacebookShareButton url={route} quote={title} hashtag={'#GiveMeChoice'}>
        <FacebookIcon size={32} round />
      </FacebookShareButton>
      <TwitterShareButton url={route} title={title} hashtags={['GiveMeChoice']}>
        <TwitterIcon size={32} round />
      </TwitterShareButton>
      <WhatsappShareButton url={route} title={title} separator=":: ">
        <WhatsappIcon size={32} round />
      </WhatsappShareButton>
      <EmailShareButton url={route} subject={title} body="Give Me Choice Blog">
        <EmailIcon size={32} round />
      </EmailShareButton>
    </div>
  );
};

export default PostSocialShare;
