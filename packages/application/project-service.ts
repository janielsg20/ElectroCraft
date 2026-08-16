import {
  ElectroCraftProjectDefinition,
  ElectroCraftProjectDefinitionSchema,
  ElectroCraftDocument,
  ElectroCraftDocumentSchema,
  DocumentKind
} from '@electrocraft/contracts';
import { v4 as uuidv4 } from 'uuid';

export class ProjectService {
  createProject(name: string): ElectroCraftProjectDefinition {
    const now = new Date().toISOString();
    const project: ElectroCraftProjectDefinition = {
      id: uuidv4(),
      name,
      settings: {
        defaultTargets: ['local-project', 'react-web'],
        language: 'es'
      },
      documentRefs: [],
      featureFlags: {},
      version: 1,
      schemaVersion: 1,
      createdAt: now,
      updatedAt: now
    };

    return ElectroCraftProjectDefinitionSchema.parse(project);
  }

  createDocument(name: string, kind: DocumentKind): ElectroCraftDocument {
    const document: ElectroCraftDocument = {
      id: uuidv4(),
      kind,
      name,
      content: {}, // Placeholder for engine-specific content
      version: 1,
      schemaVersion: 1
    };

    return ElectroCraftDocumentSchema.parse(document);
  }
}
