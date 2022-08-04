// Custom Nodes
import ColorSelector from './nodes/ColorSelector'
import DragHandle from './nodes/DragHandle'
import ContextualZoom from './nodes/ContextualZoom'

// Custom Edges
import Text from './edges/TextEdge'
import Button from './edges/ButtonEdge'
import Floating from './edges/FloatingEdge'

const custom = {
	nodeTypes: {
		'colorSelector': ColorSelector,
		'dragHandle': DragHandle,
		'contextualZoom': ContextualZoom,
	},
	edgeTypes: {
		'text': Text,
		'button': Button,
		'floating': Floating,
	},
}

export default custom;