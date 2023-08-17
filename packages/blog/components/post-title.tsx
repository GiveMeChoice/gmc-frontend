import React from 'react';
import cn from 'classnames';

interface Props {
  title: string;
  subtitle: string;
}

export const PostTitle: React.FC<Props> = ({ title, subtitle }) => (
  <>
    <h1
      className={cn('mt-10 mb-8 text-left text-7xl font-bold tracking-normal', {
        // 'mb-12': !subtitle,
        // 'mb-4': subtitle,
      })}
    >
      {title}
    </h1>
    {subtitle && (
      <h4 className="mb-10 ml-2 pr-48 text-center text-lg text-gray-600 sm:text-xl md:text-left md:text-2xl">
        {subtitle}
      </h4>
    )}
  </>
);
