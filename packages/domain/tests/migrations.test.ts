import { describe, it, expect } from 'vitest';
import { ProjectSerializer } from '../../application/project-serializer';
import { MigrationRegistry } from '../../application/migration-registry';

describe('Project Serializer & Migrations (M02.6)', () => {
  it('should serialize deterministically', () => {
    const project: any = {
      id: '550e8400-e29b-41d4-a716-446655440000',
      name: 'Project A',
      schemaVersion: 1,
      version: 1,
      createdAt: '2026-08-16T12:00:00Z',
      updatedAt: '2026-08-16T12:00:00Z',
      settings: { language: 'es', defaultTargets: ['react-web'] },
      documentRefs: [],
      featureFlags: {}
    };

    const json1 = ProjectSerializer.serialize(project);

    // Create project with different key order
    const projectReordered: any = {
      name: 'Project A',
      id: '550e8400-e29b-41d4-a716-446655440000',
      version: 1,
      schemaVersion: 1,
      updatedAt: '2026-08-16T12:00:00Z',
      createdAt: '2026-08-16T12:00:00Z',
      settings: { defaultTargets: ['react-web'], language: 'es' },
      featureFlags: {},
      documentRefs: []
    };

    const json2 = ProjectSerializer.serialize(projectReordered);

    expect(json1).toBe(json2);
  });

  it('should apply migrations correctly', () => {
    const registry = new MigrationRegistry();
    registry.register({
      version: 2,
      up: (data) => ({ ...data, migrated: true })
    });

    const v1Payload = { name: 'Old Project', schemaVersion: 1 };
    const migrated = registry.migrate(v1Payload, 2);

    expect(migrated.schemaVersion).toBe(2);
    expect(migrated.migrated).toBe(true);
  });

  it('should fail on invalid project structure during deserialization', () => {
    const invalidJson = '{"name": "Invalid", "schemaVersion": 1}'; // Missing required id, createdAt, etc.
    expect(() => ProjectSerializer.deserialize(invalidJson)).toThrow();
  });
});
