import { SaveRecipeFormValues, useRecipe, useRecipes } from 'lib/api/recipes.api';
import RecipeCard from './recipe-card';
import AddButton from 'components/ui/atoms/AddButton';
import { useForm } from 'react-hook-form';
import { useModal } from 'components/wrappers/modal-wrapper';
import RecipeForm from 'components/forms/RecipeForm';
import { Recipe } from 'lib/types';
import { useEffect, useState } from 'react';

const DEFAULT_VALUES = { name: '', description: '', ingredients: [] };

function RecipesPage(): JSX.Element {
  const { data: recipes, isLoading, isError } = useRecipes();
  const [selectedRecipeId, setSelectedRecipeId] = useState(0);
  const {
    data: recipe,
    isLoading: loadingForRecipe,
    isError: errorForRecipe,
  } = useRecipe(selectedRecipeId);
  const { setModal } = useModal();

  const form = useForm<SaveRecipeFormValues>({
    defaultValues: DEFAULT_VALUES,
    mode: 'all',
  });

  function openRecipeFormModal() {
    form.reset(DEFAULT_VALUES);
    setModal({
      id: 'recipe_form_modal',
      title: 'New Recipe',
      content: <RecipeForm form={form} />,
      onClose: () => setSelectedRecipeId(0),
    });
  }

  function onRecipeSelect(r: Recipe) {
    setSelectedRecipeId(r.id);
  }

  useEffect(() => {
    if (recipe) {
      form.reset({
        name: recipe.name,
        description: recipe.description,
        ingredients: recipe.ingredients.map((x) => ({
          amount: x.amount,
          item: { label: x.ingredientName, value: x.ingredient_id },
          unit: { label: x.unit, value: x.unit_id },
        })),
      });
      setModal({
        id: 'recipe_form_modal',
        title: 'Update Recipe',
        content: <RecipeForm form={form} recipeId={recipe.id} />,
        onClose: () => setSelectedRecipeId(0),
      });
    }
  }, [selectedRecipeId, recipe?.id]);

  if (isLoading) {
    return <span className="loading loading-spinner loading-lg"></span>;
  }

  if (isError) {
    return <div>Error</div>;
  }

  return (
    <div>
      <div className="flex justify-between items-end mb-4 border-b border-b-primary-content pb-4">
        <h1 className="text-4xl font-black text-primary-content">Recipes</h1>
        <AddButton outline={false} onClick={() => openRecipeFormModal()}>
          New Recipe
        </AddButton>
      </div>
      <div className="grid grid-cols-3 gap-4">
        {recipes.map((x) => (
          <RecipeCard key={x.id} recipe={x} onClick={onRecipeSelect} />
        ))}
      </div>
    </div>
  );
}

export default RecipesPage;
