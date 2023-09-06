import { useQuery } from '@tanstack/react-query';
import { BrandWithName, Res } from 'lib/types';
import axios from 'lib/utils/axios';

async function getBrandNames() {
  const res = await axios<Res<BrandWithName[]>>('brand');
  return res.data.data ?? [];
}

export const useBrandNames = () => {
  const query = useQuery({ queryKey: ['brand-names'], queryFn: getBrandNames });
  return query;
};
