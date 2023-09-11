import { useQuery } from '@tanstack/react-query';
import { SelectOption } from 'components/ui/atoms/SelectField';
import { Ingredient, Res } from 'lib/types';
import axios from 'lib/utils/axios';

async function getIngredients() {
  const res = await axios<Res<Ingredient[]>>('ingredient');
  return res.data.data ?? [];
}
async function getIngredientById(id: Ingredient['ingredientId']) {
  const res = await axios<Res<Ingredient>>(`ingredient/${id}`);
  return res.data.data;
}
export interface SaveIngredientFormValues {
  name: string;
  brand: SelectOption<number>;
}
type SaveIngredientBody = {
  name: string;
  brand_id: number;
};
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
  };
  let res;
  if (id) {
    res = await axios.put<Res<number>>(`ingredient/${id}`, body);
  } else {
    res = await axios.post<Res<number>>('ingredient', body);
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
