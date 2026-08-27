<h1 align="center">AI Workforce Pro Design</h1>

<p align="center">
  <img src="apps/web/public/aiwp-lockup.svg" alt="AI Workforce Pro Design" width="480" />
</p>

<p align="center"><strong>An SMB Team product.</strong> Local-first design tooling: describe what you
want, and the agent builds prototypes, decks, design systems, images, and video —
streamed into a live preview you can keep editing.</p>

---

## What this is

AIWP Design ("AI Workforce Pro Design") is SMB Team's internal build of the
open-source [Open Design](https://github.com/nexu-io/open-design) project, which
is licensed under Apache-2.0. It differs from upstream in three ways that matter
to anyone running it:

- **No accounts, no sign-in.** The app opens straight to the workspace. There is
  no hosted account, no wallet, no plan tier, and no credits.
- **Bring your own key, Anthropic only.** Every install talks directly to the
  Anthropic API with a key the user supplies in
  *Settings → API key*. No provider picker, no local agent-CLI setup step.
- **SMB Team branding.** Product name, marks, and packaged app identity are ours.

Everything else — skills, design systems, design templates, the artifact
pipeline — is upstream behaviour.

## Getting started

Requires Node `~24` and `pnpm@10.33.2` (use Corepack so the pinned pnpm is
selected).

```bash
pnpm install
pnpm tools-dev
```

`pnpm tools-dev` is the only supported local lifecycle entry point; it starts the
daemon, the web runtime, and the desktop shell together with consistent ports,
namespaces, and log paths. See `QUICKSTART.md` for the longer walkthrough and
`AGENTS.md` for the repository map.

On first launch, open **Settings → API key** and paste an Anthropic API key.

## Packaged builds

```bash
pnpm tools-pack mac build --to all
pnpm tools-pack win build --to nsis
pnpm tools-pack linux build --to appimage
```

Packaged apps install as `AIWP Design` (with `AIWP Design Beta` /
`Prerelease` / `Preview` on the non-stable channels).

## Contributing

`CONTRIBUTING.md` covers PR scope, title format, and dependency policy;
`docs/code-review-guidelines.md` is the reviewer-facing complement. Read
`AGENTS.md` before touching anything under `apps/`, `packages/`, `tools/`, or
`e2e/`.

## License

Apache-2.0, inherited from the upstream project. See `LICENSE`.
