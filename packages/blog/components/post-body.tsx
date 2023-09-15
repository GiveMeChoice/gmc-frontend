import Image from 'next/image';
import React from 'react';
const markdownStyles = require('./markdown-styles.module.css');

import { PortableText } from '@portabletext/react';
import { urlForImage } from '../lib/sanity';

const ImageComponent = ({ value, isInline }: any) => {
  // const pattern = /^image-([a-f\d]+)-(\d+x\d+)-(\w+)$/;

  // const decodeAssetId = (id: any) => {
  //   const array = pattern.exec(id);
  //   console.log('heres yoru damn array: ' + array);
  //   const [width, height] = dimensions
  //     .split('x')
  //     .map((v: any) => parseInt(v, 10));

  //   return {
  //     assetId,
  //     dimensions: { width, height },
  //     format,
  //   };
  // };

  // const dims = decodeAssetId(value);

  const url = urlForImage(value).height(1000).width(2000).url();
  return (
    <div className="w-full max-w-[800px] p-2">
      <Image
        className="w-full"
        layout="responsive"
        alt="Blog Image"
        width={2000}
        height={1000}
        unoptimized
        loader={() => url}
        src={url}
      />
    </div>
  );
};

const components = {
  types: {
    image: ImageComponent,
  },
  // Any other custom types you have in your content
  // Examples: mapLocation, contactForm, code, featuredProjects, latestNews, etc.
  list: {
    // Ex. 1: customizing common list types
    bullet: ({ children }: any) => (
      <ul className="mt-xl list-disc pl-8">{children}</ul>
    ),
    number: ({ children }: any) => (
      <ol className="list-decimal pl-8">{children}</ol>
    ),

    // Ex. 2: rendering custom lists
    checkmarks: ({ children }: any) => (
      <ol className="m-auto text-lg">{children}</ol>
    ),
  },
  listItem: {
    // Ex. 1: customizing common list types
    bullet: ({ children }: any) => (
      <li
        style={{ fontSize: '18px', lineHeight: 1.5 }}
        className="pb-3 text-zinc-700"
      >
        {children}
      </li>
    ),
    number: ({ children }: any) => (
      <li
        style={{ fontSize: '18px', lineHeight: 1.5 }}
        className="pb-4 text-zinc-700"
      >
        {children}
      </li>
    ),

    // Ex. 2: rendering custom list items
    checkmarks: ({ children }: any) => <li>✅ {children}</li>,
  },
  block: {
    // Ex. 1: customizing common block types
    h1: ({ children }: any) => (
      <h1
        style={{ fontSize: '44px', lineHeight: '1.3' }}
        className="font-extrabold text-zinc-800"
      >
        {children}
      </h1>
    ),
    h2: ({ children }: any) => (
      <h2
        style={{ fontSize: '36px', lineHeight: '1.3' }}
        className="font-extrabold text-zinc-800"
      >
        {children}
      </h2>
    ),
    h3: ({ children }: any) => (
      <h3
        style={{ fontSize: '24px', lineHeight: '1.3' }}
        className="font-extrabold text-zinc-800"
      >
        {children}
      </h3>
    ),
    blockquote: ({ children }: any) => (
      <blockquote className="ml-1 border-4 border-l-primary border-t-white border-r-white border-b-white p-1 pl-3">
        {children}
      </blockquote>
    ),
    normal: ({ children }: any) => (
      <p
        style={{ fontSize: '18px', lineHeight: 1.6 }}
        className="mx-1 text-zinc-700"
      >
        {children}
      </p>
    ),
  },
  marks: {
    // Ex. 1: custom renderer for the em / italics decorator
    strong: ({ children }: any) => (
      <strong className="font-bold text-black">{children}</strong>
    ),

    // Ex. 2: rendering a custom `link` annotation
    link: ({ value, children }: any) => {
      const target = (value?.href || '').startsWith('http')
        ? '_blank'
        : undefined;
      return (
        <a
          href={value?.href}
          target={target}
          style={{ color: '#c67d9d', fontWeight: 900, fontSize: '19px' }}
          className="tracking-tight underline-offset-[2px] hover:underline"
          rel={target === '_blank' && ('noindex nofollow' as any)}
        >
          {children}
        </a>
      );
    },
  },
};

interface Props {
  content: any;
}

export const PostBody: React.FC<Props> = ({ content }) => {
  return (
    <div className={`${markdownStyles.markdown}`}>
      <PortableText value={content} components={components} />
    </div>
  );
};
