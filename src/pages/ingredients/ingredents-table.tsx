import { useMutation, useQueryClient } from '@tanstack/react-query';
import {
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
} from '@tanstack/react-table';
import IngredientForm from 'components/forms/IngredientForm';
import SaveButton from 'components/ui/atoms/SaveButton';
import { useModal } from 'components/wrappers/modal-wrapper';
import {
  SaveIngredientFormValues,
  deleteIngredient,
  useIngredients,
  useIngredientsUnderCategory,
} from 'lib/api/ingredients.api';
import { Ingredient } from 'lib/types';
import { UseFormReturn, useForm } from 'react-hook-form';
import useIngredientColumns from './useIngredientColumns';
import TableAtom from 'components/ui/atoms/Table';
import { useFoodCategories } from 'lib/api/food-category.api';
import { useParams } from 'react-router-dom';
const DEFAULT_VALUES = { name: '', brand: { value: -1, label: '' } };

function IngredientsTable() {
  const params = useParams();

  const form = useForm<SaveIngredientFormValues>({
    defaultValues: DEFAULT_VALUES,
    mode: 'all',
  });

  function openRecipeFormModal() {
    form.reset(DEFAULT_VALUES);
    setModal({
      id: 'ingredient_form_modal',
      title: 'New Ingredient',
      content: <IngredientForm form={form} />,
    });
  }

  const queryClient = useQueryClient();

  const { data, isLoading } = useIngredientsUnderCategory(Number(params.categoryId));

  const { setModal, closeModal } = useModal();

  function handleEdit(row: Ingredient) {
    form.reset({ name: row.ingredientName, brand: { value: row.brandId, label: row.brandName } });
    setModal({
      id: 'ingredient_form_modal',
      title: 'edit ingredient',
      content: <IngredientForm form={form} id={row.ingredientId} />,
    });
  }

  const deleteMutation = useMutation({
    mutationFn: deleteIngredient,
    onSuccess: (data) => {
      if (data) {
        queryClient.fetchQuery({ queryKey: ['ingredients'] });
        closeModal();
      }
    },
  });

  function handleDelete(row: Ingredient) {
    console.log(row);
    setModal({
      id: 'confirmation_modal',
      title: 'Are you sure',
      content: (
        <div>
          <p>Are you sure???? {row.ingredientId}</p>
          <SaveButton
            loading={deleteMutation.isLoading}
            onClick={() => deleteMutation.mutate(row.ingredientId)}
          />
        </div>
      ),
    });
  }

  const columns = useIngredientColumns({ handleDelete, handleEdit });

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    enableFilters: false,
  });

  if (isLoading) {
    return <span className="loading loading-spinner loading-lg"></span>;
  }
  return (
    <div>
      <TableAtom table={table} />
    </div>
  );
}

export default IngredientsTable;
