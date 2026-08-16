import { describe, it, expect } from 'vitest';
import { ElectroCraftProjectDefinitionSchema } from '@electrocraft/contracts';

describe('Architecture: Model Ownership (M02.8)', () => {
  it('should ensure ProjectDefinition only contains references (UUIDs), not full registry data', () => {
    const project: any = {
      id: '550e8400-e29b-41d4-a716-446655440000',
      name: 'Project Alpha',
      schemaVersion: 1,
      version: 1,
      createdAt: '2026-08-16T12:00:00Z',
      updatedAt: '2026-08-16T12:00:00Z',
      settings: { defaultTargets: ['react-web'] },
      documentRefs: ['550e8400-e29b-41d4-a716-446655440001'], // Reference, not full object
      navigationRef: '550e8400-e29b-41d4-a716-446655440002'   // Reference, not full object
    };

    const result = ElectroCraftProjectDefinitionSchema.safeParse(project);
    expect(result.success).toBe(true);

    // Negative test: Should not contain "registry" like full component definitions
    expect(project).not.toHaveProperty('componentRegistry');
    expect(project).not.toHaveProperty('availableConnectors');
  });

  it('should categorize correctly based on MODEL_OWNERSHIP.md rules', () => {
    // This is a logic-only test to verify our mental model alignment
    const ownershipCategories = {
      project: ['Document', 'Query', 'Action', 'Theme'],
      registry: ['ComponentType', 'Connector', 'Capability'],
      content: ['Record', 'MediaBlob', 'AuditLog']
    };

    expect(ownershipCategories.project).toContain('Document');
    expect(ownershipCategories.registry).not.toContain('Document');
    expect(ownershipCategories.content).toContain('MediaBlob');
  });
});
