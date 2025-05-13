# Data Integration Plan: Solana Block Overview RPC

This document outlines the plan for integrating Solana RPC endpoints to fetch block overview information for the explorer project.

## 1. Providers for Solana RPC

### a. Official Solana Public RPC Endpoints
- **Provider:** Solana Foundation
- **Example Endpoints:**
  - https://api.mainnet-beta.solana.com
  - https://api.devnet.solana.com
- **Authentication:** None required for public endpoints (rate limits apply)
- **RPC Methods:**
  - `getBlock` (preferred for block overview)
  - `getBlocks` (for listing block slots)
  - `getBlockTime` (for block timestamp)
- **How to Call:**
  - Send a POST request to the endpoint with a JSON body:
    ```json
    {
      "jsonrpc": "2.0",
      "id": 1,
      "method": "getBlock",
      "params": [<blockNumber>, {"maxSupportedTransactionVersion": 0}]
    }
    ```
  - Parse the response for block overview data (block number, timestamp, tx count, leader, status, etc.)

### b. Private/Third-Party RPC Providers
- **Provider:** Examples include QuickNode, Alchemy, Chainstack, Triton, etc.
- **Example Endpoints:**
  - https://solana-mainnet.quiknode.pro/<API_KEY>/
  - https://solana-mainnet.g.alchemy.com/v2/<API_KEY>
- **Authentication:** API key required (passed in the URL or headers)
- **RPC Methods:**
  - Same as above: `getBlock`, `getBlocks`, `getBlockTime`
- **How to Call:**
  - Send a POST request as above, but include authentication as required by provider (usually via endpoint URL or HTTP header)

### c. Local Solana Node
- **Provider:** Self-hosted solana-validator or solana-test-validator
- **Example Endpoint:**
  - http://localhost:8899
- **Authentication:** None (local access)
- **RPC Methods:**
  - Same as above: `getBlock`, `getBlocks`, `getBlockTime`
- **How to Call:**
  - Send a POST request as above to the local endpoint

## 2. General RPC Call Pattern
- Use HTTP POST to the provider endpoint
- Set `Content-Type: application/json`
- Use the `getBlock` method for block overview
- Pass block number (slot) as parameter
- Parse response for required overview fields

## 3. Notes
- Rate limits and quotas may apply for public and third-party providers
- Some providers may have different supported transaction versions; always check provider docs
- For best reliability, support multiple providers with fallback logic

---
This plan will guide the implementation of the real Solana RPC integration for block overview information.


## Appendix: Solana RPC `getBlock` Method

### Overview
The `getBlock` RPC method retrieves information about a confirmed block in the Solana blockchain, given a slot number. It is a core method for explorers and analytics tools to fetch block-level data.

### JSON-RPC Request Example

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "getBlock",
  "params": [
    123456789,
    {
      "encoding": "json", // or "jsonParsed", "base64"
      "transactionDetails": "full", // or "signatures", "none"
      "rewards": true,
      "maxSupportedTransactionVersion": 0
    }
  ]
}
```

### Parameters
- **slot** (`number`): The slot number of the block to fetch.
- **config** (`object`, optional):
  - `encoding`: `"json"`, `"jsonParsed"`, or `"base64"`.
  - `transactionDetails`: `"full"`, `"signatures"`, or `"none"`.
  - `rewards`: `boolean` (include block rewards).
  - `maxSupportedTransactionVersion`: `number` (for versioned transactions).

### Response Example

```json
{
  "jsonrpc": "2.0",
  "result": {
    "blockhash": "...",
    "previousBlockhash": "...",
    "parentSlot": 123456788,
    "transactions": [...],
    "rewards": [...],
    "blockTime": 1670000000,
    "blockHeight": 1000000
  },
  "id": 1
}
```

### Notes
- The slot must reference a confirmed or finalized block; otherwise, the result may be `null`.
- The method is available on all Solana RPC nodes.
- For detailed documentation, see: [Solana JSON RPC API Reference – getBlock](https://solana-labs.github.io/solana-web3.js/modules.html#getblock)
