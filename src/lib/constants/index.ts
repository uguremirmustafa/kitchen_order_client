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
    path: '/ingredients',
  },
  {
    label: 'Brands',
    path: '/brands',
  },
];
