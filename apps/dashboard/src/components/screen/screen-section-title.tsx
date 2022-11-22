import React from 'react';

interface Props {
  title: string;
}

const ScreenSectionTitle: React.FC<Props> = ({ title }) => {
  return (
    <div className="my-4">
      <h3 className="text-lg font-bold">{title}</h3>
    </div>
  );
};

export default ScreenSectionTitle;
