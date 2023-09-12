export interface MenuItem {
  label: string;
  path: string;
}
export const MENU_ITEMS: MenuItem[] = [
  {
    label: 'Recipes',
    path: '/recipes',
  },
  {
    label: 'Ingredients',
    path: '/ingredients/1',
  },
  {
    label: 'Brands',
    path: '/brands',
  },
];
