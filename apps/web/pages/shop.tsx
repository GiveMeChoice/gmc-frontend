import ShopLayout from '../components/ShopLayout';
import ShopMenuList from '../components/ShopPage/ShopMenuList';
import ShopMenuListItem from '../components/ShopPage/ShopMenuListItem';

export default function ShopPage() {
  return (
    <section className="mt-[46px]">
      <ShopLayout>
        <div className="m-1 w-1/3 xl:w-1/4">
          <ShopMenuList title="CATEGORIES">
            <ShopMenuListItem
              title="APPAREL"
              color="#6e79aa"
              path="/category/apparel"
            />
            <ShopMenuListItem
              title="HOME & KITCHEN"
              color="#aa7ab2"
              path="/category/home & kitchen"
            />
            <ShopMenuListItem
              title="BATH & BEAUTY"
              color="#adbe00"
              path="/category/bath & beauty"
            />
            <ShopMenuListItem
              title="BABY"
              color="#dcb586"
              path="/category/baby"
            />
            <ShopMenuListItem
              title="PETS"
              color="#f8ff93"
              path="/category/pets"
            />
          </ShopMenuList>
          <ShopMenuList title="LABELS">
            <ShopMenuListItem
              title="ORGANIC"
              color="#6e79aa"
              path="/labels/organic"
            />
            <ShopMenuListItem
              title="VEGAN"
              color="#aa7ab2"
              path="/labels/vegan"
            />
            <ShopMenuListItem
              title="FAIR TRADE"
              color="#adbe00"
              path="/labels/fair trade"
            />
            <ShopMenuListItem title="BABY" color="#dcb586" path="/baby/baby" />
            <ShopMenuListItem title="PETS" color="#f8ff93" path="/pets/pets" />
          </ShopMenuList>
        </div>
        <div className="flex w-2/3 flex-col items-center xl:w-3/4">
          <div className="mt-32 w-2/3">Welcome to tha shop</div>
        </div>
      </ShopLayout>
    </section>
  );
}
