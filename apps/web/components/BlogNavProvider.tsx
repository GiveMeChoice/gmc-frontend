import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';

export interface IBlogNavContext {
  loading?: boolean;
  wellnessPosts?: any[];
  indoorPosts?: any[];
  outdoorPosts?: any[];
  joyPosts?: any[];
  communityPosts?: any[];
}

const BlogNavContext = createContext<IBlogNavContext>({
  loading: true,
});

export const BlogNavProvider = ({ children }: { children: ReactNode }) => {
  const [data, setData] = useState<IBlogNavContext>(null);

  useEffect(() => {
    const initData = async () => {
      if (!data) {
        console.log('!!!!!!!! INITIALIZING BLOG NAV !!!!!!!!!!! ' + new Date());
        const res = await fetch('/api/blog-nav');
        const json = await res.json();
        console.log('done initializing blog nav! ');
        setData({
          loading: false,
          ...json,
        });
      } else {
        setData({
          ...data,
          loading: true,
        });
      }
    };
    initData();
  }, []);

  return (
    <BlogNavContext.Provider value={data}>{children}</BlogNavContext.Provider>
  );
};

export const useBlogNav = () => useContext(BlogNavContext);
