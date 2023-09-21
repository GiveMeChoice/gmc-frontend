import { ProductDocument, SearchFunctionResponseDto } from 'gmc-types';
import { useRouter } from 'next/router';
import React from 'react';
import SearchChoiceBarFilterBox from '../SearchPage/SearchChoiceBar/SearchChoiceBarFilterBox';
import ShopLayout from '../ShopLayout';
import ShopCategoryIntro from './ShopCategoryIntro';
import ShopCategoryList from './ShopCategoryList';
import ListProduct from '../SearchPage/ListProduct';
import ListPagingHeader from '../SearchPage/ListPagingHeader';
import { HeroImage } from 'blog/components/hero-image';
import { ShopCategoryIntroImage } from './ShopCategoryIntro/ShopCategoryIntroImage';

interface Props {
  category: string;
  subcategory1?: string;
  subcategory2?: string;
  subcategories?: string[];
}

const ShopCategoryContent: React.FC<Props> = ({
  category,
  subcategory1,
  subcategory2,
}) => {
  let color = '#aa7ab2';
  if (category) {
    if (category.toLowerCase().includes('apparel')) color = '#6e79aa';
    if (category.toLowerCase().includes('bath')) color = '#adbe00';
    if (category.toLowerCase().includes('baby')) color = '#dcb586';
    if (category.toLowerCase().includes('pet')) color = '#f8ff93';
  }

  const router = useRouter();
  console.log(router.query.category);

  return (
    <ShopLayout>
      <div className="flex w-1/3 flex-col xl:w-[21%]">
        <ShopCategoryList />
        <SearchChoiceBarFilterBox
          compareModeOn={false}
          filters={{}}
          onFilterChange={null}
        />
      </div>
      <div className="flex w-2/3 flex-col items-center bg-secondary xl:w-[79%]">
        <div className="flex w-full divide-x-1.5 divide-zinc-700">
          <div className="flex h-full w-full items-center justify-center xl:w-2/3">
            <ShopCategoryIntro
              category={category}
              subcategory1={subcategory1}
              subcategory2={subcategory2}
              color={color}
              description="A Category of Products Dedicated to Friends, Lovers, and Spreaders of Eagles"
              subcategories={[
                'subcats & supercats',
                'subcat2 R us',
                'subcat3',
                'subcat4 u my fren',
              ]}
            />
          </div>
          <div className="hidden h-full w-1/3 xl:block">
            <ShopCategoryIntroImage
              image={{
                _type: 'image',
                asset: {
                  _ref: 'image-7fc8eb7108931907c24bef09739c49b1a50b30a8-2500x2500-jpg',
                  _type: 'reference',
                },
              }}
            />
          </div>
          <div className="hidden w-8 xl:block"></div>
        </div>
        <div className="h-10 w-full border-t-1.5 border-zinc-700 bg-white"></div>
        <div
          id="search-products"
          className="mb-3 flex max-h-full w-full flex-wrap items-start justify-start overflow-y-auto overflow-x-hidden"
        >
          <ListPagingHeader
            searchResponse={data as any}
            bottom
            nextPage={() => null}
            prevPage={() => null}
            firstPage={() => null}
            lastPage={() => null}
          />
          {data.data.map((product, i) => (
            <ListProduct
              key={i}
              index={i + data.page * data.pageSize}
              product={product as any}
              selectProduct={() => null}
              isLast={false}
            />
          ))}
          <ListPagingHeader
            searchResponse={data as any}
            bottom
            nextPage={() => null}
            prevPage={() => null}
            firstPage={() => null}
            lastPage={() => null}
          />
        </div>
      </div>
    </ShopLayout>
  );
};

export default ShopCategoryContent;

const data = {
  hits: 91,
  query: 'deodorant',
  page: 0,
  pageSize: 10,
  sort: 'price',
  data: [
    {
      id: 'WlJIW1WaDz',
      merchantProductCode: '486202',
      sku: '582334',
      title: "Wild Men's Mint & Aloe Vera Deodorant Refill - 40g",
      description:
        'Combining an energising blend of mint and aloe vera, complemented by a hint of Italian bergamot this deodorant refill is a great plastic-free zero waste alternative to traditional deodorant, packaged in a compostable case which can be used to refill the reusable aluminium and recycled plastic applicator. The soothing properties of aloe vera nourish the skin, while the invigorating mint provides a delightful burst of energy to kickstart your day. Containing tapioca starch, to absorb moisture, this deodorant keeps you dry and pleasantly fragrant throughout the day delivering reliable 24-hour protection against perspiration-related odours.\n\nSuitable for vegans and vegetarians. Free from aluminium, parabens, sulphates, SLS, mineral oils, microbeads, phthalates, phosphates, DMDM hydantoin, triclosan, chlorine, bleach and GMOs.\n\nMade in the Netherlands\n\nRefill made from bamboo pulp which is widely recyclable and fit for home composting.\n\nPackaged in recyclable card box from sustainable sources.\n\nEach refill lasts approx 4-6 weeks with daily use (on average), two gentle swipes per armpit.\n\nThanks to their partnership with ONAMISSION, Wild are proud to be carbon negative and have so far planted over 300,000 trees and counting!\n\n40g',
      price: '5.99',
      currency: 'GBP',
      rating: null,
      ratingsTotal: null,
      shippingPrice: '4.95',
      offerUrl:
        'https://www.ethicalsuperstore.com/products/wild/wild-men-s-mint---aloe-vera-deodorant-refill---40g/',
      brand: {
        code: 'wild',
        name: 'Wild',
        description:
          "At Wild Deodorants they're passionate about creating high-quality, natural products that promote a healthy lifestyle and a sustainable future. All of their deodorants are vegan-friendly and cruelty-free, so you can feel good about using them everyday and their eco-friendly packaging is made from recycled materials making it easy for you to reduce your environmental impact while staying fresh and confident.\nA leading manufacturer of high-quality, natural deodorants, Wild crafts their products using only the finest ingredients including coconut oil, shea butter and essential oils to provide effective, long-lasting odour protection without the use of harmful chemicals or synthetic fragrances. They understand everyone's body chemistry is unique which is why they offer a range of different scents and strengths to suit every individual's needs, whether you prefer something light and fresh or earthy and musky.",
        logo: null,
        url: null,
      },
      merchant: {
        region: 'UK',
        key: 'ethical-superstore',
        name: 'Ethical Superstore',
        description:
          'EthicalSuperstore.com is an online store that offers fair trade, eco-friendly, and organic products.',
        logo: 'data:image/png;base64,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',
        url: 'www.ethicalsuperstore.com',
      },
      category: {
        merchantCategory:
          'Beauty Health And Wellbeing > Bath And Body > Deodorant',
        gmcCategory: {
          name: 'Personal Care & Health',
        },
      },
      images: [
        {
          url: '//images.ethicalsuperstore.com/images/582334-wild-mens-mint-aloe-vera-deodorant-refill-1.jpg',
          primary: false,
          type: 'DETAIL',
        },
        {
          url: '//images.ethicalsuperstore.com/images/582334-wild-mens-mint-aloe-vera-deodorant-refill-2.jpg',
          primary: true,
          type: 'DETAIL',
        },
        {
          url: 'images.ethicalsuperstore.com/images/resize260/582334-wild-mens-mint-aloe-vera-deodorant-refill-2.jpg',
          primary: true,
          type: 'LIST',
        },
      ],
      reviews: [],
      labels: [
        {
          merchantLabel: {
            code: 'biodegradable',
            name: 'Biodegradable',
            description: 'Biodegradable',
            logo: 'https://www.ethicalsuperstore.com/images/icons/icon-eco-biodegradable.png',
            url: 'https://www.ethicalsuperstore.com/tags/biodegradable',
          },
          gmcLabel: {
            name: 'Uncategorized',
            description: 'Label has yet to be categorized',
          },
        },
        {
          merchantLabel: {
            code: 'carbon-neutral',
            name: 'Carbon Neutral',
            description: 'Carbon Neutral',
            logo: 'https://www.ethicalsuperstore.com/images/icons/icon-tree-carbonneutral.png',
            url: 'https://www.ethicalsuperstore.com/tags/carbon-neutral',
          },
          gmcLabel: {
            name: 'Uncategorized',
            description: 'Label has yet to be categorized',
          },
        },
        {
          merchantLabel: {
            code: 'certified-b-corporation',
            name: 'Certified B Corporation',
            description: 'Certified B Corporation',
            logo: 'https://www.ethicalsuperstore.com/images/icons/icon-bcorp-cert.png',
            url: 'https://www.ethicalsuperstore.com/tags/certified-b-corporation',
          },
          gmcLabel: {
            name: 'Certification',
            description:
              'Claim and of sustainable impact or ethical standard has been certified by a neutral third-party organization',
          },
        },
        {
          merchantLabel: {
            code: 'netherlands',
            name: 'Netherlands',
            description: 'Netherlands',
            logo: 'https://www.ethicalsuperstore.com/images/icons/country/Netherlands.png',
            url: 'https://www.ethicalsuperstore.com/tags/netherlands',
          },
          gmcLabel: {
            name: 'Origin',
            description:
              'Product was partially or wholly produced in this region',
            sublabel: {
              name: 'Made in Europe',
              description: 'Product was partially or wholly produced in Europe',
            },
          },
        },
        {
          merchantLabel: {
            code: 'no-animal-testing',
            name: 'No animal testing',
            description: 'No animal testing',
            logo: 'https://www.ethicalsuperstore.com/images/icons/icon-noanimaltesting.png',
            url: 'https://www.ethicalsuperstore.com/tags/no-animal-testing',
          },
          gmcLabel: {
            name: 'Production Method',
            description:
              'Specific practices adhered to during the manufacture and/or production of goods',
          },
        },
        {
          merchantLabel: {
            code: 'paraben-free',
            name: 'Paraben Free',
            description: 'Paraben Free',
            logo: 'https://www.ethicalsuperstore.com/images/icons/icon-parabenfree.png',
            url: 'https://www.ethicalsuperstore.com/tags/no-parabens',
          },
          gmcLabel: {
            name: 'Ingredients and Dietary',
            description:
              'Products that meet the ingredient requirements for specific dietary restrictions or additive (non-additive) preferences',
          },
        },
        {
          merchantLabel: {
            code: 'phthalate-free',
            name: 'Phthalate Free',
            description: 'Phthalate Free',
            logo: 'https://www.ethicalsuperstore.com/images/icons/icon-phthalate-free.png',
            url: 'https://www.ethicalsuperstore.com/tags/phthalate-free',
          },
          gmcLabel: {
            name: 'Ingredients and Dietary',
            description:
              'Products that meet the ingredient requirements for specific dietary restrictions or additive (non-additive) preferences',
          },
        },
        {
          merchantLabel: {
            code: 'plastic-free',
            name: 'Plastic Free',
            description: 'Plastic Free',
            logo: 'https://www.ethicalsuperstore.com/images/icons/icon-plastic-free.png',
            url: 'https://www.ethicalsuperstore.com/tags/plastic-free',
          },
          gmcLabel: {
            name: 'Ingredients and Dietary',
            description:
              'Products that meet the ingredient requirements for specific dietary restrictions or additive (non-additive) preferences',
          },
        },
        {
          merchantLabel: {
            code: 'recycled-or-recyclable-packaging',
            name: 'Recycled or Recyclable Packaging',
            description: 'Recycled or Recyclable Packaging',
            logo: 'https://www.ethicalsuperstore.com/images/icons/icon-recyclable-pack.png',
            url: 'https://www.ethicalsuperstore.com/tags/recycled-or-recyclable-packaging',
          },
          gmcLabel: {
            name: 'Uncategorized',
            description: 'Label has yet to be categorized',
          },
        },
        {
          merchantLabel: {
            code: 'sls-free',
            name: 'SLS Free',
            description: 'SLS Free',
            logo: 'https://www.ethicalsuperstore.com/images/icons/icon-slsfree.png',
            url: 'https://www.ethicalsuperstore.com/tags/no-slss',
          },
          gmcLabel: {
            name: 'Ingredients and Dietary',
            description:
              'Products that meet the ingredient requirements for specific dietary restrictions or additive (non-additive) preferences',
          },
        },
        {
          merchantLabel: {
            code: 'supports-a-charity',
            name: 'Supports a Charity',
            description: 'Supports a Charity',
            logo: 'https://www.ethicalsuperstore.com/images/icons/icon-charity.png',
            url: 'https://www.ethicalsuperstore.com/tags/supports-a-charity',
          },
          gmcLabel: {
            name: 'Uncategorized',
            description: 'Label has yet to be categorized',
          },
        },
        {
          merchantLabel: {
            code: 'sustainable-palm-oil',
            name: 'Sustainable Palm Oil',
            description: 'Sustainable Palm Oil',
            logo: 'https://www.ethicalsuperstore.com/images/icons/icon-sustainable-palmoil.png',
            url: 'https://www.ethicalsuperstore.com/tags/sustainable-palm-oil',
          },
          gmcLabel: {
            name: 'Ingredients and Dietary',
            description:
              'Products that meet the ingredient requirements for specific dietary restrictions or additive (non-additive) preferences',
            sublabel: {
              name: 'Palm-Oil Free',
              description: 'Products without palm-oil',
            },
          },
        },
        {
          merchantLabel: {
            code: 'triclosan-free',
            name: 'Triclosan Free',
            description: 'Triclosan Free',
            logo: 'https://www.ethicalsuperstore.com/images/icons/icon-triclosan-free.png',
            url: 'https://www.ethicalsuperstore.com/tags/triclosan-free',
          },
          gmcLabel: {
            name: 'Ingredients and Dietary',
            description:
              'Products that meet the ingredient requirements for specific dietary restrictions or additive (non-additive) preferences',
          },
        },
        {
          merchantLabel: {
            code: 'vegan',
            name: 'Vegan',
            description: 'Vegan',
            logo: 'https://www.ethicalsuperstore.com/images/icons/icon-vegan.png',
            url: 'https://www.ethicalsuperstore.com/tags/vegan',
          },
          gmcLabel: {
            name: 'Uncategorized',
            description: 'Label has yet to be categorized',
          },
        },
        {
          merchantLabel: {
            code: 'vegetarian',
            name: 'Vegetarian',
            description: 'Vegetarian',
            logo: 'https://www.ethicalsuperstore.com/images/icons/icon-vegetarian.png',
            url: 'https://www.ethicalsuperstore.com/tags/vegetarian',
          },
          gmcLabel: {
            name: 'Ingredients and Dietary',
            description:
              'Products that meet the ingredient requirements for specific dietary restrictions or additive (non-additive) preferences',
          },
        },
      ],
    },
    {
      id: 'WKI3ueddVi',
      merchantProductCode: '480818',
      sku: '569321',
      title: 'Wild Coconut & Vanilla Deodorant Refill - 40g',
      description:
        'This plastic free Coconut & Vanilla Deodorant refill is a great zero-waste alternative to traditional deodorants as the packaging is completely compostable and can be used to refill the reusable, durable aluminium and recycled plastic applicator. Containing an exotic blend of coconut oil, cocoa and shea butter to have you reminiscing about those sunny beach holidays this deodorant is made with natural ingredients including tapioca starch, which absorbs moisture, to keep you dry and fresh all day long.\n\nSuitable for vegans and vegetarians. Free from aluminium, parabens, sulphates, SLS, mineral oils, microbeads, phthalates, phosphates, DMDM hydantoin, triclosan, chlorine, bleach and GMOs.\n\nMade in the Netherlands\n\nRefill made from bamboo pulp which is widely recyclable and fit for home composting.\n\nPackaged in recyclable card box from sustainable sources.\n\nEach refill lasts approx 4-6 weeks with daily use (on average), two gentle swipes per armpit.\n\nThanks to their partnership with ONAMISSION, Wild are proud to be carbon negative and have so far planted over 300,000 trees and counting!\n\n40g',
      price: '5.99',
      currency: 'GBP',
      rating: null,
      ratingsTotal: null,
      shippingPrice: '4.95',
      offerUrl:
        'https://www.ethicalsuperstore.com/products/wild/wild-coconut---vanilla-deodorant-refill---40g/',
      brand: {
        code: 'wild',
        name: 'Wild',
        description:
          "At Wild Deodorants they're passionate about creating high-quality, natural products that promote a healthy lifestyle and a sustainable future. All of their deodorants are vegan-friendly and cruelty-free, so you can feel good about using them everyday and their eco-friendly packaging is made from recycled materials making it easy for you to reduce your environmental impact while staying fresh and confident.\nA leading manufacturer of high-quality, natural deodorants, Wild crafts their products using only the finest ingredients including coconut oil, shea butter and essential oils to provide effective, long-lasting odour protection without the use of harmful chemicals or synthetic fragrances. They understand everyone's body chemistry is unique which is why they offer a range of different scents and strengths to suit every individual's needs, whether you prefer something light and fresh or earthy and musky.",
        logo: null,
        url: null,
      },
      merchant: {
        region: 'UK',
        key: 'ethical-superstore',
        name: 'Ethical Superstore',
        description:
          'EthicalSuperstore.com is an online store that offers fair trade, eco-friendly, and organic products.',
        logo: 'data:image/png;base64,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',
        url: 'www.ethicalsuperstore.com',
      },
      category: {
        merchantCategory:
          'Beauty Health And Wellbeing > Bath And Body > Deodorant',
        gmcCategory: {
          name: 'Personal Care & Health',
        },
      },
      images: [
        {
          url: '//images.ethicalsuperstore.com/images/coconut-vanilla.jpg',
          primary: false,
          type: 'DETAIL',
        },
        {
          url: '//images.ethicalsuperstore.com/images/569321-wild-coconut-vanilla-deodorant-refill-4.jpg',
          primary: false,
          type: 'DETAIL',
        },
        {
          url: '//images.ethicalsuperstore.com/images/569321-wild-coconut-vanilla-deodorant-refill-1.jpg',
          primary: false,
          type: 'DETAIL',
        },
        {
          url: '//images.ethicalsuperstore.com/images/569321-wild-coconut-vanilla-deodorant-refill-2.jpg',
          primary: true,
          type: 'DETAIL',
        },
        {
          url: 'images.ethicalsuperstore.com/images/resize260/569321-wild-coconut-vanilla-deodorant-refill-2.jpg',
          primary: true,
          type: 'LIST',
        },
      ],
      reviews: [],
      labels: [
        {
          merchantLabel: {
            code: 'biodegradable',
            name: 'Biodegradable',
            description: 'Biodegradable',
            logo: 'https://www.ethicalsuperstore.com/images/icons/icon-eco-biodegradable.png',
            url: 'https://www.ethicalsuperstore.com/tags/biodegradable',
          },
          gmcLabel: {
            name: 'Uncategorized',
            description: 'Label has yet to be categorized',
          },
        },
        {
          merchantLabel: {
            code: 'carbon-neutral',
            name: 'Carbon Neutral',
            description: 'Carbon Neutral',
            logo: 'https://www.ethicalsuperstore.com/images/icons/icon-tree-carbonneutral.png',
            url: 'https://www.ethicalsuperstore.com/tags/carbon-neutral',
          },
          gmcLabel: {
            name: 'Uncategorized',
            description: 'Label has yet to be categorized',
          },
        },
        {
          merchantLabel: {
            code: 'certified-b-corporation',
            name: 'Certified B Corporation',
            description: 'Certified B Corporation',
            logo: 'https://www.ethicalsuperstore.com/images/icons/icon-bcorp-cert.png',
            url: 'https://www.ethicalsuperstore.com/tags/certified-b-corporation',
          },
          gmcLabel: {
            name: 'Certification',
            description:
              'Claim and of sustainable impact or ethical standard has been certified by a neutral third-party organization',
          },
        },
        {
          merchantLabel: {
            code: 'netherlands',
            name: 'Netherlands',
            description: 'Netherlands',
            logo: 'https://www.ethicalsuperstore.com/images/icons/country/Netherlands.png',
            url: 'https://www.ethicalsuperstore.com/tags/netherlands',
          },
          gmcLabel: {
            name: 'Origin',
            description:
              'Product was partially or wholly produced in this region',
            sublabel: {
              name: 'Made in Europe',
              description: 'Product was partially or wholly produced in Europe',
            },
          },
        },
        {
          merchantLabel: {
            code: 'no-animal-testing',
            name: 'No animal testing',
            description: 'No animal testing',
            logo: 'https://www.ethicalsuperstore.com/images/icons/icon-noanimaltesting.png',
            url: 'https://www.ethicalsuperstore.com/tags/no-animal-testing',
          },
          gmcLabel: {
            name: 'Production Method',
            description:
              'Specific practices adhered to during the manufacture and/or production of goods',
          },
        },
        {
          merchantLabel: {
            code: 'paraben-free',
            name: 'Paraben Free',
            description: 'Paraben Free',
            logo: 'https://www.ethicalsuperstore.com/images/icons/icon-parabenfree.png',
            url: 'https://www.ethicalsuperstore.com/tags/no-parabens',
          },
          gmcLabel: {
            name: 'Ingredients and Dietary',
            description:
              'Products that meet the ingredient requirements for specific dietary restrictions or additive (non-additive) preferences',
          },
        },
        {
          merchantLabel: {
            code: 'phthalate-free',
            name: 'Phthalate Free',
            description: 'Phthalate Free',
            logo: 'https://www.ethicalsuperstore.com/images/icons/icon-phthalate-free.png',
            url: 'https://www.ethicalsuperstore.com/tags/phthalate-free',
          },
          gmcLabel: {
            name: 'Ingredients and Dietary',
            description:
              'Products that meet the ingredient requirements for specific dietary restrictions or additive (non-additive) preferences',
          },
        },
        {
          merchantLabel: {
            code: 'plastic-free',
            name: 'Plastic Free',
            description: 'Plastic Free',
            logo: 'https://www.ethicalsuperstore.com/images/icons/icon-plastic-free.png',
            url: 'https://www.ethicalsuperstore.com/tags/plastic-free',
          },
          gmcLabel: {
            name: 'Ingredients and Dietary',
            description:
              'Products that meet the ingredient requirements for specific dietary restrictions or additive (non-additive) preferences',
          },
        },
        {
          merchantLabel: {
            code: 'recycled-or-recyclable-packaging',
            name: 'Recycled or Recyclable Packaging',
            description: 'Recycled or Recyclable Packaging',
            logo: 'https://www.ethicalsuperstore.com/images/icons/icon-recyclable-pack.png',
            url: 'https://www.ethicalsuperstore.com/tags/recycled-or-recyclable-packaging',
          },
          gmcLabel: {
            name: 'Uncategorized',
            description: 'Label has yet to be categorized',
          },
        },
        {
          merchantLabel: {
            code: 'sls-free',
            name: 'SLS Free',
            description: 'SLS Free',
            logo: 'https://www.ethicalsuperstore.com/images/icons/icon-slsfree.png',
            url: 'https://www.ethicalsuperstore.com/tags/no-slss',
          },
          gmcLabel: {
            name: 'Ingredients and Dietary',
            description:
              'Products that meet the ingredient requirements for specific dietary restrictions or additive (non-additive) preferences',
          },
        },
        {
          merchantLabel: {
            code: 'supports-a-charity',
            name: 'Supports a Charity',
            description: 'Supports a Charity',
            logo: 'https://www.ethicalsuperstore.com/images/icons/icon-charity.png',
            url: 'https://www.ethicalsuperstore.com/tags/supports-a-charity',
          },
          gmcLabel: {
            name: 'Uncategorized',
            description: 'Label has yet to be categorized',
          },
        },
        {
          merchantLabel: {
            code: 'sustainable-palm-oil',
            name: 'Sustainable Palm Oil',
            description: 'Sustainable Palm Oil',
            logo: 'https://www.ethicalsuperstore.com/images/icons/icon-sustainable-palmoil.png',
            url: 'https://www.ethicalsuperstore.com/tags/sustainable-palm-oil',
          },
          gmcLabel: {
            name: 'Ingredients and Dietary',
            description:
              'Products that meet the ingredient requirements for specific dietary restrictions or additive (non-additive) preferences',
            sublabel: {
              name: 'Palm-Oil Free',
              description: 'Products without palm-oil',
            },
          },
        },
        {
          merchantLabel: {
            code: 'triclosan-free',
            name: 'Triclosan Free',
            description: 'Triclosan Free',
            logo: 'https://www.ethicalsuperstore.com/images/icons/icon-triclosan-free.png',
            url: 'https://www.ethicalsuperstore.com/tags/triclosan-free',
          },
          gmcLabel: {
            name: 'Ingredients and Dietary',
            description:
              'Products that meet the ingredient requirements for specific dietary restrictions or additive (non-additive) preferences',
          },
        },
        {
          merchantLabel: {
            code: 'vegan',
            name: 'Vegan',
            description: 'Vegan',
            logo: 'https://www.ethicalsuperstore.com/images/icons/icon-vegan.png',
            url: 'https://www.ethicalsuperstore.com/tags/vegan',
          },
          gmcLabel: {
            name: 'Uncategorized',
            description: 'Label has yet to be categorized',
          },
        },
        {
          merchantLabel: {
            code: 'vegetarian',
            name: 'Vegetarian',
            description: 'Vegetarian',
            logo: 'https://www.ethicalsuperstore.com/images/icons/icon-vegetarian.png',
            url: 'https://www.ethicalsuperstore.com/tags/vegetarian',
          },
          gmcLabel: {
            name: 'Ingredients and Dietary',
            description:
              'Products that meet the ingredient requirements for specific dietary restrictions or additive (non-additive) preferences',
          },
        },
      ],
    },
    {
      id: 'xgcrKNa6Y2',
      merchantProductCode: '486127',
      sku: '581696',
      title: 'Dr Organic Manuka Honey Deodorant - 50ml',
      description:
        'This manuka honey deodorant roll-on from Dr Organic is infused with aloe vera to help soothe skin and neutralise unpleasant body odours and sunflower oil to keep your underarms soft and calm. Free from aluminium and alcohol this roll-on deodorant has a non pore clogging formula and enriched with Icelandic and Irish moss which contain sources of omega-3 fatty acids and vitamin E to keep your underarms hydrated and feeling fresh all day.\n\nSuitable for vegetarians. Free from aluminium, alcohol, palm oil, parabens, SLS, SLES, mineral oil, microbeads, phthalates, phosphates, DMDM hydantoin, triclosan, synthetic fragrances, GMOs and animal testing. Suitable for septic tanks.\n\nMade in Italy\n\nRecycled PET plastic tube with PP rollerball and PP plastic cap\n\n50ml',
      price: '5.99',
      currency: 'GBP',
      rating: null,
      ratingsTotal: null,
      shippingPrice: '4.95',
      offerUrl:
        'https://www.ethicalsuperstore.com/products/dr-organic/dr-organic-manuka-honey-deodorant---50ml/',
      brand: {
        code: 'dr-organic',
        name: 'Dr Organic',
        description:
          'Dr Organic believes that every ingredient counts, which is why they replace water with organic Aloe Vera in their products so you can enjoy the nutritional benefits in your skin care, body care and hair care! They are the biggest Soil Association COSMOS organic certified beauty brand in the UK so you know that not only are their products good for your skin, they’re good for the planet too. Committed to being a cruelty free brand, Dr Organic never tests any of their products or raw materials on animals and they avoid using irritating synthetic ingredients such as parabens, SLS and synthetic colours.',
        logo: null,
        url: null,
      },
      merchant: {
        region: 'UK',
        key: 'ethical-superstore',
        name: 'Ethical Superstore',
        description:
          'EthicalSuperstore.com is an online store that offers fair trade, eco-friendly, and organic products.',
        logo: 'data:image/png;base64,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',
        url: 'www.ethicalsuperstore.com',
      },
      category: {
        merchantCategory:
          'Beauty Health And Wellbeing > Bath And Body > Deodorant',
        gmcCategory: {
          name: 'Personal Care & Health',
        },
      },
      images: [
        {
          url: 'images.ethicalsuperstore.com/images/resize260/581696-dr-organic-maunka-honey-deodorant-50ml-1.jpg',
          primary: true,
          type: 'LIST',
        },
        {
          url: '//images.ethicalsuperstore.com/images/581696-dr-organic-maunka-honey-deodorant-50ml-1.jpg',
          primary: true,
          type: 'DETAIL',
        },
        {
          url: '//images.ethicalsuperstore.com/images/581696-dr-organic-maunka-honey-deodorant-50ml-2.jpg',
          primary: false,
          type: 'DETAIL',
        },
        {
          url: '//images.ethicalsuperstore.com/images/581696-dr-organic-maunka-honey-deodorant-50ml-3.jpg',
          primary: false,
          type: 'DETAIL',
        },
        {
          url: '//images.ethicalsuperstore.com/images/581696-dr-organic-maunka-honey-deodorant-50ml-4.jpg',
          primary: false,
          type: 'DETAIL',
        },
        {
          url: '//images.ethicalsuperstore.com/images/581696-dr-organic-maunka-honey-deodorant-50ml-5.jpg',
          primary: false,
          type: 'DETAIL',
        },
      ],
      reviews: [],
      labels: [
        {
          merchantLabel: {
            code: 'recycled-or-recyclable-packaging',
            name: 'Recycled or Recyclable Packaging',
            description: 'Recycled or Recyclable Packaging',
            logo: 'https://www.ethicalsuperstore.com/images/icons/icon-recyclable-pack.png',
            url: 'https://www.ethicalsuperstore.com/tags/recycled-or-recyclable-packaging',
          },
          gmcLabel: {
            name: 'Uncategorized',
            description: 'Label has yet to be categorized',
          },
        },
        {
          merchantLabel: {
            code: 'sls-free',
            name: 'SLS Free',
            description: 'SLS Free',
            logo: 'https://www.ethicalsuperstore.com/images/icons/icon-slsfree.png',
            url: 'https://www.ethicalsuperstore.com/tags/no-slss',
          },
          gmcLabel: {
            name: 'Ingredients and Dietary',
            description:
              'Products that meet the ingredient requirements for specific dietary restrictions or additive (non-additive) preferences',
          },
        },
        {
          merchantLabel: {
            code: 'no-animal-testing',
            name: 'No animal testing',
            description: 'No animal testing',
            logo: 'https://www.ethicalsuperstore.com/images/icons/icon-noanimaltesting.png',
            url: 'https://www.ethicalsuperstore.com/tags/no-animal-testing',
          },
          gmcLabel: {
            name: 'Production Method',
            description:
              'Specific practices adhered to during the manufacture and/or production of goods',
          },
        },
        {
          merchantLabel: {
            code: 'biodegradable',
            name: 'Biodegradable',
            description: 'Biodegradable',
            logo: 'https://www.ethicalsuperstore.com/images/icons/icon-eco-biodegradable.png',
            url: 'https://www.ethicalsuperstore.com/tags/biodegradable',
          },
          gmcLabel: {
            name: 'Uncategorized',
            description: 'Label has yet to be categorized',
          },
        },
        {
          merchantLabel: {
            code: 'vegetarian',
            name: 'Vegetarian',
            description: 'Vegetarian',
            logo: 'https://www.ethicalsuperstore.com/images/icons/icon-vegetarian.png',
            url: 'https://www.ethicalsuperstore.com/tags/vegetarian',
          },
          gmcLabel: {
            name: 'Ingredients and Dietary',
            description:
              'Products that meet the ingredient requirements for specific dietary restrictions or additive (non-additive) preferences',
          },
        },
        {
          merchantLabel: {
            code: 'palm-oil-free',
            name: 'Palm Oil Free',
            description: 'Palm Oil Free',
            logo: 'https://www.ethicalsuperstore.com/images/icons/icon-palmoil-free.png',
            url: 'https://www.ethicalsuperstore.com/tags/palm-oil-free',
          },
          gmcLabel: {
            name: 'Ingredients and Dietary',
            description:
              'Products that meet the ingredient requirements for specific dietary restrictions or additive (non-additive) preferences',
            sublabel: {
              name: 'Palm-Oil Free',
              description: 'Products without palm-oil',
            },
          },
        },
        {
          merchantLabel: {
            code: 'phthalate-free',
            name: 'Phthalate Free',
            description: 'Phthalate Free',
            logo: 'https://www.ethicalsuperstore.com/images/icons/icon-phthalate-free.png',
            url: 'https://www.ethicalsuperstore.com/tags/phthalate-free',
          },
          gmcLabel: {
            name: 'Ingredients and Dietary',
            description:
              'Products that meet the ingredient requirements for specific dietary restrictions or additive (non-additive) preferences',
          },
        },
        {
          merchantLabel: {
            code: 'paraben-free',
            name: 'Paraben Free',
            description: 'Paraben Free',
            logo: 'https://www.ethicalsuperstore.com/images/icons/icon-parabenfree.png',
            url: 'https://www.ethicalsuperstore.com/tags/no-parabens',
          },
          gmcLabel: {
            name: 'Ingredients and Dietary',
            description:
              'Products that meet the ingredient requirements for specific dietary restrictions or additive (non-additive) preferences',
          },
        },
        {
          merchantLabel: {
            code: 'suitable-for-septic-tanks',
            name: 'Suitable for Septic Tanks',
            description: 'Suitable for Septic Tanks',
            logo: 'https://www.ethicalsuperstore.com/images/icons/icon-eco-septictanks.png',
            url: 'https://www.ethicalsuperstore.com/tags/suitable-for-septic-tanks',
          },
          gmcLabel: {
            name: 'Uncategorized',
            description: 'Label has yet to be categorized',
          },
        },
        {
          merchantLabel: {
            code: 'microbead-free',
            name: 'Microbead Free',
            description: 'Microbead Free',
            logo: 'https://www.ethicalsuperstore.com/images/icons/icon-microbead-free.png',
            url: 'https://www.ethicalsuperstore.com/tags/microbead-free',
          },
          gmcLabel: {
            name: 'Ingredients and Dietary',
            description:
              'Products that meet the ingredient requirements for specific dietary restrictions or additive (non-additive) preferences',
          },
        },
        {
          merchantLabel: {
            code: 'triclosan-free',
            name: 'Triclosan Free',
            description: 'Triclosan Free',
            logo: 'https://www.ethicalsuperstore.com/images/icons/icon-triclosan-free.png',
            url: 'https://www.ethicalsuperstore.com/tags/triclosan-free',
          },
          gmcLabel: {
            name: 'Ingredients and Dietary',
            description:
              'Products that meet the ingredient requirements for specific dietary restrictions or additive (non-additive) preferences',
          },
        },
        {
          merchantLabel: {
            code: 'italy',
            name: 'Italy',
            description: 'Italy',
            logo: 'https://www.ethicalsuperstore.com/images/icons/country/Italy.png',
            url: 'https://www.ethicalsuperstore.com/tags/italy',
          },
          gmcLabel: {
            name: 'Origin',
            description:
              'Product was partially or wholly produced in this region',
            sublabel: {
              name: 'Made in Europe',
              description: 'Product was partially or wholly produced in Europe',
              sublabel: {
                name: 'Made in Italy',
                description:
                  'Product was partially or wholly produced in Italy',
              },
            },
          },
        },
      ],
    },
    {
      id: 'z07os4DTOh',
      merchantProductCode: '480192',
      sku: '568958',
      title: 'Fussy Natural Deodorant Refill - Wavy Days - 40g',
      description:
        'This completely compostable and plastic-free refill made from sugar cane is designed to fit your Fussy case eliminating the need for single use plastic deodorants. With 100% natural and effective ingredients this Wavy Days deodorant refill is packed full with eucalyptus, sage and peppermint sure to leave you smelling fresh all day and night providing 24 hour protection. Each refill lasts around 4-8 weeks depending on use.\n\nWavy Days refillable deodorant availablehere\n\nSuitable for vegans and vegetarians. Free from aluminium, parabens, phthalates, SLS, triclosan, mineral oils, microbeads, GMOs and synthetic fragrances. Suitable for septic tanks. No animal testing.\n\nMade in the UK\n\nPlastic-free refill 100% compostable made from waste material\n\nFussy are a member of 1% for the Planet, meaning that for every sale they make, every refill bought, every deodorant case purchased, 1% of that money will go towards helping the planet. They have chosen that money to go into clearing our oceans of single-use plastics.\n\n40g',
      price: '6.00',
      currency: 'GBP',
      rating: null,
      ratingsTotal: null,
      shippingPrice: '4.95',
      offerUrl:
        'https://www.ethicalsuperstore.com/products/fussy/fussy-natural-deodorant-refill---wavy-days---40g/',
      brand: {
        code: 'fussy',
        name: 'Fussy',
        description:
          'Fussy are on a mission to banish single-use plastic from your bathroom, creating high-quality, simple and effective personal care products backed by science. Fussy use clean, effective ingredients to help moisturise and protect your skin and are scientifically proven to neutralise odour-causing bacteria. They created plastic-free compostable refills made from waste sugarcane and cases made from recycled plastic to ensure there is no need for single use plastic waste and all of their products are Certified Carbon Neutral through their partnership with Climate Partner!',
        logo: null,
        url: null,
      },
      merchant: {
        region: 'UK',
        key: 'ethical-superstore',
        name: 'Ethical Superstore',
        description:
          'EthicalSuperstore.com is an online store that offers fair trade, eco-friendly, and organic products.',
        logo: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIAAAACACAMAAAD04JH5AAAA2FBMVEUquOj///8ruOr//v/+//2I1u/+//tixOYou+b9/v8quef9/Pwrt+pPwuqU2/Xu+fl+0u7L6Oux5PPm9vcttuz//fkruuJexuQttu76//235/L9/vfV7fL/+//3/PwiuvCQ2Ov+/vJiyuRxzePF6PAstfOF2u+J1vZPxd9Mv+On4+xix92G1/ElveJLwOq64+6l4fVNxeZcvuib3/Pk+PNoxunX9PfQ5u96zOnk9Ps5xOHi8/fA6u285PCP2+eP0+N81d+a4ubM7+nT5fSl4/BOzeBw0+ev2ev/lQA2AAAJiElEQVR4nO1Ya3ejOBIVQpb1coNtEMji4WDywA7uMOkkTuykZ3Yy6f//j7bA2Z7u7aTj6TO982G5JycHyqC6qpJulUCoR48ePXr06NGjR48ePXr06NGjR48ePQ4ERhoJAFJafbYx8YzgoDEECxiqFfshAiyoNj5gIJD4bFOBgj+RA5NDxggGg5PTk/PRDxEQwSp0APZMiT9tjFXL8SzS8UEhUIa7riWDHyOQr3hLQJ4FfxJQbOhJSc0CHxSBPDTSofT8LznGgRYxZpD3YUeAjhj+TEDo+9bGp4cRwMQhxOF/LQICHwe1wPpFAkjR1kbk+ucRQDrQMVKvRAB7HYFM/DwCxfvJZDa7YC8RQEJftDZ3nP88Au8Ip8TxXowAgJU8dMfrr2z/UwKIDf0Vy39iCt4iEAgVs1Yo/ykCQoEg4r9pG4oYhlt8Gic3Ex9kHiY3KpahIcZ6q4hFbrfgGiT8+5vxzF8rgUUVAVa/gD5jHYjoskyS8rIJRGsQ/iRJxheRwFGH9ZsEFBODD8ZyTiiZzmMt9I6moWtSQyTdDE235ZpiKkNqTPbhSmg1IQBa1sAXLT4Qa+HV1EQwlXyxNZQSbmVZpTZ1LfffJiBm0qSWhMZwYmZY4ZLQzHWo4xrqD1v/TjY/SrkxxEnd7IodzzjAlALHYplyJySOMYZeYcYuJG2fO3K4uc4k2OXbBMB/NvcTUDfwy+2C5SXlLpBxCeF+tF8DJrPEcV3IC7/WwaSz3UA5nEjqWJoS13VIweL5kYG143IYSmaWEwjk9wkopsScmEuk7tK9uoW+EKWB2Tvc4dRsItLZCZFSmi4dfCgmeyESahEaDqEi8IMxV7rpfgfyRoLdgTJIyPcJYBHozNhBLETnyOV2JI5LmbltjGUmN0WXAp5N58Xc6xZkeMk6As4YsVvpGuJa8+nk5JMp4l1HlqbeTemFbuaSNwkIkc9hgNuzama7sGYzxpiuHw11Cb9t7kTUFR45Xec4j7oIhDPdESA3aAHxhtenIx3HenRXdQRTO2FM1SeZdc0BBNCOE5irTfehHkNQZrF4R63LM4/FQbEnMAfdr1XSPVPuCdCxeA/r1DVmyBS4xGzTEaQzEAjYznPJnTcJgNJkXTgpMcl2W/oo1kup2H8LkRsx6AWDLsR8jCbPZLfd/fa5XVOXXQTMcN+8CEndNwmAdnT+jUvvUR7jmNWTNGTqGwKNwNCfzL4ikGi5n3HcNZwCX3T3PBCdauJEvh0B4Jp9JgA9JrtKjJXsGyl2KgEhDl4kQHbPBNDlnlC+l208PYAARmq6TwGl5cXFbpqFlHsvEUDfEvhPCrznjhvPOwK22Dew1SEpwChYctjwzheg9/ibNbAvRuIrAmEZTFq95PKhXc3QqUWw7EA8kvbMoPDO8re3IWY4om72pX8nLGp8CAHQAdijoDU8fRBBLj7+gacO7CXXXj9VzSLhktMDhAjjMky/ikACO+oQAnzMUJKCYB0ZkiWJl62OHzghLjUpBD8zlB8QAZRjVHnkS/+yweigFPCxwA28C0oASQThjJDYwtNQF7mB4wyk520p7hBlHLTfQjmBSiYXrekddahrPEjRngBpEI7r49legFhXjmWpRLCA8uW0ZOGZAokzz7YULCwNEDceUlf6IoRguPb1g4kImusUlM9CQul0WLe2cwnlRHqxQkMDVUg6DewCgWbtNR/nn1wA3aFYHK+mrrWpdF1pixxCsg3bVoEY1/pQkGAV+DnEwaXkdQK4jtnJNs1Akacf8/q4tc1vP0yn0+tasOG0xXUjYobVRXt9+57NE8Dvj7ptSNbzLeSAWlpWoECCPXwwTsptEunxOEmukw3bwf9xsnk9BapNb3W1iar2TPYsq6o9D8dwBmYYIGKtoHTr9pohlreP1HCtWAxOm83gJFq3ggwncRVE/vmigToLlRbOkSjXAra7UK/6B/0DLwwizJTSeauj0HK2jaJoxRF6RhaDZmIcKKzzqBgKlkPbhIEi9Idx+5Rizw0qOMKohknA8R0aNNw2nG2X+cXp/oUABIHScQ1awtqeEsDAYztRFMfgTLEAoxjuGLgJSrnDsUZMw9MwLfgxF7lQedzNELZ1HIBPXTMc1MC6bpv3AMYLvsPg7qqogni0hhZ3jTEa5apZreHUodhqVcFc7yqhCx00V8Na6zFPGpzXw6iB0/OoQfVZpdGwiOr9WLlardZM5aNhJNTx3RrhpmhiVhT16ymIptD6JHfUrNAoowuY4k5Kb6GCuSe5WYqT1C48M1rCSuabHafyGg8yQt0lq0z2cSsXowQ66NuzLporqCZG6DG0htNCvKfJMsyyX6ckLF//RFOa0l9OEA0LVRGnGHN7W2Z8qjfA4sk7GsCWnGZZZM3lIGkePektCxlOwfTbWsqpTYuEL4czO62PGa7g590WjUn6r8xk1T2199Dy0mUZmsWrBGbp7aBRI0miPQF7o9ncyKik49PT3+m1b+U9guDwyZUO6jEvg7HcMv2e8jNH3jb101E68D9KXkBVPpXmF8Yawn9VlQkvdya9Czz+nlWZPXmVQHNtjX2sJBmiUUvA/U0FjTSDD9QLLZX81PBI1epjZum2CcZQhafmHokNTMrIh1i9A82TnMhfVVC/kwY2r2/IKGAf6G5GE6225jFec/f0VQIj1Mw5iUC1RQMESnOjkR/STZItUQBS40N5QLhiurjJZmLnQAScayQmNv0jpacI+yGvQSNwfDUITkMaIRYR+aRGWbqchSVGW/mIK+680pTCJtmWg0dqz26N93ANeSuNTMqMevrBeJuiHI9ODGmE8r3H04TOFKwYsaB0m2RychbSc4z0lk6Kj97FyKTvqoxm5VRdW3vjwVi7bKfwrV0Ga8PnrxEQU1in9pM+uyUpBF7s3GR7FGZPSn8y1ma3jW/CSrBBxs2Rd4ZLKAXB3Dgk3ImRyQYYx6stHIPIQ5WlA/yUySOJmiT1jPeU72QpGKQgWFv58hpoI6CGp+dwrlR5cbKolC5tqZ9OzlolrPzTK63uRk2NW60ebEBdqmbNmFj752sR11UD2oSwjk799bEofMj/2eL8DGp8MVjU4rhqqvaNu4BVo7tXCbSCm4Ou1W03K4KSlyAxxxq6glaSQaMDDWxU17OCxKBWW0HeQe5U14hhkG1Qz1Zv4foY9BO4tzc5a0toawri70nxl4Cj4jjc4YO+fPwkiOEi+sEPy3+Pf0iJOuzTy0/yj7oz+z9GoEePHj169OjRo0ePHj169OjRo0ePHv83+DdUWOmUQtTfOQAAAABJRU5ErkJggg==',
        url: 'www.ethicalsuperstore.com',
      },
      category: {
        merchantCategory:
          'Beauty Health And Wellbeing > Bath And Body > Deodorant',
        gmcCategory: {
          name: 'Personal Care & Health',
        },
      },
      images: [
        {
          url: 'images.ethicalsuperstore.com/images/resize260/568947-80-fussy-deodorant-refill-1.jpg',
          primary: true,
          type: 'LIST',
        },
        {
          url: '//images.ethicalsuperstore.com/images/568947-80-fussy-deodorant-refill-1.jpg',
          primary: true,
          type: 'DETAIL',
        },
      ],
      reviews: [],
      labels: [
        {
          merchantLabel: {
            code: 'vegan',
            name: 'Vegan',
            description: 'Vegan',
            logo: 'https://www.ethicalsuperstore.com/images/icons/icon-vegan.png',
            url: 'https://www.ethicalsuperstore.com/tags/vegan',
          },
          gmcLabel: {
            name: 'Uncategorized',
            description: 'Label has yet to be categorized',
          },
        },
        {
          merchantLabel: {
            code: 'supports-a-charity',
            name: 'Supports a Charity',
            description: 'Supports a Charity',
            logo: 'https://www.ethicalsuperstore.com/images/icons/icon-charity.png',
            url: 'https://www.ethicalsuperstore.com/tags/supports-a-charity',
          },
          gmcLabel: {
            name: 'Uncategorized',
            description: 'Label has yet to be categorized',
          },
        },
        {
          merchantLabel: {
            code: 'recycled-or-recyclable-packaging',
            name: 'Recycled or Recyclable Packaging',
            description: 'Recycled or Recyclable Packaging',
            logo: 'https://www.ethicalsuperstore.com/images/icons/icon-recyclable-pack.png',
            url: 'https://www.ethicalsuperstore.com/tags/recycled-or-recyclable-packaging',
          },
          gmcLabel: {
            name: 'Uncategorized',
            description: 'Label has yet to be categorized',
          },
        },
        {
          merchantLabel: {
            code: 'sls-free',
            name: 'SLS Free',
            description: 'SLS Free',
            logo: 'https://www.ethicalsuperstore.com/images/icons/icon-slsfree.png',
            url: 'https://www.ethicalsuperstore.com/tags/no-slss',
          },
          gmcLabel: {
            name: 'Ingredients and Dietary',
            description:
              'Products that meet the ingredient requirements for specific dietary restrictions or additive (non-additive) preferences',
          },
        },
        {
          merchantLabel: {
            code: 'one-percent-for-the-planet',
            name: 'One Percent for the Planet',
            description: 'One Percent for the Planet',
            logo: 'https://www.ethicalsuperstore.com/images/icons/icon-1fortheplanet.png',
            url: 'https://www.ethicalsuperstore.com/tags/one-percent-for-the-planet',
          },
          gmcLabel: {
            name: 'Certification',
            description:
              'Claim and of sustainable impact or ethical standard has been certified by a neutral third-party organization',
          },
        },
        {
          merchantLabel: {
            code: 'certified-b-corporation',
            name: 'Certified B Corporation',
            description: 'Certified B Corporation',
            logo: 'https://www.ethicalsuperstore.com/images/icons/icon-bcorp-cert.png',
            url: 'https://www.ethicalsuperstore.com/tags/certified-b-corporation',
          },
          gmcLabel: {
            name: 'Certification',
            description:
              'Claim and of sustainable impact or ethical standard has been certified by a neutral third-party organization',
          },
        },
        {
          merchantLabel: {
            code: 'uk-made',
            name: 'UK Made',
            description: 'UK Made',
            logo: 'https://www.ethicalsuperstore.com/images/icons/icon-ukmade.png',
            url: 'https://www.ethicalsuperstore.com/tags/made-in-the-uk',
          },
          gmcLabel: {
            name: 'Origin',
            description:
              'Product was partially or wholly produced in this region',
            sublabel: {
              name: 'Made in Europe',
              description: 'Product was partially or wholly produced in Europe',
              sublabel: {
                name: 'Made in UK',
                description: 'Product was partially or wholly produced in UK',
              },
            },
          },
        },
        {
          merchantLabel: {
            code: 'vegetarian',
            name: 'Vegetarian',
            description: 'Vegetarian',
            logo: 'https://www.ethicalsuperstore.com/images/icons/icon-vegetarian.png',
            url: 'https://www.ethicalsuperstore.com/tags/vegetarian',
          },
          gmcLabel: {
            name: 'Ingredients and Dietary',
            description:
              'Products that meet the ingredient requirements for specific dietary restrictions or additive (non-additive) preferences',
          },
        },
        {
          merchantLabel: {
            code: 'phthalate-free',
            name: 'Phthalate Free',
            description: 'Phthalate Free',
            logo: 'https://www.ethicalsuperstore.com/images/icons/icon-phthalate-free.png',
            url: 'https://www.ethicalsuperstore.com/tags/phthalate-free',
          },
          gmcLabel: {
            name: 'Ingredients and Dietary',
            description:
              'Products that meet the ingredient requirements for specific dietary restrictions or additive (non-additive) preferences',
          },
        },
        {
          merchantLabel: {
            code: 'sustainable-palm-oil',
            name: 'Sustainable Palm Oil',
            description: 'Sustainable Palm Oil',
            logo: 'https://www.ethicalsuperstore.com/images/icons/icon-sustainable-palmoil.png',
            url: 'https://www.ethicalsuperstore.com/tags/sustainable-palm-oil',
          },
          gmcLabel: {
            name: 'Ingredients and Dietary',
            description:
              'Products that meet the ingredient requirements for specific dietary restrictions or additive (non-additive) preferences',
            sublabel: {
              name: 'Palm-Oil Free',
              description: 'Products without palm-oil',
            },
          },
        },
        {
          merchantLabel: {
            code: 'plastic-free',
            name: 'Plastic Free',
            description: 'Plastic Free',
            logo: 'https://www.ethicalsuperstore.com/images/icons/icon-plastic-free.png',
            url: 'https://www.ethicalsuperstore.com/tags/plastic-free',
          },
          gmcLabel: {
            name: 'Ingredients and Dietary',
            description:
              'Products that meet the ingredient requirements for specific dietary restrictions or additive (non-additive) preferences',
          },
        },
        {
          merchantLabel: {
            code: 'paraben-free',
            name: 'Paraben Free',
            description: 'Paraben Free',
            logo: 'https://www.ethicalsuperstore.com/images/icons/icon-parabenfree.png',
            url: 'https://www.ethicalsuperstore.com/tags/no-parabens',
          },
          gmcLabel: {
            name: 'Ingredients and Dietary',
            description:
              'Products that meet the ingredient requirements for specific dietary restrictions or additive (non-additive) preferences',
          },
        },
        {
          merchantLabel: {
            code: 'suitable-for-septic-tanks',
            name: 'Suitable for Septic Tanks',
            description: 'Suitable for Septic Tanks',
            logo: 'https://www.ethicalsuperstore.com/images/icons/icon-eco-septictanks.png',
            url: 'https://www.ethicalsuperstore.com/tags/suitable-for-septic-tanks',
          },
          gmcLabel: {
            name: 'Uncategorized',
            description: 'Label has yet to be categorized',
          },
        },
        {
          merchantLabel: {
            code: 'triclosan-free',
            name: 'Triclosan Free',
            description: 'Triclosan Free',
            logo: 'https://www.ethicalsuperstore.com/images/icons/icon-triclosan-free.png',
            url: 'https://www.ethicalsuperstore.com/tags/triclosan-free',
          },
          gmcLabel: {
            name: 'Ingredients and Dietary',
            description:
              'Products that meet the ingredient requirements for specific dietary restrictions or additive (non-additive) preferences',
          },
        },
        {
          merchantLabel: {
            code: 'gluten-free',
            name: 'Gluten Free',
            description: 'Gluten Free',
            logo: 'https://www.ethicalsuperstore.com/images/icons/icon-glutenfree.png',
            url: 'https://www.ethicalsuperstore.com/tags/gluten-free',
          },
          gmcLabel: {
            name: 'Ingredients and Dietary',
            description:
              'Products that meet the ingredient requirements for specific dietary restrictions or additive (non-additive) preferences',
            sublabel: {
              name: 'Gluten-Free',
              description: 'Products without gluten',
            },
          },
        },
      ],
    },
    {
      id: 'MlTG9CDNiO',
      merchantProductCode: '480195',
      sku: '568969',
      title: 'Fussy Natural Deodorant Refill - Night Tales - 40g',
      description:
        'This completely compostable and plastic-free refill made from sugar cane is designed to fit your Fussy case eliminating the need for single use plastic deodorants. With 100% natural and effective ingredients this Night Tales deodorant refill has an evocative scent thats both floral and woody, blending the scent of cedar, cinnamon, patchouli and rose to transport you to a place shrouded in mystery and leave you smelling fresh all day and night providing 24 hour protection. Each refill lasts around 4-8 weeks depending on use.\n\nNight Tales refillable deodorant availablehere\n\nSuitable for vegans and vegetarians. Free from aluminium, parabens, phthalates, SLS, triclosan, mineral oils, microbeads, GMOs and synthetic fragrances. Suitable for septic tanks. No animal testing.\n\nMade in the UK\n\nPlastic-free refill 100% compostable made from waste material\n\nFussy are a member of 1% for the Planet, meaning that for every sale they make, every refill bought, every deodorant case purchased, 1% of that money will go towards helping the planet. They have chosen that money to go into clearing our oceans of single-use plastics.\n\n40g',
      price: '6.00',
      currency: 'GBP',
      rating: null,
      ratingsTotal: null,
      shippingPrice: '4.95',
      offerUrl:
        'https://www.ethicalsuperstore.com/products/fussy/fussy-natural-deodorant-refill---night-tales---40g/',
      brand: {
        code: 'fussy',
        name: 'Fussy',
        description:
          'Fussy are on a mission to banish single-use plastic from your bathroom, creating high-quality, simple and effective personal care products backed by science. Fussy use clean, effective ingredients to help moisturise and protect your skin and are scientifically proven to neutralise odour-causing bacteria. They created plastic-free compostable refills made from waste sugarcane and cases made from recycled plastic to ensure there is no need for single use plastic waste and all of their products are Certified Carbon Neutral through their partnership with Climate Partner!',
        logo: null,
        url: null,
      },
      merchant: {
        region: 'UK',
        key: 'ethical-superstore',
        name: 'Ethical Superstore',
        description:
          'EthicalSuperstore.com is an online store that offers fair trade, eco-friendly, and organic products.',
        logo: 'data:image/png;base64,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',
        url: 'www.ethicalsuperstore.com',
      },
      category: {
        merchantCategory:
          'Beauty Health And Wellbeing > Bath And Body > Deodorant',
        gmcCategory: {
          name: 'Personal Care & Health',
        },
      },
      images: [
        {
          url: 'images.ethicalsuperstore.com/images/resize260/568947-80-fussy-deodorant-refill-1.jpg',
          primary: true,
          type: 'LIST',
        },
        {
          url: '//images.ethicalsuperstore.com/images/568947-80-fussy-deodorant-refill-1.jpg',
          primary: true,
          type: 'DETAIL',
        },
      ],
      reviews: [],
      labels: [
        {
          merchantLabel: {
            code: 'vegan',
            name: 'Vegan',
            description: 'Vegan',
            logo: 'https://www.ethicalsuperstore.com/images/icons/icon-vegan.png',
            url: 'https://www.ethicalsuperstore.com/tags/vegan',
          },
          gmcLabel: {
            name: 'Uncategorized',
            description: 'Label has yet to be categorized',
          },
        },
        {
          merchantLabel: {
            code: 'supports-a-charity',
            name: 'Supports a Charity',
            description: 'Supports a Charity',
            logo: 'https://www.ethicalsuperstore.com/images/icons/icon-charity.png',
            url: 'https://www.ethicalsuperstore.com/tags/supports-a-charity',
          },
          gmcLabel: {
            name: 'Uncategorized',
            description: 'Label has yet to be categorized',
          },
        },
        {
          merchantLabel: {
            code: 'recycled-or-recyclable-packaging',
            name: 'Recycled or Recyclable Packaging',
            description: 'Recycled or Recyclable Packaging',
            logo: 'https://www.ethicalsuperstore.com/images/icons/icon-recyclable-pack.png',
            url: 'https://www.ethicalsuperstore.com/tags/recycled-or-recyclable-packaging',
          },
          gmcLabel: {
            name: 'Uncategorized',
            description: 'Label has yet to be categorized',
          },
        },
        {
          merchantLabel: {
            code: 'sls-free',
            name: 'SLS Free',
            description: 'SLS Free',
            logo: 'https://www.ethicalsuperstore.com/images/icons/icon-slsfree.png',
            url: 'https://www.ethicalsuperstore.com/tags/no-slss',
          },
          gmcLabel: {
            name: 'Ingredients and Dietary',
            description:
              'Products that meet the ingredient requirements for specific dietary restrictions or additive (non-additive) preferences',
          },
        },
        {
          merchantLabel: {
            code: 'one-percent-for-the-planet',
            name: 'One Percent for the Planet',
            description: 'One Percent for the Planet',
            logo: 'https://www.ethicalsuperstore.com/images/icons/icon-1fortheplanet.png',
            url: 'https://www.ethicalsuperstore.com/tags/one-percent-for-the-planet',
          },
          gmcLabel: {
            name: 'Certification',
            description:
              'Claim and of sustainable impact or ethical standard has been certified by a neutral third-party organization',
          },
        },
        {
          merchantLabel: {
            code: 'certified-b-corporation',
            name: 'Certified B Corporation',
            description: 'Certified B Corporation',
            logo: 'https://www.ethicalsuperstore.com/images/icons/icon-bcorp-cert.png',
            url: 'https://www.ethicalsuperstore.com/tags/certified-b-corporation',
          },
          gmcLabel: {
            name: 'Certification',
            description:
              'Claim and of sustainable impact or ethical standard has been certified by a neutral third-party organization',
          },
        },
        {
          merchantLabel: {
            code: 'uk-made',
            name: 'UK Made',
            description: 'UK Made',
            logo: 'https://www.ethicalsuperstore.com/images/icons/icon-ukmade.png',
            url: 'https://www.ethicalsuperstore.com/tags/made-in-the-uk',
          },
          gmcLabel: {
            name: 'Origin',
            description:
              'Product was partially or wholly produced in this region',
            sublabel: {
              name: 'Made in Europe',
              description: 'Product was partially or wholly produced in Europe',
              sublabel: {
                name: 'Made in UK',
                description: 'Product was partially or wholly produced in UK',
              },
            },
          },
        },
        {
          merchantLabel: {
            code: 'vegetarian',
            name: 'Vegetarian',
            description: 'Vegetarian',
            logo: 'https://www.ethicalsuperstore.com/images/icons/icon-vegetarian.png',
            url: 'https://www.ethicalsuperstore.com/tags/vegetarian',
          },
          gmcLabel: {
            name: 'Ingredients and Dietary',
            description:
              'Products that meet the ingredient requirements for specific dietary restrictions or additive (non-additive) preferences',
          },
        },
        {
          merchantLabel: {
            code: 'phthalate-free',
            name: 'Phthalate Free',
            description: 'Phthalate Free',
            logo: 'https://www.ethicalsuperstore.com/images/icons/icon-phthalate-free.png',
            url: 'https://www.ethicalsuperstore.com/tags/phthalate-free',
          },
          gmcLabel: {
            name: 'Ingredients and Dietary',
            description:
              'Products that meet the ingredient requirements for specific dietary restrictions or additive (non-additive) preferences',
          },
        },
        {
          merchantLabel: {
            code: 'sustainable-palm-oil',
            name: 'Sustainable Palm Oil',
            description: 'Sustainable Palm Oil',
            logo: 'https://www.ethicalsuperstore.com/images/icons/icon-sustainable-palmoil.png',
            url: 'https://www.ethicalsuperstore.com/tags/sustainable-palm-oil',
          },
          gmcLabel: {
            name: 'Ingredients and Dietary',
            description:
              'Products that meet the ingredient requirements for specific dietary restrictions or additive (non-additive) preferences',
            sublabel: {
              name: 'Palm-Oil Free',
              description: 'Products without palm-oil',
            },
          },
        },
        {
          merchantLabel: {
            code: 'plastic-free',
            name: 'Plastic Free',
            description: 'Plastic Free',
            logo: 'https://www.ethicalsuperstore.com/images/icons/icon-plastic-free.png',
            url: 'https://www.ethicalsuperstore.com/tags/plastic-free',
          },
          gmcLabel: {
            name: 'Ingredients and Dietary',
            description:
              'Products that meet the ingredient requirements for specific dietary restrictions or additive (non-additive) preferences',
          },
        },
        {
          merchantLabel: {
            code: 'paraben-free',
            name: 'Paraben Free',
            description: 'Paraben Free',
            logo: 'https://www.ethicalsuperstore.com/images/icons/icon-parabenfree.png',
            url: 'https://www.ethicalsuperstore.com/tags/no-parabens',
          },
          gmcLabel: {
            name: 'Ingredients and Dietary',
            description:
              'Products that meet the ingredient requirements for specific dietary restrictions or additive (non-additive) preferences',
          },
        },
        {
          merchantLabel: {
            code: 'suitable-for-septic-tanks',
            name: 'Suitable for Septic Tanks',
            description: 'Suitable for Septic Tanks',
            logo: 'https://www.ethicalsuperstore.com/images/icons/icon-eco-septictanks.png',
            url: 'https://www.ethicalsuperstore.com/tags/suitable-for-septic-tanks',
          },
          gmcLabel: {
            name: 'Uncategorized',
            description: 'Label has yet to be categorized',
          },
        },
        {
          merchantLabel: {
            code: 'triclosan-free',
            name: 'Triclosan Free',
            description: 'Triclosan Free',
            logo: 'https://www.ethicalsuperstore.com/images/icons/icon-triclosan-free.png',
            url: 'https://www.ethicalsuperstore.com/tags/triclosan-free',
          },
          gmcLabel: {
            name: 'Ingredients and Dietary',
            description:
              'Products that meet the ingredient requirements for specific dietary restrictions or additive (non-additive) preferences',
          },
        },
        {
          merchantLabel: {
            code: 'gluten-free',
            name: 'Gluten Free',
            description: 'Gluten Free',
            logo: 'https://www.ethicalsuperstore.com/images/icons/icon-glutenfree.png',
            url: 'https://www.ethicalsuperstore.com/tags/gluten-free',
          },
          gmcLabel: {
            name: 'Ingredients and Dietary',
            description:
              'Products that meet the ingredient requirements for specific dietary restrictions or additive (non-additive) preferences',
            sublabel: {
              name: 'Gluten-Free',
              description: 'Products without gluten',
            },
          },
        },
      ],
    },
    {
      id: 'V6ZT4lFqBp',
      merchantProductCode: '486995',
      sku: '584534',
      title: 'Ben & Anna Natural Deodorant - Green Fusion - 40g',
      description:
        'With fresh citrusy notes and Mediterranean spice aromas this Green Fusion Natural Deodorant from Ben & Anna is sure to awaken your senses. With a solid consistency which applies smoothly thanks to the nourishing shea butter this natural, vegan deodorant uses bicarbonate of soda and arrowroot powder to act as a natural deodoriser and absorb excess moisture to keep you dry and fresh all day.\n\nSuitable for vegans and vegetarians. Free from parabens, SLS, mineral oils, microbeads, phthalates, phosphates, triclosan, chlorine, GMOs and aluminium.\n\nMade in Germany\n\nPackaged in recyclable paper packaging, sourced from responsibly managed forests, with a thin layer of biodegradable PLA foil\n\n40g',
      price: '6.33',
      currency: 'GBP',
      rating: null,
      ratingsTotal: null,
      shippingPrice: '4.95',
      offerUrl:
        'https://www.ethicalsuperstore.com/products/ben---anna/ben---anna-natural-deodorant---green-fusion---40g/',
      brand: {
        code: 'ben--anna',
        name: 'Ben & Anna',
        description: '',
        logo: null,
        url: null,
      },
      merchant: {
        region: 'UK',
        key: 'ethical-superstore',
        name: 'Ethical Superstore',
        description:
          'EthicalSuperstore.com is an online store that offers fair trade, eco-friendly, and organic products.',
        logo: 'data:image/png;base64,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',
        url: 'www.ethicalsuperstore.com',
      },
      category: {
        merchantCategory:
          'Beauty Health And Wellbeing > Bath And Body > Deodorant',
        gmcCategory: {
          name: 'Personal Care & Health',
        },
      },
      images: [
        {
          url: 'images.ethicalsuperstore.com/images/resize260/584534-ben-anna-natural-deodorant-green-fusion-40g-1.jpg',
          primary: true,
          type: 'LIST',
        },
        {
          url: '//images.ethicalsuperstore.com/images/584534-ben-anna-natural-deodorant-green-fusion-40g-1.jpg',
          primary: true,
          type: 'DETAIL',
        },
      ],
      reviews: [],
      labels: [
        {
          merchantLabel: {
            code: 'germany',
            name: 'Germany',
            description: 'Germany',
            logo: 'https://www.ethicalsuperstore.com/images/icons/country/Germany.png',
            url: 'https://www.ethicalsuperstore.com/tags/germany',
          },
          gmcLabel: {
            name: 'Origin',
            description:
              'Product was partially or wholly produced in this region',
            sublabel: {
              name: 'Made in Europe',
              description: 'Product was partially or wholly produced in Europe',
            },
          },
        },
        {
          merchantLabel: {
            code: 'no-animal-testing',
            name: 'No animal testing',
            description: 'No animal testing',
            logo: 'https://www.ethicalsuperstore.com/images/icons/icon-noanimaltesting.png',
            url: 'https://www.ethicalsuperstore.com/tags/no-animal-testing',
          },
          gmcLabel: {
            name: 'Production Method',
            description:
              'Specific practices adhered to during the manufacture and/or production of goods',
          },
        },
        {
          merchantLabel: {
            code: 'organic',
            name: 'Organic',
            description: 'Organic',
            logo: 'https://www.ethicalsuperstore.com/images/icons/icon-parent-organic.png',
            url: 'https://www.ethicalsuperstore.com/tags/organic',
          },
          gmcLabel: {
            name: 'Organic',
            description:
              'Food and drinks produced by methods complying with the standards of organic farming. Standards vary worldwise, but organic farming features practices that cylce resources, promote ecological balance, and conserve biodiversity',
          },
        },
        {
          merchantLabel: {
            code: 'paraben-free',
            name: 'Paraben Free',
            description: 'Paraben Free',
            logo: 'https://www.ethicalsuperstore.com/images/icons/icon-parabenfree.png',
            url: 'https://www.ethicalsuperstore.com/tags/no-parabens',
          },
          gmcLabel: {
            name: 'Ingredients and Dietary',
            description:
              'Products that meet the ingredient requirements for specific dietary restrictions or additive (non-additive) preferences',
          },
        },
        {
          merchantLabel: {
            code: 'plastic-free',
            name: 'Plastic Free',
            description: 'Plastic Free',
            logo: 'https://www.ethicalsuperstore.com/images/icons/icon-plastic-free.png',
            url: 'https://www.ethicalsuperstore.com/tags/plastic-free',
          },
          gmcLabel: {
            name: 'Ingredients and Dietary',
            description:
              'Products that meet the ingredient requirements for specific dietary restrictions or additive (non-additive) preferences',
          },
        },
        {
          merchantLabel: {
            code: 'recycled-or-recyclable-packaging',
            name: 'Recycled or Recyclable Packaging',
            description: 'Recycled or Recyclable Packaging',
            logo: 'https://www.ethicalsuperstore.com/images/icons/icon-recyclable-pack.png',
            url: 'https://www.ethicalsuperstore.com/tags/recycled-or-recyclable-packaging',
          },
          gmcLabel: {
            name: 'Uncategorized',
            description: 'Label has yet to be categorized',
          },
        },
        {
          merchantLabel: {
            code: 'sls-free',
            name: 'SLS Free',
            description: 'SLS Free',
            logo: 'https://www.ethicalsuperstore.com/images/icons/icon-slsfree.png',
            url: 'https://www.ethicalsuperstore.com/tags/no-slss',
          },
          gmcLabel: {
            name: 'Ingredients and Dietary',
            description:
              'Products that meet the ingredient requirements for specific dietary restrictions or additive (non-additive) preferences',
          },
        },
        {
          merchantLabel: {
            code: 'suitable-for-septic-tanks',
            name: 'Suitable for Septic Tanks',
            description: 'Suitable for Septic Tanks',
            logo: 'https://www.ethicalsuperstore.com/images/icons/icon-eco-septictanks.png',
            url: 'https://www.ethicalsuperstore.com/tags/suitable-for-septic-tanks',
          },
          gmcLabel: {
            name: 'Uncategorized',
            description: 'Label has yet to be categorized',
          },
        },
        {
          merchantLabel: {
            code: 'sustainable-palm-oil',
            name: 'Sustainable Palm Oil',
            description: 'Sustainable Palm Oil',
            logo: 'https://www.ethicalsuperstore.com/images/icons/icon-sustainable-palmoil.png',
            url: 'https://www.ethicalsuperstore.com/tags/sustainable-palm-oil',
          },
          gmcLabel: {
            name: 'Ingredients and Dietary',
            description:
              'Products that meet the ingredient requirements for specific dietary restrictions or additive (non-additive) preferences',
            sublabel: {
              name: 'Palm-Oil Free',
              description: 'Products without palm-oil',
            },
          },
        },
        {
          merchantLabel: {
            code: 'triclosan-free',
            name: 'Triclosan Free',
            description: 'Triclosan Free',
            logo: 'https://www.ethicalsuperstore.com/images/icons/icon-triclosan-free.png',
            url: 'https://www.ethicalsuperstore.com/tags/triclosan-free',
          },
          gmcLabel: {
            name: 'Ingredients and Dietary',
            description:
              'Products that meet the ingredient requirements for specific dietary restrictions or additive (non-additive) preferences',
          },
        },
        {
          merchantLabel: {
            code: 'vegan',
            name: 'Vegan',
            description: 'Vegan',
            logo: 'https://www.ethicalsuperstore.com/images/icons/icon-vegan.png',
            url: 'https://www.ethicalsuperstore.com/tags/vegan',
          },
          gmcLabel: {
            name: 'Uncategorized',
            description: 'Label has yet to be categorized',
          },
        },
        {
          merchantLabel: {
            code: 'vegetarian',
            name: 'Vegetarian',
            description: 'Vegetarian',
            logo: 'https://www.ethicalsuperstore.com/images/icons/icon-vegetarian.png',
            url: 'https://www.ethicalsuperstore.com/tags/vegetarian',
          },
          gmcLabel: {
            name: 'Ingredients and Dietary',
            description:
              'Products that meet the ingredient requirements for specific dietary restrictions or additive (non-additive) preferences',
          },
        },
      ],
    },
    {
      id: 'VXTGwj4OVx',
      merchantProductCode: '486998',
      sku: '584545',
      title: 'Ben & Anna Natural Deodorant - Urban Black - 40g',
      description:
        'Stay dry and fresh all day with this Urban Black Natural Deodorant from Ben & Anna. Made with nourishing shea butter this vegan deodorant stick has a solid consistency that applies smoothly without leaving your underarm greasy or sticky. Smelling sweetly of cedarwood, conifers and wild herbs this refreshing deodorant uses bicarbonate of soda and arrowroot powder to neutralise odours and absorb moisture.\n\nSuitable for vegans and vegetarians. Free from parabens, SLS, mineral oils, microbeads, phthalates, phosphates, triclosan, chlorine, GMOs and aluminium.\n\nMade in Germany\n\nPackaged in recyclable paper packaging, sourced from responsibly managed forests, with a thin layer of biodegradable PLA foil\n\n40g',
      price: '6.33',
      currency: 'GBP',
      rating: null,
      ratingsTotal: null,
      shippingPrice: '4.95',
      offerUrl:
        'https://www.ethicalsuperstore.com/products/ben---anna/ben---anna-natural-deodorant---urban-black---40g/',
      brand: {
        code: 'ben--anna',
        name: 'Ben & Anna',
        description: '',
        logo: null,
        url: null,
      },
      merchant: {
        region: 'UK',
        key: 'ethical-superstore',
        name: 'Ethical Superstore',
        description:
          'EthicalSuperstore.com is an online store that offers fair trade, eco-friendly, and organic products.',
        logo: 'data:image/png;base64,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',
        url: 'www.ethicalsuperstore.com',
      },
      category: {
        merchantCategory:
          'Beauty Health And Wellbeing > Bath And Body > Deodorant',
        gmcCategory: {
          name: 'Personal Care & Health',
        },
      },
      images: [
        {
          url: 'images.ethicalsuperstore.com/images/resize260/584545-ben-anna-natural-deodorant-urban-black-40g-1.jpg',
          primary: true,
          type: 'LIST',
        },
        {
          url: '//images.ethicalsuperstore.com/images/584545-ben-anna-natural-deodorant-urban-black-40g-1.jpg',
          primary: true,
          type: 'DETAIL',
        },
      ],
      reviews: [],
      labels: [
        {
          merchantLabel: {
            code: 'germany',
            name: 'Germany',
            description: 'Germany',
            logo: 'https://www.ethicalsuperstore.com/images/icons/country/Germany.png',
            url: 'https://www.ethicalsuperstore.com/tags/germany',
          },
          gmcLabel: {
            name: 'Origin',
            description:
              'Product was partially or wholly produced in this region',
            sublabel: {
              name: 'Made in Europe',
              description: 'Product was partially or wholly produced in Europe',
            },
          },
        },
        {
          merchantLabel: {
            code: 'no-animal-testing',
            name: 'No animal testing',
            description: 'No animal testing',
            logo: 'https://www.ethicalsuperstore.com/images/icons/icon-noanimaltesting.png',
            url: 'https://www.ethicalsuperstore.com/tags/no-animal-testing',
          },
          gmcLabel: {
            name: 'Production Method',
            description:
              'Specific practices adhered to during the manufacture and/or production of goods',
          },
        },
        {
          merchantLabel: {
            code: 'organic',
            name: 'Organic',
            description: 'Organic',
            logo: 'https://www.ethicalsuperstore.com/images/icons/icon-parent-organic.png',
            url: 'https://www.ethicalsuperstore.com/tags/organic',
          },
          gmcLabel: {
            name: 'Organic',
            description:
              'Food and drinks produced by methods complying with the standards of organic farming. Standards vary worldwise, but organic farming features practices that cylce resources, promote ecological balance, and conserve biodiversity',
          },
        },
        {
          merchantLabel: {
            code: 'paraben-free',
            name: 'Paraben Free',
            description: 'Paraben Free',
            logo: 'https://www.ethicalsuperstore.com/images/icons/icon-parabenfree.png',
            url: 'https://www.ethicalsuperstore.com/tags/no-parabens',
          },
          gmcLabel: {
            name: 'Ingredients and Dietary',
            description:
              'Products that meet the ingredient requirements for specific dietary restrictions or additive (non-additive) preferences',
          },
        },
        {
          merchantLabel: {
            code: 'plastic-free',
            name: 'Plastic Free',
            description: 'Plastic Free',
            logo: 'https://www.ethicalsuperstore.com/images/icons/icon-plastic-free.png',
            url: 'https://www.ethicalsuperstore.com/tags/plastic-free',
          },
          gmcLabel: {
            name: 'Ingredients and Dietary',
            description:
              'Products that meet the ingredient requirements for specific dietary restrictions or additive (non-additive) preferences',
          },
        },
        {
          merchantLabel: {
            code: 'recycled-or-recyclable-packaging',
            name: 'Recycled or Recyclable Packaging',
            description: 'Recycled or Recyclable Packaging',
            logo: 'https://www.ethicalsuperstore.com/images/icons/icon-recyclable-pack.png',
            url: 'https://www.ethicalsuperstore.com/tags/recycled-or-recyclable-packaging',
          },
          gmcLabel: {
            name: 'Uncategorized',
            description: 'Label has yet to be categorized',
          },
        },
        {
          merchantLabel: {
            code: 'sls-free',
            name: 'SLS Free',
            description: 'SLS Free',
            logo: 'https://www.ethicalsuperstore.com/images/icons/icon-slsfree.png',
            url: 'https://www.ethicalsuperstore.com/tags/no-slss',
          },
          gmcLabel: {
            name: 'Ingredients and Dietary',
            description:
              'Products that meet the ingredient requirements for specific dietary restrictions or additive (non-additive) preferences',
          },
        },
        {
          merchantLabel: {
            code: 'suitable-for-septic-tanks',
            name: 'Suitable for Septic Tanks',
            description: 'Suitable for Septic Tanks',
            logo: 'https://www.ethicalsuperstore.com/images/icons/icon-eco-septictanks.png',
            url: 'https://www.ethicalsuperstore.com/tags/suitable-for-septic-tanks',
          },
          gmcLabel: {
            name: 'Uncategorized',
            description: 'Label has yet to be categorized',
          },
        },
        {
          merchantLabel: {
            code: 'sustainable-palm-oil',
            name: 'Sustainable Palm Oil',
            description: 'Sustainable Palm Oil',
            logo: 'https://www.ethicalsuperstore.com/images/icons/icon-sustainable-palmoil.png',
            url: 'https://www.ethicalsuperstore.com/tags/sustainable-palm-oil',
          },
          gmcLabel: {
            name: 'Ingredients and Dietary',
            description:
              'Products that meet the ingredient requirements for specific dietary restrictions or additive (non-additive) preferences',
            sublabel: {
              name: 'Palm-Oil Free',
              description: 'Products without palm-oil',
            },
          },
        },
        {
          merchantLabel: {
            code: 'triclosan-free',
            name: 'Triclosan Free',
            description: 'Triclosan Free',
            logo: 'https://www.ethicalsuperstore.com/images/icons/icon-triclosan-free.png',
            url: 'https://www.ethicalsuperstore.com/tags/triclosan-free',
          },
          gmcLabel: {
            name: 'Ingredients and Dietary',
            description:
              'Products that meet the ingredient requirements for specific dietary restrictions or additive (non-additive) preferences',
          },
        },
        {
          merchantLabel: {
            code: 'vegan',
            name: 'Vegan',
            description: 'Vegan',
            logo: 'https://www.ethicalsuperstore.com/images/icons/icon-vegan.png',
            url: 'https://www.ethicalsuperstore.com/tags/vegan',
          },
          gmcLabel: {
            name: 'Uncategorized',
            description: 'Label has yet to be categorized',
          },
        },
        {
          merchantLabel: {
            code: 'vegetarian',
            name: 'Vegetarian',
            description: 'Vegetarian',
            logo: 'https://www.ethicalsuperstore.com/images/icons/icon-vegetarian.png',
            url: 'https://www.ethicalsuperstore.com/tags/vegetarian',
          },
          gmcLabel: {
            name: 'Ingredients and Dietary',
            description:
              'Products that meet the ingredient requirements for specific dietary restrictions or additive (non-additive) preferences',
          },
        },
      ],
    },
    {
      id: 'AEdNH89Wd7',
      merchantProductCode: '487001',
      sku: '584556',
      title: 'Ben & Anna Natural Deodorant - Mint - 40g',
      description:
        'Pleasantly cool this Mint Natural Deodorant from Ben & Anna has a delightfully fresh aroma of tart mint with a slight spiciness perfect for both gentlemen and women! Enriched with nourishing shea butter for soft underarms this solid deodorant stick glides on smoothly without leaving a greasy, sticky residue. This vegan natural deodorant contains bicarbonate of soda and arrowroot powder to naturally eliminate odours and absorb moisture keeping you dry and fresh all day.\n\nSuitable for vegans and vegetarians. Free from parabens, SLS, mineral oils, microbeads, phthalates, phosphates, triclosan, chlorine, GMOs and aluminium.\n\nMade in Germany\n\nPackaged in recyclable paper packaging, sourced from responsibly managed forests, with a thin layer of biodegradable PLA foil\n\n40g',
      price: '6.33',
      currency: 'GBP',
      rating: null,
      ratingsTotal: null,
      shippingPrice: '4.95',
      offerUrl:
        'https://www.ethicalsuperstore.com/products/ben---anna/ben---anna-natural-deodorant---mint---40g/',
      brand: {
        code: 'ben--anna',
        name: 'Ben & Anna',
        description: '',
        logo: null,
        url: null,
      },
      merchant: {
        region: 'UK',
        key: 'ethical-superstore',
        name: 'Ethical Superstore',
        description:
          'EthicalSuperstore.com is an online store that offers fair trade, eco-friendly, and organic products.',
        logo: 'data:image/png;base64,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',
        url: 'www.ethicalsuperstore.com',
      },
      category: {
        merchantCategory:
          'Beauty Health And Wellbeing > Bath And Body > Deodorant',
        gmcCategory: {
          name: 'Personal Care & Health',
        },
      },
      images: [
        {
          url: 'images.ethicalsuperstore.com/images/resize260/584556-ben-anna-natural-deodorant-mint-40g-1.jpg',
          primary: true,
          type: 'LIST',
        },
        {
          url: '//images.ethicalsuperstore.com/images/584556-ben-anna-natural-deodorant-mint-40g-1.jpg',
          primary: true,
          type: 'DETAIL',
        },
      ],
      reviews: [],
      labels: [
        {
          merchantLabel: {
            code: 'germany',
            name: 'Germany',
            description: 'Germany',
            logo: 'https://www.ethicalsuperstore.com/images/icons/country/Germany.png',
            url: 'https://www.ethicalsuperstore.com/tags/germany',
          },
          gmcLabel: {
            name: 'Origin',
            description:
              'Product was partially or wholly produced in this region',
            sublabel: {
              name: 'Made in Europe',
              description: 'Product was partially or wholly produced in Europe',
            },
          },
        },
        {
          merchantLabel: {
            code: 'no-animal-testing',
            name: 'No animal testing',
            description: 'No animal testing',
            logo: 'https://www.ethicalsuperstore.com/images/icons/icon-noanimaltesting.png',
            url: 'https://www.ethicalsuperstore.com/tags/no-animal-testing',
          },
          gmcLabel: {
            name: 'Production Method',
            description:
              'Specific practices adhered to during the manufacture and/or production of goods',
          },
        },
        {
          merchantLabel: {
            code: 'organic',
            name: 'Organic',
            description: 'Organic',
            logo: 'https://www.ethicalsuperstore.com/images/icons/icon-parent-organic.png',
            url: 'https://www.ethicalsuperstore.com/tags/organic',
          },
          gmcLabel: {
            name: 'Organic',
            description:
              'Food and drinks produced by methods complying with the standards of organic farming. Standards vary worldwise, but organic farming features practices that cylce resources, promote ecological balance, and conserve biodiversity',
          },
        },
        {
          merchantLabel: {
            code: 'paraben-free',
            name: 'Paraben Free',
            description: 'Paraben Free',
            logo: 'https://www.ethicalsuperstore.com/images/icons/icon-parabenfree.png',
            url: 'https://www.ethicalsuperstore.com/tags/no-parabens',
          },
          gmcLabel: {
            name: 'Ingredients and Dietary',
            description:
              'Products that meet the ingredient requirements for specific dietary restrictions or additive (non-additive) preferences',
          },
        },
        {
          merchantLabel: {
            code: 'plastic-free',
            name: 'Plastic Free',
            description: 'Plastic Free',
            logo: 'https://www.ethicalsuperstore.com/images/icons/icon-plastic-free.png',
            url: 'https://www.ethicalsuperstore.com/tags/plastic-free',
          },
          gmcLabel: {
            name: 'Ingredients and Dietary',
            description:
              'Products that meet the ingredient requirements for specific dietary restrictions or additive (non-additive) preferences',
          },
        },
        {
          merchantLabel: {
            code: 'recycled-or-recyclable-packaging',
            name: 'Recycled or Recyclable Packaging',
            description: 'Recycled or Recyclable Packaging',
            logo: 'https://www.ethicalsuperstore.com/images/icons/icon-recyclable-pack.png',
            url: 'https://www.ethicalsuperstore.com/tags/recycled-or-recyclable-packaging',
          },
          gmcLabel: {
            name: 'Uncategorized',
            description: 'Label has yet to be categorized',
          },
        },
        {
          merchantLabel: {
            code: 'sls-free',
            name: 'SLS Free',
            description: 'SLS Free',
            logo: 'https://www.ethicalsuperstore.com/images/icons/icon-slsfree.png',
            url: 'https://www.ethicalsuperstore.com/tags/no-slss',
          },
          gmcLabel: {
            name: 'Ingredients and Dietary',
            description:
              'Products that meet the ingredient requirements for specific dietary restrictions or additive (non-additive) preferences',
          },
        },
        {
          merchantLabel: {
            code: 'suitable-for-septic-tanks',
            name: 'Suitable for Septic Tanks',
            description: 'Suitable for Septic Tanks',
            logo: 'https://www.ethicalsuperstore.com/images/icons/icon-eco-septictanks.png',
            url: 'https://www.ethicalsuperstore.com/tags/suitable-for-septic-tanks',
          },
          gmcLabel: {
            name: 'Uncategorized',
            description: 'Label has yet to be categorized',
          },
        },
        {
          merchantLabel: {
            code: 'sustainable-palm-oil',
            name: 'Sustainable Palm Oil',
            description: 'Sustainable Palm Oil',
            logo: 'https://www.ethicalsuperstore.com/images/icons/icon-sustainable-palmoil.png',
            url: 'https://www.ethicalsuperstore.com/tags/sustainable-palm-oil',
          },
          gmcLabel: {
            name: 'Ingredients and Dietary',
            description:
              'Products that meet the ingredient requirements for specific dietary restrictions or additive (non-additive) preferences',
            sublabel: {
              name: 'Palm-Oil Free',
              description: 'Products without palm-oil',
            },
          },
        },
        {
          merchantLabel: {
            code: 'triclosan-free',
            name: 'Triclosan Free',
            description: 'Triclosan Free',
            logo: 'https://www.ethicalsuperstore.com/images/icons/icon-triclosan-free.png',
            url: 'https://www.ethicalsuperstore.com/tags/triclosan-free',
          },
          gmcLabel: {
            name: 'Ingredients and Dietary',
            description:
              'Products that meet the ingredient requirements for specific dietary restrictions or additive (non-additive) preferences',
          },
        },
        {
          merchantLabel: {
            code: 'vegan',
            name: 'Vegan',
            description: 'Vegan',
            logo: 'https://www.ethicalsuperstore.com/images/icons/icon-vegan.png',
            url: 'https://www.ethicalsuperstore.com/tags/vegan',
          },
          gmcLabel: {
            name: 'Uncategorized',
            description: 'Label has yet to be categorized',
          },
        },
        {
          merchantLabel: {
            code: 'vegetarian',
            name: 'Vegetarian',
            description: 'Vegetarian',
            logo: 'https://www.ethicalsuperstore.com/images/icons/icon-vegetarian.png',
            url: 'https://www.ethicalsuperstore.com/tags/vegetarian',
          },
          gmcLabel: {
            name: 'Ingredients and Dietary',
            description:
              'Products that meet the ingredient requirements for specific dietary restrictions or additive (non-additive) preferences',
          },
        },
      ],
    },
    {
      id: '7ck2sFWCWV',
      merchantProductCode: '486992',
      sku: '584523',
      title: 'Ben & Anna Natural Deodorant - Coco Mania - 40g',
      description:
        'Providing effective protection against odour and wetness this Ben & Anna Natural Deodorant stick has a solid consistency which goes on smooth and doesnt leave your underarms feeling greasy or sticky. Made with bicarbonate of soda and arrowroot powder to work as a natural deodoriser and ensuring excess moisture is absorbed this vegan, organic deodorant has a sweet scent of coconut and pineapple that instantly transports you to a tropical summer paradise with a pina colada in hand!\n\nSuitable for vegans and vegetarians. Free from parabens, SLS, mineral oils, microbeads, phthalates, phosphates, triclosan, chlorine, GMOs and aluminium.\n\nMade in Germany\n\nPackaged in recyclable paper packaging, sourced from responsibly managed forests, with a thin layer of biodegradable PLA foil\n\n40g',
      price: '6.33',
      currency: 'GBP',
      rating: null,
      ratingsTotal: null,
      shippingPrice: '4.95',
      offerUrl:
        'https://www.ethicalsuperstore.com/products/ben---anna/ben---anna-natural-deodorant---coco-mania---40g/',
      brand: {
        code: 'ben--anna',
        name: 'Ben & Anna',
        description: '',
        logo: null,
        url: null,
      },
      merchant: {
        region: 'UK',
        key: 'ethical-superstore',
        name: 'Ethical Superstore',
        description:
          'EthicalSuperstore.com is an online store that offers fair trade, eco-friendly, and organic products.',
        logo: 'data:image/png;base64,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',
        url: 'www.ethicalsuperstore.com',
      },
      category: {
        merchantCategory:
          'Beauty Health And Wellbeing > Bath And Body > Deodorant',
        gmcCategory: {
          name: 'Personal Care & Health',
        },
      },
      images: [
        {
          url: '//images.ethicalsuperstore.com/images/584523-ben-anna-natural-deodorant-cocoa-mania-40g-1.jpg',
          primary: true,
          type: 'DETAIL',
        },
        {
          url: 'images.ethicalsuperstore.com/images/resize260/584523-ben-anna-natural-deodorant-cocoa-mania-40g-1.jpg',
          primary: true,
          type: 'LIST',
        },
      ],
      reviews: [],
      labels: [
        {
          merchantLabel: {
            code: 'germany',
            name: 'Germany',
            description: 'Germany',
            logo: 'https://www.ethicalsuperstore.com/images/icons/country/Germany.png',
            url: 'https://www.ethicalsuperstore.com/tags/germany',
          },
          gmcLabel: {
            name: 'Origin',
            description:
              'Product was partially or wholly produced in this region',
            sublabel: {
              name: 'Made in Europe',
              description: 'Product was partially or wholly produced in Europe',
            },
          },
        },
        {
          merchantLabel: {
            code: 'no-animal-testing',
            name: 'No animal testing',
            description: 'No animal testing',
            logo: 'https://www.ethicalsuperstore.com/images/icons/icon-noanimaltesting.png',
            url: 'https://www.ethicalsuperstore.com/tags/no-animal-testing',
          },
          gmcLabel: {
            name: 'Production Method',
            description:
              'Specific practices adhered to during the manufacture and/or production of goods',
          },
        },
        {
          merchantLabel: {
            code: 'organic',
            name: 'Organic',
            description: 'Organic',
            logo: 'https://www.ethicalsuperstore.com/images/icons/icon-parent-organic.png',
            url: 'https://www.ethicalsuperstore.com/tags/organic',
          },
          gmcLabel: {
            name: 'Organic',
            description:
              'Food and drinks produced by methods complying with the standards of organic farming. Standards vary worldwise, but organic farming features practices that cylce resources, promote ecological balance, and conserve biodiversity',
          },
        },
        {
          merchantLabel: {
            code: 'paraben-free',
            name: 'Paraben Free',
            description: 'Paraben Free',
            logo: 'https://www.ethicalsuperstore.com/images/icons/icon-parabenfree.png',
            url: 'https://www.ethicalsuperstore.com/tags/no-parabens',
          },
          gmcLabel: {
            name: 'Ingredients and Dietary',
            description:
              'Products that meet the ingredient requirements for specific dietary restrictions or additive (non-additive) preferences',
          },
        },
        {
          merchantLabel: {
            code: 'plastic-free',
            name: 'Plastic Free',
            description: 'Plastic Free',
            logo: 'https://www.ethicalsuperstore.com/images/icons/icon-plastic-free.png',
            url: 'https://www.ethicalsuperstore.com/tags/plastic-free',
          },
          gmcLabel: {
            name: 'Ingredients and Dietary',
            description:
              'Products that meet the ingredient requirements for specific dietary restrictions or additive (non-additive) preferences',
          },
        },
        {
          merchantLabel: {
            code: 'recycled-or-recyclable-packaging',
            name: 'Recycled or Recyclable Packaging',
            description: 'Recycled or Recyclable Packaging',
            logo: 'https://www.ethicalsuperstore.com/images/icons/icon-recyclable-pack.png',
            url: 'https://www.ethicalsuperstore.com/tags/recycled-or-recyclable-packaging',
          },
          gmcLabel: {
            name: 'Uncategorized',
            description: 'Label has yet to be categorized',
          },
        },
        {
          merchantLabel: {
            code: 'sls-free',
            name: 'SLS Free',
            description: 'SLS Free',
            logo: 'https://www.ethicalsuperstore.com/images/icons/icon-slsfree.png',
            url: 'https://www.ethicalsuperstore.com/tags/no-slss',
          },
          gmcLabel: {
            name: 'Ingredients and Dietary',
            description:
              'Products that meet the ingredient requirements for specific dietary restrictions or additive (non-additive) preferences',
          },
        },
        {
          merchantLabel: {
            code: 'suitable-for-septic-tanks',
            name: 'Suitable for Septic Tanks',
            description: 'Suitable for Septic Tanks',
            logo: 'https://www.ethicalsuperstore.com/images/icons/icon-eco-septictanks.png',
            url: 'https://www.ethicalsuperstore.com/tags/suitable-for-septic-tanks',
          },
          gmcLabel: {
            name: 'Uncategorized',
            description: 'Label has yet to be categorized',
          },
        },
        {
          merchantLabel: {
            code: 'sustainable-palm-oil',
            name: 'Sustainable Palm Oil',
            description: 'Sustainable Palm Oil',
            logo: 'https://www.ethicalsuperstore.com/images/icons/icon-sustainable-palmoil.png',
            url: 'https://www.ethicalsuperstore.com/tags/sustainable-palm-oil',
          },
          gmcLabel: {
            name: 'Ingredients and Dietary',
            description:
              'Products that meet the ingredient requirements for specific dietary restrictions or additive (non-additive) preferences',
            sublabel: {
              name: 'Palm-Oil Free',
              description: 'Products without palm-oil',
            },
          },
        },
        {
          merchantLabel: {
            code: 'triclosan-free',
            name: 'Triclosan Free',
            description: 'Triclosan Free',
            logo: 'https://www.ethicalsuperstore.com/images/icons/icon-triclosan-free.png',
            url: 'https://www.ethicalsuperstore.com/tags/triclosan-free',
          },
          gmcLabel: {
            name: 'Ingredients and Dietary',
            description:
              'Products that meet the ingredient requirements for specific dietary restrictions or additive (non-additive) preferences',
          },
        },
        {
          merchantLabel: {
            code: 'vegan',
            name: 'Vegan',
            description: 'Vegan',
            logo: 'https://www.ethicalsuperstore.com/images/icons/icon-vegan.png',
            url: 'https://www.ethicalsuperstore.com/tags/vegan',
          },
          gmcLabel: {
            name: 'Uncategorized',
            description: 'Label has yet to be categorized',
          },
        },
        {
          merchantLabel: {
            code: 'vegetarian',
            name: 'Vegetarian',
            description: 'Vegetarian',
            logo: 'https://www.ethicalsuperstore.com/images/icons/icon-vegetarian.png',
            url: 'https://www.ethicalsuperstore.com/tags/vegetarian',
          },
          gmcLabel: {
            name: 'Ingredients and Dietary',
            description:
              'Products that meet the ingredient requirements for specific dietary restrictions or additive (non-additive) preferences',
          },
        },
      ],
    },
    {
      id: 'EYCX7PAtME',
      merchantProductCode: '472886',
      sku: '544703',
      title: 'Ben & Anna Natural Deodorant - Persian Lime - 40g',
      description:
        'Natural, vegan and plastic free this Persian Lime Deodorant from Ben & Anna offers effective protection against odours and wetness without the use of chemical stabilisers. Made using shea butter and bicarbonate of soda to give the deodorant a solid smooth consistency and arrowroot powder to ensure excess moisture is absorbed, this deodorant glides on easily and is never greasy leaving your underarms feeling great and smelling fresh of lime  the best way to start your day!\n\nSuitable for vegans and vegetarians. Free from parabens, SLS, plastic. No animal testing.\n\nMade in the Netherlands\n\nPackaged in a recyclable cardboard tube.\n\n40g',
      price: '6.33',
      currency: 'GBP',
      rating: '3.00',
      ratingsTotal: 2,
      shippingPrice: '4.95',
      offerUrl:
        'https://www.ethicalsuperstore.com/products/ben---anna/ben---anna-natural-deodorant---persian-lime---40g/',
      brand: {
        code: 'ben--anna',
        name: 'Ben & Anna',
        description: '',
        logo: null,
        url: null,
      },
      merchant: {
        region: 'UK',
        key: 'ethical-superstore',
        name: 'Ethical Superstore',
        description:
          'EthicalSuperstore.com is an online store that offers fair trade, eco-friendly, and organic products.',
        logo: 'data:image/png;base64,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',
        url: 'www.ethicalsuperstore.com',
      },
      category: {
        merchantCategory:
          'Beauty Health And Wellbeing > Bath And Body > Deodorant',
        gmcCategory: {
          name: 'Personal Care & Health',
        },
      },
      images: [
        {
          url: 'images.ethicalsuperstore.com/images/resize260/544703-ben-anna-natural-deodorant-persian-lime-40g-1.jpg',
          primary: true,
          type: 'LIST',
        },
        {
          url: '//images.ethicalsuperstore.com/images/544703-ben-anna-natural-deodorant-persian-lime-40g-1.jpg',
          primary: true,
          type: 'DETAIL',
        },
      ],
      reviews: [
        {
          author: 'Anonymous',
          text: "Lovely smell and started off OK but incredibly difficult to push the deodorant up the cardboard tube as you use it. Also bits constantly falling off and finally the deodorant fell out of the tube and wouldn't fit back in properly. I will not be buying this product again",
          rating: '2.00',
          submittedOn: '2022-08-12T00:00:00.000Z',
        },
        {
          author: 'Kathryn',
          text: 'Smelt good and worked for me.   Less easy to use than deodorant in a plastic container but made up for it by being plastic free.',
          rating: '4.00',
          submittedOn: '2022-03-13T00:00:00.000Z',
        },
      ],
      labels: [
        {
          merchantLabel: {
            code: 'biodegradable',
            name: 'Biodegradable',
            description: 'Biodegradable',
            logo: 'https://www.ethicalsuperstore.com/images/icons/icon-eco-biodegradable.png',
            url: 'https://www.ethicalsuperstore.com/tags/biodegradable',
          },
          gmcLabel: {
            name: 'Uncategorized',
            description: 'Label has yet to be categorized',
          },
        },
        {
          merchantLabel: {
            code: 'eco-friendly',
            name: 'Eco-friendly',
            description: 'Eco-friendly',
            logo: 'https://www.ethicalsuperstore.com/images/icons/icon-parent-ecofriendly.png',
            url: 'https://www.ethicalsuperstore.com/tags/eco-friendly',
          },
          gmcLabel: {
            name: 'Uncategorized',
            description: 'Label has yet to be categorized',
          },
        },
        {
          merchantLabel: {
            code: 'netherlands',
            name: 'Netherlands',
            description: 'Netherlands',
            logo: 'https://www.ethicalsuperstore.com/images/icons/country/Netherlands.png',
            url: 'https://www.ethicalsuperstore.com/tags/netherlands',
          },
          gmcLabel: {
            name: 'Origin',
            description:
              'Product was partially or wholly produced in this region',
            sublabel: {
              name: 'Made in Europe',
              description: 'Product was partially or wholly produced in Europe',
            },
          },
        },
        {
          merchantLabel: {
            code: 'no-animal-testing',
            name: 'No animal testing',
            description: 'No animal testing',
            logo: 'https://www.ethicalsuperstore.com/images/icons/icon-noanimaltesting.png',
            url: 'https://www.ethicalsuperstore.com/tags/no-animal-testing',
          },
          gmcLabel: {
            name: 'Production Method',
            description:
              'Specific practices adhered to during the manufacture and/or production of goods',
          },
        },
        {
          merchantLabel: {
            code: 'paraben-free',
            name: 'Paraben Free',
            description: 'Paraben Free',
            logo: 'https://www.ethicalsuperstore.com/images/icons/icon-parabenfree.png',
            url: 'https://www.ethicalsuperstore.com/tags/no-parabens',
          },
          gmcLabel: {
            name: 'Ingredients and Dietary',
            description:
              'Products that meet the ingredient requirements for specific dietary restrictions or additive (non-additive) preferences',
          },
        },
        {
          merchantLabel: {
            code: 'plastic-free',
            name: 'Plastic Free',
            description: 'Plastic Free',
            logo: 'https://www.ethicalsuperstore.com/images/icons/icon-plastic-free.png',
            url: 'https://www.ethicalsuperstore.com/tags/plastic-free',
          },
          gmcLabel: {
            name: 'Ingredients and Dietary',
            description:
              'Products that meet the ingredient requirements for specific dietary restrictions or additive (non-additive) preferences',
          },
        },
        {
          merchantLabel: {
            code: 'sls-free',
            name: 'SLS Free',
            description: 'SLS Free',
            logo: 'https://www.ethicalsuperstore.com/images/icons/icon-slsfree.png',
            url: 'https://www.ethicalsuperstore.com/tags/no-slss',
          },
          gmcLabel: {
            name: 'Ingredients and Dietary',
            description:
              'Products that meet the ingredient requirements for specific dietary restrictions or additive (non-additive) preferences',
          },
        },
        {
          merchantLabel: {
            code: 'vegan',
            name: 'Vegan',
            description: 'Vegan',
            logo: 'https://www.ethicalsuperstore.com/images/icons/icon-vegan.png',
            url: 'https://www.ethicalsuperstore.com/tags/vegan',
          },
          gmcLabel: {
            name: 'Uncategorized',
            description: 'Label has yet to be categorized',
          },
        },
        {
          merchantLabel: {
            code: 'vegetarian',
            name: 'Vegetarian',
            description: 'Vegetarian',
            logo: 'https://www.ethicalsuperstore.com/images/icons/icon-vegetarian.png',
            url: 'https://www.ethicalsuperstore.com/tags/vegetarian',
          },
          gmcLabel: {
            name: 'Ingredients and Dietary',
            description:
              'Products that meet the ingredient requirements for specific dietary restrictions or additive (non-additive) preferences',
          },
        },
      ],
    },
  ],
  facets: {
    merchants: [
      {
        value: 'Ethical Superstore',
        count: 91,
      },
    ],
    brands: [
      {
        key: 'salt-of-the-earth',
        value: 'Salt of the Earth',
        count: 26,
      },
      {
        key: 'ben--anna',
        value: 'Ben & Anna',
        count: 12,
      },
      {
        key: 'earth-conscious',
        value: 'Earth Conscious',
        count: 9,
      },
      {
        key: 'the-natural-deodorant-company',
        value: 'The Natural Deodorant Company',
        count: 9,
      },
      {
        key: 'we-love-the-planet',
        value: 'We Love the Planet',
        count: 7,
      },
      {
        key: 'wild',
        value: 'Wild',
        count: 5,
      },
      {
        key: 'fussy',
        value: 'Fussy',
        count: 4,
      },
      {
        key: 'green-people',
        value: 'Green People',
        count: 3,
      },
      {
        key: 'dr-hauschka',
        value: 'Dr. Hauschka',
        count: 2,
      },
      {
        key: 'fruu-cosmetics',
        value: 'FRUU Cosmetics',
        count: 2,
      },
      {
        key: 'jason',
        value: 'Jason',
        count: 2,
      },
      {
        key: 'lavera',
        value: 'Lavera',
        count: 2,
      },
      {
        key: 'dr-organic',
        value: 'Dr Organic',
        count: 1,
      },
      {
        key: 'friendly-soap',
        value: 'Friendly Soap',
        count: 1,
      },
      {
        key: 'natural-collection-select-',
        value: 'Natural Collection Select ',
        count: 1,
      },
      {
        key: 'neals-yard-remedies',
        value: "Neal's Yard Remedies",
        count: 1,
      },
      {
        key: 'odylique',
        value: 'Odylique',
        count: 1,
      },
      {
        key: 'pitrok',
        value: 'Pitrok',
        count: 1,
      },
      {
        key: 'sukin',
        value: 'Sukin',
        count: 1,
      },
      {
        key: 'weleda',
        value: 'Weleda',
        count: 1,
      },
    ],
    categories: [
      {
        value: 'Personal Care & Health',
        count: 91,
        subfacets: [],
      },
    ],
    labels: [
      {
        value: 'Certification',
        count: 50,
        subfacets: [
          {
            value: 'Climate Neutral',
            count: 5,
            subfacets: [],
          },
        ],
      },
      {
        value: 'Fair Trade',
        count: 6,
        subfacets: [],
      },
      {
        value: 'Ingredients and Dietary',
        count: 91,
        subfacets: [
          {
            value: 'Palm-Oil Free',
            count: 86,
            subfacets: [],
          },
          {
            value: 'Gluten-Free',
            count: 6,
            subfacets: [],
          },
        ],
      },
      {
        value: 'Organic',
        count: 53,
        subfacets: [],
      },
      {
        value: 'Origin',
        count: 79,
        subfacets: [
          {
            value: 'Made in Europe',
            count: 77,
            subfacets: [
              {
                value: 'Made in UK',
                count: 54,
              },
              {
                value: 'Made in Italy',
                count: 1,
              },
            ],
          },
          {
            value: 'Made in America',
            count: 1,
            subfacets: [],
          },
          {
            value: 'Made in Asia',
            count: 1,
            subfacets: [],
          },
        ],
      },
      {
        value: 'Production Method',
        count: 86,
        subfacets: [
          {
            value: 'Handmade',
            count: 1,
            subfacets: [],
          },
        ],
      },
      {
        value: 'Uncategorized',
        count: 91,
        subfacets: [],
      },
    ],
    priceRanges: [
      {
        priceRange: 'cheap',
        from: 0,
        to: 15,
        count: 82,
      },
      {
        priceRange: 'average',
        from: 15,
        to: 100,
        count: 9,
      },
      {
        priceRange: 'expensive',
        from: 100,
        count: 0,
      },
    ],
  },
};
