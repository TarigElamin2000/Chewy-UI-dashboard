import Header from '../component/header'
import Details from '../component/details'
import { useState } from 'react'
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import Button from '@mui/material/Button';
import { TreeView, TreeItem } from '@mui/lab';
import { KibInputText } from '@chewy/kib-fields-react';
import '@chewy/kib-fields-styles/dist/styles/kib-input-text.css';
import { KibButtonNew } from '@chewy/kib-controls-react';
import '@chewy/kib-controls-styles/dist/styles/kib-button-new.css';
import { KibSpinner } from '@chewy/kib-interstitials-react';
import '@chewy/kib-interstitials-styles/dist/styles/kib-spinner.css';
import '@chewy/kib-normalize/dist/kib-normalize.css';

export default function Home() {
  // store all nodes in nodeIds array
  const nodeIds = []
  const [showResults, setShowResults] = useState()
  const [data, setData] = useState()
  const [showSpinner, setShowSpinner] = useState()
  const [showAltMsg, setShowAltMsg] = useState()
  const [value, setValue] = useState(''); // a useState to hold the search value
  const [expanded, setExpanded] = useState([]) // a useState to track the states if expanded nodes

  async function getServices(input) {
    setShowSpinner(true)
    const res = await fetch(`/app/example?service=${input}`)
    try {
      const serviceData = await res.json()
      setShowAltMsg(false)
      setData(serviceData)
      setShowResults(true)
      setShowSpinner(false)
      setExpanded([])
    } catch (error) {
      setShowAltMsg(true)
      setData([])
      setShowResults(false)
      setShowSpinner(false)
      setExpanded([])
    }
  }

  //A function that recursively goes through each service and its childern and return a tree of services
  const getTreeItemFromData = (data) => {
    return data.map((dataItems) => {
      if (dataItems.children?.length > 0) {
        nodeIds.push(dataItems.id)
      }
      return (
        <TreeItem
          key={dataItems.id}
          nodeId={dataItems.id}
          label={[dataItems.name, <Details key={dataItems.id} details={dataItems.details} />]}
        >
          {getTreeItemFromData(dataItems.children)}
        </TreeItem>
      )
    })
  }

  // setting expanded from an empty array to the array of nodes on first toggle
  const handleToggle = (event, nodeIds) => {
    setExpanded(nodeIds);
  };

  // depanding on length set expanded to nodes-IDs or empty array
  const handleExpandClick = () => {
    setExpanded(() =>
      expanded.length === 0 ? nodeIds : [],
    );
  };

  const DataTreeView = ({ data }) => {
    return (
      <TreeView
        defaultCollapseIcon={<ArrowDropDownIcon />}
        defaultExpandIcon={<ArrowRightIcon />}
        expanded={expanded}
        onNodeToggle={handleToggle}
      >
        {getTreeItemFromData(data)}
      </TreeView>
    );
  };

  return (
    <div>
      <Header />
      <div>
        <div className='bar-input'>
          <KibInputText
            append={(props) => {
              return <KibButtonNew {...props} onClick={() => getServices(value)}>Search</KibButtonNew>;
            }}
            label="Enter service name"
            onChange={(event) => setValue(event.target.value)}
            required
            value={value}
          />
        </div>
        {showSpinner ? <div className='spinner-div'><KibSpinner className='spinner' /></div> : null}
        {showAltMsg ? <span className='detail altMsg'>Service details not found.</span> : null}
        {showResults ? <Button
          size='small'
          color='primary'
          variant='contained'
          className='button'
          sx={{ marginLeft: 5, marginTop: 5, marginBottom: 5 }}
          onClick={handleExpandClick}>{expanded.length === 0 ? 'Expand all' : 'Collapse all'}</Button> : null}

        {showResults ? <DataTreeView data={data} /> : null}

      </div>
    </div>
  )
}
