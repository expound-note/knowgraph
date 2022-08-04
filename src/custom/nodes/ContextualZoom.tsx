import React, { memo } from 'react';
import { 
  Handle, 
  Position, 
  ReactFlowState, 
  useStore } from 'react-flow-renderer';

import './contextual_zoom.css'

const Placeholder = () => (
  <div className="placeholder">
    <div />
    <div />
    <div />
  </div>
);

const zoomSelector = (state: ReactFlowState) => state.transform[2];
const ContextualZoom = ({ data }: any) => {
  const zoom = useStore(zoomSelector);
  const showContent = zoom >= 1.5;

  return (
    <>
      <Handle type="target" position={Position.Left} />
      {showContent ? data.label : <Placeholder />}
      <Handle type="source" position={Position.Right} />
    </>
  );
}
export default memo(ContextualZoom)