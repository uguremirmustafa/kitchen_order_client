import { useMutation, useQueryClient } from '@tanstack/react-query';
import Form from 'components/ui/atoms/Form';
import SaveButton from 'components/ui/atoms/SaveButton';
import SelectField from 'components/ui/atoms/SelectField';
import Input from 'components/ui/atoms/Input';
import { useModal } from 'components/wrappers/modal-wrapper';
import { useBrandNames } from 'lib/api/brands.api';
import { useFoodCategories } from 'lib/api/food-category.api';
import { SaveIngredientFormValues, saveIngredient } from 'lib/api/ingredients.api';
import { Ingredient } from 'lib/types';
import { Controller, UseFormReturn } from 'react-hook-form';
import ImageUploader from 'components/ui/atoms/ImageUploader';

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
  const {
    data: categories,
    isLoading: loadingForCategories,
    isError: errorCategories,
  } = useFoodCategories();

  const { closeModal } = useModal();

  const {
    reset,
    control,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = form;

  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: saveIngredient,
    onSuccess: (data) => {
      if (data) {
        if (id) {
          queryClient.invalidateQueries([id]);
        }
        queryClient.refetchQueries([`ingredients_${data.food_category_id}`]);
        closeModal();
        reset();
      } else {
        console.log('failed');
      }
    },
  });

  async function onSubmit(data: SaveIngredientFormValues) {
    if (id) {
      mutation.mutate({ data, id });
    } else {
      mutation.mutate({ data });
    }
  }

  if (loadingForBrandNames || loadingForCategories) {
    return <span className="loading loading-spinner loading-lg"></span>;
  }
  if (errorForBrandNames || errorCategories) {
    return <span>error</span>;
  }

  const brandOptions = brands.map((x) => ({ value: x.id, label: x.name }));
  const categoryOptions = categories.map((x) => ({ value: x.id, label: x.name }));

  return (
    <Form className="!max-w-6xl w-full" onSubmit={handleSubmit(onSubmit)}>
      <Controller
        control={control}
        name="imageUrl"
        render={({ field }) => (
          <ImageUploader
            {...field}
            label="Image"
            imageUrl={watch('imageUrl')}
            setImageUrl={(url: string) => setValue('imageUrl', url)}
          />
        )}
      />

      <Controller
        name="name"
        control={control}
        render={({ field }) => <Input {...field} label="Name" error={errors?.name} />}
        rules={{ required: true }}
      />
      <Controller
        name="brand"
        control={control}
        render={({ field }) => (
          <SelectField label="Brand" options={brandOptions} className="col-span-5" {...field} />
        )}
      />
      <Controller
        name="category"
        control={control}
        render={({ field }) => (
          <SelectField
            label="Category"
            options={categoryOptions}
            className="col-span-5"
            {...field}
          />
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
