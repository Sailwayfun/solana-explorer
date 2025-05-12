/**
 * BlockDetailsCard displays Solana block details with tooltips and navigation.
 * Uses Shadcn UI and Tailwind CSS.
 * @module BlockDetailsCard
 */
'use client';
import React from 'react';
import { Button } from '@/components/ui/button'; // Requires Shadcn Button
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'; // Requires Shadcn Tooltip
import Link from 'next/link';
import type { BlockDetails } from '@/types/block';

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
const FIELD_TOOLTIPS: Record<keyof BlockDetails, string> = {
  slot: 'The slot number of this block.',
  blockhash: 'Unique hash for this block.',
  parentSlot: 'Slot number of the parent block.',
  timestamp: 'Time the block was confirmed.',
  leader: 'Validator that produced this block.',
  txCount: 'Number of transactions in this block.',
  rewards: 'Rewards distributed in this block.',
  blockTime: 'Unix timestamp of the block.',
  blockHeight: 'Block height in the chain.',
  transactions: 'List of transaction IDs in this block.'
} as const;

/**
 * BlockDetailsCard component
 * @param props - BlockDetailsCardProps
 * @returns JSX.Element
 */
export const BlockDetailsCard: React.FC<BlockDetailsCardProps> = ({ blockDetails, prevBlockId, nextBlockId }) => {
  return (
    <TooltipProvider>
      <div className="bg-white dark:bg-zinc-900 rounded-xl shadow p-6 w-full max-w-2xl mx-auto">
        <div className="flex justify-between mb-4">
          <Link href={prevBlockId !== undefined ? `/blocks/${prevBlockId}` : '#'}>
            <Button variant="outline" disabled={prevBlockId === undefined}>
              Prev Block
            </Button>
          </Link>
          <Link href={nextBlockId !== undefined ? `/blocks/${nextBlockId}` : '#'}>
            <Button variant="outline" disabled={nextBlockId === undefined}>
              Next Block
            </Button>
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {(Object.keys(FIELD_TOOLTIPS) as (keyof BlockDetails)[]).map((key) => (
            <div key={key} className="flex items-center gap-2">
              <Tooltip>
                <TooltipTrigger asChild>
                  <span className="font-semibold capitalize">{key}</span>
                </TooltipTrigger>
                <TooltipContent>{FIELD_TOOLTIPS[key]}</TooltipContent>
              </Tooltip>
              <span className="truncate">{Array.isArray(blockDetails[key]) ? (blockDetails[key] as readonly string[]).join(', ') : String(blockDetails[key])}</span>
            </div>
          ))}
        </div>
      </div>
    </TooltipProvider>
  );
};
