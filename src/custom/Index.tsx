// Custom Nodes
import ColorSelector from './nodes/colorSelector';
import DragHandle from './nodes/DragHandle';

// Custom Edges
import Text from './edges/TextEdge';
import Button from './edges/ButtonEdge';
import Floating from './edges/FloatingEdge';


const custom = {
	nodeTypes: {
		'colorSelector': ColorSelector,
		'dragHandle': DragHandle,
	},
	edgeTypes: {
		'text': Text,
		'button': Button,
		'floating': Floating,
	},
}

export default custom;