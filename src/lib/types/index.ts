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
  created_at: Date;
  updated_at: Date;
}
export type RecipeWithIngredients = {
  id: Recipe['id'];
  name: Recipe['name'];
  description: Recipe['description'];
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

export interface Unit {
  id: number;
  name: string;
}
