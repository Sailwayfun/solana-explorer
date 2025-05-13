import { z } from "zod"

/**
 * Block overview info returned by Solana getBlock RPC.
 */
export const blockOverviewSchema = z.object({
  blockHeight: z.number().nullable(),
  blockTime: z.number().nullable(),
  blockhash: z.string(),
  parentSlot: z.number(),
  previousBlockhash: z.string(),
  transactions: z.array(z.unknown()), // Could be refined
  rewards: z.array(z.unknown()), // Could be refined
  blockLeader: z.string(),
  // Add more fields as needed
})

export type BlockOverview = z.infer<typeof blockOverviewSchema>

/**
 * Fetches a Solana block by slot using the official getBlock RPC.
 * @param slot - The slot number of the block
 * @param endpoint - RPC endpoint (defaults to mainnet-beta)
 * @returns { block, error }
 * @param params.slot The slot number to query.
 * @param params.endpoint Optional Solana RPC endpoint. Defaults to mainnet-beta public endpoint.
 * @returns Block overview or error.
 */
/**
 * Fetches a Solana block by slot using the official getBlock RPC.
 * @param slot - The slot number of the block
 * @param endpoint - RPC endpoint (defaults to mainnet-beta)
 * @returns { block, error }
 */
export async function getBlockBySlot({ slot, endpoint }: { slot: number; endpoint?: string }): Promise<{ block: Record<string, unknown> | null; error?: string }> {
  const rpcEndpoint = endpoint || "https://api.mainnet-beta.solana.com"
  const body = {
    jsonrpc: "2.0",
    id: 1,
    method: "getBlock",
    params: [slot, { encoding: "json", transactionDetails: "full", rewards: true, maxSupportedTransactionVersion: 0 }],
  }
  try {
    const res = await fetch(rpcEndpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    })
    if (!res.ok) {
      return { block: null, error: `HTTP ${res.status}` }
    }
    const json = await res.json()
    if (json.error) {
      return { block: null, error: json.error.message || json.error }
    }
    if (!json.result) {
      return { block: null, error: "Block not found" }
    }
    // Optionally validate/transform json.result here
    return { block: json.result }
  } catch (e) {
    return { block: null, error: (e as Error).message }
  }
}


// Only one export per file per user rules
export default getBlockBySlot
