import React, { useEffect } from 'react';
import { IEntityPageData } from '../../lib/types';
import ShopEntityListItem from './ShopEntityList/ShopEntityListItem';
import { useRouter } from 'next/router';

interface Props {
  title: string;
  basePath: string;
  data: IEntityPageData;
  onClick?: () => void;
}

export enum ShopEntityListLevel {
  A,
  B,
  C,
}

const ShopEntityList: React.FC<Props> = ({
  title,
  basePath,
  data,
  onClick,
}) => {
  // const router = useRouter();
  // useEffect(() => {}, [router.asPath]);
  const { roots, pageTree, slug, subslug1, subslug2 } = data;
  return (
    <div className="flex w-full flex-col divide-y divide-secondary-dark-10 px-5 pb-4 md:pt-[30px]">
      <span className="px-[8px] text-[26px] font-bold md:text-[22px]">
        {title}
      </span>
      <div className="flex w-full flex-col pt-2 text-zinc-900">
        {roots
          .sort((a, b) => a.name.localeCompare(b.name))
          .map((baseEntity) => (
            <>
              <ShopEntityListItem
                title={baseEntity.name.toUpperCase()}
                path={basePath + baseEntity.slug}
                isSelected={baseEntity.slug === slug && !subslug1}
                level={ShopEntityListLevel.A}
                isInActiveTree={pageTree && baseEntity.slug === pageTree.slug}
                color={baseEntity.color}
                filter={{
                  name: baseEntity.name,
                  value: baseEntity.slug,
                }}
                onClick={onClick}
              />
              {baseEntity.slug === slug &&
                pageTree.children.map((sub1) => (
                  <>
                    <ShopEntityListItem
                      title={sub1.name}
                      path={basePath + baseEntity.slug + '/' + sub1.slug}
                      isSelected={sub1.slug === subslug1 && !subslug2}
                      level={ShopEntityListLevel.B}
                      color={baseEntity.color}
                      isInActiveTree={baseEntity.slug === pageTree.slug}
                      filter={{
                        name: baseEntity.name,
                        value: baseEntity.slug,
                        subfilter: {
                          name: sub1.name,
                          value: sub1.slug,
                        },
                      }}
                      onClick={onClick}
                    />
                    {sub1.slug === subslug1 &&
                      sub1.children.map((sub2) => (
                        <ShopEntityListItem
                          title={sub2.name}
                          path={
                            basePath +
                            baseEntity.slug +
                            '/' +
                            sub1.slug +
                            '/' +
                            sub2.slug
                          }
                          isSelected={sub2.slug === subslug2}
                          level={ShopEntityListLevel.C}
                          color={baseEntity.color}
                          isInActiveTree={baseEntity.slug === pageTree.slug}
                          onClick={onClick}
                          filter={{
                            name: baseEntity.name,
                            value: baseEntity.slug,
                            subfilter: {
                              name: sub1.name,
                              value: sub1.slug,
                              subfilter: {
                                name: sub2.name,
                                value: sub2.slug,
                              },
                            },
                          }}
                        />
                      ))}
                  </>
                ))}
            </>
          ))}
      </div>
    </div>
  );
};

export default ShopEntityList;
