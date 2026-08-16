import { describe, it, expect } from 'vitest';
import {
  DataSourceDefinitionSchema,
  QueryDefinitionSchema,
  BindingSchema,
  DataModelSchema
} from '@electrocraft/contracts';

describe('Data Ownership Models (M02.3)', () => {
  it('should validate a valid DataSourceDefinition', () => {
    const dataSource = {
      id: '550e8400-e29b-41d4-a716-446655440000',
      kind: 'postgresql',
      name: 'Producción DB',
      adapterId: 'pg-native-connector',
      settings: {
        host: 'localhost',
        port: 5432
      },
      schemaVersion: 1
    };

    const result = DataSourceDefinitionSchema.safeParse(dataSource);
    expect(result.success).toBe(true);
  });

  it('should validate a valid QueryDefinition', () => {
    const query = {
      id: '550e8400-e29b-41d4-a716-446655440001',
      name: 'Get All Users',
      dataSourceId: '550e8400-e29b-41d4-a716-446655440000',
      operation: 'findMany',
      params: {
        table: 'users',
        filter: { role: 'admin' }
      },
      schemaVersion: 1
    };

    const result = QueryDefinitionSchema.safeParse(query);
    expect(result.success).toBe(true);
  });

  it('should validate a Binding to a Query', () => {
    const binding = {
      kind: 'query',
      ref: '550e8400-e29b-41d4-a716-446655440001.results[0].name',
      transform: 'value.toUpperCase()'
    };

    const result = BindingSchema.safeParse(binding);
    expect(result.success).toBe(true);
  });

  it('should validate a DataModel (Schema) for internal DB', () => {
    const model = {
      fields: [
        { name: 'id', type: 'string', required: true, unique: true },
        { name: 'email', type: 'string', required: true, unique: true },
        { name: 'age', type: 'number', required: false, defaultValue: 18 }
      ]
    };

    const result = DataModelSchema.safeParse(model);
    expect(result.success).toBe(true);
  });
});
