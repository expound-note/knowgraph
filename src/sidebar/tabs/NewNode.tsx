import React from 'react'

export default () => {
	const onDragStart = (event: any, nodeType: string) => {
    event.dataTransfer.setData('application/reactflow', nodeType);
    event.dataTransfer.effectAllowed = 'move';
  }

	return <div role="tabpanel" aria-labelledby="StyleNode">
    <div className="description">Drag these nodes to the pane.</div>
    <div className="dndnode input" onDragStart={(event) => onDragStart(event, 'input')} draggable>
      Input Node
    </div>
    <div className="dndnode" onDragStart={(event) => onDragStart(event, 'default')} draggable>
      Default Node
    </div>
    <div className="dndnode output" onDragStart={(event) => onDragStart(event, 'output')} draggable>
      Output Node
    </div>
    <div className="dndnode" onDragStart={(event) => onDragStart(event, 'contextualZoom')} draggable>
      Zoom Node
    </div>
    <div className="dndnode" onDragStart={(event) => onDragStart(event, 'textarea')} draggable>
      Textarea Node
    </div>
    <div className="dndnode" onDragStart={(event) => onDragStart(event, 'flowshape')} draggable>
      Flow Shape Node
    </div>
    <div className="dndnode" onDragStart={(event) => onDragStart(event, 'group')} draggable>
      Group Node
    </div>
	</div>
} 