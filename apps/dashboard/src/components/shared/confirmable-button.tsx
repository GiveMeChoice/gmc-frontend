import React, { useState } from 'react';
import LoadingWheel from './loading-wheel';
import cn from 'classnames';

interface Props {
  title: string;
  disabled?: boolean;
  onConfirm: () => Promise<any>;
}

const ConfirmableButton: React.FC<Props> = ({ title, disabled, onConfirm }) => {
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
    <div className="rounded-full border border-secondary-dark-40 bg-secondary-dark-10 p-1">
      <button
        className="h-8 w-28 rounded-full bg-secondary-dark-10 p-0.5 text-center text-xs text-secondary-dark-50"
        disabled
      >
        {title}
      </button>
    </div>
  ) : (
    <button
      className={cn('group rounded-full p-0.5', {
        'bg-secondary-dark-40': disabled,
        'bg-secondary-dark-20': loading,
        'cursor-pointer border-1.5 border-gmc-berry bg-zinc-800 hover:border-inherit hover:bg-gmc-berry':
          !loading && !confirmable,
        'cursor-pointer border-1.5 bg-gmc-heart-light-40 hover:border-inherit hover:bg-gmc-heart':
          confirmable,
      })}
      disabled={loading}
      onClick={handleClick}
    >
      <div
        className={cn(
          'flex h-9 w-28 items-center justify-center rounded-full text-xs',
          {
            'border-secondary-dark-20 bg-secondary-dark-20': loading,
            'border-zinc-800 bg-zinc-800 text-white group-active:bg-gmc-berry-dark-50':
              !loading && !confirmable,
            'border-gmc-heart-light-40 bg-gmc-heart-light-40 font-bold group-active:bg-gmc-heart-light-20':
              confirmable,
          }
        )}
      >
        {loading ? (
          <LoadingWheel size="w-5" />
        ) : confirmable ? (
          'CONFIRM'
        ) : (
          title
        )}
      </div>
    </button>
  );
};

export default ConfirmableButton;
