import {
  Project,
  Document,
  DataSourceDefinition,
  QueryDefinition,
  ActionGraph,
  StudioAppearanceProfile
} from '@electrocraft/domain';

/**
 * LocalProjectRepository
 * Interface for the physical storage layer of projects and their objects.
 */
export interface LocalProjectRepository {
  // Project Management
  createProject(project: Partial<Project>): Promise<Project>;
  getProject(id: string): Promise<Project | null>;
  listProjects(): Promise<Project[]>;
  updateProject(id: string, data: Partial<Project>): Promise<void>;
  deleteProject(id: string): Promise<void>;

  // Granular Object Management (M04.1)
  saveObject(projectId: string, objectId: string, kind: string, payload: any): Promise<void>;
  getObject<T>(projectId: string, objectId: string): Promise<T | null>;
  listObjectsByKind(projectId: string, kind: string): Promise<any[]>;
  deleteObject(projectId: string, objectId: string): Promise<void>;

  // Workspace
  getPreference<T>(key: string): Promise<T | null>;
  setPreference(key: string, value: any): Promise<void>;
}
