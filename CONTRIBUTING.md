# Contributing to FogSea Survival

FogSea Survival is a text-based survival strategy game (Vue 3 + TypeScript monorepo) rebuilt around survival-fiction mechanics. This document covers the rules, tooling and workflow for contributing.

## Working rules for this repository

* Dependency updates: search the whole repository for every occurrence of a dependency (build files, lockfiles, CI workflows, docs) before bumping. A partial bump — declaration updated but lockfile or a pinned action left behind — is the most common cause of "works locally, CI fails". Keep lockfiles in the same commit as the declaration. Move version-coupled toolchain upgrades together in one commit.
* Refactoring: pull latest main first, work on a fresh branch, keep commits atomic with messages that state the why, and always run the full check suite before pushing (for this repo: `pnpm install && pnpm typecheck && pnpm test`). A branch left behind main cannot be merged under the repository's branch protection.
* Merge conflicts: resolve conflicts in the working tree against the latest main; never force-push shared branches; never resolve a conflict by blindly taking either side — re-read both sides and keep both changes when they are both valid.
* Versioning: releases follow X.Y.Z starting at 0.0.0. Last digit = fixes, middle digit = feature work, first digit stays 0 until a stable release is declared. Bump the version in code, CHANGELOG.md and the tag in the same change.

## Development environment

Requirements: Node.js >= 20 and pnpm >= 11.

```bash
pnpm install
pnpm dev:web   # run the web client locally
```

## Common commands

```bash
pnpm typecheck   # type check every workspace package
pnpm test        # run the test suite for every workspace package
pnpm validate    # validate the core game data
pnpm build       # build all packages
```

## How to submit changes

1. Check out the latest `main`, then create a feature branch.
2. Make focused changes with atomic commits whose messages describe the why.
3. Run `pnpm typecheck` and `pnpm test` locally until everything passes.
4. Push the branch and open a pull request against `main`.

## How to report problems

Open an issue for bugs and feature requests. Include the platform, the steps to reproduce, expected vs actual behavior and, where relevant, the involved game mechanics. For security issues, use the private advisory workflow described in [SECURITY.md](./SECURITY.md) instead of a public issue.