import React from "react"
import Grid from "@material-ui/core/Grid"
import IconButton from "@material-ui/core/IconButton"
import Chip  from "@material-ui/core/Chip"
import FormControl  from "@material-ui/core/FormControl"
import FormControlLabel  from "@material-ui/core/FormControlLabel"
import FormGroup  from "@material-ui/core/FormGroup"
import Checkbox  from "@material-ui/core/Checkbox"


import { makeStyles } from "@material-ui/core/styles"

import filter from '../../images/filter.svg'
import close from '../../images/close-outline.svg'

const useStyles = makeStyles(theme => ({
    chipRoot: {
        backgroundColor: theme.palette.secondary.main
    },
    chipLabel: {
        ...theme.typography.body1,
        color: '#fff',
        fontWeight: 500,
    },
    mainContainer: {
        padding: '1rem 0',
    },
    checkbox: {
        color: "#fff"
    }
}))

export default function Filter({ setOption, filterOptions }) {
    const classes = useStyles()
    console.log(filterOptions)
    return  (
      <Grid classes={{root: classes.mainContainer}} item container justify="space-between" alignItems="center">
          <Grid item>
                <IconButton onClick={() => setOption(null)}>
                    <img src={filter} alt="filter" />
                </IconButton>
          </Grid>
          <Grid item xs>
              {/* with the xs the element will take as much up as it can */}
              <Grid container justify="space-around">
                    {Object.keys(filterOptions).filter(option => 
                    filterOptions[option] !== null).map(option => (
                        <Grid item key={option}>
                            <Grid container direction="column">
                                <Grid item>
                                    <Chip label={option} 
                                    classes={{root: classes.chipRoot, label: classes.chipLabel}}/>
                                </Grid>
                                <Grid item>
                                    <FormControl>
                                        <FormGroup>
                                            {filterOptions[option].map(({label, checked}) => (
                                                <FormControlLabel key={label} label={label} classes={{label: classes.checkbox}}
                                                control={<Checkbox checked={checked} name={label} classes={{root: classes.checkbox}}/>}/>
                                            ))}
                                        </FormGroup>
                                    </FormControl>
                                </Grid>
                            </Grid>
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