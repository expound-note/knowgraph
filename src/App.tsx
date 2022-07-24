import React, { useCallback } from 'react'
import ReactFlow, {
  addEdge,
  Background,
  MiniMap, 
  Controls,
  useNodesState,
  useEdgesState,
} from 'react-flow-renderer';

import { getGraph } from './utils/api';

// 默认加载空的节点数据
const { nodes: initialNodes, edges: initialEdges } = { nodes: [], edges: [] };

function App() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const onInit = (_reactFlowInstance) =>  {
    console.log('🚀 Graph loaded success :', _reactFlowInstance);

    let id = 0;
    getGraph(id as string, (graph: any) => {
      setNodes(graph.nodes);
      setEdges(graph.edges);
    });
  }
  const onConnect = useCallback((params) => 
    setEdges((eds) => addEdge(params, eds)), []);

  return <ReactFlow 
    nodes={nodes} 
    edges={edges}
    onNodesChange={onNodesChange}
    onEdgesChange={onEdgesChange}
    onInit={onInit}
    // onConnect={onConnect}
    fitView
    attributionPosition="bottom-right">
    <MiniMap
      nodeStrokeColor={(n) => {
        if (n.style?.background) return n.style.background;
        if (n.type === 'input') return '#0041d0';
        if (n.type === 'output') return '#ff0072';
        if (n.type === 'default') return '#1a192b';

        return '#eee';
      }}
      nodeColor={(n) => {
        if (n.style?.background) return n.style.background;

        return '#fff';
      }}
      nodeBorderRadius={2}
    />
    <Controls />
    <Background color="#aaa" gap={16} />
  </ReactFlow>
}

export default App
