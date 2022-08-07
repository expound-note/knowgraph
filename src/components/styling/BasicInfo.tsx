import React, { useEffect, useState } from 'react'
import { Node, Edge, useReactFlow } from 'react-flow-renderer';
import { Divider } from "@fluentui/react-components"

import { saveGraph } from '../../utils/api'

let currentNodeId = '0'
export default ({ selectedNode, setNodes, setEdges }: any) => {
  const reactFlowInstance = useReactFlow()
  const [nodeName, setNodeName] = useState('')
  const [nodeBg, setNodeBg] = useState('#fff')
  const [nodeHeight, setNodeHeight] = useState(0)
  const [nodeWidth, setNodeWidth] = useState(0)
  const [nodeHidden, setNodeHidden] = useState(false) 

  useEffect(() => {
    if (selectedNode === null || selectedNode === undefined)  return

    setNodeName(selectedNode.data?.label || selectedNode.data?.text)
    setNodeHeight(selectedNode.height)
    setNodeWidth(selectedNode.width)

    if (selectedNode.style) {

      // backgroundColor
      if (selectedNode.style.backgroundColor) {
        setNodeBg(selectedNode.style.backgroundColor)
      }
    }

    currentNodeId = selectedNode.id
  }, [selectedNode])

	useEffect(() => {
    if (nodeName === '') return;

    setNodes((nds: any) => nds.map((node: Node) => {
      if (node.id === currentNodeId) {
        node.data = {
          ...node.data,
          label: nodeName,
          text: nodeName,
        }

        node.style = {
          height: nodeHeight,
          width: nodeWidth,
          backgroundColor: nodeBg,
        }
       
      }
      return node
    }))
    
    const delayDebounceFn = setTimeout(() => { 
      saveGraph(reactFlowInstance.toObject())
    }, 2000)

    return () => clearTimeout(delayDebounceFn)
  }, [nodeName, nodeHeight, nodeWidth, nodeBg, setNodes])


	return <div className="basicinfo">
	  	<h5>Basic Node Info </h5>
	  	<label>label:</label><br />
      <textarea value={nodeName} onChange={(evt) => setNodeName(evt.target.value)} />
      <Divider />
      <label>Node Height:</label><br />
      <input value={nodeHeight} type="number" onChange={(evt) => setNodeHeight(Number(evt.target.value))} />
      <Divider />
      <label>Node Width:</label><br />
      <input value={nodeWidth} type="number" onChange={(evt) => setNodeWidth(Number(evt.target.value))} />
      <Divider />
      <label>background:</label><br />
      <input value={nodeBg} type="color" onChange={(evt) => setNodeBg(evt.target.value)} />
	</div>
}