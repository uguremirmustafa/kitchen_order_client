import { useMutation, useQueryClient } from '@tanstack/react-query';
import RemoveButton from 'components/ui/atoms/RemoveButton';
import { deleteRecipeById } from 'lib/api/recipes.api';
import { Recipe } from 'lib/types';

interface IProps {
  recipe: Recipe;
  onClick: (recipe: Recipe) => void;
}

function RecipeCard(props: IProps) {
  const { recipe, onClick } = props;
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: deleteRecipeById,
    onSuccess: (data) => {
      if (data) {
        queryClient.fetchQuery({ queryKey: ['recipes'] });
      } else {
        console.log('failed');
      }
    },
  });

  return (
    <div className="card bg-base-300 shadow-xl cursor-pointer" onClick={() => onClick(recipe)}>
      <div className="card-body">
        <h2 className="card-title">{recipe.name}</h2>
        <p>{recipe.description}</p>
        <div className="card-actions flex justify-end">
          <RemoveButton
            className="btn-error btn-sm"
            onClick={(e) => {
              e.stopPropagation();
              mutation.mutate(recipe.id);
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default RecipeCard;
