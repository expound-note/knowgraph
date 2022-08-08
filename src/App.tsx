import React, { useState, useCallback, useEffect, useRef } from 'react'
import ReactFlow, {
  Node,
  Edge,
  MarkerType,
  Connection,
  NodeProps,
  addEdge,
  updateEdge,
  Background,
  Controls,
  Position,
  XYPosition,
  useNodesState,
  useEdgesState,
  ReactFlowInstance,
  ReactFlowProvider
} from 'react-flow-renderer'

import './app.css'

import GraphMiniMap from './controls/GraphMiniMap'
import GraphToolbar from './controls/GraphToolbar'
import GraphList from './controls/GraphList'
import DagreTree from './controls/DagreTree'
import Sidebar from './sidebar/Index'
import Custom from './custom/Index'

import { getGraph, saveGraph } from './utils/api'

function Graph() {
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
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

  const onNodeDragStop = (event: React.MouseEvent, 
    node: Node, 
    nodes: Node[]) => {
    setTimeout(() => {
      saveGraph(reactFlowInstance.toObject())
    }, 200)
  }

  const onNodeSelect = (event: any, node: Node) => {
    setNowSelectedNode(node)
  }

  // Connecttion Validation
  const onConnectStart = (_:any, { nodeId, handleType } : any) => console.log('on connect start', { nodeId, handleType })
  const onConnectStop = (event: any) => console.log('on connect stop', event)
  const onConnectEnd = (event: any) => {
    console.log('on connect end', event)
    setTimeout(() => {
      saveGraph(reactFlowInstance.toObject())
    }, 200)
  }

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

  const isInsideNode = (node: Node, parentNode: Node) => {
    return node.position.x > parentNode.position.x 
      && node.position.x < parentNode.position.x + Number(parentNode.style?.width || 0)
      && node.position.y > parentNode.position.y
      && node.position.y < parentNode.position.y + Number(parentNode.style?.height || 0)
  }

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

      const newNode: Node = {
        id: getNodeId(),
        type,
        position,
        data: { label: `${type} node` }
      }

      if (type === 'dynmicGroup') {
        newNode.style = { width: 200, height: 200 }
      }

      if (type === 'textarea') {
        newNode.data = {
          text: 'Type here...', 
          color: '#ff6700', 
          rotation: 20,
        }
      }

      if (type === 'flowshape') {
        newNode.data = { 
          shape: 'round-rect', 
          width: 150, 
          height: 50, 
          label: 'Round Rectangle', 
          color: '#668de3' 
        }
      }

      nodes.every((node: Node) => {
        if (node.type === 'dynmicGroup' && isInsideNode(newNode, node)) {
          newNode.parentNode = node.id
          newNode.extent = 'parent'

          // 计算相对位置
          console.log(newNode, node)
          const newNodeHeight = newNode?.height || newNode?.data?.height || 40
          const newNodeWidth = newNode?.width || newNode?.data?.weight || 150
          newNode.position.x = newNode.position.x - node.position.x - newNodeWidth/2
          newNode.position.y = newNode.position.y - node.position.y - newNodeHeight/2
          return false
        }

        return true
      })

      setNodes((nds) => nds.concat(newNode))

      setTimeout(() => {
        saveGraph(reactFlowInstance.toObject())
      }, 200)
    },
    [reactFlowInstance, nodes]
  )

  const defaultEdgeOptions = {
    style: { strokeWidth: 1, stroke: '#9ca8b3' },
    markerEnd: {
      type: MarkerType.ArrowClosed,
    },
  }

  const proOptions = { account: 'paid-pro', hideAttribution: true }
  return (
    <div className="graph-container">
      <ReactFlowProvider>
        <div className="graph-wrapper" ref={reactFlowWrapper}>
          <ReactFlow 
            nodes={nodes} 
            edges={edges}
            defaultEdgeOptions={defaultEdgeOptions}
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
            onNodeDragStop={onNodeDragStop}
            onDrop={onDrop}
            onDragOver={onDragOver}
            onConnectStart={onConnectStart}
            onConnectStop={onConnectStop}
            onConnectEnd={onConnectEnd}
            className="validationflow"
            fitView
            defaultZoom={1}
            proOptions={proOptions} >
            <GraphMiniMap />
            <GraphToolbar />
            <GraphList />
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
