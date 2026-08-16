import { describe, it, expect } from 'vitest';
import {
  ActionGraphSchema,
  StateDefinitionSchema,
  NavigationDefinitionSchema,
  PermissionPolicySchema
} from '@electrocraft/contracts';

describe('App Core Ownership Models (M02.4)', () => {
  it('should validate a portable ActionGraph', () => {
    const action = {
      id: '550e8400-e29b-41d4-a716-446655440010',
      nodes: [
        { id: 'n1', type: 'trigger', name: 'Al hacer clic', config: { event: 'onClick' } },
        { id: 'n2', type: 'integration', name: 'Enviar Email', config: { template: 'welcome' } }
      ],
      connections: [
        { id: 'c1', sourceNodeId: 'n1', sourcePort: 'out', targetNodeId: 'n2', targetPort: 'in' }
      ],
      version: 1,
      schemaVersion: 1
    };

    const result = ActionGraphSchema.safeParse(action);
    expect(result.success).toBe(true);
  });

  it('should validate a StateDefinition', () => {
    const state = {
      id: '550e8400-e29b-41d4-a716-446655440011',
      name: 'user_preferences',
      scope: 'session',
      type: 'json',
      defaultValue: { theme: 'dark' },
      persistent: true
    };

    const result = StateDefinitionSchema.safeParse(state);
    expect(result.success).toBe(true);
  });

  it('should validate Navigation and Routes', () => {
    const nav = {
      id: '550e8400-e29b-41d4-a716-446655440012',
      routes: [
        {
          id: 'r1',
          path: '/',
          name: 'Home',
          screenId: '550e8400-e29b-41d4-a716-446655440013',
          roles: ['*']
        }
      ],
      initialRouteId: 'r1',
      schemaVersion: 1
    };

    const result = NavigationDefinitionSchema.safeParse(nav);
    expect(result.success).toBe(true);
  });

  it('should validate PermissionPolicy and Roles', () => {
    const policy = {
      id: '550e8400-e29b-41d4-a716-446655440014',
      roles: [
        {
          id: 'admin',
          name: 'Administrador',
          rules: [
            { resource: '*', action: 'admin', effect: 'allow' }
          ]
        }
      ],
      schemaVersion: 1
    };

    const result = PermissionPolicySchema.safeParse(policy);
    expect(result.success).toBe(true);
  });
});
