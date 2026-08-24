
import * as React from "react"
import {

  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"
import { ChevronDown } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"



export function DataTable({ columns, data, setSearch, setRowSelection, rowSelection, toggleAutomation, total, filter, setFilter,search, limit, page, setLimit, setPage }) {
  const [sorting, setSorting] = React.useState([])
  const [columnFilters, setColumnFilters] = React.useState(
    []
  )
  const [columnVisibility, setColumnVisibility] =
    React.useState({})



  const table = useReactTable({
    data,
    columns,

    pageCount: Math.ceil(total / limit), // Optional: only for server-side mode
    manualPagination: true, // 👈 Use this if you're handling pagination yourself

    onPaginationChange: (updater) => {
      const newState = typeof updater === 'function' ? updater({ pageIndex: page - 1, pageSize: limit }) : updater
      setPage(newState.pageIndex + 1) // because react-table is 0-based
      setLimit(newState.pageSize)
    },

    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),

    state: {
      pagination: {
        pageIndex: page - 1, // react-table is 0-indexed
        pageSize: limit,
      },
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection
    },

    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
  })


  return (
    <div className="w-full">
      <div className="flex items-center py-4">
        <Input
          placeholder="Filter ..."
          value={search}
          onChange={(e) => setSearch(e?.target?.value)}
          className="max-w-sm"
        />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto">
              Columns <ChevronDown />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {[{ label: "Change to Active", value: true }, { label: "Change to Inactive", value: false }]
              .map((column) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.label}
                    className="capitalize"
                    checked={column.value}
                    showTick={false}
                    // checked={column.getIsVisible()}
                    onCheckedChange={(value) => {
                      
                      toggleAutomation(7, !value)}
                      // column.toggleVisibility(!!value)
                    }
                  >
                    {column.label}
                  </DropdownMenuCheckboxItem>
                )
              })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="rounded-md border">
        <Table className="table-fixed w-full">
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id} style={{ width: header.getSize() }}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} style={{ width: `${cell.column.getSize()}px` }}>
                      <div className="w-full">
                        <span className="block truncate  overflow-hidden text-ellipsis whitespace-nowrap">
                          {flexRender(cell.column.columnDef.cell, cell.getContext())}
                        </span>
                      </div>
                    </TableCell>

                  ))}

                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="text-muted-foreground flex-1 text-sm">
          {table.getFilteredSelectedRowModel().rows.length} of{" "}
          {table.getFilteredRowModel().rows.length} row(s) selected.
        </div>
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
            disabled={page === 1}
          >
            Previous
          </Button>

          <Button
            variant="outline"
            size="sm"
            onClick={() => setPage((prev) => prev + 1)}
            disabled={!table.getCanNextPage()} // or manage your own limit
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  )
}
