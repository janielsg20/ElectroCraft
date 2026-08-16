/**
 * @electrocraft/domain
 * Núcleo de lógica de negocio y tipos canónicos.
 * Sin dependencias de frameworks o UI.
 */

export interface ElectroProject {
  id: string;
  name: string;
  screens: any[];
  dataSources: any[];
}
