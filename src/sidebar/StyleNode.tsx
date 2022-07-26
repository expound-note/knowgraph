import React, { useState, useEffect } from 'react'

import BasicInfo from '../components/styling/BasicInfo'

export default ({ nodes, setNodes, setEdges }: any) => {
	

	return <>
	  <BasicInfo setNodes={setNodes} setEdges={setEdges} />
	</>
} 