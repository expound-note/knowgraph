import React, { useState, useCallback, useEffect, useRef } from 'react'
import ReactFlow, {
  Node,
  NodeProps,
  addEdge,
  updateEdge,
  Background,
  Controls,
  XYPosition,
  useNodesState,
  useEdgesState,
  ReactFlowInstance,
  ReactFlowProvider
} from 'react-flow-renderer';

import './app.css';

import GraphMiniMap from './controls/GraphMiniMap';
import Sidebar from './sidebar/Index';
// 引入自定义 Node / Edge / Connection
import Custom from './custom/Index';

import { getGraph } from './utils/api';

// 默认加载空的节点数据
const { nodes: initialNodes, edges: initialEdges } = { nodes: [], edges: [] };

function Graph() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [reactFlowInstance, setReactFlowInstance] = useState<ReactFlowInstance>();
  const [nowSelectedNode, setNowSelectedNode] = useState<Node>();

  const onInit = (_reactFlowInstance: ReactFlowInstance) => {
    setReactFlowInstance(_reactFlowInstance)
    getGraph('0', (graph: any) => {
      setNodes(graph.nodes);
      setEdges(graph.edges);
    })
  }

  const onConnect = useCallback((params) => 
    setEdges((eds) => addEdge(params, eds)), [])

  // 更新及删除 Edge
  // gets called after end of edge gets dragged to another source or target
  const edgeUpdateSuccessful = useRef(true)
  const onEdgeUpdate = (oldEdge: Edge, newConnection: Connection) => 
    setEdges((els) => updateEdge(oldEdge, newConnection, els));
  const onEdgeUpdateStart = useCallback(() => {
    edgeUpdateSuccessful.current = false;
  }, [])
  const onEdgeUpdateEnd = useCallback((_, edge) => {
    if (!edgeUpdateSuccessful.current) {
      setEdges((eds) => eds.filter((e) => e.id !== edge.id));
    }
    edgeUpdateSuccessful.current = true;
  }, [])


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
            nodeTypes={Custom.nodeTypes}
            edgeTypes={Custom.edgeTypes}
            onEdgeUpdate={onEdgeUpdate}
            onEdgeUpdateStart={onEdgeUpdateStart}
            onEdgeUpdateEnd={onEdgeUpdateEnd}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onInit={onInit}
            onConnect={onConnect}
            onNodeClick={(event, node) => setNowSelectedNode(node)}
            onDrop={onDrop}
            onDragOver={onDragOver}
            fitView
            attributionPosition="bottom-right" >
            <GraphMiniMap />
          </ReactFlow>
        </div>
        <Sidebar 
          nodes={nodes}
          selectedNode={nowSelectedNode}
          setNodes={setNodes} 
          setEdges={setEdges} />
      </ReactFlowProvider>
    </div>
  )
}

export default Graph
