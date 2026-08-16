import { describe, it, expect } from 'vitest';
import {
  ElectroCraftProjectDefinitionSchema,
  ElectroCraftDocumentSchema
} from '../../contracts/v1';

describe('Canonical Models Validation', () => {
  it('should validate a correct project definition', () => {
    const validProject = {
      id: '550e8400-e29b-41d4-a716-446655440000',
      name: 'Test Project',
      settings: {
        defaultTargets: ['local-project', 'react-web'],
        language: 'es'
      },
      documentRefs: [],
      featureFlags: {},
      version: 1,
      schemaVersion: 1,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    const result = ElectroCraftProjectDefinitionSchema.safeParse(validProject);
    expect(result.success).toBe(true);
  });

  it('should fail on invalid project definition (missing ID)', () => {
    const invalidProject = {
      name: 'Test Project',
      schemaVersion: 1
    };

    const result = ElectroCraftProjectDefinitionSchema.safeParse(invalidProject);
    expect(result.success).toBe(false);
  });

  it('should validate a correct document definition', () => {
    const validDocument = {
      id: '550e8400-e29b-41d4-a716-446655440000',
      kind: 'screen',
      name: 'Home Screen',
      content: { nodes: [] },
      version: 1,
      schemaVersion: 1
    };

    const result = ElectroCraftDocumentSchema.safeParse(validDocument);
    expect(result.success).toBe(true);
  });

  it('should fail on invalid document kind', () => {
    const invalidDocument = {
      id: '550e8400-e29b-41d4-a716-446655440000',
      kind: 'invalid-kind',
      name: 'Home Screen',
      content: {},
      version: 1,
      schemaVersion: 1
    };

    const result = ElectroCraftDocumentSchema.safeParse(invalidDocument);
    expect(result.success).toBe(false);
  });
});
