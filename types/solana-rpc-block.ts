/**
 * Type for the Solana RPC getBlock response (only required fields).
 */
export type SolanaRpcBlock = {
  blockhash: string;
  parentSlot: number;
  blockTime?: number;
  blockLeader?: string;
  blockHeight?: number;
  transactions: ReadonlyArray<{
    transaction: {
      signatures: ReadonlyArray<string>;
    };
  }>;
  rewards?: unknown[];
};
