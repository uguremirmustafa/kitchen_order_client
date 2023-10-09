import IngredientForm from 'components/forms/IngredientForm';
import AddButton from 'components/ui/atoms/AddButton';
import { useModal } from 'components/wrappers/modal-wrapper';
import { useFoodCategories } from 'lib/api/food-category.api';
import { SaveIngredientFormValues } from 'lib/api/ingredients.api';
import { useForm } from 'react-hook-form';
import { Link, Outlet, useParams } from 'react-router-dom';

function IngredientsPage(): JSX.Element {
  const params = useParams();
  const catId = Number(params.categoryId);
  const { data: categories, isLoading: catLoading } = useFoodCategories();

  const currentCategory = categories?.find((x) => x.id === catId);

  const { setModal } = useModal();

  const form = useForm<SaveIngredientFormValues>({
    defaultValues: DEFAULT_VALUES,
    mode: 'all',
  });

  function openModal() {
    form.reset({
      ...DEFAULT_VALUES,
      category: { value: currentCategory?.id, label: currentCategory?.name },
    });
    setModal({
      id: 'ingredient_form_modal',
      title: 'New Ingredient',
      content: <IngredientForm form={form} />,
    });
  }

  return (
    <div className="grid grid-cols-12 gap-4">
      <div className="tabs tabs-boxed col-span-12">
        {categories?.map((c) => {
          return (
            <Link to={`${c.id}`} className={`tab ${catId === c.id ? 'tab-active' : ''}`} key={c.id}>
              {c.name}
            </Link>
          );
        })}
      </div>
      <AddButton
        disabled={!currentCategory}
        onClick={() => openModal()}
        className="w-full col-span-12 lg:hidden"
      >
        New Ingredient
      </AddButton>
      <div className="col-span-3 hidden lg:block">
        <AddButton disabled={!currentCategory} onClick={() => openModal()} className="w-full">
          New Ingredient
        </AddButton>
        <div className="card bg-base-300 h-80 image-full mt-4">
          <figure>
            <img src={currentCategory?.image ?? '/images/shoe.jpg'} alt="Shoes" />
          </figure>
          <div className="card-body">
            <h2 className="card-title text-4xl">{currentCategory?.name}</h2>
          </div>
        </div>
      </div>
      <div className="col-span-12 lg:col-span-9">
        <Outlet context={{ name: 'ugur' }} />
      </div>
    </div>
  );
}

export default IngredientsPage;

export const DEFAULT_VALUES = {
  name: '',
  category: { value: -1, label: '' },
  image: undefined,
};
