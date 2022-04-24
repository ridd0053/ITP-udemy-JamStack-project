import React, { useState }  from "react"
import Grid from "@material-ui/core/Grid"
import Typography from "@material-ui/core/Typography"

import Details from "./Details"

import { makeStyles } from "@material-ui/core/styles"


const useStyles = makeStyles(theme => ({

}))

export default function Settings() {
    const classes = useStyles()

    return  (
        <Grid container>
            <Details />
        </Grid>
    )
}