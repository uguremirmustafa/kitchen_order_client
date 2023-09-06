import { useMutation, useQueryClient } from '@tanstack/react-query';
import Form from 'components/ui/atoms/Form';
import SaveButton from 'components/ui/atoms/SaveButton';
import SelectField from 'components/ui/atoms/SelectField';
import TextField from 'components/ui/atoms/TextField';
import { useModal } from 'components/wrappers/modal-wrapper';
import { useBrandNames } from 'lib/api/brands.api';
import { SaveIngredientFormValues, saveIngredient } from 'lib/api/ingredients.api';
import { Ingredient } from 'lib/types';
import { Controller, UseFormReturn } from 'react-hook-form';

interface IProps {
  form: UseFormReturn<SaveIngredientFormValues, any, undefined>;
  id?: Ingredient['ingredientId'];
}
function IngredientForm(props: IProps) {
  const { form, id } = props;
  const {
    data: brands,
    isLoading: loadingForBrandNames,
    isError: errorForBrandNames,
  } = useBrandNames();
  const { closeModal } = useModal();

  const {
    reset,
    control,
    handleSubmit,
    formState: { errors },
  } = form;

  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: saveIngredient,
    onSuccess: (data) => {
      if (data) {
        if (id) {
          queryClient.invalidateQueries([id]);
        }
        queryClient.refetchQueries(['ingredients']);
        closeModal();
        reset();
      } else {
        console.log('failed');
      }
    },
  });

  function onSubmit(data: SaveIngredientFormValues) {
    if (id) {
      mutation.mutate({ data, id });
    } else {
      mutation.mutate({ data });
    }
  }

  if (loadingForBrandNames) {
    return <span className="loading loading-spinner loading-lg"></span>;
  }
  if (errorForBrandNames) {
    return <span>error</span>;
  }

  const brandOptions = brands.map((x) => ({ value: x.id, label: x.name }));

  return (
    <Form className="!max-w-6xl w-full" onSubmit={handleSubmit(onSubmit)}>
      <Controller
        name="name"
        control={control}
        render={({ field }) => <TextField {...field} label="Name" error={errors?.name} />}
        rules={{ required: true }}
      />
      <Controller
        name="brand"
        control={control}
        render={({ field }) => (
          <SelectField label="Brand" options={brandOptions} className="col-span-5" {...field} />
        )}
      />
      <SaveButton
        className="col-span-2"
        loading={false}
        //   disabled={!isValid}
      />
    </Form>
  );
}

export default IngredientForm;
