import { FunctionComponent } from 'react'

// Custom Nodes
import ColorSelector from './nodes/ColorSelector'
import DragHandle from './nodes/DragHandle'
import ContextualZoom from './nodes/ContextualZoom'
import Textarea from './nodes/Textarea'
import FlowShape from './nodes/FlowShape'

// Custom Edges
import Text from './edges/TextEdge'
import Button from './edges/ButtonEdge'
import Floating from './edges/FloatingEdge'

const custom = {
	nodeTypes: {
		'colorSelector': ColorSelector,
		'dragHandle': DragHandle,
		'contextualZoom': ContextualZoom,
		'textarea': Textarea as FunctionComponent,
		'flowshape': FlowShape
	},
	edgeTypes: {
		'text': Text,
		'button': Button,
		'floating': Floating,
	},
}

export default custom;