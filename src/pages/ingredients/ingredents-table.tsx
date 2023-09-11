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
} from 'lib/api/ingredients.api';
import { Ingredient } from 'lib/types';
import { UseFormReturn } from 'react-hook-form';
import useIngredientColumns from './useIngredientColumns';
import TableAtom from 'components/ui/atoms/Table';

interface IProps {
  form: UseFormReturn<SaveIngredientFormValues, any, undefined>;
}

function IngredientsTable(props: IProps) {
  const { form } = props;

  const queryClient = useQueryClient();
  const { data, isLoading } = useIngredients();

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
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  if (isLoading) {
    return <span className="loading loading-spinner loading-lg"></span>;
  }
  return <TableAtom table={table} />;
}

export default IngredientsTable;
