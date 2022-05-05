import React, { useState }  from "react"
import Grid from "@material-ui/core/Grid"
import Typography from "@material-ui/core/Typography"
import Button  from "@material-ui/core/Button"
import IconButton from "@material-ui/core/IconButton"

import ProductReview from "./ProductReview"

import { makeStyles } from "@material-ui/core/styles"


const useStyles = makeStyles(theme => ({
    reviews: {
        padding: "5rem 3rem 0 3rem"  
    },
}))

export default function ProductReviews({product}) {
    const classes = useStyles()

    return  (
        <Grid item container direction="column" classes={{root: classes.reviews}}>
            <ProductReview product={product} />
        </Grid>
    )
}