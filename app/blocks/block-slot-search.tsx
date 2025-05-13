"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { useState, JSX } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

const slotSchema = z.object({
  slot: z
    .string()
    .trim()
    .regex(/^\d+$/, { message: "Slot must be a number" })
    // Keep as string; convert to number at API/server boundary if needed
})

/**
 * Form type for BlockSlotSearch; slot is a string.
 */
type SlotForm = z.infer<typeof slotSchema>

/**
 * BlockSlotSearch provides a form to search for Solana blocks by slot number.
 * On success, navigates to the block details page.
 */
export function BlockSlotSearch(): JSX.Element {
  const [error, setError] = useState<string | null>(null)
  const { register, handleSubmit, formState } = useForm<SlotForm>({
    resolver: zodResolver(slotSchema),
    defaultValues: { slot: "" },
  })
const { errors, isSubmitting } = formState
  const router = useRouter()

  const onSubmit = async (data: SlotForm): Promise<void> => {
    setError(null)
    try {
      const res = await fetch("/api/get-block-by-slot", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ slot: data.slot }),
      })
      // Expects API response: { block, error }
      const json: { block: Record<string, unknown> | null; error?: string } = await res.json()
      if (json.error || !json.block) {
        setError(json.error ?? "Block not found")
        return
      }
      // Debug: log before navigation
      console.log("Navigating to", `/blocks/${data.slot}`)
      router.push(`/blocks/${data.slot}`)
    } catch (e) {
      setError((e as Error).message)
    }
  }

  return (
    <div className="max-w-md mx-auto space-y-6">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <Input
          type="text"
          placeholder="Enter slot number"
          {...register("slot")}
          disabled={isSubmitting}
        />
        {errors.slot && (
          <div className="text-red-500 text-sm">{errors.slot.message}</div>
        )}
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Searching..." : "Search Block"}
        </Button>
      </form>
      {error && (
        <div className="bg-gray-100 rounded p-4 mt-4">
          <div className="text-red-600">Error: {error}</div>
        </div>
      )}
    </div>
  )
}

export default BlockSlotSearch
