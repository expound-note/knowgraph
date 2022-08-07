import React, { memo } from 'react'
import { Handle, NodeProps, Position } from 'react-flow-renderer'

import './dynmic_group.css'

const DynamicGroup = ({
  data,
  isConnectable,
  targetPosition = Position.Top,
  sourcePosition = Position.Bottom,
}: NodeProps) => {
  return (
    <>
      <div className="dynmic_group_label">{data?.label}</div>
      <Handle type="target" position={targetPosition} isConnectable={isConnectable} />
    </>
  );
};

DynamicGroup.displayName = 'DynamicGroupNode'

export default memo(DynamicGroup)