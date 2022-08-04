import React, { memo } from 'react';
import { Handle, Position } from 'react-flow-renderer';

const labelStyle = {
  display: 'flex',
  alignItems: 'center',
}

const dragHandleStyle = {
  display: 'inline-block',
  width: 25,
  height: 25,
  backgroundColor: 'teal',
  marginLeft: 5,
  borderRadius: '50%',
}

const onConnect = (params: any) => console.log('handle onConnect', params)
const isValidConnection = (connection) => true

export default memo(() => {
  return (
    <>
      <Handle type="target" position={Position.Left} 
        onConnect={onConnect} 
        isValidConnection={isValidConnection} />
      <div style={labelStyle}>
        Only draggable here → <span className="custom-drag-handle" style={dragHandleStyle} />
      </div>
      <Handle type="source" position={Position.Bottom} 
        isValidConnection={isValidConnection} />
    </>
  );
})