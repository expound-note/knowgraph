import React, { useRef, useMemo } from 'react'
import { Handle, useUpdateNodeInternals, NodeProps } from 'react-flow-renderer'
import {
	makeMoveable,
	DraggableProps,
	ResizableProps,
	RotatableProps,
	Rotatable,
	Draggable,
	Resizable,
} from 'react-moveable'

const Moveable = makeMoveable<DraggableProps & ResizableProps & RotatableProps>([Draggable, Resizable, Rotatable])

export default function TextareaNode({
	id,
	data,
	selected,
	sourcePosition,
	targetPosition
}: NodeProps) {
	const nodeRef = useRef<HTMLDivElement>()
  	const updateNodeInternals = useUpdateNodeInternals()

  	const style = useMemo(
	    () => ({
			background: data.color,
			borderRadius: 20,
			padding: 10,
	    }), [data.color])

  	const onResize = ({ drag, width, height }) => {
	    if (!nodeRef.current) { return }

	    nodeRef.current.style.width = `${width}px`
	    nodeRef.current.style.height = `${height}px`
	    nodeRef.current.style.transform = drag.transform
	}

	const onRotate = ({ transform }) => {
	    if (!nodeRef.current) { return }

	    nodeRef.current.style.transform = transform
	    updateNodeInternals(id)
	}

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
		            defaultValue={data.text} />

		        <Handle position={sourcePosition} type="source" />
        		<Handle position={targetPosition} type="target" />
			</div>
		</>
	)
}