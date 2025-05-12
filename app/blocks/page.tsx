import { BlocksOverviewClient } from "./blocks-overview-client";
import type { Block } from "./columns";

/**
 * BlocksOverviewPage displays a paginated table of recent Solana blocks, inspired by Solscan.
 * Data will be integrated later; currently uses placeholder/mock data.
 */

/**
 * Server component for the Solana Blocks Overview page.
 * Renders the client table with mock data.
 */
const mockBlocks: readonly Block[] = Array.from({ length: 100 }, (_, i) => ({
  blockHash: `MockBlockHash${i + 1}`,
  slot: 339227350 + i,
  time: `${10 + (i % 10)} secs ago`,
  leader: i % 2 === 0 ? "The Lotus Validator" : "Galaxy",
  txCount: 1500 + (i % 500),
  nonVoteTx: 300 + (i % 200),
  successRate: `${80 + (i % 20) + (i % 10) * 0.1}%`,
  reward: (0.01 + (i % 10) * 0.001).toFixed(5),
}));

export default function BlocksOverviewPage() {
  return (
    <div className="w-full flex flex-col gap-5">
      <BlocksOverviewClient blocks={mockBlocks} />
    </div>
  );
}
