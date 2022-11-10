// import React from 'react';
// import cn from 'classnames';
// import Image from 'next/future/image';
// import Link from 'next/link';
// import { urlForImage } from '../lib/sanity';

// interface Props {
//   title?: string;
//   slug?: string;
//   image?: any;
//   priority: boolean;
// }

// const CoverImage: React.FC<Props> = ({
//   title,
//   slug,
//   image: source,
//   priority,
// }) => {
//   const image = source?.asset?._ref ? (
//     <div
//       className={cn('shadow-small', {
//         'hover:shadow-medium transition-shadow duration-200': slug,
//       })}
//     >
//       <Image
//         className="h-auto w-full"
//         layout="responsive"
//         width={2000}
//         height={1000}
//         alt={`Cover Image for ${title}`}
//         src={urlForImage(source).height(1000).width(2000).url()}
//         sizes="100vw"
//         priority={priority}
//       />
//     </div>
//   ) : (
//     <div style={{ paddingTop: '50%', backgroundColor: '#ddd' }} />
//   );

//   return (
//     <div className="sm:mx-0">
//       {slug ? (
//         <Link href={`/posts/${slug}`} aria-label={title}>
//           {image}
//         </Link>
//       ) : (
//         image
//       )}
//     </div>
//   );
// };

// export default CoverImage;

export const NOTHING = 'NOTHING';
