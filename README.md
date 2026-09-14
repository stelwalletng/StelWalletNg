# StelWalletNG

> **A simple, secure, non-custodial Stellar wallet built for everyday users.**

StelWalletNG is a mobile-first wallet focused on making it easier for users to create, import, manage, and use Stellar accounts without giving up control of their private keys or funds.

The wallet connects directly to the **Stellar Testnet**, allowing users to securely manage assets, send and receive payments, sign transactions locally, and track transaction activity — without StelWalletNG ever taking custody of user funds.

---

## Project Overview

StelWalletNG is built around two core objectives:

1. **Non-Custodial Stellar Wallet Core**
2. **Simplified Send, Receive & Transaction Experience**

The goal is to abstract the complexity of Stellar's transaction infrastructure behind a clean and intuitive wallet experience while maintaining the security principles of self-custody.

---

## Core Features

### 1. Non-Custodial Stellar Wallet Core

StelWalletNG allows users to create and manage their own Stellar wallets without relying on a centralized custodian.

Users can:

* Create a new Stellar wallet
* Import an existing Stellar wallet
* Securely manage wallet keys locally
* View their Stellar account
* View asset balances
* Connect directly to Stellar Testnet
* Sign transactions locally
* Maintain complete ownership of their funds

### Non-Custodial Architecture

Private keys should remain under the user's control at all times.

```text
                 ┌─────────────────────┐
                 │      StelWalletNG   │
                 │     │
                 └──────────┬──────────┘
                            │
              ┌─────────────┴─────────────┐
              │                           │
       Local Key Storage            Stellar Network
              │                           │
       ┌──────▼──────┐             ┌──────▼──────┐
       │ Private Key │             │   Testnet   │
       │   / Seed    │             │             │
       └─────────────┘             └─────────────┘
              │                           │
              │ Local Signing             │
              └─────────────┬─────────────┘
                            │
                     Signed Transaction
                            │
                            ▼
                    Stellar Testnet
```

**StelWalletNG does not:**

* Store user private keys on a server
* Take custody of user assets
* Sign transactions on behalf of users
* Control user accounts
* Hold user funds



# Security Principles

Security is a core requirement of StelWalletNG.

### Private Key Security

Private keys should:

* Remain locally controlled
* Never be logged
* Never be sent to an API
* Never be stored in plaintext where secure storage is available
* Only be accessed when required for signing

### Transaction Signing

Transactions should be built and signed locally.




# Project Objectives

The project aims to establish StelWalletNG as a genuinely non-custodial Stellar wallet where users maintain complete ownership and control of their assets.

## Objective 1 — Self-Custody

Give users the ability to create or import Stellar wallets while maintaining local control over their private keys.

## Objective 2 — Simple Payments

Make sending and receiving Stellar assets understandable to everyday users.

## Objective 3 — Transparent Transactions

Give users visibility into transaction status, hashes, and blockchain explorer references.

## Objective 4 — Stellar-Native

Interact directly with Stellar Testnet rather than abstracting away the underlying network.

---


# Development Disclaimer

Do not use production private keys or real funds during development.

Wallet security should be independently reviewed and tested before the application is deployed to mainnet.

---

