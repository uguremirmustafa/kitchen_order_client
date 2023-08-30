import { useQuery } from '@tanstack/react-query';
import { Res } from 'lib/types';
import axios from 'lib/utils/axios';

interface Ingredient {
  name: string;
  id: number;
}

async function getIngredients() {
  const res = await axios<Res<Ingredient>>('ingredient');
  return res.data;
}

export const useIngredients = () => {
  const query = useQuery({ queryKey: ['ingredients'], queryFn: getIngredients });
  return query;
};
