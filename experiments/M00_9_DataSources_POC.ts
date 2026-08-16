/**
 * POC M00.9: Data Sources con REST, GraphQL y Gateway de Secretos
 * Este archivo demuestra la normalización de fuentes de datos externas.
 */

interface DataResult<T = any> {
  data: T | null;
  errors?: string[];
  meta?: Record<string, any>;
}

interface DataSourceOperation {
  id: string;
  type: 'READ' | 'WRITE';
  path: string;
  params?: Record<string, any>;
}

// 1. Contrato de Adaptador (DataSourceAdapter)
interface DataSourceAdapter {
  execute(operation: DataSourceOperation, secrets?: Record<string, string>): Promise<DataResult>;
}

// 2. Implementación REST con Gateway
class RestDataSourceAdapter implements DataSourceAdapter {
  async execute(op: DataSourceOperation, secrets?: Record<string, string>): Promise<DataResult> {
    console.log(`[REST] Ejecutando ${op.type} en ${op.path}`);
    if (secrets && secrets.apiKey) {
      console.log(`[Gateway] Aplicando API Key: ${secrets.apiKey.substring(0, 4)}***`);
    }
    return { data: { message: "Resultado REST exitoso" } };
  }
}

// 3. Implementación GraphQL
class GraphQLDataSourceAdapter implements DataSourceAdapter {
  async execute(op: DataSourceOperation): Promise<DataResult> {
    console.log(`[GraphQL] Ejecutando Query en ${op.path}`);
    return { data: { message: "Resultado GraphQL exitoso" } };
  }
}

// 4. Gestión de Secretos (SecretRef)
const projectConfig = {
  sources: [
    {
      id: "s1",
      type: "REST",
      url: "https://api.ejemplo.com",
      auth: { type: "HEADER", key: "X-API-Key", secretRef: "MY_EXTERNAL_SERVICE_KEY" }
    }
  ]
};

// 5. Prueba del POC
async function testDataSources() {
  const rest = new RestDataSourceAdapter();
  const gql = new GraphQLDataSourceAdapter();

  console.log("Probando Conector REST...");
  const r1 = await rest.execute({ id: 'get_users', type: 'READ', path: '/users' }, { apiKey: 'secret-12345' });
  console.log("Resultado REST:", r1);

  console.log("Probando Conector GraphQL...");
  const r2 = await gql.execute({ id: 'query_posts', type: 'READ', path: '/graphql' });
  console.log("Resultado GraphQL:", r2);

  console.log("Verificando que el Secreto no esté en el Config del Proyecto...");
  console.log("Config (sin valores sensibles):", JSON.stringify(projectConfig, null, 2));
}

testDataSources();
