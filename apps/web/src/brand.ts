/**
 * Fork-level product identity and capability switches for AIWP Design.
 *
 * This fork of the upstream project ships under SMB Team's "AI Workforce Pro
 * Design" brand and deliberately drops the upstream hosted-account model: there
 * is no cloud sign-in, no wallet, and no managed model router. Every install is
 * bring-your-own-key against Anthropic.
 *
 * Upstream account plumbing is gated behind `CLOUD_ACCOUNTS_ENABLED` rather
 * than deleted, so rebases against upstream stay mechanical. Read the flag at
 * the boundary where a surface is rendered or a route is decided; do not fork
 * business logic on it deeper in the tree.
 */

/** Full product name, for titles, first-run copy, and legal/about surfaces. */
export const PRODUCT_NAME = 'AI Workforce Pro Design';

/** Short product name, for chrome where the full name does not fit. */
export const PRODUCT_SHORT_NAME = 'AIWP Design';

/** Organization that publishes this build. */
export const PRODUCT_VENDOR = 'SMB Team';

/**
 * Whether hosted account features (sign-in, wallet, plan badges, the managed
 * model router) are part of this build. Always false in the AIWP fork.
 */
export const CLOUD_ACCOUNTS_ENABLED = false;

/**
 * The single model provider this fork configures out of the box. Users supply
 * their own Anthropic API key; no other provider is offered during first run.
 */
export const BYOK_DEFAULT_PROVIDER = 'anthropic' as const;

/**
 * Whether Settings offers the full upstream execution picker — the local-CLI
 * vs API mode switch and the multi-provider chip row.
 *
 * False in this fork: every install is BYOK against Anthropic, so Settings
 * shows one API key field and nothing to choose between. The section still
 * owns the key, so it stays reachable; only the choosing UI is suppressed.
 */
export const MULTI_PROVIDER_SETTINGS_ENABLED = false;

/**
 * Whether the app advertises itself as an MCP server to other coding agents.
 * The fork ships a single-purpose desktop product, not an MCP endpoint.
 */
export const MCP_SERVER_SECTION_ENABLED = false;

/**
 * Whether the app surfaces links back to the upstream open-source project —
 * the GitHub star chip, issue/PR shortcuts, and social follow prompts.
 *
 * False in this fork: it is distributed internally, and pointing users at the
 * upstream repository for help would route them to maintainers who cannot
 * support this build.
 */
export const COMMUNITY_LINKS_ENABLED = false;
