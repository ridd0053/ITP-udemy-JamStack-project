import React, { useState }  from "react"
import Grid from "@material-ui/core/Grid"
import Typography from "@material-ui/core/Typography"

import { makeStyles } from "@material-ui/core/styles"

import FunctionContainer from "./FunctionContainer"
import DescriptionContainer from "./DescriptionContainer"
const useStyles = makeStyles(theme => ({
    toolbar: {
        border: `5px solid ${theme.palette.primary.main}`,
        borderRadius: 25,
        height: 'auto',
        width: '95%',
        marginBottom: '5rem'
    }
}))

export default function DynamicToolbar({ filterOptions, name, description, layout, setLayout, setPage }) {
    const classes = useStyles()
    const [options, setOptions] = useState(null)

    return  (
        <Grid item container direction="column" classes={{root: classes.toolbar}}>
            <FunctionContainer filterOptions={ filterOptions} options={options} setOptions={setOptions}/>
            {options === null && <DescriptionContainer setPage={setPage} name={name} description={description} layout={layout} setLayout={setLayout}/>}
        </Grid>
    )
}