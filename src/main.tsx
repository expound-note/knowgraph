import React from 'react'
import ReactDOM from 'react-dom'
import { 
  FluentProvider, 
  teamsLightTheme 
} from '@fluentui/react-components';
import './index.css'
import Graph from './App'

ReactDOM.render(
  <React.StrictMode>
    <FluentProvider theme={teamsLightTheme}>
      <Graph />
    </FluentProvider>
  </React.StrictMode>,
  document.getElementById('root')
)
