import { describe, it, expect } from 'vitest';
import {
  ElectroCraftThemeSchema,
  BlueprintPackageSchema,
  CapabilityRegistrySchema
} from '@electrocraft/contracts';

describe('System & Registry Models (M02.5)', () => {
  it('should validate a comprehensive ElectroCraftTheme', () => {
    const theme = {
      id: '550e8400-e29b-41d4-a716-446655440020',
      name: 'Modern Dark',
      tokens: {
        colors: { primary: '#007bff', background: '#121212' },
        typography: { baseSize: '16px', fontStack: 'Inter, sans-serif' },
        spacing: { md: '1rem' },
        radius: { full: '9999px' },
        shadows: { lg: '0 10px 15px rgba(0,0,0,0.1)' },
        motion: { duration: '200ms' }
      },
      variants: {
        button: {
          primary: { bg: 'primary', color: 'white' }
        }
      },
      schemaVersion: 1
    };

    const result = ElectroCraftThemeSchema.safeParse(theme);
    expect(result.success).toBe(true);
  });

  it('should validate a BlueprintPackage definition', () => {
    const blueprint = {
      id: 'ec-dashboard-pro',
      version: '1.2.0',
      name: 'Dashboard Pro Blueprint',
      originUrl: 'https://blueprints.electrocraft.io/dashboard-pro',
      requiredCapabilities: ['auth-native', 'postgresql-connector'],
      config: { defaultTheme: 'Modern Dark' }
    };

    const result = BlueprintPackageSchema.safeParse(blueprint);
    expect(result.success).toBe(true);
  });

  it('should validate a CapabilityRegistry for a specific platform', () => {
    const registry = {
      platform: 'android-expo',
      capabilities: [
        { id: 'camera', name: 'Camera Access', supported: true, level: 'core' },
        { id: 'biometrics', name: 'FaceID/Fingerprint', supported: true, level: 'extension' },
        { id: 'custom-sql', name: 'Direct SQL', supported: false, level: 'unsupported' }
      ],
      updatedAt: new Date().toISOString()
    };

    const result = CapabilityRegistrySchema.safeParse(registry);
    expect(result.success).toBe(true);
  });
});
