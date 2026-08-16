# MEMORY — ElectroCraft Eighth Final

Product:
ElectroCraft — No-Code App Builder.

Execution:
F02 / M02.6 in progress. M02.5 completed.

Verificación:
GitHub Actions (Cloud-First Absolute).

Core mental model:
Screens, Navigation, Components, Data Sources, Queries, State, Actions, Forms, Auth, Administration, Resources.
Project, Document, Component, Layout, and Style models defined in @electrocraft/contracts and @electrocraft/domain.
Styles support responsive (mobile, tablet, desktop) and platform (web, native, lamp, wordpress) overrides.

Studio:
- shadcn/ui Radix.
- Tailwind.
- Lucide.
- i18next.
- HelpRegistry.
- selected AI Elements.
- Puck.
- PGlite.
- Rete.
- Refine for Administration.

AI:
AI SDK + @ai-sdk/google.
Gemini default.
Draft/Preview/Diff/Apply.
AI Elements for standard streaming/tool/plan UI.

Export targets — all Core:
local-project, react-web, static-web, pwa, android-expo, ios-expo, capacitor, lamp, wordpress.

Export:
one TargetRegistry, one Capability Analyzer, one Export Target Contract.

LAMP:
Slim 4 + PSR-7 + Slim-CSRF + PDO + MySQL/MariaDB.

WordPress:
Block Theme + Companion Plugin, native WP APIs.

No optional export category.
