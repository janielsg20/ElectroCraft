import { describe, it, expect } from 'vitest';
import { EnginePayloadWrapperSchema } from '@electrocraft/contracts';

describe('Engine Payload Wrappers (M02.9)', () => {
  it('should validate a Puck payload wrapper', () => {
    const payload = {
      engine: 'puck',
      version: 1,
      value: {
        content: [
          { type: 'Button', props: { text: 'Click me' } }
        ],
        root: { props: { title: 'Home' } }
      }
    };

    const result = EnginePayloadWrapperSchema.safeParse(payload);
    expect(result.success).toBe(true);
  });

  it('should validate a Tiptap (ProseMirror) payload wrapper', () => {
    const payload = {
      engine: 'tiptap',
      version: 2,
      value: {
        type: 'doc',
        content: [
          { type: 'paragraph', content: [{ type: 'text', text: 'Hola mundo' }] }
        ]
      }
    };

    const result = EnginePayloadWrapperSchema.safeParse(payload);
    expect(result.success).toBe(true);
  });

  it('should fail on unsupported engine IDs', () => {
    const payload = {
      engine: 'unknown-engine',
      version: 1,
      value: {}
    };

    const result = EnginePayloadWrapperSchema.safeParse(payload);
    expect(result.success).toBe(false);
  });
});
