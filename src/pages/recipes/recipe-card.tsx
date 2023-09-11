import { useMutation, useQueryClient } from '@tanstack/react-query';
import CancelButton from 'components/ui/atoms/CancelButton';
import ConfirmButton from 'components/ui/atoms/ConfirmButton';
import RemoveButton from 'components/ui/atoms/RemoveButton';
import { useModal } from 'components/wrappers/modal-wrapper';
import { deleteRecipeById } from 'lib/api/recipes.api';
import { Recipe } from 'lib/types';

interface IProps {
  recipe: Recipe;
  onClick: (recipe: Recipe) => void;
}

function RecipeCard(props: IProps) {
  const { recipe, onClick } = props;
  const { setModal, closeModal } = useModal();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: deleteRecipeById,
    onSuccess: (data) => {
      if (data) {
        queryClient.fetchQuery({ queryKey: ['recipes'] });
        closeModal();
      } else {
        console.log('failed');
      }
    },
  });

  function handleDelete(recipe: Recipe) {
    setModal({
      id: 'confirmation_modal',
      title: 'Confirm delete?',
      content: (
        <div>
          <p>Would you like to delete this recipe?</p>
          <div className="modal-action">
            <CancelButton onClick={() => closeModal()} />
            <ConfirmButton
              loading={mutation.isLoading}
              onClick={() => mutation.mutate(recipe.id)}
            />
          </div>
        </div>
      ),
    });
  }

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
              handleDelete(recipe);
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default RecipeCard;
