import { useMutation, useQueryClient } from '@tanstack/react-query';
import AddButton from 'components/ui/atoms/AddButton';
import Form from 'components/ui/atoms/Form';
import RemoveButton from 'components/ui/atoms/RemoveButton';
import SaveButton from 'components/ui/atoms/SaveButton';
import SelectField from 'components/ui/atoms/SelectField';
import TextField from 'components/ui/atoms/TextField';
import Textarea from 'components/ui/atoms/Textarea';
import { useModal } from 'components/wrappers/modal-wrapper';
import { useIngredients } from 'lib/api/ingredients.api';
import { SaveRecipeFormValues, saveRecipe, useUnits } from 'lib/api/recipes.api';
import { Recipe } from 'lib/types';
import { useFieldArray, Controller, UseFormReturn } from 'react-hook-form';

interface IProps {
  form: UseFormReturn<SaveRecipeFormValues, any, undefined>;
  recipeId?: Recipe['id'];
}
function RecipeForm(props: IProps) {
  const { form, recipeId } = props;
  const { data: units, isLoading: loadingUnits, error: errorUnits } = useUnits();
  const { closeModal } = useModal();
  const {
    data: ingredients,
    isLoading: loadingIngredients,
    error: errorIngredients,
  } = useIngredients();

  const {
    reset,
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = form;

  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: saveRecipe,
    onSuccess: (data) => {
      if (data) {
        if (recipeId) {
          queryClient.invalidateQueries([recipeId]);
        }
        queryClient.refetchQueries(['recipes']);
        closeModal();
        reset();
      } else {
        console.log('failed');
      }
    },
  });

  function onSubmit(data: SaveRecipeFormValues) {
    if (recipeId) {
      mutation.mutate({ data, id: recipeId });
    } else {
      mutation.mutate({ data });
    }
  }

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'ingredients',
  });

  if (loadingIngredients || loadingUnits) {
    return <span className="loading loading-spinner loading-lg"></span>;
  }
  if (errorIngredients || errorUnits) {
    return <span>error</span>;
  }

  const ingredientOptions =
    ingredients?.map((x) => ({ label: x.ingredientName, value: x.ingredientId })) ?? [];

  const unitOptions = units?.map((x) => ({ label: x.name, value: x.id })) ?? [];
  return (
    <Form className="!max-w-6xl w-full" onSubmit={handleSubmit(onSubmit)}>
      <Controller
        name="name"
        control={control}
        render={({ field }) => <TextField {...field} label="Recipe Name" error={errors?.name} />}
        rules={{ required: true }}
      />

      {fields.map((field, index) => {
        return (
          <div key={field.id} className="grid grid-cols-12 gap-4 items-end">
            <Controller
              name={`ingredients.${index}.item`}
              control={control}
              render={({ field }) => (
                <SelectField
                  label="Item"
                  options={ingredientOptions}
                  className="col-span-5"
                  {...field}
                />
              )}
            />
            <Controller
              name={`ingredients.${index}.amount`}
              control={control}
              render={({ field }) => (
                <TextField {...field} type="number" label="Amount" className="col-span-2" />
              )}
              rules={{ min: 0 }}
            />
            <Controller
              name={`ingredients.${index}.unit`}
              control={control}
              render={({ field }) => (
                <SelectField label="Unit" options={unitOptions} className="col-span-3" {...field} />
              )}
            />
            <RemoveButton className="col-span-2" onClick={() => remove(index)} />
          </div>
        );
      })}
      <AddButton
        className="w-full mt-2"
        onClick={() =>
          append({ item: { label: '', value: 0 }, unit: { label: '', value: 0 }, amount: 0 })
        }
      >
        Add ingredient
      </AddButton>
      <Controller
        name="description"
        control={control}
        render={({ field }) => (
          <Textarea {...field} label="Instructions" error={errors?.description} />
        )}
      />
      <SaveButton className="col-span-2" loading={false} disabled={!isValid} />
    </Form>
  );
}

export default RecipeForm;
