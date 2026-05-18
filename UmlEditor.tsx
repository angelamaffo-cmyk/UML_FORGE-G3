"use client";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import ReactFlow, {
  Background, Controls, MiniMap, addEdge, applyNodeChanges, applyEdgeChanges,
  Connection, Edge, Node, NodeChange, EdgeChange, MarkerType, ReactFlowProvider,
} from "reactflow";
import "reactflow/dist/style.css";
import { ClassNode } from "@/components/ClassNode";
import { RelationEdge } from "@/components/RelationEdge";
import type { UmlClass, UmlRelation, UmlModel, UmlAttribute } from "@/lib/uml";
import { Plus, Trash2, Save, Download, FileCode2, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useLang } from "@/lib/i18n";

const nodeTypes = { umlClass: ClassNode };
const edgeTypes = { relation: RelationEdge };

const CARDS = ["1", "0..1", "*", "1..*", "0..*"];
const REL_TYPES: UmlRelation["type"][] = ["association", "composition", "aggregation", "inheritance"];

const STR = {
  fr: {
    back: "Retour",
    toolbox: "Boîte à outils",
    addClass: "Ajouter une classe",
    delete: "Supprimer",
    save: "Enregistrer",
    export: "Exporter",
    genSql: "Générer du SQL",
    exportJson: "Exporter en JSON",
    tips: "Astuces",
    tipsItems: [
      "Glissez depuis une poignée pour créer une relation",
      "Cliquez sur une arête pour changer la multiplicité",
      "Maintenez Espace pour déplacer",
    ],
    properties: "Propriétés",
    empty: "Sélectionnez une classe ou une relation pour modifier ses propriétés.",
    name: "Nom",
    attributes: (n: number) => `Attributs (${n})`,
    methods: (n: number) => `Méthodes (${n})`,
    add: "Ajouter",
    relType: "Type de relation",
    label: "Libellé",
    labelPh: "ex. possède",
    sourceMult: "Mult. source",
    targetMult: "Mult. cible",
    multHint: <>Utilisez <span className="font-mono">1</span>, <span className="font-mono">0..1</span>, <span className="font-mono">*</span> ou <span className="font-mono">1..*</span> pour modéliser les multiplicités UML. Les relations M-N génèrent automatiquement des tables de jointure à l'export SQL.</>,
    pk: "PK", unique: "Unique", nullable: "Nullable",
  },
  en: {
    back: "Back",
    toolbox: "Toolbox",
    addClass: "Add Class",
    delete: "Delete",
    save: "Save",
    export: "Export",
    genSql: "Generate SQL",
    exportJson: "Export JSON",
    tips: "Tips",
    tipsItems: [
      "Drag from a handle to create a relation",
      "Click an edge to change multiplicity",
      "Hold Space to pan",
    ],
    properties: "Properties",
    empty: "Select a class or relation to edit its properties.",
    name: "Name",
    attributes: (n: number) => `Attributes (${n})`,
    methods: (n: number) => `Methods (${n})`,
    add: "Add",
    relType: "Relation type",
    label: "Label",
    labelPh: "e.g. owns",
    sourceMult: "Source mult.",
    targetMult: "Target mult.",
    multHint: <>Use <span className="font-mono">1</span>, <span className="font-mono">0..1</span>, <span className="font-mono">*</span> or <span className="font-mono">1..*</span> to model UML multiplicities. M-N relations auto-generate join tables when exporting SQL.</>,
    pk: "PK", unique: "Unique", nullable: "Nullable",
  },
};

export type EditorProps = {
  initial?: UmlModel;
  onChange?: (m: UmlModel) => void;
  onSave?: (m: UmlModel) => void;
};

function toFlow(m: UmlModel): { nodes: Node[]; edges: Edge[] } {
  const nodes: Node[] = m.classes.map(c => ({
    id: c.id, type: "umlClass", position: { x: c.x ?? 100, y: c.y ?? 100 }, data: c,
  }));
  const edges: Edge[] = m.relations.map(r => ({
    id: r.id, source: r.source, target: r.target, type: "relation",
    markerEnd: r.type === "inheritance" ? { type: MarkerType.Arrow, width: 22, height: 22 } : { type: MarkerType.ArrowClosed, width: 18, height: 18 },
    data: { sourceCardinality: r.sourceCardinality, targetCardinality: r.targetCardinality, relType: r.type, label: r.label },
  }));
  return { nodes, edges };
}
function fromFlow(nodes: Node[], edges: Edge[]): UmlModel {
  return {
    classes: nodes.map(n => ({ ...(n.data as UmlClass), x: n.position.x, y: n.position.y })),
    relations: edges.map(e => ({
      id: e.id, source: e.source, target: e.target,
      sourceCardinality: e.data?.sourceCardinality || "1",
      targetCardinality: e.data?.targetCardinality || "*",
      type: e.data?.relType || "association",
      label: e.data?.label,
    })),
  };
}

function EditorInner({ initial, onChange, onSave }: EditorProps) {
  const { lang } = useLang(); const t = STR[lang];
  const seed = useMemo(() => toFlow(initial || { classes: [], relations: [] }), [initial]);
  const [nodes, setNodes] = useState<Node[]>(seed.nodes);
  const [edges, setEdges] = useState<Edge[]>(seed.edges);
  const [selectedNode, setSelectedNode] = useState<string | null>(null);
  const [selectedEdge, setSelectedEdge] = useState<string | null>(null);
  const counter = useRef(seed.nodes.length);

  useEffect(() => { onChange?.(fromFlow(nodes, edges)); }, [nodes, edges, onChange]);

  const onNodesChange = useCallback((c: NodeChange[]) => setNodes(ns => applyNodeChanges(c, ns)), []);
  const onEdgesChange = useCallback((c: EdgeChange[]) => setEdges(es => applyEdgeChanges(c, es)), []);
  const onConnect = useCallback((c: Connection) => {
    setEdges(es => addEdge({
      ...c, id: "e_" + Math.random().toString(36).slice(2,8), type: "relation",
      markerEnd: { type: MarkerType.ArrowClosed, width: 18, height: 18 },
      data: { sourceCardinality: "1", targetCardinality: "*", relType: "association" },
    }, es));
  }, []);

  const addClass = () => {
    counter.current++;
    const id = "c_" + Math.random().toString(36).slice(2,8);
    const cls: UmlClass = {
      id, name: `Class${counter.current}`,
      attributes: [{ name: "id", type: "UUID", pk: true }],
      methods: [],
      x: 120 + Math.random()*200, y: 100 + Math.random()*150,
    };
    setNodes(ns => [...ns, { id, type: "umlClass", position: { x: cls.x!, y: cls.y! }, data: cls }]);
    setSelectedNode(id);
  };

  const deleteSelected = () => {
    if (selectedNode) {
      setNodes(ns => ns.filter(n => n.id !== selectedNode));
      setEdges(es => es.filter(e => e.source !== selectedNode && e.target !== selectedNode));
      setSelectedNode(null);
    }
    if (selectedEdge) {
      setEdges(es => es.filter(e => e.id !== selectedEdge));
      setSelectedEdge(null);
    }
  };

  const updateNode = (id: string, patch: Partial<UmlClass>) => {
    setNodes(ns => ns.map(n => n.id === id ? { ...n, data: { ...(n.data as UmlClass), ...patch } } : n));
  };
  const updateEdge = (id: string, patch: Record<string, any>) => {
    setEdges(es => es.map(e => e.id === id ? { ...e, data: { ...(e.data || {}), ...patch }, markerEnd: patch.relType === "inheritance" ? { type: MarkerType.Arrow, width:22, height:22 } : e.markerEnd } : e));
  };

  const node = nodes.find(n => n.id === selectedNode);
  const edge = edges.find(e => e.id === selectedEdge);

  return (
    <div className="grid h-[calc(100vh-4rem)] grid-cols-[260px_1fr_320px]">
      <aside className="border-r border-border bg-card p-4 overflow-y-auto">
        <Link href="/dashboard" className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground mb-4"><ArrowLeft className="h-3 w-3"/> {t.back}</Link>
        <h3 className="text-xs font-bold uppercase tracking-widest text-muted-foreground">{t.toolbox}</h3>
        <div className="mt-3 space-y-2">
          <button onClick={addClass} className="flex w-full items-center gap-2 rounded-md bg-accent px-3 py-2.5 text-sm font-medium text-accent-foreground hover:opacity-90 transition"><Plus className="h-4 w-4"/> {t.addClass}</button>
          <button onClick={deleteSelected} disabled={!selectedNode && !selectedEdge} className="flex w-full items-center gap-2 rounded-md border border-border bg-card px-3 py-2.5 text-sm hover:bg-surface disabled:opacity-40"><Trash2 className="h-4 w-4"/> {t.delete}</button>
          <button onClick={() => onSave?.(fromFlow(nodes, edges))} className="flex w-full items-center gap-2 rounded-md border border-border bg-card px-3 py-2.5 text-sm hover:bg-surface"><Save className="h-4 w-4"/> {t.save}</button>
        </div>
        <h3 className="mt-6 text-xs font-bold uppercase tracking-widest text-muted-foreground">{t.export}</h3>
        <div className="mt-3 space-y-2">
          <Link href="/export-sql" className="flex items-center gap-2 rounded-md border border-border bg-card px-3 py-2.5 text-sm hover:bg-surface"><FileCode2 className="h-4 w-4"/> {t.genSql}</Link>
          <button onClick={() => downloadJSON(fromFlow(nodes,edges))} className="flex w-full items-center gap-2 rounded-md border border-border bg-card px-3 py-2.5 text-sm hover:bg-surface"><Download className="h-4 w-4"/> {t.exportJson}</button>
        </div>
        <div className="mt-6 rounded-md border border-border bg-surface p-3 text-xs text-muted-foreground">
          <div className="font-semibold text-foreground mb-1">{t.tips}</div>
          <ul className="space-y-1 list-disc list-inside">
            {t.tipsItems.map(ti => <li key={ti}>{ti}</li>)}
          </ul>
        </div>
      </aside>

      <main className="relative">
        <ReactFlow
          nodes={nodes} edges={edges}
          onNodesChange={onNodesChange} onEdgesChange={onEdgesChange} onConnect={onConnect}
          nodeTypes={nodeTypes} edgeTypes={edgeTypes}
          onNodeClick={(_,n) => { setSelectedNode(n.id); setSelectedEdge(null); }}
          onEdgeClick={(_,e) => { setSelectedEdge(e.id); setSelectedNode(null); }}
          onPaneClick={() => { setSelectedNode(null); setSelectedEdge(null); }}
          fitView proOptions={{ hideAttribution: true }}
        >
          <Background gap={20} size={1} />
          <Controls />
          <MiniMap pannable zoomable className="!bg-card" />
        </ReactFlow>
      </main>

      <aside className="border-l border-border bg-card p-4 overflow-y-auto">
        <h3 className="text-sm font-bold mb-4">{t.properties}</h3>
        {!node && !edge && <div className="text-xs text-muted-foreground italic">{t.empty}</div>}
        {node && <ClassProperties cls={node.data as UmlClass} onChange={p => updateNode(node.id, p)} t={t} />}
        {edge && <EdgeProperties edge={edge} onChange={p => updateEdge(edge.id, p)} t={t} />}
      </aside>
    </div>
  );
}

function ClassProperties({ cls, onChange, t }: { cls: UmlClass; onChange: (p: Partial<UmlClass>) => void; t: any }) {
  return (
    <div className="space-y-4">
      <Field label={t.name}><input value={cls.name} onChange={e => onChange({ name: e.target.value })} className="input"/></Field>
      <div>
        <SectionHeader title={t.attributes(cls.attributes.length)} addLabel={t.add} onAdd={() => onChange({ attributes: [...cls.attributes, { name: "field", type: "String" }] })} />
        <div className="space-y-2 mt-2">
          {cls.attributes.map((a, i) => (
            <div key={i} className="rounded-md border border-border bg-surface p-2 space-y-1">
              <div className="flex gap-1">
                <input value={a.name} onChange={e => updateAttr(cls, onChange, i, { name: e.target.value })} className="input flex-1 !py-1 text-xs"/>
                <input value={a.type} onChange={e => updateAttr(cls, onChange, i, { type: e.target.value })} className="input w-20 !py-1 text-xs"/>
                <button onClick={() => onChange({ attributes: cls.attributes.filter((_,j) => j!==i) })} className="text-muted-foreground hover:text-destructive px-1"><Trash2 className="h-3 w-3"/></button>
              </div>
              <div className="flex gap-3 text-[10px] text-muted-foreground">
                <label className="flex items-center gap-1"><input type="checkbox" checked={!!a.pk} onChange={e => updateAttr(cls, onChange, i, { pk: e.target.checked })}/>{t.pk}</label>
                <label className="flex items-center gap-1"><input type="checkbox" checked={!!a.unique} onChange={e => updateAttr(cls, onChange, i, { unique: e.target.checked })}/>{t.unique}</label>
                <label className="flex items-center gap-1"><input type="checkbox" checked={!!a.nullable} onChange={e => updateAttr(cls, onChange, i, { nullable: e.target.checked })}/>{t.nullable}</label>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div>
        <SectionHeader title={t.methods(cls.methods.length)} addLabel={t.add} onAdd={() => onChange({ methods: [...cls.methods, "method(): void"] })} />
        <div className="space-y-2 mt-2">
          {cls.methods.map((m, i) => (
            <div key={i} className="flex gap-1">
              <input value={m} onChange={e => { const next=[...cls.methods]; next[i]=e.target.value; onChange({ methods: next }); }} className="input flex-1 !py-1 text-xs font-mono"/>
              <button onClick={() => onChange({ methods: cls.methods.filter((_,j)=>j!==i) })} className="text-muted-foreground hover:text-destructive px-1"><Trash2 className="h-3 w-3"/></button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function updateAttr(cls: UmlClass, onChange: (p: Partial<UmlClass>) => void, i: number, patch: Partial<UmlAttribute>) {
  const next = [...cls.attributes]; next[i] = { ...next[i], ...patch }; onChange({ attributes: next });
}

function EdgeProperties({ edge, onChange, t }: { edge: Edge; onChange: (p: any) => void; t: any }) {
  const d = edge.data || {};
  return (
    <div className="space-y-4">
      <Field label={t.relType}>
        <select value={d.relType || "association"} onChange={e => onChange({ relType: e.target.value })} className="input">
          {REL_TYPES.map(rt => <option key={rt} value={rt}>{rt}</option>)}
        </select>
      </Field>
      <Field label={t.label}><input value={d.label || ""} onChange={e => onChange({ label: e.target.value })} className="input" placeholder={t.labelPh}/></Field>
      <div className="grid grid-cols-2 gap-3">
        <Field label={t.sourceMult}>
          <select value={d.sourceCardinality || "1"} onChange={e => onChange({ sourceCardinality: e.target.value })} className="input">
            {CARDS.map(c => <option key={c}>{c}</option>)}
          </select>
        </Field>
        <Field label={t.targetMult}>
          <select value={d.targetCardinality || "*"} onChange={e => onChange({ targetCardinality: e.target.value })} className="input">
            {CARDS.map(c => <option key={c}>{c}</option>)}
          </select>
        </Field>
      </div>
      <div className="text-[10px] text-muted-foreground rounded-md bg-surface p-2 border border-border">
        {t.multHint}
      </div>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return <div><div className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground mb-1">{label}</div>{children}</div>;
}
function SectionHeader({ title, addLabel, onAdd }: { title: string; addLabel: string; onAdd: () => void }) {
  return (
    <div className="flex items-center justify-between">
      <div className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">{title}</div>
      <button onClick={onAdd} className="text-accent text-xs inline-flex items-center gap-1 hover:underline"><Plus className="h-3 w-3"/>{addLabel}</button>
    </div>
  );
}
function downloadJSON(m: UmlModel) {
  const blob = new Blob([JSON.stringify(m, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a"); a.href = url; a.download = "diagram.json"; a.click();
  URL.revokeObjectURL(url);
}

export function UmlEditor(props: EditorProps) {
  return (
    <>
      <style jsx global>{`
        .input { width:100%; border-radius:6px; border:1px solid var(--color-border); background:var(--color-background); padding:6px 8px; font-size:13px; outline:none; transition:box-shadow .15s; }
        .input:focus { box-shadow: 0 0 0 2px color-mix(in oklab, var(--color-accent) 50%, transparent); }
      `}</style>
      <ReactFlowProvider><EditorInner {...props} /></ReactFlowProvider>
    </>
  );
}
