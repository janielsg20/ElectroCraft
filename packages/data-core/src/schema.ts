import { pgTable, text, integer, timestamp, jsonb, uuid, boolean, index } from 'drizzle-orm/pg-core';

/**
 * Projects Table
 * Base project metadata.
 */
export const projects = pgTable('projects', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: text('name').notNull(),
  description: text('description'),
  settings: jsonb('settings').notNull().default({}),
  version: integer('version').notNull().default(1),
  schemaVersion: integer('schema_version').notNull().default(1),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
});

/**
 * Project Objects Table
 * Granular storage for documents, queries, actions, etc.
 */
export const projectObjects = pgTable('project_objects', {
  id: uuid('id').primaryKey().defaultRandom(),
  projectId: uuid('project_id').notNull().references(() => projects.id, { onDelete: 'cascade' }),
  objectId: text('object_id').notNull(), // The canonical UUID of the entity
  kind: text('kind').notNull(), // 'document', 'query', 'action', 'theme', etc.
  schemaVersion: integer('schema_version').notNull().default(1),
  payload: jsonb('payload').notNull(),
  checksum: text('checksum'),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
}, (table) => ({
  projectKindIdx: index('project_kind_idx').on(table.projectId, table.kind),
  objectIdIdx: index('object_id_idx').on(table.objectId),
}));

/**
 * Project Revisions Table
 * Checkpoints for the project structure.
 */
export const projectRevisions = pgTable('project_revisions', {
  id: uuid('id').primaryKey().defaultRandom(),
  projectId: uuid('project_id').notNull().references(() => projects.id, { onDelete: 'cascade' }),
  name: text('name').notNull(),
  description: text('description'),
  objectsManifest: jsonb('objects_manifest').notNull(), // Snapshot of object IDs and their specific versions
  createdAt: timestamp('created_at').notNull().defaultNow(),
});

/**
 * Content Records Table
 * Dynamic user data (rows in the generated app's database).
 */
export const contentRecords = pgTable('content_records', {
  id: uuid('id').primaryKey().defaultRandom(),
  projectId: uuid('project_id').notNull().references(() => projects.id, { onDelete: 'cascade' }),
  modelId: text('model_id').notNull(), // Reference to the DataModel schema
  data: jsonb('data').notNull(),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
}, (table) => ({
  projectModelIdx: index('project_model_idx').on(table.projectId, table.modelId),
}));

/**
 * Workspace Preferences Table
 * Global Studio settings (independent of projects).
 */
export const workspacePreferences = pgTable('workspace_preferences', {
  key: text('key').primaryKey(),
  value: jsonb('value').notNull(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
});

/**
 * Audit Events Table
 * Log of actions and changes.
 */
export const auditEvents = pgTable('audit_events', {
  id: uuid('id').primaryKey().defaultRandom(),
  projectId: uuid('project_id').references(() => projects.id),
  userId: text('user_id'),
  action: text('action').notNull(),
  entityId: text('entity_id'),
  entityType: text('entity_type'),
  payload: jsonb('payload'),
  createdAt: timestamp('created_at').notNull().defaultNow(),
});
