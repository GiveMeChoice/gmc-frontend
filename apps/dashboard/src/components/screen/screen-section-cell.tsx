import React from 'react';

interface Props {
  styles?: string;
}

const ScreenSectionCell: React.FC<Props> = ({ children, styles }) => {
  return <div className={`py-2 px-4 ${styles}`}>{children}</div>;
};

export default ScreenSectionCell;
