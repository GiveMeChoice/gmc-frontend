import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './navbar';
import ScreenContainer from './screen/screen-container';
import Sidebar from './sidebar';
import cn from 'classnames';

const Layout: React.FC = () => {
  const [optionsOn, setOptionsOn] = useState<boolean>(false);
  return (
    <div className="flex h-screen bg-zinc-900 ">
      <Sidebar />
      <div className="flex w-full flex-col">
        <Navbar />
        <div className="flex h-full overflow-y-auto">
          <ScreenContainer>
            <Outlet />
          </ScreenContainer>
          <div
            className={cn(
              'bg-divide-zinc-900 absolute right-0 top-44 flex h-12 cursor-pointer flex-col justify-center rounded-l-md bg-zinc-900 bg-opacity-90 pl-1.5 outline outline-secondary duration-500 lg:top-32 ',
              {
                'w-7': !optionsOn,
                'w-0': optionsOn,
              }
            )}
            onClick={() => setOptionsOn(!optionsOn)}
          >
            <div className="flex flex-col divide-y-2 divide-primary">
              <div className="h-2" />
              <div className="h-2" />
              <div className="h-2" />
              <div className="h-2" />
            </div>
          </div>
          <div
            className={cn(
              'fixed right-0 h-full overflow-hidden  border-secondary bg-zinc-900 duration-300',
              {
                'w-0 border-0': !optionsOn,
                'w-96 border-l-2': optionsOn,
              }
            )}
          >
            <div
              className="relative top-4 ml-80 flex h-8 w-8 cursor-pointer items-center justify-center rounded-full border-2 border-secondary pb-2 text-2xl  text-secondary hover:border-primary hover:text-primary"
              onClick={() => setOptionsOn(!optionsOn)}
            >
              x
            </div>
            <div className="flex flex-col px-6 text-4xl text-white">
              Options
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Layout;
