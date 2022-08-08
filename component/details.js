import React from 'react'
import DoneOutlineIcon from '@mui/icons-material/DoneOutline';
import CancelIcon from '@mui/icons-material/Cancel';

const Details = (props) => {
    const serviceDetails = []
    if (props.details != null) {
        Object.entries(props.details).map(([k, v]) => {
            serviceDetails.push(<span key={k} className='detail'> {k}</span>, " -->  ")
            for (var i = 0; i < v.length; i++) {
                if (v[i] == "*") {
                    serviceDetails.push(<DoneOutlineIcon key={k+i} color="primary" fontSize="small" />)
                }
                else {
                    serviceDetails.push(<CancelIcon key={k+i} sx={{ color: 'red' }} fontSize="small" />)
                }
            }
        })
    }
    return (
        serviceDetails
    )
}

export default Details
