import { describe, it, expect } from 'vitest';
import {
  ElectroCraftComponentDefinitionSchema,
  ElectroCraftLayoutSchema,
  ElectroCraftStyleSchema
} from '../../contracts/v1';

describe('UI Canonical Models Validation', () => {
  it('should validate a correct layout definition', () => {
    const validLayout = {
      mode: 'flex',
      direction: 'column',
      gap: '16px',
      padding: '20px'
    };

    const result = ElectroCraftLayoutSchema.safeParse(validLayout);
    expect(result.success).toBe(true);
  });

  it('should validate a correct style definition', () => {
    const validStyle = {
      typography: {
        fontSize: '16px',
        color: '#000000',
        textAlign: 'center'
      },
      background: {
        color: '#ffffff'
      }
    };

    const result = ElectroCraftStyleSchema.safeParse(validStyle);
    expect(result.success).toBe(true);
  });

  it('should validate a component with overrides', () => {
    const validComponent = {
      id: '550e8400-e29b-41d4-a716-446655440000',
      type: 'text',
      name: 'Heading',
      props: { text: 'Hello' },
      style: {
        typography: { fontSize: '24px' }
      },
      overrides: {
        responsive: {
          mobile: {
            typography: { fontSize: '18px' }
          }
        },
        platform: {
          native: {
            typography: { fontWeight: 'bold' }
          }
        }
      },
      schemaVersion: 1
    };

    const result = ElectroCraftComponentDefinitionSchema.safeParse(validComponent);
    expect(result.success).toBe(true);
  });

  it('should fail on invalid layout mode', () => {
    const invalidLayout = {
      mode: 'invalid-mode'
    };

    const result = ElectroCraftLayoutSchema.safeParse(invalidLayout);
    expect(result.success).toBe(false);
  });
});
