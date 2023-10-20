import Head from 'next/head';

interface SEOProps {
  title: string;
  description: string;
  ogImage?: string; // to display a thumbnail or preview image whene someone shares a link of the page
  ogUrl?: string; // this ensures that when someone shares a page on social media, the shared link points to the correct page
}

const SEO: React.FC<SEOProps> = ({ title, description, ogImage, ogUrl }) => {
  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:url" content={ogUrl} />
      {/* Add more SEO-related meta tags here if needed */}
    </Head>
  );
};

export default SEO;
