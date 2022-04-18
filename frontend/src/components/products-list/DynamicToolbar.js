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
        width: '96%',
        marginBottom: '5rem'
    }
}))

export default function DynamicToolbar({ filterOptions, setFilterOptions,  name, description, layout, setLayout, sortOptions, setSortOptions }) {
    const classes = useStyles()
    const [options, setOptions] = useState(null)

    return  (
        <Grid item container direction="column" classes={{root: classes.toolbar}}>
            <FunctionContainer filterOptions={ filterOptions} setFilterOptions={setFilterOptions} options={options} setOptions={setOptions} sortOptions={sortOptions} setSortOptions={setSortOptions}/>
            {options === null && <DescriptionContainer name={name} description={description} layout={layout} setLayout={setLayout}/>}
        </Grid>
    )
}