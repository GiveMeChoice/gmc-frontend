import { ProductDocument } from 'gmc-types';
import { GetStaticProps } from 'next';
import ComparableProduct from '../../../components/SearchPage/ComparableProduct';
import ShopLayout from '../../../components/ShopLayout';

interface ProductPageProps {
  product: ProductDocument;
}

export default function ProductPage({ product }: ProductPageProps) {
  return (
    <section className="mt-[44px]">
      <ShopLayout>
        <div className="flex w-full justify-center">
          <div className="max-w-[1300px] border-x-1.5 border-zinc-700">
            <ComparableProduct
              index={0}
              product={product}
              nextProduct={null}
              prevProduct={null}
              isFirst={true}
              isLast={true}
            />
          </div>
        </div>
      </ShopLayout>
    </section>
  );
}

export const getStaticProps: GetStaticProps = async (context) => {
  // const res = await fetch('https://.../posts');
  // const posts = await res.json();
  console.log('***** RE-RENDERING PRODUCT ' + context.params.slug);
  const elastic = `${process.env.ELASTIC_ENDPOINT}/gmc_search/_doc/${context.params.slug}`;
  const res = await fetch(elastic, {
    headers: new Headers({
      Authorization: `Basic ${Buffer.from(
        `${process.env.ELASTIC_USERNAME}:${process.env.ELASTIC_PASSWORD}`,
        'utf8'
      ).toString('base64')}`,
    }),
  });
  const data = await res.json();
  return {
    props: {
      product: data._source,
    },
    // Next.js will attempt to re-generate the page:
    // - When a request comes in
    // - At most once every 10 seconds
    revalidate: 3600, // In seconds
  };
};

export async function getStaticPaths() {
  // const res = await fetch('https://.../posts')
  // const posts = await res.json()

  // // Get the paths we want to pre-render based on posts
  // const paths = posts.map((post) => ({
  //   params: { id: post.id },
  // }))

  // We'll pre-render only these paths at build time.
  // { fallback: 'blocking' } will server-render pages
  // on-demand if the path doesn't exist.
  return { paths: [], fallback: 'blocking' };
}

// export async function getStaticProps() {
//   const res = await fetch('https://.../posts')
//   const posts = await res.json()

//   return {
//     props: {
//       posts,
//     },
//     // Next.js will attempt to re-generate the page:
//     // - When a request comes in
//     // - At most once every 10 seconds
//     revalidate: 10, // In seconds
//   }
// } satisfies GetStaticProps;;
