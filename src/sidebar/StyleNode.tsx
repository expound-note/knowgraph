import React, { useState, useEffect } from 'react'

import BasicInfo from '../components/styling/BasicInfo'

export default ({ selectedNode, setNodes, setEdges }: any) => {
	

	return <>
	  <BasicInfo
	  	selectedNode={selectedNode}
	  	setNodes={setNodes} 
	  	setEdges={setEdges} />
	</>
} 