import React from 'react';
import cn from 'classnames';

interface Props {
  title: string;
  subtitle: string;
}

export const PostTitle: React.FC<Props> = ({ title, subtitle }) => (
  <>
    <h1
      className={cn(
        'mt-12 text-center text-5xl font-bold leading-tight tracking-tight sm:text-6xl md:text-left md:text-7xl md:leading-none md:tracking-normal lg:text-7xl',
        {
          'mb-12': !subtitle,
          'mb-4': subtitle,
        }
      )}
    >
      {title}
    </h1>
    {subtitle && (
      <h4 className="mb-10 ml-2 text-center text-lg text-gray-600 sm:text-xl md:text-left md:text-2xl">
        {subtitle}
      </h4>
    )}
  </>
);
