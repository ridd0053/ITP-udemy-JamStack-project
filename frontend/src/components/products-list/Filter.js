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
    mainContainer: {
        padding: '1rem 0',
    },
    checkbox: {
        color: "#fff"
    },
    optionsContainer: {
        [theme.breakpoints.down('xs')]: {
           "& > :not(:last-child)": {
            marginBottom: "2rem",
           },
        },
    }
}))

export default function Filter({ setOption, filterOptions, setFilterOptions }) {
    const classes = useStyles()

    const handleFilter = (option, i) => {
        const newFilters = {...filterOptions}
        newFilters[option][i].checked = !newFilters[option][i].checked
        setFilterOptions(newFilters)
    }

    return  (
      <Grid classes={{root: classes.mainContainer}} item container justifyContent="space-between" alignItems="center">
          <Grid item>
                <IconButton onClick={() => setOption(null)}>
                    <img src={filter} alt="filter" />
                </IconButton>
          </Grid>
          <Grid item xs>
              {/* with the xs the element will take as much up as it can */}
              <Grid container justifyContent="space-around" classes={{root: classes.optionsContainer}}>
                    {Object.keys(filterOptions).filter(option => 
                    filterOptions[option] !== null).map(option => (
                        <Grid item key={option}>
                            <Grid container direction="column">
                                <Grid item>
                                    <Chip label={option}/>
                                </Grid>
                                <Grid item>
                                    <FormControl>
                                        <FormGroup>
                                            {filterOptions[option].map(({label, checked}, i) => (
                                                <FormControlLabel key={label} label={label} classes={{label: classes.checkbox}}
                                                control={
                                                <Checkbox
                                                onChange={() => handleFilter(option, i)} 
                                                checked={checked} 
                                                name={label} 
                                                classes={{root: classes.checkbox}}/>}/>
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