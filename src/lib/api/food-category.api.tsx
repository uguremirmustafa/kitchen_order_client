import { useQuery } from '@tanstack/react-query';
import { FoodCategory, Res } from 'lib/types';
import axios from 'lib/utils/axios';

async function getFoodCategories() {
  const res = await axios<Res<FoodCategory[]>>('food-category');
  return res.data.data ?? [];
}

export const useFoodCategories = () => {
  const query = useQuery({ queryKey: ['food-categories'], queryFn: getFoodCategories });
  return query;
};
