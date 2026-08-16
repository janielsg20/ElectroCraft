/**
 * POC M00.4: Studio DB genérica con PGlite + Drizzle
 * Este archivo demuestra la arquitectura de datos local-first y el esquema genérico.
 */

// Mock de Drizzle/PGlite para propósitos de POC
interface TableSchema {
  name: string;
  columns: string[];
}

const ProjectSchema = {
  projects: ["id", "name", "created_at"],
  project_objects: ["id", "project_id", "type", "content", "checksum"], // content es JSONB
  project_revisions: ["id", "object_id", "version", "content"],
  content_records: ["id", "model_id", "data"], // data es JSONB (EAV-like o Document Store)
  record_field_index: ["id", "record_id", "field_name", "value"] // Para búsqueda rápida sin ALTER TABLE
};

// 1. Simulación de PGlite Worker Client
class PGlitePOC {
  private db: Map<string, any[]> = new Map();

  constructor() {
    Object.keys(ProjectSchema).forEach(table => this.db.set(table, []));
  }

  async query(sql: string, params: any[] = []) {
    console.log(`Ejecutando SQL POC: ${sql}`, params);
    // Lógica de simulación
    return { rows: [] };
  }

  async saveObject(projectId: string, type: string, content: any) {
    const table = this.db.get("project_objects")!;
    const id = (table.length + 1).toString();
    const newObj = { id, project_id: projectId, type, content, checksum: Date.now() };
    table.push(newObj);
    return newObj;
  }
}

// 2. Ejemplo de uso: Guardar un Modelo de Datos sin ALTER TABLE
async function testGenericStorage() {
  const db = new PGlitePOC();

  // Guardar definición de modelo (como Project Object)
  const userModel = await db.saveObject("p1", "DATA_MODEL", {
    name: "Clientes",
    fields: [
      { name: "nombre", type: "string", indexed: true },
      { name: "email", type: "string", indexed: true }
    ]
  });

  // Guardar un Record (en content_records)
  const record = {
    id: "r1",
    model_id: userModel.id,
    data: { nombre: "Juan Perez", email: "juan@example.com" }
  };

  console.log("Record guardado en store genérico:", record);

  // Indexación manual (en record_field_index) para campos marcados como 'indexed'
  const indexes = [
    { record_id: "r1", field_name: "nombre", value: "Juan Perez" },
    { record_id: "r1", field_name: "email", value: "juan@example.com" }
  ];

  console.log("Índices generados para búsqueda rápida:", indexes);
}

testGenericStorage();
