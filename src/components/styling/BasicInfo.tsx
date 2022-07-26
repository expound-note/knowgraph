import React, { useState, useEffect } from 'react'
import { Divider } from "@fluentui/react-components"

export default ({ setNodes, setEdges }: any) => {
	const [nodeName, setNodeName] = useState('Node 1')
	const [nodeBg, setNodeBg] = useState('#fff')
	const [nodeHidden, setNodeHidden] = useState(false)

	useEffect(() => {
    setNodes((nds) => nds.map((node) => {
      if (node.id === '1') {
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
    setNodes((nds) =>
      nds.map((node) => {
        if (node.id === '1') {
          // it's important that you create a new object here
          // in order to notify react flow about the change
          node.style = { ...node.style, backgroundColor: nodeBg };
        }

        return node;
      })
    );
  }, [nodeBg, setNodes]);

  useEffect(() => {
    setNodes((nds) =>
      nds.map((node) => {
        if (node.id === '1') {
          // when you update a simple type you can just update the value
          node.hidden = nodeHidden;
        }

        return node;
      })
    );
    setEdges((eds) =>
      eds.map((edge) => {
        if (edge.id === 'e1-2') {
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