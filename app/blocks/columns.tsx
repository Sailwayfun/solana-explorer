import { ColumnDef } from "@tanstack/react-table";

import { SolanaIcon } from "../../components/ui/icons/solana-icon";

export type Block = {
  blockHash: string;
  slot: number;
  time: string;
  leader: string;
  txCount: number;
  nonVoteTx: number;
  successRate: string;
  reward: string;
};

export const columns: ColumnDef<Block>[] = [
  {
    accessorKey: "blockHash",
    header: "Block Hash",
    cell: ({ getValue }: { getValue: () => string }) => (
      <span className="font-mono text-blue-600 cursor-pointer hover:underline">
        {getValue()}
      </span>
    ),
  },
  {
    accessorKey: "slot",
    header: "Slot",
    cell: ({ getValue }: { getValue: () => string | number }) => (
      <span className="text-blue-600 hover:underline cursor-pointer font-mono">
        {getValue()}
      </span>
    ),
  },
  {
    accessorKey: "time",
    header: "Time",
  },
  {
    accessorKey: "leader",
    header: "Leader",
    cell: ({ getValue }: { getValue: () => string }) => (
      <span className="text-blue-600 hover:underline cursor-pointer">
        {getValue()}
      </span>
    ),
  },
  {
    accessorKey: "txCount",
    header: "Tx Count",
  },
  {
    accessorKey: "nonVoteTx",
    header: "Non-vote Tx(s)",
  },
  {
    accessorKey: "successRate",
    header: "Success Rate",
  },
  {
    accessorKey: "reward",
    header: "Reward",
    cell: ({ getValue }: { getValue: () => string }) => (
      <span className="flex items-center gap-1">
        <SolanaIcon /> {getValue()}
      </span>
    ),
  },
];
