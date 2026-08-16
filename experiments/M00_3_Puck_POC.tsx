/**
 * POC M00.3: Visual Editor con Puck Composition
 * Este archivo demuestra la integración de Puck con el modelo mental de ElectroCraft.
 */

import React from 'react';
// Simulación de tipos y componentes de Puck para propósitos de POC
// En una implementación real, esto vendría de @measured/puck

interface ElectroComponentProps {
  id: string;
  type: string;
  props: any;
}

interface ElectroDocument {
  content: ElectroComponentProps[];
}

// 1. Configuración de Puck mapeada a semántica ElectroCraft
const puckConfig = {
  components: {
    Section: {
      fields: {
        padding: { type: "number" },
      },
      render: ({ padding }: any) => (
        <section style={{ padding: `${padding}px`, border: '1px solid #ccc' }}>
          <h2>Sección</h2>
          {/* Puck Slot placeholder */}
          <div style={{ minHeight: '50px', background: '#f9f9f9' }}>Zona de contenido</div>
        </section>
      ),
    },
    Text: {
      fields: {
        text: { type: "text" },
      },
      render: ({ text }: any) => <p>{text}</p>,
    },
    Button: {
      fields: {
        label: { type: "text" },
        variant: { type: "select", options: ["primary", "secondary"] },
      },
      render: ({ label, variant }: any) => (
        <button className={`btn-${variant}`}>{label}</button>
      ),
    },
  },
};

// 2. Mock de la UI del Editor (Harness técnico)
export const PuckPOCEditor = () => {
  const [doc, setDoc] = React.useState<ElectroDocument>({
    content: [
      { id: '1', type: 'Section', props: { padding: 20 } },
      { id: '2', type: 'Text', props: { text: 'Hola ElectroCraft' } }
    ]
  });

  const handleSave = (data: any) => {
    // 5. Normalización: Extraer datos sin tipos internos de Puck
    const normalizedData = data.content.map((item: any) => ({
      type: item.type,
      props: item.props
    }));
    console.log("Documento Normalizado:", normalizedData);
    setDoc({ content: normalizedData });
  };

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 300px', gap: '20px', padding: '20px' }}>
      <div style={{ border: '2px dashed #000', padding: '20px' }}>
        <h3>Preview del Editor (Mock)</h3>
        {/* Aquí renderizaría <Puck config={puckConfig} data={doc} onPublish={handleSave} /> */}
        <div id="puck-canvas">
          {doc.content.map(item => (
            <div key={item.id}>
              {/* @ts-ignore */}
              {puckConfig.components[item.type]?.render(item.props)}
            </div>
          ))}
        </div>
      </div>

      <div style={{ background: '#eee', padding: '10px' }}>
        <h3>Inspector / Datos</h3>
        <pre>{JSON.stringify(doc, null, 2)}</pre>
        <p><i>POC Técnico: Validación de M00.3</i></p>
      </div>
    </div>
  );
};
