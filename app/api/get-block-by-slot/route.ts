import { NextRequest } from "next/server"
import getBlockBySlot from "@/lib/getBlockBySlot"

/**
 * API route to fetch Solana block overview by slot.
 * POST body: { slot: number, endpoint?: string }
 */
/**
 * API route to fetch Solana block overview by slot using real Solana RPC.
 * Accepts slot (string or number) and optional endpoint.
 */
export async function POST(req: NextRequest) {
  try {
    const { slot, endpoint } = await req.json()
    const slotNum = Number(slot)
    if (!Number.isFinite(slotNum) || slotNum < 0) {
      return new Response(JSON.stringify({ block: null, error: "Invalid slot" }), { status: 400 })
    }
    const result = await getBlockBySlot({ slot: slotNum, endpoint })
    return new Response(JSON.stringify(result), { status: 200 })
  } catch (e) {
    return new Response(JSON.stringify({ block: null, error: (e as Error).message }), { status: 500 })
  }
}
