import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import cn from 'classnames';

const Navigation: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [maxIdx, setMaxIdx] = useState(0);
  useEffect(() => {
    if (history.state.idx > maxIdx) {
      setMaxIdx(history.state.idx);
    }
  }, [location.pathname]);
  const onBack = () => {
    navigate(-1);
  };
  const onForward = () => {
    navigate(1);
  };
  return (
    <div className="mt-1 flex space-x-2">
      <button
        className={cn(
          'flex h-9 w-20 items-center justify-center rounded-lg border-2 border-secondary p-3 pb-3.5 text-5xl',
          {
            'border border-secondary-dark-40 bg-inherit text-secondary-dark-40':
              history.state.idx === 0,
            'hover:border-primary hover:bg-zinc-800 hover:text-primary active:bg-gmc-surf active:bg-opacity-50':
              history.state.idx > 0,
          }
        )}
        onClick={onBack}
        disabled={history.state.idx === 0}
      >
        <div className="h-14 rounded-lg pr-1">{'<'}</div>
      </button>
      <button
        className={cn(
          'flex h-9 w-20 items-center justify-center rounded-lg border-2 border-secondary p-3 pb-3.5 text-5xl lg:border-secondary',
          {
            'border border-secondary-dark-40 bg-inherit text-secondary-dark-40':
              history.state.idx === maxIdx,
            'hover:border-primary hover:bg-zinc-800 hover:text-primary active:bg-gmc-surf active:bg-opacity-50':
              history.state.idx < maxIdx,
          }
        )}
        onClick={onForward}
        disabled={history.state.idx === maxIdx}
      >
        <span className="h-14 pl-1">{'>'}</span>
      </button>
    </div>
  );
};

export default Navigation;
