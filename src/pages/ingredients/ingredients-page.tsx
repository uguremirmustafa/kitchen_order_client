import { useIngredients } from 'lib/api/ingredients.api';

function IngredientsPage(): JSX.Element {
  const { data: ingredients } = useIngredients();
  return (
    <div>
      <div>
        <pre>{JSON.stringify(ingredients, null, 2)}</pre>
      </div>
    </div>
  );
}

export default IngredientsPage;
