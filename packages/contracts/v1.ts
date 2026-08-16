import { z } from 'zod';

export const DocumentKindSchema = z.enum([
  'screen',
  'template',
  'form',
  'admin-screen',
  'reusable-component',
  'data-schema',
  'query',
  'action-graph',
  'navigation',
  'theme'
]);

export type DocumentKind = z.infer<typeof DocumentKindSchema>;

export const ElectroCraftDocumentSchema = z.object({
  id: z.string().uuid(),
  kind: DocumentKindSchema,
  name: z.string(),
  content: z.any(), // Puck/Engine content will be normalized here later
  metadata: z.record(z.any()).optional(),
  version: z.number().default(1),
  schemaVersion: z.literal(1)
});

export type ElectroCraftDocument = z.infer<typeof ElectroCraftDocumentSchema>;

export const ExportTargetIdSchema = z.enum([
  'local-project',
  'react-web',
  'static-web',
  'pwa',
  'android-expo',
  'ios-expo',
  'capacitor',
  'lamp',
  'wordpress'
]);

export const ElectroCraftProjectDefinitionSchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
  description: z.string().optional(),
  settings: z.object({
    defaultTargets: z.array(ExportTargetIdSchema).default(['local-project', 'react-web']),
    language: z.string().default('es'),
  }).default({}),
  documentRefs: z.array(z.string().uuid()).default([]),
  navigationRef: z.string().uuid().optional(),
  themeRef: z.string().uuid().optional(),
  featureFlags: z.record(z.boolean()).default({}),
  version: z.number().default(1),
  schemaVersion: z.literal(1),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime()
});

export type ElectroCraftProjectDefinition = z.infer<typeof ElectroCraftProjectDefinitionSchema>;

export const LayoutModeSchema = z.enum([
  'flex',
  'grid',
  'stack',
  'block',
  'inline',
  'absolute'
]);

export const ElectroCraftLayoutSchema = z.object({
  mode: LayoutModeSchema.default('block'),
  direction: z.enum(['row', 'column']).optional(),
  wrap: z.boolean().optional(),
  justify: z.string().optional(),
  align: z.string().optional(),
  gap: z.string().optional(),
  padding: z.string().optional(),
  margin: z.string().optional(),
  position: z.object({
    top: z.string().optional(),
    right: z.string().optional(),
    bottom: z.string().optional(),
    left: z.string().optional(),
    zIndex: z.number().optional()
  }).optional()
});

export const ElectroCraftStyleSchema = z.object({
  typography: z.object({
    fontSize: z.string().optional(),
    fontWeight: z.string().optional(),
    color: z.string().optional(),
    textAlign: z.enum(['left', 'center', 'right', 'justify']).optional(),
    lineHeight: z.string().optional()
  }).optional(),
  background: z.object({
    color: z.string().optional(),
    image: z.string().optional(),
    size: z.string().optional(),
    position: z.string().optional(),
    repeat: z.string().optional()
  }).optional(),
  border: z.object({
    width: z.string().optional(),
    color: z.string().optional(),
    style: z.string().optional(),
    radius: z.string().optional()
  }).optional(),
  effects: z.object({
    opacity: z.number().optional(),
    shadow: z.string().optional()
  }).optional(),
  custom: z.record(z.string()).optional()
});

export const PlatformOverrideSchema = z.object({
  web: z.lazy(() => ElectroCraftStyleSchema.partial()).optional(),
  native: z.lazy(() => ElectroCraftStyleSchema.partial()).optional(),
  lamp: z.lazy(() => ElectroCraftStyleSchema.partial()).optional(),
  wordpress: z.lazy(() => ElectroCraftStyleSchema.partial()).optional()
});

export const ResponsiveOverrideSchema = z.object({
  mobile: z.lazy(() => ElectroCraftStyleSchema.partial()).optional(),
  tablet: z.lazy(() => ElectroCraftStyleSchema.partial()).optional(),
  desktop: z.lazy(() => ElectroCraftStyleSchema.partial()).optional()
});

export const ElectroCraftComponentDefinitionSchema = z.object({
  id: z.string().uuid(),
  type: z.string(), // ID of the component in ComponentRegistry
  name: z.string(),
  props: z.record(z.any()).default({}),
  layout: ElectroCraftLayoutSchema.optional(),
  style: ElectroCraftStyleSchema.optional(),
  overrides: z.object({
    platform: PlatformOverrideSchema.optional(),
    responsive: ResponsiveOverrideSchema.optional()
  }).optional(),
  bindings: z.record(z.string()).optional(), // Map of prop names to binding source references
  actions: z.record(z.string()).optional(), // Map of event names to ActionGraph references
  slots: z.record(z.array(z.string().uuid())).optional(), // Map of slot names to arrays of children IDs
  accessibility: z.object({
    label: z.string().optional(),
    role: z.string().optional(),
    hidden: z.boolean().optional()
  }).optional(),
  schemaVersion: z.literal(1)
});

export type ElectroCraftComponentDefinition = z.infer<typeof ElectroCraftComponentDefinitionSchema>;

// --- M02.3: Data Sources, Queries and Bindings ---

export const DataSourceKindSchema = z.enum([
  'internal-db',
  'rest-api',
  'postgresql',
  'mysql',
  'mongodb',
  'google-sheets',
  'custom-connector'
]);

export const DataSourceDefinitionSchema = z.object({
  id: z.string().uuid(),
  kind: DataSourceKindSchema,
  name: z.string(),
  adapterId: z.string(), // Reference to a ConnectorRegistry entry
  settings: z.record(z.any()).default({}), // Configuration metadata (no secrets)
  schemaVersion: z.literal(1)
});

export type DataSourceDefinition = z.infer<typeof DataSourceDefinitionSchema>;

export const QueryDefinitionSchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
  dataSourceId: z.string().uuid(),
  operation: z.string(), // e.g., 'findMany', 'insert', 'custom'
  params: z.record(z.any()).default({}),
  schemaVersion: z.literal(1)
});

export type QueryDefinition = z.infer<typeof QueryDefinitionSchema>;

export const BindingSourceKindSchema = z.enum([
  'data-source',
  'query',
  'state',
  'route-param',
  'user-session',
  'action-output',
  'form-field'
]);

export const BindingSchema = z.object({
  kind: BindingSourceKindSchema,
  ref: z.string(), // e.g., 'ds-uuid.field.nested', 'query-uuid.data'
  transform: z.string().optional() // Optional JS-like transform expression
});

export type Binding = z.infer<typeof BindingSchema>;

export const FormMetadataSchema = z.object({
  submitActionId: z.string().uuid().optional(),
  validationMode: z.enum(['onBlur', 'onChange', 'onSubmit']).default('onBlur'),
  reValidateMode: z.enum(['onBlur', 'onChange', 'onSubmit']).default('onChange')
});

export type FormMetadata = z.infer<typeof FormMetadataSchema>;

export const DataModelSchema = z.object({
  fields: z.array(z.object({
    name: z.string(),
    type: z.string(), // string, number, boolean, date, json, relation
    required: z.boolean().default(false),
    unique: z.boolean().default(false),
    defaultValue: z.any().optional()
  }))
});

export type DataModel = z.infer<typeof DataModelSchema>;

// --- M02.4: Action, State, Navigation and Permission contracts ---

export const ActionNodeSchema = z.object({
  id: z.string().uuid(),
  type: z.string(), // e.g., 'trigger', 'logic', 'integration', 'data-mutation'
  name: z.string(),
  config: z.record(z.any()).default({}),
  position: z.object({ x: z.number(), y: z.number() }).optional()
});

export const ActionConnectionSchema = z.object({
  id: z.string().uuid(),
  sourceNodeId: z.string().uuid(),
  sourcePort: z.string(),
  targetNodeId: z.string().uuid(),
  targetPort: z.string()
});

export const ActionGraphSchema = z.object({
  id: z.string().uuid(),
  nodes: z.array(ActionNodeSchema).default([]),
  connections: z.array(ActionConnectionSchema).default([]),
  version: z.number().default(1),
  schemaVersion: z.literal(1)
});

export type ActionGraph = z.infer<typeof ActionGraphSchema>;

export const StateScopeSchema = z.enum(['global', 'session', 'screen', 'component']);

export const StateDefinitionSchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
  scope: StateScopeSchema.default('global'),
  type: z.string(), // string, number, boolean, json, etc.
  defaultValue: z.any().optional(),
  persistent: z.boolean().default(false),
  sensitive: z.boolean().default(false)
});

export type StateDefinition = z.infer<typeof StateDefinitionSchema>;

export const RouteDefinitionSchema = z.object({
  id: z.string().uuid(),
  path: z.string(),
  name: z.string(),
  screenId: z.string().uuid(),
  params: z.array(z.string()).default([]), // List of param names
  roles: z.array(z.string()).default(['*']) // Allowed roles
});

export type RouteDefinition = z.infer<typeof RouteDefinitionSchema>;

export const NavigationDefinitionSchema = z.object({
  id: z.string().uuid(),
  routes: z.array(RouteDefinitionSchema).default([]),
  initialRouteId: z.string().uuid().optional(),
  schemaVersion: z.literal(1)
});

export type NavigationDefinition = z.infer<typeof NavigationDefinitionSchema>;

export const PermissionRuleSchema = z.object({
  resource: z.string(), // e.g., 'document:id', 'datasource:*'
  action: z.enum(['read', 'write', 'delete', 'execute', 'admin']),
  effect: z.enum(['allow', 'deny']).default('allow'),
  conditions: z.record(z.any()).optional()
});

export const RoleDefinitionSchema = z.object({
  id: z.string(),
  name: z.string(),
  inherits: z.array(z.string()).default([]),
  rules: z.array(PermissionRuleSchema).default([])
});

export type RoleDefinition = z.infer<typeof RoleDefinitionSchema>;

export const PermissionPolicySchema = z.object({
  id: z.string().uuid(),
  roles: z.array(RoleDefinitionSchema).default([]),
  schemaVersion: z.literal(1)
});

export type PermissionPolicy = z.infer<typeof PermissionPolicySchema>;

// --- M02.5: Themes, Blueprints and Registries ---

export const ElectroCraftThemeSchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
  tokens: z.object({
    colors: z.record(z.string()).default({}),
    typography: z.record(z.any()).default({}),
    spacing: z.record(z.string()).default({}),
    radius: z.record(z.string()).default({}),
    shadows: z.record(z.string()).default({}),
    motion: z.record(z.any()).default({})
  }),
  variants: z.record(z.any()).default({}),
  schemaVersion: z.literal(1)
});

export type ElectroCraftTheme = z.infer<typeof ElectroCraftThemeSchema>;

export const BlueprintPackageSchema = z.object({
  id: z.string(),
  version: z.string(),
  name: z.string(),
  description: z.string().optional(),
  originUrl: z.string().url().optional(),
  requiredCapabilities: z.array(z.string()).default([]),
  config: z.record(z.any()).default({})
});

export type BlueprintPackage = z.infer<typeof BlueprintPackageSchema>;

export const PlatformCapabilitySchema = z.object({
  id: z.string(),
  name: z.string(),
  supported: z.boolean(),
  level: z.enum(['core', 'extension', 'unsupported']),
  notes: z.string().optional()
});

export const CapabilityRegistrySchema = z.object({
  platform: ExportTargetIdSchema,
  capabilities: z.array(PlatformCapabilitySchema).default([]),
  updatedAt: z.string().datetime()
});

export type CapabilityRegistry = z.infer<typeof CapabilityRegistrySchema>;

// --- M02.7: ElectroCraftExportIR ---

export const ElectroCraftExportIRSchema = z.object({
  projectId: z.string().uuid(),
  timestamp: z.string().datetime(),
  project: ElectroCraftProjectDefinitionSchema,
  documents: z.array(ElectroCraftDocumentSchema),
  dataSources: z.array(DataSourceDefinitionSchema),
  queries: z.array(QueryDefinitionSchema),
  actions: z.array(ActionGraphSchema),
  theme: ElectroCraftThemeSchema.optional(),
  navigation: NavigationDefinitionSchema,
  permissions: PermissionPolicySchema.optional(),
  requiredCapabilities: z.array(z.string()).default([]),
  mediaManifest: z.record(z.string()).default({}), // Asset ID -> Cloud URL mapping
  schemaVersion: z.literal(1)
});

export type ElectroCraftExportIR = z.infer<typeof ElectroCraftExportIRSchema>;

export const ExportTargetCompileContextSchema = z.object({
  targetId: ExportTargetIdSchema,
  environment: z.enum(['development', 'staging', 'production']).default('production'),
  buildConfig: z.record(z.any()).default({}),
  capabilitySupport: z.record(z.boolean()).default({}),
  secretRefs: z.record(z.string()).default({}) // Reference names, not values
});

export type ExportTargetCompileContext = z.infer<typeof ExportTargetCompileContextSchema>;

// --- M02.9: Engine Payload Wrappers ---

export const SupportedEngineSchema = z.enum([
  'puck',
  'rete',
  'tiptap',
  'rqb',
  'zod',
  'electro-native'
]);

export const EnginePayloadWrapperSchema = z.object({
  engine: SupportedEngineSchema,
  version: z.number().default(1),
  value: z.any(), // The actual engine-specific JSON payload
  metadata: z.record(z.any()).optional()
});

export type EnginePayloadWrapper = z.infer<typeof EnginePayloadWrapperSchema>;

// --- M03.9: Studio Appearance (Internal Only) ---

export const StudioAppearanceProfileSchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
  mode: z.enum(['light', 'dark', 'system']).default('system'),
  primaryColor: z.string().default('#007BFF'),
  typographyScale: z.number().min(0.8).max(1.2).default(1.0),
  density: z.enum(['compact', 'comfortable', 'spacious']).default('comfortable'),
  radius: z.number().min(0).max(1).default(0.5), // Multiplier for base radius
  motionIntensity: z.enum(['none', 'subtle', 'full']).default('subtle'),
  showInternalIds: z.boolean().default(false)
});

export type StudioAppearanceProfile = z.infer<typeof StudioAppearanceProfileSchema>;
