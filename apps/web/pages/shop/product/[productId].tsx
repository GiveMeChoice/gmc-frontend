import axios from 'axios';
import { IGmcCategory, IProduct } from 'gmc-types';
import { GetStaticProps } from 'next';
import ProductPageBuyBox from '../../../components/ProductPage/ProductPageBuyBox';
import ProductPageCategory from '../../../components/ProductPage/ProductPageCategory';
import ProductPageDescription from '../../../components/ProductPage/ProductPageDescription';
import ProductPageImage from '../../../components/ProductPage/ProductPageImage';
import ProductPageLabels from '../../../components/ProductPage/ProductPageLabels';
import ShopLayout from '../../../components/Shop/ShopLayout';

interface ProductPageProps {
  product: IProduct;
}

export default function ProductPage({ product }: ProductPageProps) {
  return (
    // <section className="mt-[44px] h-full">
    <ShopLayout>
      <div className="flex w-1/2 flex-col divide-y-1.5 divide-zinc-700">
        {/* IMAGES  */}
        <ProductPageImage images={product.images} />
        <div className=""></div>
      </div>

      <div className="flex h-full w-1/2 flex-col divide-y-1.5 divide-zinc-700">
        <div className="w-full px-8 py-7 text-center">
          <span className="text-[24px] leading-[1.3]">
            {product.title.toUpperCase()}
          </span>
        </div>
        <ProductPageCategory
          category={product.merchantCategory.gmcCategory as IGmcCategory}
        />
        <ProductPageBuyBox product={product} />
        <ProductPageDescription description={product.description} />
        <ProductPageLabels
          labels={product.merchantLabels.filter((l) => !!l.gmcLabelId)}
        />
      </div>
    </ShopLayout>
  );
}

export const getStaticProps: GetStaticProps = async (context) => {
  if (!context.params.productId) {
    return {
      notFound: true,
    };
  }
  // const res = await fetch('https://.../posts');
  // const posts = await res.json();
  console.log('***** RE-RENDERING PRODUCT ' + context.params.productId);
  try {
    const res = await axios.get<IProduct>(
      `${process.env.BACKEND_URL}/products/${context.params.productId}`
    );
    if (res.data && res.data.id) {
      return {
        props: {
          product: res.data,
        },
        revalidate: 3600,
      };
    }
  } catch (ignore) {}
  return {
    notFound: true,
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
