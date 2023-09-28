import React, { useState } from 'react';
import LoadingWheel from './loading-wheel';
import cn from 'classnames';

interface Props {
  title: any;
  disabled?: boolean;
  important?: boolean;
  onConfirm: () => Promise<any>;
}

const ConfirmableButton: React.FC<Props> = ({
  title,
  disabled,
  onConfirm,
  important,
}) => {
  const [confirmable, setConfirmable] = useState<NodeJS.Timeout>();
  const [loading, setLoading] = useState(false);

  const handleClick = async () => {
    if (!confirmable) {
      const timeout = setTimeout(() => {
        setConfirmable(null);
      }, 2000);
      setConfirmable(timeout);
    } else {
      setLoading(true);
      clearTimeout(confirmable);
      setConfirmable(null);
      try {
        await onConfirm();
      } catch (e) {
        console.error(e);
      }
      setLoading(false);
    }
  };

  return disabled ? (
    <div className="h-full rounded-lg border border-secondary-dark-40 bg-secondary-dark-10 p-1 font-bold">
      <button
        className="h-full w-28 rounded-lg bg-secondary-dark-10 p-0.5 text-center text-xs text-secondary-dark-50"
        disabled
      >
        {title}
      </button>
    </div>
  ) : (
    <button
      className={cn(
        'flex h-full w-28 items-center justify-center rounded-lg border-2 border-gmc-heart p-[1px]',
        {
          'active:bg-gmc-heart': !loading,
          'border-secondary-dark-20 bg-secondary-dark-20': loading,
          'bg-secondary text-black hover:bg-white': !loading && !confirmable,
          'bg-white text-black hover:bg-secondary-light-30':
            !loading && !confirmable && important,
          'bg-gmc-heart-light-40 font-bold ': confirmable,
        }
      )}
      disabled={loading}
      onClick={handleClick}
    >
      {loading ? (
        <LoadingWheel size="h-1/2" />
      ) : confirmable ? (
        'CONFIRM'
      ) : (
        title
      )}
    </button>
  );
};

export default ConfirmableButton;
