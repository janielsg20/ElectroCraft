import { ElectroCraftProjectDefinition, ElectroCraftProjectDefinitionSchema } from '@electrocraft/contracts';

/**
 * ProjectSerializer
 * Handles deterministic serialization and validation of projects.
 */
export class ProjectSerializer {
  /**
   * Serializes a project to a JSON string with deterministic key sorting.
   */
  static serialize(project: ElectroCraftProjectDefinition): string {
    // Basic validation before serialization
    ElectroCraftProjectDefinitionSchema.parse(project);

    return JSON.stringify(project, this.replacer, 2);
  }

  /**
   * Deserializes and validates a project from a JSON string.
   */
  static deserialize(json: string): ElectroCraftProjectDefinition {
    const data = JSON.parse(json);
    return ElectroCraftProjectDefinitionSchema.parse(data);
  }

  /**
   * Deterministic JSON replacer to ensure keys are always sorted.
   */
  private static replacer(_key: string, value: any): any {
    if (value instanceof Object && !(value instanceof Array)) {
      return Object.keys(value)
        .sort()
        .reduce((sorted: any, key) => {
          sorted[key] = value[key];
          return sorted;
        }, {});
    }
    return value;
  }
}
