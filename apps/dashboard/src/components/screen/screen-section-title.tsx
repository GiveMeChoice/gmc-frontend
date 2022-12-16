import React from 'react';

interface Props {
  title: string;
}

const ScreenSectionTitle: React.FC<Props> = ({ title }) => {
  return (
    <div className="">
      <h3 className="text-xl font-bold">{title}</h3>
    </div>
  );
};

export default ScreenSectionTitle;
