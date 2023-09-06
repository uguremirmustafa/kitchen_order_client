export {};

declare global {
  interface Window extends Modals {}
}

type Modals = Record<ModalId, HTMLDialogElement>;

export type ModalId = 'recipe_form_modal' | 'ingredient_form_modal';
