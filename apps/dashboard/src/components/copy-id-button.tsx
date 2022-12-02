/* eslint-disable @next/next/no-img-element */
import React from 'react';

interface Props {
  id: string;
}

const CopyIdButton: React.FC<Props> = ({ id }) => (
  <>
    <div
      className="flex h-7 w-7 cursor-pointer items-center justify-center rounded-full duration-100 hover:bg-zinc-300 active:bg-primary-light-30"
      onClick={() => {
        navigator.clipboard.writeText(id);
        document
          .getElementById(`copy-button-${id}`)
          .classList.remove('opacity-0');
        setTimeout(() => {
          document
            .getElementById(`copy-button-${id}`)
            .classList.add('opacity-0');
        }, 1350);
      }}
    >
      <img className="h-3.5 w-3.5" src="copy-icon.svg" alt="Copy Provider ID" />
    </div>
    <div
      id={`copy-button-${id}`}
      className="relative cursor-default opacity-0 duration-500"
    >
      <span className="absolute -top-3 left-1 block w-12 rounded-md bg-primary-light-30 p-1 text-xs duration-200">
        Copied
      </span>
    </div>
  </>
);

export default CopyIdButton;
