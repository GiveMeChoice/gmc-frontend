import Head from 'next/head';
import cn from 'classnames';
// const GiveMeLogo = require('/img/GIVE_ME.svg');

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-2">
      <Head>
        <title>Web - Turborepo Example</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="mx-auto w-auto px-4 lg:px-8">
        <div className="flex flex-wrap justify-center p-3 sm:flex-nowrap">
          <button
            id="search-button"
            className={cn(
              'max-w pushable flex w-1/3 cursor-pointer rounded-full bg-slate-800 duration-100'
            )}
            // disabled={!query}
            // onClick={handleSearch}
          >
            <span
              className={cn(
                'front flex h-full w-full items-center justify-center rounded-full border border-zinc-600 bg-primary duration-100'
              )}
            >
              <img
                className="h-fit p-3"
                draggable={false}
                src="/img/GIVE_ME.svg"
                alt="give me"
              />
            </span>
          </button>
          <div id="query-input" className="ml-3 flex w-full">
            <input
              id="gmc-search-bar"
              className="w-full border-b-2 border-black bg-inherit pl-2.5 text-4xl outline-none"
              // value={query}
              autoComplete="off"
              // onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  // if (query) {
                  //   handleSearch();
                  // }
                }
              }}
            />
          </div>
        </div>
      </main>
    </div>
  );
}
