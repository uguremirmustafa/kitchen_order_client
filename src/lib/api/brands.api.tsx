import { useQuery } from '@tanstack/react-query';
import { Res } from 'lib/types';
import axios from 'lib/utils/axios';

interface BrandWithName {
  name: string;
  id: number;
}

async function getBrandNames() {
  const res = await axios<Res<BrandWithName>>('brand');
  return res.data;
}

export const useBrandNames = () => {
  const query = useQuery({ queryKey: ['brand-names'], queryFn: getBrandNames });
  return query;
};
