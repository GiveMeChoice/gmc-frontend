import Head from 'next/head';
import { useRouter } from 'next/router';

export default function Access() {
  const router = useRouter();
  const error = router.query.error;
  return (
    <>
      <Head>
        <title>Enter Site</title>
      </Head>

      <section className="max-w-screen flex h-screen flex-col items-center justify-center space-y-8 bg-secondary">
        <svg
          width="64"
          height="64"
          viewBox="0 0 1050 1050"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="525" cy="525" r="525" fill="#A7F700" />
          <path
            d="M854.109 475.121H440.009L459.559 527.851H673.039C735.599 676.021 752.219 815.651 669.399 825.291C578.809 835.841 492.809 747.531 412.929 582.151C333.049 416.771 300.299 244.721 382.349 227.271C470.309 208.561 550.199 288.561 622.329 422.391H844.229C842.529 415.151 840.819 407.871 838.049 400.881C763.499 212.581 554.979 122.881 379.329 184.071C191.739 249.431 138.349 471.981 226.189 658.141C314.029 844.301 527.379 933.881 697.439 858.221C842.279 793.781 883.799 640.621 856.919 475.121H854.099H854.109Z"
            fill="black"
          />
        </svg>
        <form action="/api/access" method="post">
          <div className="form-control">
            <div className="input-group flex items-end space-x-2">
              <div className="flex flex-col items-start space-y-2">
                <div className="flex items-center gap-1">
                  <input
                    id="password"
                    type="text"
                    name="password"
                    className="h-10 w-96 rounded-md border border-black pl-2"
                  />
                  <button className=" h-10 rounded-lg border-3 border-primary bg-zinc-900 px-6 text-white">
                    Enter
                  </button>
                </div>
              </div>
            </div>
          </div>
          {error && (
            <div className="w-full pt-2 text-center">
              <span className="text-red-900">{error}</span>
            </div>
          )}
        </form>
        <div className="h-1/5"></div>
      </section>
    </>
  );
}
