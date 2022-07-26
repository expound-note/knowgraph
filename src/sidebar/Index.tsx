import React, { useCallback, useState }from 'react'
import ReactDOM from 'react-dom'
import { makeStyles, shorthands } from '@griffel/react';
import { Tab, 
  TabList, 
  SelectTabData, 
  SelectTabEvent, 
  TabValue, 
  tokens
} from "@fluentui/react-components"
import { BoxMultipleSearchRegular, 
  DrawShapeRegular, 
  BookInformationRegular 
} from '@fluentui/react-icons'

import './index.css'
import NewNode from './NewNode'
import StyleNode from './StyleNode'
import GraphInfo from './GraphInfo'

const useStyles = makeStyles({
  root: {
    width: '350px',
    backgroundColor: '#f5f5f5',
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    ...shorthands.padding('0', '10px'),
    rowGap: '20px'
  },
  panels: { ...shorthands.padding(0, '10px'),
    '& th': {
      textAlign: 'left',
      ...shorthands.padding(0, '30px', 0, 0)
    }
  }
});

export default ({ nodes, setNodes }: any) => {
  const [selectedValue, setSelectedValue] = useState<TabValue>('new_node')
  const onTabSelect = (event: SelectTabEvent, data: SelectTabData) => {
    setSelectedValue(data.value);
  }

  const styles = useStyles()
  return <div className={styles.root}>
    <TabList selectedValue={selectedValue} onTabSelect={onTabSelect}>
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
      {selectedValue === 'new_node' && <NewNode nodes={nodes} setNodes={setNodes} />}
      {selectedValue === 'style_node' && <StyleNode />}
      {selectedValue === 'graph_info' && <GraphInfo nodes={nodes} setNodes={setNodes} />}
    </div>
  </div>
}