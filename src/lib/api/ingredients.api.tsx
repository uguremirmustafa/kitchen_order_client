import { useQuery } from '@tanstack/react-query';
import { SelectOption } from 'components/ui/atoms/SelectField';
import { Ingredient, IngredientWithCategory, Res } from 'lib/types';
import axios from 'lib/utils/axios';

async function getIngredients(search: string) {
  const res = await axios<Ingredient[]>(`ingredient?q=${search}`);
  return res.data ?? [];
}

async function getIngredientsUnderCategory(categoryId: number) {
  const res = await axios<IngredientWithCategory[]>(`ingredient/${categoryId}`);
  return res.data ?? [];
}

async function getIngredientById(id: Ingredient['id']) {
  const res = await axios<Res<Ingredient>>(`ingredient/${id}`);
  return res.data.data;
}
export interface SaveIngredientFormValues {
  name: string;
  category: SelectOption<number>;
  imageUrl: string;
}
type SaveIngredientBody = {
  name: string;
  food_category_id: number;
  image: string;
};
type SaveIngredientResponse = Res<{
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
  id?: Ingredient['id'];
}) {
  const body: SaveIngredientBody = {
    name: data.name,
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

export async function deleteIngredient(id: Ingredient['id']) {
  const res = await axios.delete<Res<boolean>>(`ingredient/${id}`);
  return res.data.data;
}

export const useIngredients = (search: string) => {
  const query = useQuery({
    queryKey: search ? ['ingredient', search] : ['ingredient'],
    queryFn: async () => await getIngredients(search),
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
