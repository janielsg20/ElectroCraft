/**
 * @electrocraft/domain
 * Núcleo de lógica de negocio y tipos canónicos.
 * Sin dependencias de frameworks o UI.
 */

import {
  ElectroCraftProjectDefinition,
  ElectroCraftDocument,
  DocumentKind,
  ElectroCraftComponentDefinition,
  ElectroCraftLayout,
  ElectroCraftStyle,
  DataSourceDefinition,
  QueryDefinition,
  Binding,
  DataModel,
  ActionGraph,
  StateDefinition,
  RouteDefinition,
  NavigationDefinition,
  RoleDefinition,
  PermissionPolicy,
  ElectroCraftTheme,
  BlueprintPackage,
  CapabilityRegistry,
  ElectroCraftExportIR,
  ExportTargetCompileContext
} from '@electrocraft/contracts';

export type {
  ElectroCraftProjectDefinition,
  ElectroCraftDocument,
  DocumentKind,
  ElectroCraftComponentDefinition,
  ElectroCraftLayout,
  ElectroCraftStyle,
  DataSourceDefinition,
  QueryDefinition,
  Binding,
  DataModel,
  ActionGraph,
  StateDefinition,
  RouteDefinition,
  NavigationDefinition,
  RoleDefinition,
  PermissionPolicy,
  ElectroCraftTheme,
  BlueprintPackage,
  CapabilityRegistry,
  ElectroCraftExportIR,
  ExportTargetCompileContext
};

// Re-exporting with cleaner names if needed by domain logic
export type Project = ElectroCraftProjectDefinition;
export type Document = ElectroCraftDocument;
export type Component = ElectroCraftComponentDefinition;
export type Layout = ElectroCraftLayout;
export type Style = ElectroCraftStyle;

export interface ProjectRepository {
  getById(id: string): Promise<Project | null>;
  save(project: Project): Promise<void>;
}

export interface DocumentRepository {
  getById(id: string): Promise<Document | null>;
  save(document: Document): Promise<void>;
  getByProjectId(projectId: string): Promise<Document[]>;
}

export interface DataSourceRepository {
  getById(id: string): Promise<DataSourceDefinition | null>;
  save(dataSource: DataSourceDefinition): Promise<void>;
}

export interface QueryRepository {
  getById(id: string): Promise<QueryDefinition | null>;
  save(query: QueryDefinition): Promise<void>;
}

export interface ActionRepository {
  getById(id: string): Promise<ActionGraph | null>;
  save(action: ActionGraph): Promise<void>;
}

export interface StateRepository {
  getAll(): Promise<StateDefinition[]>;
  save(state: StateDefinition): Promise<void>;
}

export interface ThemeRepository {
  getById(id: string): Promise<ElectroCraftTheme | null>;
  save(theme: ElectroCraftTheme): Promise<void>;
}

export interface CapabilityService {
  getRegistry(platform: string): Promise<CapabilityRegistry>;
  checkSupport(platform: string, capabilityId: string): Promise<boolean>;
}

export * from '../application/project-serializer';
export * from '../application/migration-registry';
