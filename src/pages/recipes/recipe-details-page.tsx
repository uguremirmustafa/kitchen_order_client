import { useRecipe } from 'lib/api/recipes.api';
import { GiCookingPot } from 'react-icons/gi';
import { FaPeopleGroup } from 'react-icons/fa6';
import { PiTimer } from 'react-icons/pi';
import { useParams } from 'react-router-dom';

function RecipeDetailsPage(): JSX.Element {
  const { recipeId } = useParams();
  const { data: recipe, isLoading, isError } = useRecipe(Number(recipeId));

  if (isLoading) {
    return <span>loading</span>;
  }
  if (isError) {
    return <span>error</span>;
  }

  return (
    <div className="container max-w-2xl mx-auto">
      <h1 className="text-center text-4xl mb-4">{recipe.name}</h1>
      <img
        src={recipe.image}
        alt={recipe.name}
        className="h-[300px] mx-auto w-full object-cover rounded-lg shadow-xl mb-4"
      />
      <div className="grid grid-cols-3 mb-4">
        {recipe.prep_time && (
          <p className="flex gap-2 items-center justify-center">
            <PiTimer />
            {recipe.prep_time} minutes to prepare
          </p>
        )}
        {recipe.cooking_time && (
          <p className="flex gap-2 items-center justify-center">
            <GiCookingPot /> {recipe.cooking_time} minutes to cook
          </p>
        )}
        {recipe.for_x_person && (
          <p className="flex gap-2 items-center justify-center">
            <FaPeopleGroup />
            for {recipe.for_x_person} person
          </p>
        )}
      </div>
      <ul className="flex flex-wrap gap-2 mb-4">
        {recipe.ingredients.map((x) => {
          return (
            <li className="badge badge-neutral">{`${x.amount} ${x.unit} ${x.ingredientName}`}</li>
          );
        })}
      </ul>
      <p>{recipe.description}</p>
    </div>
  );
}

export default RecipeDetailsPage;
