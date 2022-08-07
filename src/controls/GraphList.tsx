import React, { useState, useEffect, useCallback } from 'react'
import { 
  useReactFlow
} from 'react-flow-renderer'

import './graph_list.css'

const graphkey = 'graph_list'
const list = JSON.parse(localStorage.getItem(graphkey as string)) || []

const saveToLocalStorage = (current, data)  => {
	if(current !== '') {
		localStorage.setItem('CURRENT_GRAPH_NAME', current)
	}
	localStorage.setItem(graphkey, JSON.stringify(data))
}

function SelectedIcon(props) {
	if (props.selected) {
		return (<span>✅</span>)
	}  else  {
		return (<span></span>)
	}
}
function ListComponent(props) {
	const graphs = props.graphs
	const handleClick = useCallback((event, graph) => { 
		props.onSelect(graph, graphs)
	}, [graphs])

	useEffect(() => {
    graphs.forEach((graph) => {
    	if(graph.selected) {
    		setTimeout(() => {
    			props.onSelect(graph,graphs)
    		},200)
    	}
    })
  }, [])

	const onRemove = useCallback((event, graph) => { 
		props.onRemove(graph, graphs)
	}, [graphs])
	const updateGraphDisplayName = useCallback((event, graph) => {
		graph.displayName = event.target.value
		props.updateGraphsList(graph)
	}, [graphs])

	const list = graphs.map((graph) => 
			<li key={graph.name}>
				<input value={graph.displayName} onChange={event => updateGraphDisplayName(event, graph)}/>
				<br />
				<SelectedIcon selected={graph.selected} /> 
				<span onClick={event => handleClick(event, graph)}>ID: {graph.name}</span>
				<span onClick={event => onRemove(event, graph)}>🗑️</span>
			</li>
	)
	return ( <div>
			<ul>{list}</ul>
			{/*<p onClick={props.clearAll}>Clear All</p>*/}
		</div>
	)
}

const GraphList = () => {
	const reactFlowInstance = useReactFlow()
	const { setNodes, setEdges, setViewport } = useReactFlow()
	const [graphList, setGraphList] = useState(list)
	
	const newGraph = () => {
		const key = `GRAPH_${+new Date()}`
  	const graph = {
  		name: key,
  		displayName: 'Untitled Graph',
  		selected: false
  	}
  	localStorage.setItem(key, JSON.stringify({
  		nodes: [],
  		edges: [],
  		viewport: { x: 0, y: 0, zoom: 1}
  	}))

  	graphList.push(graph)
    loadGraph(graph, graphList)
  }

  const loadGraph = (graph, data) => {
  	const newArr = []
		data.forEach(item => {
			item.selected = item.name === graph.name ? true : false
			newArr.push(item)
		})

		const flow = JSON.parse(localStorage.getItem(graph.name) as string)
		const { x = 0, y = 0, zoom = 1 } = flow.viewport
    setNodes(flow.nodes || [])
    setEdges(flow.edges || [])
    setViewport({ x, y, zoom })
	  
    setGraphList(newArr)
    saveToLocalStorage(graph.name, newArr)
  }

  const clearAll = ()  => {
  	setGraphList([])
  	saveToLocalStorage('', [])
  }

  const removeGraph = (graph, data) => {
  	const newArr = []
		data.forEach(item => {
			if (item.name !== graph.name) {
				newArr.push(item)
			}
		})

		if (newArr.length === 0) {
			clearAll()
		} else {
			if (graph.selected){
				// 移除元素后，默认加载第一个元素
				loadGraph(newArr[0], newArr)
			} else {
				setGraphList(newArr)
				localStorage.setItem(graphkey, JSON.stringify(newArr))
			}
		}

		if(localStorage.getItem(graph.name)) {
			localStorage.removeItem(graph.name)
		}
  }

  const updateGraph = (graph) => {
  	const newArr = []
		graphList.map((item) => {
			if (graph.name === item.name) {
				item.displayName = graph.displayName
			}
			newArr.push(item)
		})

		setGraphList(newArr)
		saveToLocalStorage('', newArr)
  }

	return (
		<div className="graph-list">
			<ListComponent 
				graphs={graphList} 
				onSelect={loadGraph}
				onRemove={removeGraph}
				updateGraphsList={updateGraph}
				clearAll={clearAll}/>
			<p><button onClick={newGraph}>New</button></p>
		</div>
	)
}

export default GraphList