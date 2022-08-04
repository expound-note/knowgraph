import React, { memo, useEffect, useState } from 'react'
import {
	ReactFlowState,
	useStoreApi,
	PanOnScrollMode
} from 'react-flow-renderer'

const GraphToolbar = () => {
	const store = useStoreApi();

	// 节点是否可以被拖动
	const [isDraggable, setIsDraggable] = useState(true)
	const onIsDraggableChecked = (event: any) => {
		setIsDraggable(event.target.checked)

		store.setState({
			nodesDraggable: event.target.checked
		})
	}

	// 节点是否可以被选中 ☑️
	const [isSelectable, setIsSelectable] = useState(true)
	const onIsSelectableChecked = (event: any) => {
		setIsSelectable(event.target.checked)

		store.setState({
			elementsSelectable: event.target.checked
		})
	}

	// 节点是否可以被连接 🔗
	const [isConnectable, setIsConnectable] = useState(true)
	const onIsConnectableChecked = (event: any) => {
		setIsSelectable(event.target.checked)

		store.setState({
			nodesConnectable: event.target.checked
		})
	}

	// Allow scoll to zoom
	const [zoomOnScroll, setZoomOnScroll] = useState(true)
	const onZoomOnScrollChecked = (value: boolean) => {
		setZoomOnScroll(value)
		// store.setState({zoomOnScroll: value})
	}

	// Allow scoll to pan
	const [panOnScroll, setPanOnScroll] = useState(true)
	const [panOnScrollMode, setPanOnScrollMode] = useState(PanOnScrollMode.Free)
	const onPanOnScrollChecked = (value: boolean) => {
		setPanOnScroll(value)
		// store.setState({ panOnScroll: value })
	}
	const onPanOnScrollModeSelected = (value: PanOnScrollMode) => {
		setPanOnScrollMode(value)
		// store.setState({ panOnScrollMode: value })
	}

	// 是否开启双击放大的选项
	const [zoomOnDoubleClick, setZoomOnDoubleClick] = useState(false)
	const onZoomOnDoubleClick = (value: boolean) => {
		setZoomOnDoubleClick(value)
		// store.setState({ zoomOnDoubleClick: value })
	}

	// panOnDrag
	const [panOnDrag, setPanOnDrag] = useState(false)
	const onPanOnDragChecked = (value: boolean) => {
		setPanOnDrag(value)
		// store.setState({ panOnDrag: value })
	}

	return <div className="toolbar">
		<div>
          	<label htmlFor="draggable">
	            <input
					id="draggable"
					type="checkbox"
					checked={isDraggable}
					onChange={onIsDraggableChecked}
					className="react-flow__draggable" />
            		nodesDraggable
          	</label>
        </div>
        <div>
          	<label htmlFor="connectable">
	            <input
					id="connectable"
					type="checkbox"
					checked={isSelectable}
					onChange={onIsSelectableChecked}
					className="react-flow__connectable" />
	            	elementsSelectable
          	</label>
        </div>
        <div>
          	<label htmlFor="connectable">
				<input
					id="connectable"
					type="checkbox"
					checked={isConnectable}
					onChange={onIsConnectableChecked}
					className="react-flow__connectable" />
            		nodesConnectable
          	</label>
        </div>
        <div>
          	<label htmlFor="zoomonscroll">
	            <input
	              id="zoomonscroll"
	              type="checkbox"
	              checked={zoomOnScroll}
	              onChange={(event: any) => onZoomOnScrollChecked(event.target.checked)}
	              className="react-flow__zoomonscroll" />
            		zoomOnScroll
          	</label>
        </div>
        <div>
          <label htmlFor="panonscroll">
            <input
              id="panonscroll"
              type="checkbox"
              checked={panOnScroll}
              onChange={(event: any) => onPanOnScrollChecked(event.target.checked)}
              className="react-flow__panonscroll"
            />
            panOnScroll
          </label>
        </div>
        <div>
          <label htmlFor="panonscrollmode">
            <select
              id="panonscrollmode"
              value={panOnScrollMode}
              onChange={(event: any) => onPanOnScrollModeSelected(event.target.value as PanOnScrollMode) }
              className="react-flow__panonscrollmode"
            >
              <option value="free">free</option>
              <option value="horizontal">horizontal</option>
              <option value="vertical">vertical</option>
            </select>
            panOnScrollMode
          </label>
        </div>
        <div>
          	<label htmlFor="zoomondbl">
	            <input
					id="zoomondbl"
					type="checkbox"
					checked={zoomOnDoubleClick}
					onChange={(event: any) => onZoomOnDoubleClick(event.target.checked)}
					className="react-flow__zoomondbl" />
	            	zoomOnDoubleClick
          	</label>
        </div>
        <div>
			<label htmlFor="panOnDrag">
				<input
					id="panOnDrag"
					type="checkbox"
					checked={panOnDrag}
					onChange={(event: any) => onPanOnDragChecked(event.target.checked)}
					className="react-flow__panOnDrag" />
					panOnDrag
			</label>
        </div>
	</div>
}

export default memo(GraphToolbar)