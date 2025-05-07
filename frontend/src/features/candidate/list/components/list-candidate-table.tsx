// CandidateTable.tsx
"use client";
import React from "react";
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  ColumnDef,
} from "@tanstack/react-table";
import { TCandidate } from "../../common/types";
import { useRouter } from "next/router";

interface ListCandidateTableProps {
  data: TCandidate[];
}

const ListCandidateTable: React.FC<ListCandidateTableProps> = ({ data }) => {
  const router = useRouter();

  const columns: ColumnDef<TCandidate>[] = [
    { accessorKey: "name", header: "Name" },
    { accessorKey: "role", header: "Role" },
    { accessorKey: "jobId", header: "Job ID" },
    {
      id: "experience",
      header: "Experience",
      cell: ({ row }) => (
        <>
          {row.original.exprerienceYears +
            " Years " +
            row.original.experienceMonths +
            " Months"}
        </>
      ),
    },

    // { accessorKey: "jobDescription", header: "Job Description" },
    {
      id: "interview",
      header: "Interview",
      cell: ({ row }) => (
        <button
          className="text-blue-600 underline hover:text-blue-800"
          onClick={() =>
            router.push(`/interview?candidateId=${row.original.id}`)
          }
        >
          Go
        </button>
      ),
    },
  ];
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full border border-gray-300">
        <thead className="bg-gray-100">
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th key={header.id} className="px-4 py-2 text-left border-b">
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id} className="hover:bg-gray-50">
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id} className="px-4 py-2 border-b">
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ListCandidateTable;
