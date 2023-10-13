import React from 'react';

interface Props {
  title: string;
}

const ScreenSectionTitle: React.FC<Props> = ({ title }) => {
  return <h3 className="pl-2 text-xl font-bold">{title}</h3>;
};

export default ScreenSectionTitle;
