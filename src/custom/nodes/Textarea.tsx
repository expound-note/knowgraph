import React, { useRef, useMemo, useState, useEffect } from 'react'
import { Handle, useUpdateNodeInternals, NodeProps, useReactFlow } from 'react-flow-renderer'
import {
	makeMoveable,
	DraggableProps,
	ResizableProps,
	RotatableProps,
	Rotatable,
	Draggable,
	Resizable,
} from 'react-moveable'

import { saveGraph } from '../../utils/api'

const Moveable = makeMoveable<ResizableProps & RotatableProps>([Resizable, Rotatable])

let delayDebounceFn
export default function TextareaNode({
	id,
	data,
	selected,
	sourcePosition,
	targetPosition
}: NodeProps) {
	const nodeRef = useRef<HTMLDivElement>()
  	const updateNodeInternals = useUpdateNodeInternals()
  	const reactFlowInstance = useReactFlow()
  	const [content, setContent] = useState(data.text)

  	const style = useMemo(
	    () => ({
			background: data.color,
			borderRadius: 6,
			padding: 0,
			height: '100%',
			transform: data.transform || ''
	    }), [data.color])

  	
  	const onResize = ({ drag, width, height }) => {
  		clearTimeout(delayDebounceFn)
	    if (!nodeRef.current) { return }

	    nodeRef.current.style.width = `${width}px`
	    nodeRef.current.style.height = `${height}px`
	    nodeRef.current.style.transform = drag.transform

	   	delayDebounceFn = setTimeout(() => {
		 	const graph = reactFlowInstance.toObject()
		 	graph.nodes.map((node: Node) => {
		 		if (node.id === id) {
			        node.style = {
			          ...node.style,
			          width: width+20,
			          height: height+20,
			        }
			    }
			    return node
		 	})
		 	saveGraph(graph)
		}, 1500)
	}

	const onRotate = ({ transform }) => {
	    if (!nodeRef.current) { return }
	    clearTimeout(delayDebounceFn)
	    nodeRef.current.style.transform = transform
	    updateNodeInternals(id)

	    delayDebounceFn = setTimeout(() => {
	    	const graph = reactFlowInstance.toObject()
	    	graph.nodes.map((node: Node) => {
		 		if (node.id === id) {
			        node.data = {
			          ...node.data,
			          transform: transform,
			        }
			    }
			    return node
		 	})
		 	saveGraph(graph)
		}, 1500)
	}

	useEffect(() => {
		if (!nodeRef.current) { return }

		const delayDebounceFn = setTimeout(() => {
		 	const graph = reactFlowInstance.toObject()
		 	graph.nodes.map((node: Node) => {
		 		if (node.id === id) {
			        node.data = {
			          ...node.data,
			          text: content,
			        }
			      }
			      return node
		 	})
		 	saveGraph(graph)
		}, 2000)

		return () => clearTimeout(delayDebounceFn)
	}, [content])

	return (
		<>
			<Moveable
		        className="nodrag"
		        resizable={selected}
		        rotatable={selected}
		        target={nodeRef}
		        onResize={onResize}
		        onRotate={onRotate}
		        hideDefaultLines />

			<div ref={nodeRef} style={style}>
				<textarea 
					style={{
						width: '100%',
						height: '100%',
						resize: 'none',
						backgroundColor: 'rgba(255, 255, 255, 0)',
						fontWeight: 'bold',
						color: 'white',
						padding: 5,
						fontSize: 22,
						boxSizing: 'border-box',
						outline: 'none',
						border: 'none',
		        	}}
		            defaultValue={content}
		            onChange={event => setContent(event.target.value)} />

		        <Handle position={sourcePosition} type="source" />
        		<Handle position={targetPosition} type="target" />
			</div>
		</>
	)
}