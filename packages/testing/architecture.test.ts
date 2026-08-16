import { describe, it, expect } from 'vitest';
import * as fs from 'fs';
import * as path from 'path';

describe('Architecture Boundaries', () => {
  it('domain package should not have forbidden dependencies', () => {
    const domainPkgPath = path.resolve(__dirname, '../domain/package.json');
    const domainPkg = JSON.parse(fs.readFileSync(domainPkgPath, 'utf8'));

    const forbidden = ['react', '@measured/puck', 'drizzle-orm', 'expo', 'slim'];

    const allDeps = {
      ...domainPkg.dependencies,
      ...domainPkg.devDependencies
    };

    forbidden.forEach(dep => {
      expect(allDeps[dep], `Domain package should not depend on ${dep}`).toBeUndefined();
    });
  });
});
