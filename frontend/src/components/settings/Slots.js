import React, { useState }  from "react"
import Grid from "@material-ui/core/Grid"
import Typography from "@material-ui/core/Typography"
import Button  from "@material-ui/core/Button"
import clsx from "clsx"

import { makeStyles } from "@material-ui/core/styles"


const useStyles = makeStyles(theme => ({
    slot: {
        backgroundColor: "#fff",
        borderRadius: 25,
        width: '2.5rem',
        height: '2.5rem',
        minWidth: 0,
        border: `0.15rem solid ${theme.palette.secondary.main}`,
        "&:hover": {
            backgroundColor: '#fff',
        },
  
    },
    slotText: {
        color: theme.palette.secondary.main,
        marginLeft: '-0.25rem',
    },
    slotWrapper: {
        marginLeft: '1rem',
        marginBottom: '1rem',
        "& > :not(:first-child)": {
            marginLeft: '-0.5rem',
        },
    },
    selected: {
        backgroundColor: theme.palette.secondary.main,
        "&:hover": {
            backgroundColor: theme.palette.secondary.main,
        },
  
    },
    selectedText: {
        color: '#fff'
    }

}))

export default function Slots({ slot, setSlot }) {
    const classes = useStyles()

    return  (
        <Grid item classes={{root: classes.slotWrapper}}>
            {[1, 2, 3].map( (number, i) => (
                <Button onClick={() => setSlot(i)} key={number} classes={{root: clsx(classes.slot, {
                    [classes.selected]: slot === i
                    })}}>
                    <Typography variant="h5" classes={{root: clsx(classes.slotText, {
                        [classes.selectedText]: slot === i
                    })}}>
                        {number}
                    </Typography>
                </Button>
            ))}
        </Grid>
    )
}
