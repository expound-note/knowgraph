import React, { useCallback, useState }from 'react'
import ReactDOM from 'react-dom'
import { makeStyles, shorthands } from '@griffel/react';
import { Tab, 
  TabList, 
  SelectTabData, 
  SelectTabEvent, 
  TabValue, 
  tokens,
  ToggleButton, 
  Tooltip,
} from "@fluentui/react-components"
import { BoxMultipleSearchRegular, 
  DrawShapeRegular,
  BookInformationRegular,
  bundleIcon, AppsAddInFilled, AppsAddInRegular,
} from '@fluentui/react-icons'

import './index.css'
import NewNode from './tabs/NewNode'
import StyleNode from './tabs/StyleNode'
import GraphInfo from './tabs/GraphInfo'

const AppsAddIn = bundleIcon(AppsAddInFilled, AppsAddInRegular)

const useStyles = makeStyles({
  root: {
    width: '400px',
    backgroundColor: '#f5f5f5',
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    rowGap: '20px'
  },
  panels: { ...shorthands.padding(0, '10px'),
    '& th': {
      textAlign: 'left',
      ...shorthands.padding(0, '30px', 0, 0)
    }
  },
  toggle: {
    position: 'absolute',
    left: '0',
  }
});

export default ({ nodes, selectedNode, setNodes, setEdges }: any) => {
  const [showSidebar, setShowSidebar] = useState(false)
  const [selectedValue, setSelectedValue] = useState<TabValue>('new_node')
  const onTabSelect = (event: SelectTabEvent, data: SelectTabData) => {
    setSelectedValue(data.value);
  }

  const styles = useStyles()
  return <div className={styles.root} style={{marginRight: showSidebar ? 0 : '-400px', transition: 'margin-right 0.5s ease'}}>
    <TabList selectedValue={selectedValue} onTabSelect={onTabSelect}>
      <Tooltip content="展开/收起侧边栏" relationship="label" >
        <ToggleButton icon={<AppsAddIn />}  size="large"  style={{position: 'fixed', right: 0, zIndex: 10000}}
          onClick={() => setShowSidebar(!showSidebar)} aria-label="Icon only" />
      </Tooltip>
      <Tab id="NewNode" icon={<BoxMultipleSearchRegular />} value="new_node">
        New
      </Tab>
      <Tab id="StyleNode" icon={<DrawShapeRegular />} value="style_node">
        Style
      </Tab>
      <Tab id="GraphInfo" icon={<BookInformationRegular />} value="graph_info">
        Graph
      </Tab>
    </TabList>
    <div className={styles.panels}>
      {selectedValue === 'new_node' && <NewNode />}
      {selectedValue === 'style_node' && <StyleNode selectedNode={selectedNode} setNodes={setNodes} setEdges={setEdges} />}
      {selectedValue === 'graph_info' && <GraphInfo nodes={nodes} setNodes={setNodes} />}
    </div>
  </div>
}