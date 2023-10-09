import { useQuery } from '@tanstack/react-query';
import { FoodCategory } from 'lib/types';
import axios from 'lib/utils/axios';

async function getFoodCategories() {
  const res = await axios<FoodCategory[]>('food-category');
  return res.data ?? [];
}

export const useFoodCategories = () => {
  const query = useQuery({ queryKey: ['food-categories'], queryFn: getFoodCategories });
  return query;
};
