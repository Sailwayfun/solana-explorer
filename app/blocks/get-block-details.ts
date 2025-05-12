/**
 * getBlockDetails fetches Solana block details for a given blockId.
 * Currently returns mock data. Replace with real Solana RPC integration.
 * @param blockId - The slot number of the block
 * @returns BlockDetails
 */
import type { BlockDetails } from '@/types/block';

/**
 * getBlockDetails fetches Solana block details for a given blockId.
 * Currently returns mock data. Replace with real Solana RPC integration.
 * @param blockId - The slot number of the block
 * @returns BlockDetails
 */

export async function getBlockDetails(slot: number): Promise<BlockDetails> {
  return {
    slot,
    blockhash: `MockBlockHash${slot}`,
    parentSlot: slot - 1,
    timestamp: new Date().toISOString(),
    leader: 'MockValidator',
    txCount: 42,
    rewards: ['0.0123'],
    blockTime: Math.floor(Date.now() / 1000),
    blockHeight: 100000 + slot,
    transactions: [`tx_${slot}_1`, `tx_${slot}_2`],
  };
}

