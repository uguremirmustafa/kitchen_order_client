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
export interface BrandWithName {
  name: string;
  id: number;
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
    unit: Unit['name'];
    amount: number;
    unit_id: Unit['id'];
    brandName: BrandWithName['name'];
    ingredient_id: Ingredient['ingredientId'];
    ingredientName: Ingredient['ingredientName'];
  }[];
};

export interface Ingredient {
  brandName: string;
  brandId: number;
  ingredientId: number;
  ingredientName: string;
}
export interface IngredientWithCategory extends Ingredient {
  categoryName: string;
  categoryId: number;
  image: string;
}

export interface Unit {
  id: number;
  name: string;
}

export interface FoodCategory {
  id: number;
  name: string;
  image?: string;
  description?: string;
}
