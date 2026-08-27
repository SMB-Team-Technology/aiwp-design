import { join } from "node:path";

import { describe, expect, it } from "vitest";

import type { ToolPackConfig } from "@/config/index.js";
import { resolveMacInstallIdentity } from "@/mac/identity.js";
import { resolveMacPaths } from "@/mac/paths.js";

function makeConfig(root: string, namespace: string): ToolPackConfig {
  return {
    containerized: false,
    electronBuilderCliPath: "/x/electron-builder/cli.js",
    electronDistPath: "/x/electron/dist",
    electronVersion: "41.3.0",
    macCompression: "normal",
    namespace,
    platform: "mac",
    portable: true,
    removeData: false,
    removeLogs: false,
    removeProductUserData: false,
    removeSidecars: false,
    requireVelaCli: false,
    roots: {
      output: {
        appBuilderRoot: join(root, ".tmp", "tools-pack", "out", "mac", "namespaces", namespace, "builder"),
        namespaceRoot: join(root, ".tmp", "tools-pack", "out", "mac", "namespaces", namespace),
        platformRoot: join(root, ".tmp", "tools-pack", "out", "mac"),
        root: join(root, ".tmp", "tools-pack", "out"),
      },
      runtime: {
        namespaceBaseRoot: join(root, ".tmp", "tools-pack", "runtime", "mac", "namespaces"),
        namespaceRoot: join(root, ".tmp", "tools-pack", "runtime", "mac", "namespaces", namespace),
      },
      cacheRoot: join(root, ".tmp", "tools-pack", "cache"),
      toolPackRoot: join(root, ".tmp", "tools-pack"),
    },
    signed: false,
    silent: true,
    to: "dmg",
    webOutputMode: "standalone",
    workspaceRoot: root,
  };
}

describe("resolveMacInstallIdentity", () => {
  it("keeps stable builds on the canonical mac identity", () => {
    expect(resolveMacInstallIdentity(makeConfig("/work", "release-stable"))).toMatchObject({
      appId: "io.open-design.desktop",
      installerTitle: "AIWP Design",
      productName: "AIWP Design",
      publicAppBundleName: "AIWP Design.app",
      systemAppBundleName: "AIWP Design.app",
    });
  });

  it("uses first-class beta app identity for beta release namespaces", () => {
    const config = makeConfig("/work", "release-beta");

    expect(resolveMacInstallIdentity(config)).toEqual({
      appId: "io.open-design.desktop.beta",
      executableName: "AIWP Design Beta",
      installerTitle: "AIWP Design Beta",
      productName: "AIWP Design Beta",
      publicAppBundleName: "AIWP Design Beta.app",
      systemAppBundleName: "AIWP Design Beta.app",
    });
    expect(resolveMacPaths(config).appPath).toMatch(/AIWP Design Beta\.app$/);
  });

  it("uses first-class preview app identity for preview release namespaces", () => {
    const config = makeConfig("/work", "release-preview");

    expect(resolveMacInstallIdentity(config)).toEqual({
      appId: "io.open-design.desktop.preview",
      executableName: "AIWP Design Preview",
      installerTitle: "AIWP Design Preview",
      productName: "AIWP Design Preview",
      publicAppBundleName: "AIWP Design Preview.app",
      systemAppBundleName: "AIWP Design Preview.app",
    });
    expect(resolveMacPaths(config).appPath).toMatch(/AIWP Design Preview\.app$/);
  });

  it("uses first-class prerelease app identity for prerelease release versions and namespaces", () => {
    const prereleaseVersionConfig = {
      ...makeConfig("/work", "release-stable"),
      appVersion: "0.8.0-prerelease.2",
    };
    const prereleaseNamespaceConfig = makeConfig("/work", "release-prerelease");

    expect(resolveMacInstallIdentity(prereleaseVersionConfig)).toEqual({
      appId: "io.open-design.desktop.prerelease",
      executableName: "AIWP Design Prerelease",
      installerTitle: "AIWP Design Prerelease",
      productName: "AIWP Design Prerelease",
      publicAppBundleName: "AIWP Design Prerelease.app",
      systemAppBundleName: "AIWP Design Prerelease.app",
    });
    expect(resolveMacPaths(prereleaseVersionConfig).appPath).toMatch(/AIWP Design Prerelease\.app$/);
    expect(resolveMacInstallIdentity(prereleaseNamespaceConfig)).toMatchObject({
      productName: "AIWP Design Prerelease",
      publicAppBundleName: "AIWP Design Prerelease.app",
    });
  });
});
