Automatic build of the latest `main`. Replaced on every push — download a file
to pin it rather than linking to this page.

| Platform | Download |
| --- | --- |
| macOS (Apple Silicon) | `AIWP-Design-macos-arm64.dmg` |
| Windows (x64) | `AIWP-Design-windows-x64.exe` |
| Linux (x86_64) | `AIWP-Design-linux-x86_64.AppImage` |

### These builds are unsigned

**macOS** quarantines them and reports the app as *"damaged and can't be
opened"*. It is not corrupt. After dragging it to Applications, run:

```
xattr -dr com.apple.quarantine "/Applications/AIWP Design.app"
```

**Windows** shows a SmartScreen warning: *More info → Run anyway*.

**Linux** needs the AppImage marked executable:

```
chmod +x AIWP-Design-linux-x86_64.AppImage
```

Signing and notarization need an Apple Developer ID and a Windows code-signing
certificate, neither of which is wired into this workflow yet.
