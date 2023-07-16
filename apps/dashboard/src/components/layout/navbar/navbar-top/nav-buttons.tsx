import cn from 'classnames';
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const NavButtons: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [maxIdx, setMaxIdx] = useState(0);
  const [rootKey, setRootKey] = useState(null);
  useEffect(() => {
    setRootKey(history.state.key);
  }, []);

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
          'flex h-9 w-20 items-center justify-center rounded-full border-1.5 p-3 pb-3.5 text-5xl',
          {
            'border-secondary-dark-40 bg-inherit bg-zinc-600 text-secondary-dark-40':
              history.state && history.state.key === rootKey,
            'border-secondary text-white hover:bg-zinc-800 active:border-primary active:bg-opacity-50':
              !history.state || history.state.key !== rootKey,
          }
        )}
        onClick={onBack}
        disabled={history.state && history.state.key === rootKey}
      >
        <div className="mb-1.5 h-14 py-1 pr-1">{'<'}</div>
      </button>
      <button
        className={cn(
          'flex h-9 w-20 items-center justify-center rounded-full border-1.5 p-3 pb-3.5 text-5xl',
          {
            'border-secondary-dark-40 bg-inherit bg-zinc-600 text-secondary-dark-40':
              history.state && history.state.idx === maxIdx,
            'border-secondary text-white hover:bg-zinc-800 active:border-primary active:bg-opacity-50':
              history.state && history.state.idx < maxIdx,
          }
        )}
        onClick={onForward}
        disabled={history.state && history.state.idx === maxIdx}
      >
        <span className="mb-1.5 h-14 py-1 pl-1">{'>'}</span>
      </button>
    </div>
  );
};

export default NavButtons;
