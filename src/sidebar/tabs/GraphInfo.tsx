import React, { useCallback  } from 'react'
import { 
	Node,
  useStore,
  useStoreApi,
  useReactFlow,
  ReactFlowState
} from 'react-flow-renderer'

const transformSelector = (state: ReactFlowState) => state.transform;

export default ({ nodes, setNodes }: any) => {
	const transform = useStore(transformSelector);

	const selectAll = useCallback(() => {
	  setNodes((nds: Node[]) =>
	    nds.map((node) => {
	      node.selected = true;
	      return node;
	    })
	  );
	}, [setNodes]);

	const store = useStoreApi();
	const reactFlowInstance = useReactFlow();
	const { zoomIn, zoomOut, setCenter, setViewport } = useReactFlow();

	const focusNode = () => {
	  const { nodeInternals } = store.getState();
	  const nodes: Node[] = Array.from(nodeInternals).map(([, node]) => node);

	  if (nodes.length > 0) {
	    const node = nodes[0];

	    const x = node.position.x + node.width! / 2;
	    const y = node.position.y + node.height! / 2;
	    const zoom = 1.85;

	    setCenter(x, y, { zoom, duration: 1000 });
	  }
	};

	const handleTransform = useCallback(
	  () => () => {
	    setViewport({ x: 0, y: 0, zoom: 1 }, { duration: 800 });
	  },
	  []
	);

	const zoomInNode = () => { zoomIn({ duration: 600}) }
	const zoomOutNode = () => { zoomOut({ duration: 600}) }

	// Graph 数据恢复与保存
	const flowKey = 'example-flow';

  const onSave = useCallback(() => {
    if (reactFlowInstance) {
      const flow = reactFlowInstance.toObject();
      localStorage.setItem(flowKey, JSON.stringify(flow));
    }
  }, [reactFlowInstance]);

  const onRestore = useCallback(() => {
    const restoreFlow = async () => {
      const flow = JSON.parse(localStorage.getItem(flowKey) as string);

      if (flow) {
        const { x = 0, y = 0, zoom = 1 } = flow.viewport;
        setNodes(flow.nodes || []);
        setEdges(flow.edges || []);
        setViewport({ x, y, zoom });
      }
    }

    restoreFlow();
  }, [setNodes, setViewport]);

	return <>
	  <div className="description">
	    This is an example of how you can access the internal state outside of the ReactFlow component.
	  </div>
	  <div className="title">Zoom & pan transform</div>
	  <div className="transform">
	    [{transform[0].toFixed(2)}, {transform[1].toFixed(2)}, {transform[2].toFixed(2)}]
	  </div>
	  <div className="title">Nodes</div>
	  {nodes.map((node: Node) => (
	    <div key={node.id}>
	      Node {node.id} - x: {node.position.x.toFixed(2)}, y: {node.position.y.toFixed(2)}
	    </div>
	  ))}

	  <div className="selectall">
	    <button onClick={selectAll}>select all nodes</button>
	  </div>
	  <hr  />
	  <div className="description">
	    This is an example of how you can use the zoom pan helper hook
	  </div>
	  <button onClick={focusNode}>focus node</button>
	  <button onClick={zoomInNode}>zoom in</button>
	  <button onClick={zoomOutNode}>zoom out</button>
	  <hr />
	  <div className="save__controls">
      <button onClick={onSave}>save</button>
      <button onClick={onRestore}>restore</button>
    </div>
	</>
} 