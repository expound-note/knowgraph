import React from 'react';
import { 
	MiniMap,
	Controls,
	Background,
	Node 
} from 'react-flow-renderer';

const nodeStrokeColor = (n: Node) => {
	if (n.style?.background) return n.style.background;
	if (n.type === 'input') return '#0041d0';
	if (n.type === 'output') return '#ff0072';
	if (n.type === 'default') return '#1a192b';

	return '#eee';
}

const nodeColor = (n: Node) => {
	if (n.style?.background) return n.style.background;

	return '#fff';
}

const GraphMiniMap = () => {
	return (
		<>
			<MiniMap
	     		nodeStrokeColor={nodeStrokeColor}
	     		nodeColor={nodeColor}
	      		nodeBorderRadius={2}
	    	/>
	    	<Controls />
	    	<Background color="#aaa" gap={16} />
		</>
    )
}

export default GraphMiniMap