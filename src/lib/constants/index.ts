export interface MenuItem {
  label: string;
  path: string;
}
export const MENU_ITEMS: MenuItem[] = [
  {
    label: 'My Recipes',
    path: '/recipes',
  },
  {
    label: 'Ingredients',
    path: '/ingredients/1',
  },
];
