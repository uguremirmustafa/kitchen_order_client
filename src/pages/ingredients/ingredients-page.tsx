import IngredientForm from 'components/forms/IngredientForm';
import AddButton from 'components/ui/atoms/AddButton';
import { useModal } from 'components/wrappers/modal-wrapper';
import { SaveIngredientFormValues } from 'lib/api/ingredients.api';
import { useForm } from 'react-hook-form';
import IngredientsTable from './ingredents-table';

const DEFAULT_VALUES = { name: '', brand: { value: -1, label: '' } };

function IngredientsPage(): JSX.Element {
  const { setModal } = useModal();

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

  return (
    <div>
      <AddButton onClick={() => openRecipeFormModal()} />
      <IngredientsTable form={form} />
    </div>
  );
}

export default IngredientsPage;
