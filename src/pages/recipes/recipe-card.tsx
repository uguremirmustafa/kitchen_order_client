import { useMutation, useQueryClient } from '@tanstack/react-query';
import CancelButton from 'components/ui/atoms/CancelButton';
import ConfirmButton from 'components/ui/atoms/ConfirmButton';
import RemoveButton from 'components/ui/atoms/RemoveButton';
import { useModal } from 'components/wrappers/modal-wrapper';
import { deleteRecipeById } from 'lib/api/recipes.api';
import { Recipe } from 'lib/types';
import { FaPen, FaTrash } from 'react-icons/fa';
import { FaPeopleGroup } from 'react-icons/fa6';
import { Link } from 'react-router-dom';

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
    <div className="card bg-base-300 shadow-xl group col-span-12 sm:col-span-6 md:col-span-4 xl:col-span-3">
      <figure className="bg-white">
        <img
          src={recipe.image ?? '/images/shoe.jpg'}
          alt="Shoes"
          className="h-60 object-cover w-full"
        />
      </figure>
      <div className="card-body">
        <Link to={`${recipe.id}`}>
          <h2 className="card-title mb-4 hover:underline hover:cursor-pointer">{recipe.name}</h2>
          <p className="flex gap-2 items-center">
            <FaPeopleGroup />
            {recipe.for_x_person} people
          </p>
        </Link>
        <div className="card-actions justify-end">
          <button
            className="btn btn-sm btn-ghost text-error"
            onClick={(e) => {
              e.stopPropagation();
              handleDelete(recipe);
            }}
          >
            <FaTrash />
          </button>
          <button
            className="btn btn-sm btn-ghost text-info"
            onClick={(e) => {
              e.stopPropagation();
              onClick(recipe);
            }}
          >
            <FaPen />
          </button>
        </div>
      </div>
    </div>
  );
}

export default RecipeCard;
