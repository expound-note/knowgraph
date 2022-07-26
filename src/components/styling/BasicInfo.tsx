import React, { useEffect, useState } from 'react'
import { Node, Edge } from 'react-flow-renderer';
import { Divider } from "@fluentui/react-components"

let currentNodeId = '0'
export default ({ selectedNode, setNodes, setEdges }: any) => {
  const [nodeName, setNodeName] = useState('')
  const [nodeBg, setNodeBg] = useState('')
  const [nodeHidden, setNodeHidden] = useState(false) 

  useEffect(() => {
    if (selectedNode === null) return

    setNodeName(selectedNode.data.label)

    currentNodeId = selectedNode.id
    const bgColor = selectedNode.style && selectedNode.style.background
      ? selectedNode.style.background : '#fff'
    setNodeBg(bgColor)
  }, [selectedNode])

	useEffect(() => {
    setNodes((nds: any) => nds.map((node: Node) => {
      if (node.id === currentNodeId) {
        // it's important that you create a new object here
        // in order to notify react flow about the change
        node.data = {
          ...node.data,
          label: nodeName,
        };
      }
      return node;
    }));
  }, [nodeName, setNodes]);

	useEffect(() => {
    setNodes((nds: any) => nds.map((node: Node) => {
        if (node.id === currentNodeId) {
          // it's important that you create a new object here
          // in order to notify react flow about the change
          node.style = { ...node.style, backgroundColor: nodeBg };
        }

        return node;
      })
    );
  }, [nodeBg, setNodes]);

  useEffect(() => {
    setNodes((nds: any) =>
      nds.map((node: Node) => {
        if (node.id === currentNodeId) {
          // when you update a simple type you can just update the value
          node.hidden = nodeHidden;
        }

        return node;
      })
    );
    setEdges((eds: any) =>
      eds.map((edge: Edge) => {
        if (edge.source === currentNodeId || edge.target === currentNodeId) {
          edge.hidden = nodeHidden;
        }

        return edge;
      })
    );
  }, [nodeHidden, setNodes, setEdges])

	return <div className="basicinfo">
	  	<h5>Basic Node Info</h5>
	  	<label>label:</label><br />
      <input value={nodeName} onChange={(evt) => setNodeName(evt.target.value)} />
      <Divider />
      <label>background:</label><br />
      <input value={nodeBg} onChange={(evt) => setNodeBg(evt.target.value)} />
      <Divider />
      <div>
        <label>hidden:</label>
        <input
          type="checkbox"
          checked={nodeHidden}
          onChange={(evt) => setNodeHidden(evt.target.checked)}
        />
      </div>
	</div>
}