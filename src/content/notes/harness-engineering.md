---
title: "Harness Engineering"
description: "Notes on OpenAI's harness engineering and Amp's agent environments: paved paths, agent legibility, and garbage collection for coding agents."
date: 2026-07-02
category: Dev
subcategory: AI
tags: [agents, engineering-process, codex]
---

> Working notes from [OpenAI — Harness Engineering](https://openai.com/index/harness-engineering/) and [Amp — Putting an agent in an orb](https://ampcode.com/notes/putting-an-agent-in-an-orb).

## Setup

The initial scaffold to setup: repository structure, CI configuration, formatting rules, package manager setup, application framework, etc.

Role of engineers: systems, scaffolding, and leverage.

Early progress should be slow because the environment was underspecified. The agent lacked the tools, abstractions, and internal structure required to make progress toward high-level goals

=> The primary job of the engineering team became enabling the agents to do useful work.

=> working depth-first: breaking down larger goals into smaller building blocks (design, code, review, test, etc), prompting the agent to construct those blocks, and using them to unlock more complex tasks.

When something failed, **the fix was almost never "try harder."** Because the only way to make progress was to get Codex to do the work, human engineers always stepped into the task and asked: **"what capability is missing, and how do we make it both legible and enforceable for the agent?"**
=> Assumption: The agent is powerful enough that given enough context, it can solve almost all problems perfectly

Ralph loop: Agent auto code, review, request additional specific agent reviews, respond to any human or agent given feedback, and iterate in a loop until all agent reviewers are satisfied

Codex uses our standard development tools directly (gh, local scripts, and repository-embedded skills) to **gather context without humans copying and pasting into the CLI**.

## Eliminate workflow guessing with paved paths

An agent-ready repository does not merely document how a human usually works. It provides executable, discoverable paths that place the development environment into a known-good state.

The design goal is:

> For every step required to build, run, inspect, authenticate, test, and validate the application, the agent should have one obvious entry point and a machine-readable way to determine whether it succeeded.

Amp describes this as making the agent rarely need to guess. Its remote environment combines repository automation with documentation:

- `.agents/setup` provisions a fresh environment: starts dependencies, creates and seeds the database, installs the repository-pinned toolchain, installs packages from the lockfile, and adds any required utilities.

- `.agents/resume` restores runtime state whenever an ephemeral environment wakes up.

- A repository skill exposes one `ensure-dev-server` operation. It reuses a healthy server, restarts a wedged server, or starts a missing server.

- The running application writes resolved ports and service locations to a JSON file. Scripts consume this metadata rather than assuming hard-coded ports.

- Development-only endpoints provide login, logout, privileged-session setup, and a JSON preflight report.

- Browser console output and service logs are routed to a documented repository-local location.

- The root `AGENTS.md` maps the overall workflow, while directory-level files explain local commands, constraints, traps, and verification procedures.

The deterministic workspace contract surrounding the agent:

```text
Provision → Reach a known-good state → Discover runtime metadata
    → Exercise the application → Observe evidence → Diagnose → Retry
```

## Route logs and UI to agent for automatic feedback iteration

Bottleneck: human QA capacity => add more capabilities to the agent by making things like the application UI, logs, and app metrics themselves directly legible to Codex.

For example, we made the app bootable per git worktree, so Codex could launch and drive one instance per change. We also wired the Chrome DevTools Protocol into the agent runtime and created skills for working with DOM snapshots, screenshots, and navigation. **This enabled Codex to reproduce bugs, validate fixes, and reason about UI behavior directly**.

We did the same for observability tooling. Logs, metrics, and traces are exposed to Codex via a local observability stack that's ephemeral for any given worktree. Codex works on a fully isolated version of that app—including its logs and metrics, which get torn down once that task is complete. Agents can query logs with LogQL and metrics with PromQL. With this context available, prompts like "ensure service startup completes in under 800ms" or "no span in these four critical user journeys exceeds two seconds" become tractable.

## Context: repository knowledge as the system of record

Putting everything into one big `AGENTS.md` fails critically => Treat it as a table of content

The repository's knowledge base lives in a structured `docs/` directory treated as the system of record. A short `AGENTS.md` (roughly 100 lines) is injected into context and serves primarily as a map, with pointers to deeper sources of truth elsewhere.

```text
AGENTS.md
ARCHITECTURE.md
docs/
├── design-docs/
│   ├── index.md
│   ├── core-beliefs.md
│   └── ...
├── exec-plans/
│   ├── active/
│   ├── completed/
│   └── tech-debt-tracker.md
├── generated/
│   └── db-schema.md
├── product-specs/
│   ├── index.md
│   ├── new-user-onboarding.md
│   └── ...
├── references/
│   ├── design-system-reference-llms.txt
│   ├── nixpacks-llms.txt
│   ├── uv-llms.txt
│   └── ...
├── DESIGN.md
├── FRONTEND.md
├── PLANS.md
├── PRODUCT_SENSE.md
├── QUALITY_SCORE.md
├── RELIABILITY.md
└── SECURITY.md
```

Plans are treated as first-class artifacts. Ephemeral lightweight plans are used for small changes, while complex work is captured in [execution plans](https://cookbook.openai.com/articles/codex_exec_plans) with progress and decision logs that are checked into the repository. **Active plans, completed plans, and known technical debt are all versioned and co-located**, allowing agents to operate without relying on external context.

Dedicated linters and CI jobs validate that the knowledge base is up to date, cross-linked, and structured correctly.
A recurring "doc-gardening" agent scans for stale or obsolete documentation that does not reflect the real code behavior and opens fix-up pull requests.

## Agent legibility is the goal

Not only UI and logs, give agents also context from other platforms like docs, slack, etc. => human engineers' goal was making it possible for an agent to **reason about the full business domain directly from the repository itself.**

=> Convert those context info into repository-local, versioned artifacts (e.g., code, markdown, schemas, executable plans)

## Enforcing architecture and taste

Agents are most effective in environments with strict boundaries and predictable structure

Each business domain is divided into a fixed set of layers, with strictly validated dependency directions and a limited set of permissible edges.
These constraints are enforced mechanically via custom linters (Codex-generated) and structural tests.

For example, we statically enforce structured logging, naming conventions for schemas and types, file size limits, and platform-specific reliability requirements with custom lints.

Because the lints are custom, we write the error messages to inject remediation instructions into agent context.

At the same time, we're explicit about where constraints matter and where they do not. This resembles leading a large engineering platform organization:

- enforce boundaries centrally, allow autonomy locally. You care deeply about boundaries, correctness, and reproducibility.
- Within those boundaries, you allow teams—or agents—significant freedom in how solutions are expressed.

Human taste is fed back into the system continuously. Review comments, refactoring pull requests, and user-facing bugs are captured as documentation updates or encoded directly into tooling. When documentation falls short, we promote the rule into code

## Garbage collection

Codex replicates patterns that already exist in the repository—even uneven or suboptimal ones. Over time, this inevitably leads to drift.

Initially, humans addressed this manually. Our team used to spend every Friday (20% of the week) cleaning up "AI slop." Unsurprisingly, that didn't scale.

Instead, we started encoding what we call "golden principles" directly into the repository and built a recurring cleanup process. These principles are opinionated, mechanical rules that keep the codebase legible and consistent for future agent runs.
For example:

- (1) we prefer shared utility packages over hand-rolled helpers to keep invariants centralized,
- (2) we don't probe data "YOLO-style"—we validate boundaries or rely on typed SDKs so the agent can't accidentally build on guessed shapes.

On a regular cadence, we have a set of background Codex tasks that scan for deviations, update quality grades, and open targeted refactoring pull requests.
Most of these can be reviewed in under a minute and automerged.
