/**
 * Block information for Solana Explorer.
 *
 * @property blockId - The unique identifier for the block.
 * @property timestamp - The timestamp of the block.
 * @property transactions - The list of transaction IDs in the block.
 */
/**
 * BlockDetails represents all fields shown on the block details page.
 * All properties are readonly and typed.
 */
export type BlockDetails = {
  /** The slot number of this block */
  readonly slot: number;
  /** Unique hash for this block */
  readonly blockhash: string;
  /** Slot number of the parent block */
  readonly parentSlot: number;
  /** Time the block was confirmed (ISO8601 string) */
  readonly timestamp: string;
  /** Validator that produced this block */
  readonly leader: string;
  /** Number of transactions in this block */
  readonly txCount: number;
  /** Rewards for this block (as string for precision) */
  readonly rewards: readonly string[];
  /** Unix timestamp of block */
  readonly blockTime: number;
  /** Block height in the chain */
  readonly blockHeight: number;
  /** List of transaction IDs in this block */
  readonly transactions: readonly string[];
};
