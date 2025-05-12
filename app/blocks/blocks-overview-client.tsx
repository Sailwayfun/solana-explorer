"use client";
import { FC, useState } from "react";
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  ColumnDef,
} from "@tanstack/react-table";
import { Button } from "../../components/ui/button";
import { SearchInput } from "./search-input";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
  TableCaption,
} from "../../components/ui/table";
import { columns, Block } from "./columns";

/**
 * Client component for displaying and searching Solana blocks.
 * @param blocks The array of block data to display
 */
export type BlocksOverviewClientProps = {
  blocks: readonly Block[];
};

export const BlocksOverviewClient: FC<BlocksOverviewClientProps> = ({
  blocks,
}) => {
  const [search, setSearch] = useState("");
  const filteredBlocks = blocks.filter(
    (block) =>
      block.blockHash.toLowerCase().includes(search.toLowerCase()) ||
      block.leader.toLowerCase().includes(search.toLowerCase()) ||
      String(block.slot).includes(search)
  );

  // Pagination state
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(20);
  const pageCount = Math.ceil(filteredBlocks.length / pageSize);

  const paginatedBlocks = filteredBlocks.slice(page * pageSize, (page + 1) * pageSize);

  const table = useReactTable({
    data: paginatedBlocks,
    columns: columns as ColumnDef<Block, unknown>[],
    getCoreRowModel: getCoreRowModel(),
    manualPagination: true,
    pageCount,
    state: { pagination: { pageIndex: page, pageSize } },
  });

  const handlePageSizeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setPageSize(Number(e.target.value));
    setPage(0);
  };

  const handlePageChange = (newPage: number) => {
    setPage(Math.max(0, Math.min(newPage, pageCount - 1)));
  };

  return (
    <div className="w-full flex flex-col gap-5">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-3">
        <h1 className="text-2xl font-bold">Blocks</h1>
        <SearchInput value={search} onChange={setSearch} />
      </div>
      <div className="overflow-x-auto rounded-lg border bg-card">
        <Table>
          <TableCaption className="sr-only">Solana Blocks</TableCaption>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows.map((row) => (
              <TableRow key={row.id} className="even:bg-muted/50">
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      {/* Table Footer: Pagination and Page Size */}
      <div className="flex items-center justify-between mt-4 px-2">
        <div className="flex items-center gap-2">
          <span>Show</span>
          <select
            className="border rounded px-2 py-1 text-sm bg-background"
            value={pageSize}
            onChange={handlePageSizeChange}
            aria-label="Rows per page"
          >
            {[10, 20, 50, 100].map((size) => (
              <option key={size} value={size}>{size}</option>
            ))}
          </select>
          <span>per page</span>
        </div>
        <div className="flex items-center gap-2">
          <Button size="icon" variant="outline" onClick={() => handlePageChange(0)} disabled={page === 0} aria-label="First page">⏮</Button>
          <Button size="icon" variant="outline" onClick={() => handlePageChange(page - 1)} disabled={page === 0} aria-label="Previous page">&lt;</Button>
          <span className="text-sm">Page {page + 1} of {pageCount || 1}</span>
          <Button size="icon" variant="outline" onClick={() => handlePageChange(page + 1)} disabled={page >= pageCount - 1} aria-label="Next page">&gt;</Button>
          <Button size="icon" variant="outline" onClick={() => handlePageChange(pageCount - 1)} disabled={page >= pageCount - 1} aria-label="Last page">⏭</Button>
        </div>
      </div>
    </div>
  );
};
