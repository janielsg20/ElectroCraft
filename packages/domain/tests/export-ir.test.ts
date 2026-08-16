import { describe, it, expect } from 'vitest';
import { ElectroCraftExportIRSchema } from '@electrocraft/contracts';

describe('Export Intermediate Representation (M02.7)', () => {
  it('should validate a complete and sanitized ExportIR', () => {
    const ir: any = {
      projectId: '550e8400-e29b-41d4-a716-446655440000',
      timestamp: new Date().toISOString(),
      project: {
        id: '550e8400-e29b-41d4-a716-446655440000',
        name: 'My App',
        schemaVersion: 1,
        version: 1,
        createdAt: '2026-08-16T12:00:00Z',
        updatedAt: '2026-08-16T12:00:00Z',
        settings: { defaultTargets: ['react-web'] }
      },
      documents: [],
      dataSources: [
        {
          id: 'ds1',
          kind: 'rest-api',
          name: 'Public API',
          adapterId: 'http-connector',
          settings: { baseUrl: 'https://api.example.com' },
          schemaVersion: 1
        }
      ],
      queries: [],
      actions: [],
      navigation: {
        id: 'nav1',
        routes: [],
        schemaVersion: 1
      },
      requiredCapabilities: ['http-client'],
      mediaManifest: {},
      schemaVersion: 1
    };

    const result = ElectroCraftExportIRSchema.safeParse(ir);
    expect(result.success).toBe(true);
  });

  it('should fail if critical project data is missing from IR', () => {
    const partialIr = { projectId: 'id' };
    const result = ElectroCraftExportIRSchema.safeParse(partialIr);
    expect(result.success).toBe(false);
  });
});
