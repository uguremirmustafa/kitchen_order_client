import {
  Column,
  Table as ReactTable,
  PaginationState,
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  ColumnDef,
  OnChangeFn,
  flexRender,
  createColumnHelper,
} from '@tanstack/react-table';
import { SaveIngredientFormValues, useIngredients } from 'lib/api/ingredients.api';
import { Ingredient } from 'lib/types';
import { useMemo } from 'react';
import { UseFormReturn } from 'react-hook-form';

const columnHelper = createColumnHelper<Ingredient>();

const columns = [
  columnHelper.accessor('ingredientId', {
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor('ingredientName', {
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor((row) => row.brandName, {
    id: 'brandName',
    cell: (info) => info.getValue(),
    header: () => <span>Last Name</span>,
  }),
];

interface IProps {
  form: UseFormReturn<SaveIngredientFormValues, any, undefined>;
}

function IngredientsTable(props: IProps) {
  const { form } = props;

  const { data, isLoading } = useIngredients();
  const columns = useMemo<ColumnDef<Ingredient>[]>(
    () => [
      {
        accessorFn: (s) => s.ingredientName,
        header: 'Name',
      },
      {
        accessorFn: (s) => s.brandName,
        header: 'Brand',
      },
    ],
    []
  );
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
  return (
    <div className="overflow-x-auto">
      <table className="table table-zebra">
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th key={header.id}>
                  <div className="mb-2">
                    {header.isPlaceholder
                      ? null
                      : flexRender(header.column.columnDef.header, header.getContext())}
                  </div>
                  {header.column.getCanFilter() ? (
                    <div>
                      <Filter column={header.column} table={table} />
                    </div>
                  ) : null}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <div className="join mt-4">
        <button
          className="join-item btn"
          onClick={() => table.setPageIndex(0)}
          disabled={!table.getCanPreviousPage()}
        >
          {'<<'}
        </button>
        <button
          className="join-item btn"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          {'<'}
        </button>
        <span className="join-item btn btn-disabled">
          <div>Page</div>
          <strong>
            {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
          </strong>
        </span>
        <button
          className="join-item btn"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          {'>'}
        </button>
        <button
          className="join-item btn"
          onClick={() => table.setPageIndex(table.getPageCount() - 1)}
          disabled={!table.getCanNextPage()}
        >
          {'>>'}
        </button>
      </div>
      {/* <div>
        <span className="flex items-center gap-1">
          | Go to page:
          <input
            type="number"
            defaultValue={table.getState().pagination.pageIndex + 1}
            onChange={(e) => {
              const page = e.target.value ? Number(e.target.value) - 1 : 0;
              table.setPageIndex(page);
            }}
            className="border p-1 rounded w-16"
          />
        </span>
        <select
          value={table.getState().pagination.pageSize}
          onChange={(e) => {
            table.setPageSize(Number(e.target.value));
          }}
        >
          {[10, 20, 30, 40, 50].map((pageSize) => (
            <option key={pageSize} value={pageSize}>
              Show {pageSize}
            </option>
          ))}
        </select>
      </div> */}
    </div>
  );
}

export default IngredientsTable;

function Filter({ column, table }: { column: Column<any, any>; table: ReactTable<any> }) {
  const firstValue = table.getPreFilteredRowModel().flatRows[0]?.getValue(column.id);

  const columnFilterValue = column.getFilterValue();

  return typeof firstValue === 'number' ? (
    <div className="flex space-x-2">
      <input
        type="number"
        value={(columnFilterValue as [number, number])?.[0] ?? ''}
        onChange={(e) =>
          column.setFilterValue((old: [number, number]) => [e.target.value, old?.[1]])
        }
        placeholder={`Min`}
        className="input input-bordered input-primary input-sm"
      />
      <input
        type="number"
        value={(columnFilterValue as [number, number])?.[1] ?? ''}
        onChange={(e) =>
          column.setFilterValue((old: [number, number]) => [old?.[0], e.target.value])
        }
        placeholder={`Max`}
        className="input input-bordered input-primary input-sm"
      />
    </div>
  ) : (
    <input
      type="text"
      value={(columnFilterValue ?? '') as string}
      onChange={(e) => column.setFilterValue(e.target.value)}
      className="input input-bordered input-primary input-sm"
    />
  );
}
