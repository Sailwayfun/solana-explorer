/**
 * BlockDetailsPage displays detailed information about a specific Solana block.
 * This is a scaffold UI with mock data. Integrate real data later.
 */
import { Metadata } from "next";
import { BlockDetailsCard } from "./BlockDetailsCard";
import type { BlockDetails } from "@/types/block";
import type { SolanaRpcBlock } from "@/types/solana-rpc-block";

import React, { JSX } from "react";

/**
 * Props for BlockDetailsPage
 */
/**
 * Route params for BlockDetailsPage, validated with Zod
 */
import { z } from "zod";

const ParamsSchema = z.object({
  blockId: z.string().regex(/^\d+$/, "blockId must be a slot number"),
});

export type BlockDetailsPageProps = { params: z.infer<typeof ParamsSchema> };

/**
 * Generate metadata for SEO
 */
export async function generateMetadata({
  params,
}: BlockDetailsPageProps): Promise<Metadata> {
  const awaitedParams = await params;
  return {
    title: `Block ${awaitedParams.blockId} | Solana Explorer`,
    description: `Details for Solana block ${awaitedParams.blockId}`,
  };
}

/**
 * BlockDetailsPage - Server component
 * @param params - Route params containing blockId
 */
import { notFound } from "next/navigation";

const BlockDetailsPage = async ({
  params,
}: BlockDetailsPageProps): Promise<JSX.Element> => {
  console.log("blockdetailspage", params);
  const awaitedParams = await params;
  const parseResult = ParamsSchema.safeParse(awaitedParams);
  if (!parseResult.success) {
    notFound();
  }
  const slot = Number(awaitedParams.blockId);
  if (!Number.isFinite(slot)) {
    notFound();
  }
  // Fetch real block data directly from the library (avoid server deadlock)
  const { block, error } = await (await import("@/lib/getBlockBySlot")).default({ slot: slot });
  if (error || !block) {
    notFound();
  }

  // Map Solana RPC result to strict BlockDetails type
  const mapRpcToBlockDetails = (rpc: SolanaRpcBlock, slot: number): BlockDetails => ({
    slot,
    blockhash: rpc.blockhash,
    parentSlot: rpc.parentSlot,
    timestamp: rpc.blockTime ? new Date(rpc.blockTime * 1000).toISOString() : '',
    leader: rpc.blockLeader || '',
    txCount: rpc.transactions?.length ?? 0,
    rewards: rpc.rewards ? JSON.stringify(rpc.rewards) : '',
    blockTime: rpc.blockTime ?? 0,
    blockHeight: rpc.blockHeight ?? 0,
    transactions: rpc.transactions
      ? (rpc.transactions.map((tx: SolanaRpcBlock["transactions"][number]) =>
          tx.transaction.signatures?.[0] || ""
        ) as ReadonlyArray<string>)
      : [],
  });
  const blockDetails = mapRpcToBlockDetails(block as SolanaRpcBlock, slot);

  /**
   * Calculate prev/next block IDs
   */
  const prevBlockId = slot > 0 ? slot - 1 : undefined;
  const nextBlockId = slot + 1; // TODO: Optionally check for max block

  return (
    <main className="mx-auto py-6">
      <BlockDetailsCard
        blockDetails={blockDetails}
        prevBlockId={prevBlockId}
        nextBlockId={nextBlockId}
      />
    </main>
  );
};

export default BlockDetailsPage;
