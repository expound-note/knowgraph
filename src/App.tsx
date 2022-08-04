import React, { useState, useCallback, useEffect, useRef } from 'react'
import ReactFlow, {
  Node,
  Edge,
  Connection,
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
} from 'react-flow-renderer'

import './app.css'

import GraphMiniMap from './controls/GraphMiniMap'
import GraphToolbar from './controls/GraphToolbar'
import DagreTree from './controls/DagreTree'
import Sidebar from './sidebar/Index'
import Custom from './custom/Index'

import { getGraph } from './utils/api'

// Connecttion Validation
const onConnectStart = (_:any, { nodeId, handleType } : any) => console.log('on connect start', { nodeId, handleType })
const onConnectStop = (event: any) => console.log('on connect stop', event)
const onConnectEnd = (event: any) => console.log('on connect end', event)

function Graph() {
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [reactFlowInstance, setReactFlowInstance] = useState<ReactFlowInstance>();
  const [nowSelectedNode, setNowSelectedNode] = useState();

  const onInit = (_reactFlowInstance: ReactFlowInstance) => {
    setReactFlowInstance(_reactFlowInstance)
    getGraph('0', (graph: any) => {
      setNodes(graph.nodes);
      setEdges(graph.edges);
    })
  }

  const onConnect = useCallback((params) => 
    setEdges((eds) => addEdge(params, eds)), [])

  const onNodeSelect = useCallback((event, node) => {
    console.log(event, node)
    setNowSelectedNode(node)
  }, [])

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
  const getNodeId = () => `NODE_ID_${+new Date()}`;
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
      }) as XYPosition

      let style = undefined
      if (type === 'group') {
        style = { backgroundColor: 'rgba(255, 0, 0, 0.2)', width: 200, height: 200 }
      }

      const newNode: Node = {
        id: getNodeId(),
        type,
        position,
        data: { label: `${type} node` },
        style: style
      }

      // console.log(nowSelectedNode)
      // if (nowSelectedNode && nowSelectedNode?.type === 'group') {
      //   newNode.parentNode = nowSelectedNode.id
      // }

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
            onNodeClick={onNodeSelect}
            onDrop={onDrop}
            onDragOver={onDragOver}
            onConnectStart={onConnectStart}
            onConnectStop={onConnectStop}
            onConnectEnd={onConnectEnd}
            className="validationflow"
            fitView
            attributionPosition="bottom-right" >
            <GraphMiniMap />
            <GraphToolbar />

            <DagreTree nodes={nodes} edges={edges} />
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
