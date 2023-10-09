import { ColumnDef } from '@tanstack/react-table';
import { Ingredient } from 'lib/types';
import { useMemo } from 'react';
import { PiDotsThreeOutlineVerticalBold } from 'react-icons/pi';

interface IProps {
  handleEdit: (item: Ingredient) => void;
  handleDelete: (item: Ingredient) => void;
}

function useIngredientColumns(props: IProps) {
  const { handleDelete, handleEdit } = props;
  const columns = useMemo<ColumnDef<Ingredient>[]>(
    () => [
      {
        accessorFn: (s) => s.ingredientName,
        header: 'Name',
      },

      {
        accessorFn: (s) => s.ingredientId,
        header: 'Action',
        cell: ({ row }) => (
          <div className="dropdown dropdown-right dropdown-hover">
            <label tabIndex={0} className="btn btn-sm btn-ghost text-lg">
              <PiDotsThreeOutlineVerticalBold />
            </label>
            <ul
              tabIndex={0}
              className="dropdown-content z-[10] menu shadow-xl bg-neutral rounded-box"
            >
              <li>
                <button onClick={() => handleEdit(row.original)}>edit</button>
              </li>
              <li>
                <button onClick={() => handleDelete(row.original)}>delete</button>
              </li>
            </ul>
          </div>
        ),
        enableColumnFilter: false,
      },
    ],
    []
  );
  return columns;
}

export default useIngredientColumns;
