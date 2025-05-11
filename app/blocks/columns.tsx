import { ColumnDef, CellContext } from "@tanstack/react-table";
import Link from "next/link";
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
    cell: (ctx: CellContext<Block, unknown>) => {
      const blockHash = ctx.getValue();
      if (typeof blockHash !== "string") return null;
      return (
        <Link
          href={`/blocks/${ctx.row.original.slot}`}
          className="font-mono text-blue-600 hover:underline cursor-pointer"
          aria-label={`View details for block ${blockHash}`}>
          {blockHash}
        </Link>
      );
    },
  },
  {
    accessorKey: "slot",
    header: "Slot",
    cell: (ctx: CellContext<Block, unknown>) => {
      const slot = ctx.getValue();
      if (typeof slot !== "number") return null;
      return (
        <span className="text-blue-600 hover:underline cursor-pointer font-mono">
          {slot}
        </span>
      );
    },
  },
  {
    accessorKey: "time",
    header: "Time",
  },
  {
    accessorKey: "leader",
    header: "Leader",
    cell: (ctx: CellContext<Block, unknown>) => {
      const leader = ctx.getValue();
      if (typeof leader !== "string") return null;
      return (
        <span className="text-blue-600 hover:underline cursor-pointer">
          {leader}
        </span>
      );
    },
  },
  {
    accessorKey: "txCount",
    header: "Tx Count",
    cell: (ctx: CellContext<Block, unknown>) => {
      const txCount = ctx.getValue();
      if (typeof txCount !== "number") return null;
      return (
        <span className="text-blue-600 hover:underline cursor-pointer">
          {txCount}
        </span>
      );
    },
  },
  {
    accessorKey: "nonVoteTx",
    header: "Non-vote Tx(s)",
    cell: (ctx: CellContext<Block, unknown>) => {
      const nonVoteTx = ctx.getValue();
      if (typeof nonVoteTx !== "number") return null;
      return (
        <span className="text-blue-600 hover:underline cursor-pointer">
          {nonVoteTx}
        </span>
      );
    },
  },
  {
    accessorKey: "successRate",
    header: "Success Rate",
  },
  {
    accessorKey: "reward",
    header: "Reward",
    cell: (ctx: CellContext<Block, unknown>) => {
      const reward = ctx.getValue();
      if (typeof reward !== "string") return null;
      return (
        <span className="flex items-center gap-1">
          <SolanaIcon /> {reward}
        </span>
      );
    },
  },
];
