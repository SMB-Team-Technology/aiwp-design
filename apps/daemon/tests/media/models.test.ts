import { describe, expect, it } from 'vitest';

import {
  IMAGE_MODELS,
  MEDIA_PROVIDERS,
  canonicalMediaModelId,
} from '../../src/media/models.js';

describe('image model defaults', () => {
  it('uses OpenRouter as the only default image route', () => {
    // Upstream defaulted to the managed Vela route. This fork has no hosted
    // account, so that model can never be authorized — a user who took the
    // default got a media error with no way to fix it. OpenRouter is the
    // bring-your-own-key route, so it owns the default here.
    expect(IMAGE_MODELS.filter((model) => model.default).map((model) => model.id)).toEqual([
      'openrouter/google/gemini-2.5-flash-image',
    ]);
    expect(MEDIA_PROVIDERS.some((provider) => provider.id === 'codex')).toBe(false);
    expect(IMAGE_MODELS.some((model) => model.provider === 'codex')).toBe(false);
  });

  it('migrates the removed Codex image model id to Vela', () => {
    expect(canonicalMediaModelId('codex-gpt-image-2')).toBe('vela/gpt-image-2');
  });
});
