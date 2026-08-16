import { ElectroCraftProjectDefinition } from '@electrocraft/contracts';

export type MigrationFn = (data: any) => any;

export interface ProjectMigration {
  version: number;
  up: MigrationFn;
}

/**
 * MigrationRegistry
 * Manages project schema migrations.
 */
export class MigrationRegistry {
  private migrations: Map<number, ProjectMigration> = new Map();

  register(migration: ProjectMigration) {
    if (this.migrations.has(migration.version)) {
      throw new Error(`Migration for version ${migration.version} already registered.`);
    }
    this.migrations.set(migration.version, migration);
  }

  /**
   * Applies migrations to a project payload to bring it to the target version.
   */
  migrate(payload: any, targetVersion: number): any {
    let currentData = { ...payload };
    const startVersion = (currentData.schemaVersion || 0) as number;

    if (startVersion >= targetVersion) return currentData;

    for (let v = startVersion + 1; v <= targetVersion; v++) {
      const migration = this.migrations.get(v);
      if (!migration) {
        throw new Error(`Missing migration for version ${v}`);
      }
      currentData = migration.up(currentData);
      currentData.schemaVersion = v;
    }

    return currentData;
  }
}

export const projectMigrationRegistry = new MigrationRegistry();

// Example M02.6 v1 -> v2 migration registration
projectMigrationRegistry.register({
  version: 2,
  up: (data) => {
    // Dummy migration: ensure description is at least an empty string
    return {
      ...data,
      description: data.description || ""
    };
  }
});
