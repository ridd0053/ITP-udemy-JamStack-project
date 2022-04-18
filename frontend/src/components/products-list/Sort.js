import React from "react"
import clsx from "clsx"
import Grid from "@material-ui/core/Grid"
import IconButton from "@material-ui/core/IconButton"
import Chip  from "@material-ui/core/Chip"
import useMediaQuery  from "@material-ui/core/useMediaQuery"


import sort from '../../images/sort.svg'
import close from '../../images/close-outline.svg'

import { makeStyles } from "@material-ui/core/styles"


const useStyles = makeStyles(theme => ({
    chipContainer: {
        [theme.breakpoints.down('md')]: {
            margin: "0.5rem",
        }
    },
    notActive: {
        backgroundColor: theme.palette.primary.main,
    }
}))

export default function Sort({ setOption, sortOptions, setSortOptions }) {
    const classes = useStyles()
    const matchesXS = useMediaQuery(theme => theme.breakpoints.down('xs'))

    const handleSort = i => {
        const newOptions = [...sortOptions]
        // deactives the old sort
        newOptions.map(option => option.active = false)
        // activates the new sort
        newOptions[i].active = true

        setSortOptions(newOptions)
    }

    return  (
      <Grid item container justifyContent="space-between" alignItems="center">
          <Grid item>
                <IconButton onClick={() => setOption(null)}>
                    <img src={sort} alt="sort" />
                </IconButton>
          </Grid>
          <Grid item xs>
              <Grid container direction={matchesXS ? "column" : "row"} alignItems={matchesXS ? "center" : undefined} justifyContent="space-around">
                    {sortOptions.map((option, i) => (
                        <Grid item key={option.label} classes={{root: classes.chipContainer}}>
                            <Chip
                            onClick={() => handleSort(i)}
                            color={!option.active ? "primary" : "secondary"} 
                            label={option.label} classes={{root: clsx({
                                [classes.notActive]: !option.active
                                })}} />
                        </Grid>
                    ))}
              </Grid>
          </Grid>
          <Grid item>
                <IconButton onClick={() => setOption(null)}>
                    <img src={close} alt="close" />
                </IconButton>
          </Grid>
      </Grid>
    )
}