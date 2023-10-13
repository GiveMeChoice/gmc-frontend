import axios from 'axios';
import { GetStaticProps } from 'next';
import ShopLabelContent from '../../../components/Shop/ShopLabelContent';
import { IEntityPageData } from '../../../lib/types';
import { IGmcLabel } from 'gmc-types';

export default function LabelPage(data: IEntityPageData) {
  return (
    <section className="mt-[70px]">
      <ShopLabelContent pageData={data} />
    </section>
  );
}

export const getStaticProps: GetStaticProps<IEntityPageData> = async (
  context
) => {
  if (!context.params.labels) {
    try {
      const res = await axios.get<IGmcLabel[]>(
        `${process.env.BACKEND_URL}/gmc-labels`
      );
      return {
        props: {
          roots: res.data,
        } as IEntityPageData,
      };
    } catch (e) {
      console.error(e);
      return {
        notFound: true,
      };
    }
  } else {
    if (context.params.labels.length > 3) {
      return {
        notFound: true,
      };
    }
    const [slug, subslug1, subslug2] = context.params.labels as string[];
    console.log(
      '***** RE-RENDERING LABEL PAGE ' +
        `
    slug: ${slug}
    subslug1: ${subslug1}
    subslug2: ${subslug2}
  `
    );
    try {
      const res = await axios.get<IEntityPageData>(
        `${process.env.BACKEND_URL}/gmc-labels/page-data/${slug}${
          subslug1 ? `/${subslug1}` + (subslug2 ? `/${subslug2}` : '') : ''
        }`
      );
      return {
        props: res.data,
        revalidate: 3600,
      };
    } catch (e) {
      console.error(e);
      return {
        notFound: true,
      };
    }
  }
};

export async function getStaticPaths() {
  return { paths: [], fallback: 'blocking' };
}
