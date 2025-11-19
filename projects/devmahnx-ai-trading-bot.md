---
layout: post
title: "DevMahnX — AI Trading Bot"
date: 2025-02-22
categories: [Projects, AI, Trading]
---

# 🤖 DevMahnX — AI Trading Bot (Case Study)

## Summary

An experimental trading agent that blends liquidity-aware signals with lightweight forecasting models and automated execution pipelines.

## Problem

Retail algorithmic trading is often brittle and overfit. I wanted a reproducible, modular bot that could be tested offline and deployed with safe guards.

## Solution

DevMahnX uses feature-streaming from market data, a small ensemble predictor, and a disciplined execution layer (simulated and live modes). The stack includes FastAPI for the control plane and task runners for scheduled strategies.

## Architecture

Client ↔ Control API (FastAPI) ↔ Strategy Runner ↔ Execution Adapter (sim/sandbox/live)

## Features

- Offline backtesting harness
- Live/sim execution modes
- Risk controls and circuit breakers

## Tech Stack

Python, FastAPI, Pandas, scikit-learn (small models), Docker

## Notes & Links

- Prototype available in the repo (link placeholder)
- Consider this a conceptual write-up — not financial advice.
