import React, { memo, useCallback } from 'react'
import dagre from 'dagre'
import { Node, Edge, Position, useReactFlow } from 'react-flow-renderer'

import './dagre_tree.css'

// Dagre Tree
const dagreGraph = new dagre.graphlib.Graph()
dagreGraph.setDefaultEdgeLabel(() => ({}))

const nodeWidth = 172
const nodeHeight = 36

const getLayoutedElements = (nodes: Array<Node>, edges: Array<Edge>, direction = 'TB') => {
  const isHorizontal = direction === 'LR'
  dagreGraph.setGraph({ rankdir: direction })

  nodes.forEach((node: Node) => {
    dagreGraph.setNode(node.id, { width: nodeWidth, height: nodeHeight });
  })

  edges.forEach((edge: Edge) => {
    dagreGraph.setEdge(edge.source, edge.target);
  })

  dagre.layout(dagreGraph)

  nodes.forEach((node: Node) => {
    const nodeWithPosition = dagreGraph.node(node.id)
    node.targetPosition = isHorizontal ? Position.Left : Position.Top
    node.sourcePosition = isHorizontal ? Position.Right : Position.Bottom

    // We are shifting the dagre node position (anchor=center center) to the top left
    // so it matches the React Flow node anchor point (top left).
    node.position = {
      x: nodeWithPosition.x - nodeWidth / 2,
      y: nodeWithPosition.y - nodeHeight / 2,
    }

    return node
  })

  return { nodes, edges }
}

const dagreGraphComponent = ({nodes, edges}: any) => {
	const { setNodes, setEdges, setViewport } = useReactFlow()

	const onLayout = useCallback(
		(direction) => {
			const { nodes: layoutedNodes, edges: layoutedEdges } = getLayoutedElements(
			  nodes,
			  edges,
			  direction)

			setNodes([...layoutedNodes])
			setEdges([...layoutedEdges])
			setViewport({ x: 200, y: 200, zoom: 1.5 }, { duration: 800 });
		},
		[nodes, edges]
	)

	return <div className="layoutflow-controls">
		<button onClick={() => onLayout('TB')}>vertical layout</button>
		<button onClick={() => onLayout('LR')}>horizontal layout</button>
    </div>
}

export default memo(dagreGraphComponent)