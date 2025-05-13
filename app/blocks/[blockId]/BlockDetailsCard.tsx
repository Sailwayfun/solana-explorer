/**
 * BlockDetailsCard displays Solana block details with tooltips and navigation.
 * Uses Shadcn UI and Tailwind CSS.
 * @module BlockDetailsCard
 */
"use client";
import React from "react";
import { Button } from "@/components/ui/button"; // Requires Shadcn Button
import { TooltipProvider, Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip"; // Requires Shadcn Tooltip
import Link from "next/link";
import type { BlockDetails } from "@/types/block";

/**
 * Props for BlockDetailsCard
 */
export type BlockDetailsCardProps = {
  blockDetails: BlockDetails;
  prevBlockId?: number;
  nextBlockId?: number;
};

/**
 * Tooltip content for each field
 */
/**
 * Tooltip content for each field in BlockDetails
 */

/**
 * BlockDetailsCard component
 * @param props - BlockDetailsCardProps
 * @returns JSX.Element
 */
import { useMemo } from "react";
import { Copy } from "lucide-react";

export const BlockDetailsCard: React.FC<BlockDetailsCardProps> = ({
  blockDetails,
  prevBlockId,
  nextBlockId,
}) => {
  // Helper: format timestamp
  const formattedTime = useMemo(() => {
    if (!blockDetails.timestamp) return "-";
    const date = new Date(blockDetails.timestamp);
    const now = Date.now();
    const diff = Math.floor((now - date.getTime()) / 1000);
    if (isNaN(diff)) return blockDetails.timestamp;
    if (diff < 60) return `${diff} sec ago`;
    if (diff < 3600) return `${Math.floor(diff / 60)} min ago`;
    if (diff < 86400) return `${Math.floor(diff / 3600)} hr ago`;
    return date.toLocaleString("en-US", { dateStyle: "medium", timeStyle: "short" });
  }, [blockDetails.timestamp]);

  // Helper: format reward (assume lamports, convert to SOL if needed)
  const formattedReward = useMemo(() => {
    if (!blockDetails.rewards || blockDetails.rewards.length === 0) return "-";
    // If rewards is an array of JSON strings, sum lamports
    try {
      const rewardsArr = blockDetails.rewards.map((r) => {
        try {
          const obj = JSON.parse(r);
          return typeof obj.lamports === "number" ? obj.lamports : 0;
        } catch {
          return 0;
        }
      });
      const totalLamports = rewardsArr.reduce((a, b) => a + b, 0);
      return `${(totalLamports / 1e9).toFixed(5)} SOL`;
    } catch {
      return Array.isArray(blockDetails.rewards)
        ? blockDetails.rewards.join(", ")
        : String(blockDetails.rewards ?? "-");
    }
  }, [blockDetails.rewards]);

  // Helper: copy to clipboard
  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <TooltipProvider>
      <div className="bg-white dark:bg-zinc-900 rounded-xl shadow p-6 w-full mx-auto">
        <div className="flex justify-between mb-4">
          <Link href={prevBlockId !== undefined ? `/blocks/${prevBlockId}` : "#"}>
            <Button variant="outline" disabled={prevBlockId === undefined}>
              Prev Block
            </Button>
          </Link>
          <Link href={nextBlockId !== undefined ? `/blocks/${nextBlockId}` : "#"}>
            <Button variant="outline" disabled={nextBlockId === undefined}>
              Next Block
            </Button>
          </Link>
        </div>
        <div className="grid grid-cols-2 gap-x-8 gap-y-4">
          <div className="font-semibold">Block</div>
          <div className="font-mono">{blockDetails.slot}</div>

          <div className="font-semibold">Timestamp</div>
          <div>
            <span>{formattedTime}</span>
            <span className="ml-2 text-xs text-gray-500">{blockDetails.timestamp}</span>
          </div>

          <div className="font-semibold">Block Hash</div>
          <div className="flex items-center gap-2 font-mono">
            <span className="truncate">{blockDetails.blockhash}</span>
            <button
              onClick={() => handleCopy(blockDetails.blockhash)}
              className="p-1 hover:bg-gray-200 rounded"
              title="Copy block hash"
            >
              <Copy size={14} />
            </button>
          </div>

          <div className="font-semibold">Parent Block</div>
          <div>
            <Link href={`/blocks/${blockDetails.parentSlot}`} className="text-blue-600 hover:underline font-mono">
              {blockDetails.parentSlot}
            </Link>
          </div>

          <div className="font-semibold">Leader</div>
          <div>
            {blockDetails.leader ? (
              <Link href={`/validators/${blockDetails.leader}`} className="text-blue-600 hover:underline font-mono">
                {blockDetails.leader}
              </Link>
            ) : (
              <span>-</span>
            )}
          </div>

          <div className="font-semibold flex items-center gap-1">
            <span>Reward</span>
            <Tooltip>
              <TooltipTrigger asChild>
                <button
                  tabIndex={-1}
                  className="ml-1 text-gray-400 hover:text-gray-600"
                  aria-label="Reward info"
                  type="button"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/><text x="12" y="16" textAnchor="middle" fontSize="12" fill="currentColor">?</text></svg>
                </button>
              </TooltipTrigger>
              <TooltipContent>
                Rewards distributed to the leader for producing this block.
              </TooltipContent>
            </Tooltip>
          </div>
          <Tooltip>
            <TooltipTrigger asChild>
              <span className="truncate overflow-hidden text-ellipsis cursor-help">
                {formattedReward}
                {(() => {
                  // Add USD value (1 SOL = $175 for now)
                  const sol = Number((/([\d.]+)/.exec(formattedReward)?.[1] ?? 0));
                  if (!isNaN(sol) && sol > 0) {
                    const usd = (sol * 175).toLocaleString("en-US", { style: "currency", currency: "USD" });
                    return <span className="ml-2 text-xs text-gray-500">({usd})</span>;
                  }
                  return null;
                })()}
              </span>
            </TooltipTrigger>
            <TooltipContent className="break-all max-w-xs">
              {Array.isArray(blockDetails.rewards)
                ? blockDetails.rewards.join(", ")
                : String(blockDetails.rewards ?? "-")}
            </TooltipContent>
          </Tooltip>

          <div className="font-semibold">Transactions</div>
          <div>{`Total ${blockDetails.transactions.length} transactions`}</div>

          <div className="font-semibold">Block Height</div>
          <div>{blockDetails.blockHeight}</div>

          <div className="font-semibold">Block Time</div>
          <div>{blockDetails.blockTime}</div>
        </div>
      </div>
    </TooltipProvider>
  );
};
