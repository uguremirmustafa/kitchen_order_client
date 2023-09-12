import { useQuery } from '@tanstack/react-query';
import { SelectOption } from 'components/ui/atoms/SelectField';
import { Ingredient, IngredientWithCategory, Res } from 'lib/types';
import axios from 'lib/utils/axios';

async function getIngredients() {
  const res = await axios<Res<Ingredient[]>>('ingredient');
  return res.data.data ?? [];
}

async function getIngredientsUnderCategory(categoryId: number) {
  const res = await axios<Res<IngredientWithCategory[]>>(`ingredient/${categoryId}`);
  return res.data.data ?? [];
}

async function getIngredientById(id: Ingredient['ingredientId']) {
  const res = await axios<Res<Ingredient>>(`ingredient/${id}`);
  return res.data.data;
}
export interface SaveIngredientFormValues {
  name: string;
  brand: SelectOption<number>;
  category: SelectOption<number>;
  imageUrl: string;
}
type SaveIngredientBody = {
  name: string;
  brand_id: number;
  food_category_id: number;
  image: string;
};
type SaveIngredientResponse = Res<{
  brand_id: number;
  created_at: string;
  description: null | string;
  food_category_id: number;
  id: number;
  image: null | string;
  name: string;
  updated_at: string;
}>;

export async function saveIngredient({
  data,
  id,
}: {
  data: SaveIngredientFormValues;
  id?: Ingredient['ingredientId'];
}) {
  const body: SaveIngredientBody = {
    name: data.name,
    brand_id: data.brand.value,
    food_category_id: data.category.value,
    image: data.imageUrl,
  };
  let res;
  if (id) {
    res = await axios.put<SaveIngredientResponse>(`ingredient/${id}`, body);
  } else {
    res = await axios.post<SaveIngredientResponse>('ingredient', body);
  }
  return res.data.data;
}

export async function deleteIngredient(id: Ingredient['ingredientId']) {
  const res = await axios.delete<Res<boolean>>(`ingredient/${id}`);
  return res.data.data;
}

export const useIngredients = () => {
  const query = useQuery({
    queryKey: ['ingredients'],
    queryFn: getIngredients,
    initialData: [] as Ingredient[],
  });
  return query;
};

export const useIngredientsUnderCategory = (categoryId: number) => {
  const query = useQuery({
    queryKey: [`ingredients_${categoryId}`],
    queryFn: () => getIngredientsUnderCategory(categoryId),
    initialData: [] as IngredientWithCategory[],
    enabled: categoryId > 0,
  });
  return query;
};
