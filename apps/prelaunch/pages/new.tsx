import Head from 'next/head';
import Image from 'next/image';
import { useState } from 'react';
import cn from 'classnames';

export default function Home() {
  const [email, setEmail] = useState<string>('');
  const [subscribing, setSubscribing] = useState<boolean>(false);
  const [subscribed, setSubscribed] = useState<boolean>(false);

  const onSubscribe = () => {
    setSubscribing(true);
    setTimeout(() => {
      setSubscribed(true);
      setSubscribing(false);
    }, 2000);
  };

  return (
    <>
      <Head>
        <title>Home | Give Me Choice</title>
      </Head>
      <section className="flex h-screen w-full flex-col items-start justify-center space-y-2 pl-12 text-7xl">
        <span className="">We</span>
        <span className="">believe</span>
        <span className="">every</span>
        <span className="">human</span>
        <span className="">deserves</span>
        <span className="underline decoration-4 underline-offset-8">
          Choice
        </span>
      </section>
    </>
  );
}
