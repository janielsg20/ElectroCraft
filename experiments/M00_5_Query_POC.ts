/**
 * POC M00.5: Query Portable con React Query Builder (RQB) + Electro Adapter
 * Este archivo demuestra la definición de consultas neutrales y su compilación.
 */

interface QueryRule {
  field: string;
  operator: string;
  value: any;
}

interface QueryGroup {
  combinator: 'AND' | 'OR';
  rules: (QueryRule | QueryGroup)[];
}

// 1. Definición de consulta neutral (ElectroCraftQueryDefinition)
const sampleQuery: QueryGroup = {
  combinator: 'AND',
  rules: [
    { field: 'status', operator: '=', value: 'active' },
    {
      combinator: 'OR',
      rules: [
        { field: 'category', operator: '=', value: 'electronics' },
        { field: 'price', operator: '<', value: 100 }
      ]
    }
  ]
};

// 2. Electro Adapter: Compilación a diferentes dialectos
class QueryCompiler {
  // Compila a SQL para el indexador genérico (record_field_index + content_records)
  compileToStudioSQL(query: QueryGroup): string {
    const processGroup = (group: QueryGroup): string => {
      const parts = group.rules.map(rule => {
        if ('combinator' in rule) return `(${processGroup(rule)})`;
        // Simulación de mapeo a index vs JSON
        return `${rule.field} ${rule.operator} ?`;
      });
      return parts.join(` ${group.combinator} `);
    };
    return `SELECT * FROM content_records WHERE id IN (SELECT record_id FROM record_field_index WHERE ${processGroup(query)})`;
  }

  // Validación de seguridad y soporte
  validate(query: QueryGroup) {
    const supportedOperators = ['=', '!=', '<', '>', '<=', '>='];
    const checkRule = (rule: QueryRule | QueryGroup) => {
      if ('operator' in rule && !supportedOperators.includes(rule.operator)) {
        throw new Error(`BLOCKER: Operador no soportado '${rule.operator}'`);
      }
      if ('rules' in rule) rule.rules.forEach(checkRule);
    };
    checkRule(query);
  }
}

// 3. Prueba del POC
function testQueryPortability() {
  const compiler = new QueryCompiler();

  try {
    compiler.validate(sampleQuery);
    const sql = compiler.compileToStudioSQL(sampleQuery);
    console.log("Consulta SQL generada para Studio:", sql);
  } catch (e: any) {
    console.error(e.message);
  }

  // Prueba de Blocker
  const invalidQuery: QueryGroup = {
    combinator: 'AND',
    rules: [{ field: 'name', operator: 'MATCHES_REGEX', value: '^A' }]
  };

  try {
    console.log("Validando consulta inválida...");
    compiler.validate(invalidQuery);
  } catch (e: any) {
    console.log("Resultado esperado:", e.message);
  }
}

testQueryPortability();
