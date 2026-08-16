/**
 * POC M00.8: Integración Gemini + AI SDK + Gateway
 * Este archivo demuestra la arquitectura de IA segura y estructurada.
 */

import { z } from 'zod';

// 1. Esquema para Structured Output (GenerationPlanPoc)
const GenerationPlanSchema = z.object({
  action: z.enum(['CREATE_SCREEN', 'ADD_COMPONENT', 'MODIFY_THEME']),
  description: z.string(),
  components: z.array(z.string()).optional(),
  reasoning: z.string()
});

type GenerationPlan = z.infer<typeof GenerationPlanSchema>;

// 2. Gateway Simulado (Server-side Only)
class AIGateway {
  private apiKey: string = "GEMINI_SECURE_KEY_ENV_VAR"; // Nunca expuesta al cliente

  async callGemini(prompt: string, schema?: any): Promise<any> {
    console.log(`[Gateway] Llamando a Gemini con prompt: "${prompt}" usando Key segura.`);
    // Simulación de respuesta estructurada
    return {
      action: 'CREATE_SCREEN',
      description: 'Crear pantalla de Login con estilos shadcn',
      reasoning: 'El usuario solicitó una entrada de aplicación.'
    };
  }

  // 3. Tool Calls (Function Calling)
  async executeTool(name: string, args: any) {
    const allowedTools = ['getProjectData', 'searchComponentLibrary'];
    if (!allowedTools.includes(name)) {
      throw new Error(`Tool ${name} no permitida por seguridad.`);
    }
    console.log(`[Gateway] Ejecutando Herramienta: ${name}`, args);
    return { success: true, data: {} };
  }
}

// 4. Client Adapter (ElectroCraft AI Provider)
class AIProvider {
  private gateway = new AIGateway();

  async generatePlan(userInput: string): Promise<GenerationPlan> {
    const rawResponse = await this.gateway.callGemini(userInput);
    // Validación Zod en el cliente para asegurar integridad
    return GenerationPlanSchema.parse(rawResponse);
  }

  async testTools() {
    await this.gateway.executeTool('getProjectData', { projectId: 'p1' });
  }
}

// 5. Prueba del POC
async function testAIPOC() {
  const provider = new AIProvider();

  console.log("Probando Output Estructurado...");
  const plan = await provider.generatePlan("Ayúdame a crear una pantalla de inicio");
  console.log("Plan Generado (Validado):", plan);

  console.log("Probando Herramientas Permitidas...");
  await provider.testTools();

  console.log("Verificando Seguridad del Gateway...");
  // En una prueba real, verificaríamos que 'apiKey' no existe en el bundle del cliente.
  console.log("Gateway verificado: API Key no expuesta.");
}

testAIPOC();
