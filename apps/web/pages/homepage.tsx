import SEO from '../components/Common/SEO';
import { useUser } from '../components/Context/UserProvider';
import GiveMeRainbows from '../components/Homepage/GiveMeRainbows';
import HomeSidebar from '../components/Homepage/HomeSidebar';

export default function Home() {
  const { user } = useUser();

  return (
    <>
      <SEO
        title="Home | Give Me Choice"
        description="Sustainable shopping simplified | Give Me Choice"
        ogUrl="/"
      />
      <section className="max-w-screen flex h-screen items-center justify-between">
        <div className="h-full w-1/3">
          <HomeSidebar />
        </div>
        <div className="flex h-full w-2/3 flex-col items-center justify-center py-8">
          <div className="flex items-center justify-center pt-4">
            <GiveMeRainbows />
          </div>
          {/* <DiscoverFooter /> */}
          {/* <div className="relative flex h-full w-full items-center justify-center">
            <div className="h-full overflow-hidden border-y-1.5 border-secondary">
              <Image
                src="/img/images/hero4.jpg"
                priority
                draggable={false}
                layout="fill"
                objectPosition="center"
                objectFit="cover"
                alt="hero"
              />
            </div>
          </div> */}
        </div>
      </section>
    </>
  );
}
