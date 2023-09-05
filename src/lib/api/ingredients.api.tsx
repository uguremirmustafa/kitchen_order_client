import { useQuery } from '@tanstack/react-query';
import { Ingredient, Res } from 'lib/types';
import axios from 'lib/utils/axios';

async function getIngredients() {
  const res = await axios<Res<Ingredient[]>>('ingredient');
  return res.data.data ?? [];
}

export const useIngredients = () => {
  const query = useQuery({ queryKey: ['ingredients'], queryFn: getIngredients });
  return query;
};
