import React from 'react';
import { MarkerType } from 'react-flow-renderer';

const onChange = (event: any) => {
    console.log('change color successfully')  
};

const initBgColor = '#1A192B';
const getGraph = (id: string, callback: Function) => {
  callback({
    nodes: [
  // {
  //   id: '1',
  //   type: 'dragHandle',
  //   dragHandle: '.custom-drag-handle',
  //   style: { border: '1px solid #ddd', padding: '20px 40px' },
  //   data: {
  //     label: 'Welcome to React Flow!',
  //   },
  //   position: { x: 250, y: 0 },
  // },
  // {
  //   id: '2',
  //   type: 'colorSelector',
  //   data: { onChange: onChange, color: initBgColor },
  //   position: { x: 100, y: 100 },
  // },
  // {
  //   id: '3',
  //   data: {
  //     label: 'This one has a custom style',
  //   },
  //   position: { x: 400, y: 100 },
  //   style: {
  //     background: '#D6D5E6',
  //     color: '#333',
  //     border: '1px solid #222138',
  //     width: 180,
  //   },
  // },
  // {
  //   id: '4',
  //   position: { x: 250, y: 200 },
  //   data: {
  //     label: 'Another default node',
  //   },
  // },
  // {
  //   id: '5',
  //   data: {
  //     label: 'Node id: 5',
  //   },
  //   position: { x: 250, y: 325 },
  // },
  // {
  //   id: '6',
  //   type: 'output',
  //   data: {
  //     label: 'An output node',
  //   },
  //   position: { x: 100, y: 480 },
  // },
  // {
  //   id: '7',
  //   type: 'output',
  //   data: { label: 'Another output node' },
  //   position: { x: 400, y: 450 },
  // },
],
    edges: [
  // { id: 'e1-2', source: '1', target: '2', 
  //   type: 'text',
  //   data: { text: 'custom edge' },
  //   label: 'this is an edge label' },
  // { id: 'e1-3', source: '1', target: '3' },
  // {
  //   id: 'e3-4',
  //   source: '3',
  //   target: '4',
  //   // type: 'button',
  //   animated: true,
  //   label: 'animated edge',
  // },
  // {
  //   id: 'e4-5',
  //   source: '4',
  //   target: '5',
  //   label: 'edge with arrow head',
  //   markerEnd: {
  //     type: MarkerType.ArrowClosed,
  //   },
  // },
  // {
  //   id: 'e5-6',
  //   source: '5',
  //   target: '6',
  //   type: 'smoothstep',
  //   label: 'smooth step edge',
  // },
  // {
  //   id: 'e5-7',
  //   source: '5',
  //   target: '7',
  //   type: 'step',
  //   style: { stroke: '#f6ab6c' },
  //   label: 'a step edge',
  //   animated: true,
  //   labelStyle: { fill: '#f6ab6c', fontWeight: 700 },
  // },
]
  })
  
}

export { getGraph }