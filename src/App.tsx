import React, { useState, useCallback, useRef } from 'react'
import ReactFlow, {
  Node,
  NodeProps,
  addEdge,
  Background,
  Controls,
  XYPosition,
  useNodesState,
  useEdgesState,
  ReactFlowInstance,
  ReactFlowProvider
} from 'react-flow-renderer';

import './App.css';

import GraphMiniMap from './controls/GraphMiniMap';
import Sidebar from './sidebar/Index';

import { getGraph } from './utils/api';

// 默认加载空的节点数据
const { nodes: initialNodes, edges: initialEdges } = { nodes: [], edges: [] };

function Graph() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [reactFlowInstance, setReactFlowInstance] = useState<ReactFlowInstance>();

  const onInit = (_reactFlowInstance: ReactFlowInstance) => {
    setReactFlowInstance(_reactFlowInstance)
    getGraph('0', (graph: any) => {
      setNodes(graph.nodes);
      setEdges(graph.edges);
    })
  }

  const onConnect = useCallback((params) => 
    setEdges((eds) => addEdge(params, eds)), [])

  // Drag to add nodes
  let id = 0;
  let getId = () => `node_${id++}`;
  const reactFlowWrapper = useRef(null);
  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, [])
  const onDrop = useCallback(
    (event) => {
      event.preventDefault();

      // check if the dropped element is valid
      const type = event.dataTransfer.getData('application/reactflow');
      if (typeof type === 'undefined' || !type) {
        return;
      }

      const position = reactFlowInstance?.project({
        x: event.clientX,
        y: event.clientY,
      }) as XYPosition;

      const newNode: Node = {
        id: getId(),
        type,
        position,
        data: { label: `${type} node` },
      };
      setNodes((nds) => nds.concat(newNode));
    },
    [reactFlowInstance]
  )

  return (
    <div className="graph-container">
      <ReactFlowProvider>
        <div className="graph-wrapper" ref={reactFlowWrapper}>
          <ReactFlow 
            nodes={nodes} 
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onInit={onInit}
            onConnect={onConnect}
            onDrop={onDrop}
            onDragOver={onDragOver}
            fitView
            defaultZoom={1.5}
            attributionPosition="bottom-right" >
            <GraphMiniMap />
          </ReactFlow>
        </div>
        <Sidebar nodes={nodes} setNodes={setNodes} setEdges={setEdges} />
      </ReactFlowProvider>
    </div>
  )
}

export default Graph
