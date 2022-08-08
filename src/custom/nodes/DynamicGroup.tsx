import React, { memo } from 'react'
import { Handle, NodeProps, Position } from 'react-flow-renderer'

import './dynmic_group.css'

const DynamicGroup = ({
  data,
  isConnectable,
  targetPosition = Position.Left,
  sourcePosition = Position.Right,
}: NodeProps) => {
  return (
    <>
      <div className="dynmic_group_label">{data?.label}</div>
      <Handle type="target" position={Position.Top} isConnectable={isConnectable} />
      <Handle type="source" id="a" position={Position.Left} isConnectable={isConnectable} />
      <Handle type="source" id="b" position={Position.Right} isConnectable={isConnectable} />
      <Handle type="source" id="c" position={Position.Bottom} isConnectable={isConnectable} />
    </>
  );
};

DynamicGroup.displayName = 'DynamicGroupNode'

export default memo(DynamicGroup)