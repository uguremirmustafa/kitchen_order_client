import {
  SaveIngredientFormValues,
  deleteIngredient,
  useIngredientsUnderCategory,
} from 'lib/api/ingredients.api';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import { DEFAULT_VALUES } from './ingredients-page';
import { IngredientWithCategory } from 'lib/types';
import { useModal } from 'components/wrappers/modal-wrapper';
import IngredientForm from 'components/forms/IngredientForm';
import { FaEdit, FaTimes } from 'react-icons/fa';
import ConfirmButton from 'components/ui/atoms/ConfirmButton';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import CancelButton from 'components/ui/atoms/CancelButton';

function IngredientCards(): JSX.Element {
  const params = useParams();
  const { setModal, closeModal } = useModal();
  const { data, isLoading } = useIngredientsUnderCategory(Number(params.categoryId));
  const queryClient = useQueryClient();
  const form = useForm<SaveIngredientFormValues>({
    defaultValues: DEFAULT_VALUES,
    mode: 'all',
  });

  function openModal(x: IngredientWithCategory) {
    form.reset({
      category: { value: x.categoryId, label: x.categoryName },
      brand: { value: x.brandId, label: x.brandName },
      name: x.ingredientName,
      imageUrl: x.image ?? '',
    });
    setModal({
      id: 'ingredient_form_modal',
      title: 'Edit Ingredient',
      content: <IngredientForm form={form} id={x.ingredientId} />,
    });
  }

  const deleteMutation = useMutation({
    mutationFn: deleteIngredient,
    onSuccess: (data) => {
      if (data) {
        queryClient.fetchQuery([`ingredient_${params.categoryId}`]);
        closeModal();
      }
      console.log(data);
    },
  });

  function deleteItem(x: IngredientWithCategory) {
    setModal({
      id: 'confirmation_modal',
      title: `Delete ${x.ingredientName}?`,
      content: (
        <div>
          <p>Are you sure you want to delete this item?</p>
          <div className="flex gap-4 justify-end mt-4">
            <CancelButton className="btn-sm" onClick={() => closeModal()} />
            <ConfirmButton
              className="btn-sm"
              loading={deleteMutation.isLoading}
              onClick={() => deleteMutation.mutate(x.ingredientId)}
            />
          </div>
        </div>
      ),
    });
  }

  return (
    <div className="grid grid-cols-12 gap-4">
      {data.map((x) => {
        return (
          <div
            key={x.ingredientId}
            className="col-span-6 lg:col-span-4 xl:col-span-3 card card-compact bg-base-300"
          >
            <figure>
              <img src={x.image ?? '/images/shoe.jpg'} alt="Shoes" />
            </figure>
            <div className="card-body">
              <h2 className="card-title">{x.ingredientName}</h2>
              <p>{x.brandName}</p>
              <div className="card-actions justify-end">
                <button className="btn btn-sm btn-ghost" onClick={() => deleteItem(x)}>
                  delete
                </button>
                <button className="btn btn-sm btn-success btn-outline" onClick={() => openModal(x)}>
                  edit
                </button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default IngredientCards;
