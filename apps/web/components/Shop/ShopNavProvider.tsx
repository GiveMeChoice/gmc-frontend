import { IGmcCategory, IGmcLabel } from 'gmc-types';
import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';

export interface IShopNavContext {
  initialized?: boolean;
  categories: IGmcCategory[];
  labels: IGmcLabel[];
}

const ShopNavContext = createContext<IShopNavContext>(null);

export const ShopNavProvider = ({ children }: { children: ReactNode }) => {
  const [initialized, setInitialized] = useState(false);
  const [categories, setCategories] = useState<IGmcCategory[]>([]);
  const [labels, setLabels] = useState<IGmcLabel[]>([]);

  useEffect(() => {
    const initData = async () => {
      if (!initialized) {
        console.log('Initializing Shop Nav');
        const res: IShopNavContext = await (
          await fetch('/api/shop-nav')
        ).json();
        setCategories(
          res.categories.sort((a, b) => a.name.localeCompare(b.name))
        );
        setLabels(res.labels);
        setInitialized(false);
      }
    };
    initData();
  }, []);

  return (
    <ShopNavContext.Provider
      value={{
        initialized,
        categories,
        labels,
      }}
    >
      {children}
    </ShopNavContext.Provider>
  );
};

export const useShopNav = () => useContext(ShopNavContext);
