# Solana Blockchain Explorer

A modern, user-friendly Solana blockchain explorer web application, inspired by [Solscan](https://solscan.io/) and [explorer.solana.com](https://explorer.solana.com/). This project aims to provide a clear, accessible, and comprehensive interface for exploring Solana blockchain data.

## Features

- **Blocks Overview Page** (`/blocks`):
  - Paginated list of recent blocks
  - Block number, timestamp, transaction count, leader/validator, status
  - Clickable rows to navigate to block details

- **Block Details Page** (`/block/[blockId]`):
  - Detailed view for a specific block
  - Block number, hash, parent block, timestamp
  - List of transactions, validator address, rewards, fees, and metadata
  - Navigation to related transactions and validator details

- **Transactions Overview Page** (`/txs`):
  - Paginated list of recent transactions
  - Signature/hash, block number, timestamp, status, fee
  - Clickable rows to view transaction details

- **Transaction Details Page** (`/tx/[txId]`):
  - Detailed transaction view
  - Signature, block, timestamp, status, fee
  - Accounts involved, instructions, logs, token transfers

## Technical Stack

- **Programming Language:** TypeScript
- **Framework:** Next.js (App Router)
- **Styling:** Tailwind CSS, Shadcn UI
- **Data Fetching:** TanStack Query (react-query)
- **Forms & Validation:** React Hook Form, Zod

## Setup & Usage

1. **Install dependencies:**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   # or
   bun install
   ```

2. **Run the development server:**
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   # or
   bun dev
   ```

3. Open [http://localhost:3000](http://localhost:3000) to view the app.

## Project Status

This project is under active development. See [project_plan.md](./project_plan.md) for the current roadmap and progress.

## References & Inspiration

- [explorer.solana.com](https://explorer.solana.com/)
- [solscan.io](https://solscan.io/)
- [SolanaFM](https://solana.fm/)

---

For questions or contributions, please open an issue or pull request.
