import { useQuery } from '@tanstack/react-query';
import { SelectOption } from 'components/ui/atoms/SelectField';
import { Recipe, RecipeWithIngredients, Res, Unit } from 'lib/types';
import axios from 'lib/utils/axios';

async function getRecipes() {
  const res = await axios<Res<Recipe[]>>('recipe');
  return res.data.data ?? [];
}

async function getRecipeById(id: Recipe['id']) {
  const res = await axios<Res<RecipeWithIngredients>>(`recipe/${id}`);
  return res.data.data;
}

export async function deleteRecipeById(id: Recipe['id']) {
  const res = await axios.delete<Res<boolean>>(`recipe/${id}`);
  return res.data.data;
}

async function getUnits() {
  const res = await axios<Res<Unit[]>>('unit');
  return res.data.data ?? [];
}
export interface SaveRecipeFormValues {
  ingredients: { item: SelectOption<number>; unit: SelectOption<number>; amount: number }[];
  name: string;
  description: string;
  image: string;
  for_x_person: number;
  prep_time: number;
  cooking_time: number;
}

type SaveRecipeBody = Omit<SaveRecipeFormValues, 'ingredients'> & {
  ingredients: {
    ingredient_id: number;
    amount: number;
    unit_id: number;
  }[];
};

function getSaveRecipeBody(data: SaveRecipeFormValues): SaveRecipeBody {
  const ingredients = data.ingredients
    .filter((x) => x.amount && x.item.value && x.unit.value)
    .map((x) => ({
      amount: x.amount,
      ingredient_id: x.item.value as number,
      unit_id: x.unit.value as number,
    }));
  return {
    ...data,
    ingredients,
  };
}
export async function saveRecipe({ data, id }: { data: SaveRecipeFormValues; id?: Recipe['id'] }) {
  const body = getSaveRecipeBody(data);
  let res;
  if (id) {
    res = await axios.put<Res<number>>(`recipe/${id}`, body);
  } else {
    res = await axios.post<Res<number>>('recipe', body);
  }
  return res.data.data;
}

export const useRecipes = () => {
  const query = useQuery({ queryKey: ['recipes'], queryFn: getRecipes });
  return query;
};
export const useRecipe = (id: Recipe['id']) => {
  const query = useQuery({
    queryKey: [id],
    queryFn: () => getRecipeById(id),
    enabled: id > 0,
  });
  return query;
};
export const useUnits = () => {
  const query = useQuery({ queryKey: ['units'], queryFn: getUnits });
  return query;
};
