export interface Res<T = unknown> {
  message: string;
  data: T;
}

export interface User {
  id: number;
  firstName: null | string;
  lastName: null | string;
  email: string;
}

export interface Page {
  path: string;
  component: JSX.Element;
}

export interface Recipe {
  id: number;
  name: string;
  description?: string;
  image?: string;
  prep_time?: number;
  cooking_time?: number;
  for_x_person?: number;
  created_at: Date;
  updated_at: Date;
}
export type RecipeWithIngredients = Recipe & {
  ingredients: {
    unit: Unit['code'];
    amount: number;
    unit_id: Unit['id'];
    ingredient_id: Ingredient['id'];
    ingredientName: Ingredient['name'];
  }[];
};

export interface Ingredient {
  id: number;
  name: string;
}
export interface IngredientWithCategory extends Ingredient {
  categoryName: string;
  categoryId: number;
  image: string;
}

export interface Unit {
  id: number;
  code: string;
}

export interface FoodCategory {
  id: number;
  name: string;
  image?: string;
  description?: string;
}
