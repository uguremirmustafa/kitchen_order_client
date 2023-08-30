import { useBrandNames } from 'lib/api/brands.api';

function BrandsPage(): JSX.Element {
  const { data: brands } = useBrandNames();
  return (
    <div>
      <div>
        <pre>{JSON.stringify(brands, null, 2)}</pre>
      </div>
    </div>
  );
}

export default BrandsPage;
