import Head from 'next/head';
import Image from 'next/image';

export default function AboutUs() {
  const heroUrl =
    'https://images.unsplash.com/photo-1572721968930-b96258f64801?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=987&q=80';
  const smallUrl =
    'https://images.unsplash.com/photo-1668457248686-e797dcdc0a48?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2026&q=80';
  return (
    <>
      <Head>
        <title>About Us | Give Me Choice</title>
      </Head>
      <section id="about">
        {/* CONTAINER */}
        <div className="items-between container mx-auto mb-12 mt-4 flex flex-col justify-center space-y-8 px-6 md:flex-row md:space-x-10 xl:px-36">
          {/* IMAGE BOX */}
          <div className="rounded-md md:mt-12">
            <Image
              className="rounded-md"
              src={heroUrl}
              alt="Coin"
              loader={() => heroUrl}
              width={450}
              height={650}
              objectFit="cover"
            />
          </div>
          {/* TEXT BOX */}
          <div className=" flex flex-col items-center space-y-6 md:mb-0 md:w-1/2">
            <h1 className="max-w-md text-center text-5xl font-bold md:mb-7 md:text-7xl">
              About Us
            </h1>
            <p className="max-w-md text-center md:text-left">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
              pellentesque orci elementum, consectetur arcu ut, tincidunt justo.
              Praesent quis tortor luctus, varius tellus eget, malesuada quam.
              In tempus est felis, ac scelerisque tortor fringilla id. Fusce
              erat lorem, ultrices eu diam id, eleifend suscipit nibh. Praesent
              tempus rhoncus mauris, nec maximus leo accumsan eget. Pellentesque
              in ligula porta justo fermentum sodales. Sed viverra est sed felis
              laoreet, a gravida nulla consectetur. Sed euismod erat id erat
              volutpat, et auctor purus malesuada. Mauris sagittis semper nulla
              nec feugiat. Fusce rhoncus orci non massa volutpat, non
              sollicitudin dui aliquam. Suspendisse ac luctus arcu. Nullam
              dictum vehicula urna, vel iaculis metus tempor non. Fusce vel
              risus at mi pellentesque dignissim ut a felis.
            </p>
            <p className="max-w-md text-center md:text-left">
              Proin efficitur justo at urna maximus, et pharetra eros porttitor.
              Phasellus ac nisl pulvinar lorem congue auctor. Nullam ut dui sed
              nisl molestie dapibus et eget lectus. Morbi et sollicitudin odio.
              Nullam quis vehicula lectus. Mauris eget erat laoreet ante tempor
              tincidunt. Aliquam fringilla ullamcorper sem, sit amet consectetur
              nisl ullamcorper ut. Donec venenatis velit libero, eu scelerisque
              dolor interdum a. Phasellus est augue, porta id ante sed, volutpat
              pharetra sapien. Integer tellus metus, venenatis sed consectetur
              sit amet, cursus dictum lacus. Vestibulum nec efficitur sem. Morbi
              bibendum lacus id mi tincidunt accumsan. Sed a odio ultrices,
              tempus nulla ac, finibus urna. Etiam ullamcorper varius augue
              interdum varius.
            </p>
            <div className="rounded-md md:mt-12">
              <Image
                className="rounded-md"
                src={smallUrl}
                alt="Coin"
                loader={() => smallUrl}
                width={450}
                height={250}
                objectFit="cover"
              />
            </div>
            <p className="max-w-md text-center md:text-left">
              Phasellus at sapien nisl. Donec et augue et felis lobortis
              iaculis. Proin ornare, sapien eu imperdiet tristique, justo erat
              ultricies nisl, eget ultrices ipsum nulla et ligula. Donec semper
              bibendum interdum. Duis lobortis mollis ultrices. Suspendisse
              laoreet lorem ut metus cursus, at egestas felis aliquet. Curabitur
              congue tellus eu dolor cursus, eu ornare orci ullamcorper. Mauris
              eget aliquam sapien. Aenean in nulla ligula. Suspendisse ac leo
              congue, faucibus nibh et, sodales orci. In pellentesque maximus
              nisl vitae tempus.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
