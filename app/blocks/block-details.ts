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
  /** Total rewards for this block (as a string for precision) */
  readonly rewards: string;
  /** Unix timestamp of block */
  readonly blockTime: number;
  /** Block height in the chain */
  readonly blockHeight: number;
};
