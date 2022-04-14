import React from "react"
import Grid from "@material-ui/core/Grid"
import IconButton from "@material-ui/core/IconButton"
import Typography from "@material-ui/core/Typography"

import { makeStyles } from "@material-ui/core/styles"

import filter from '../../images/filter.svg'
import sort from '../../images/sort.svg'

import Sort from './Sort'
import Filter from './Filter'

const useStyles = makeStyles(theme => ({
    functionContainer: {
        backgroundColor: theme.palette.primary.main,
        minHeight: "6rem",
        height: "auto",
        borderRadius: ({ options }) =>
        options !== null ? "10px" : "10px 10px 0px 0px",
    },
}))

export default function FunctionContainer({ filterOptions, options, setOptions }) {
    const classes = useStyles({options})
    

    const content = () => {
        switch(options) {
            case"sort":
                return (
                    <Sort setOption={setOptions} />
                )
            case"filter":
                return (
                    <Filter setOption={setOptions} filterOptions={filterOptions} />
                )
            default:
                const items = [{icon: filter, alt:"filter"}, {icon: sort, alt:"sort"}]
                return (
                    <Grid item container justify="space-around" alignItems="center">
                        {items.map(item => (
                            <Grid item key={item.alt}>
                                <IconButton onClick={() => setOptions(item.alt)}>
                                    <img src={item.icon} alt={item.alt} />
                                </IconButton>
                            </Grid>
                        ))}
                    </Grid>
                )
        }
    }

    return  (
        <Grid item container classes={{root: classes.functionContainer}}>
            {content()}
        </Grid>
    )
}