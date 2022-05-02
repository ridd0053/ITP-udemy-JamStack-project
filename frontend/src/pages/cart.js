import React, { useState, useContext }  from "react"
import Grid from "@material-ui/core/Grid"
import Typography from "@material-ui/core/Typography"
import Button  from "@material-ui/core/Button"
import IconButton from "@material-ui/core/IconButton"

import Layout from "../components/ui/layout"
import CartItems from "../components/cart/CartItems"
import CheckoutPortal from "../components/cart/CheckoutPortal"

import { UserContext } from "../contexts"


import { makeStyles } from "@material-ui/core/styles"


const useStyles = makeStyles(theme => ({
    cartContainer: {
        minHeight: "90vh",
    },
}))

export default function Cart() {
    const classes = useStyles()
    const { user } = useContext(UserContext)

    return  (
        <Layout>
            <Grid container direction="column" alignItems="center" classes={{root: classes.cartContainer}}>
                <Grid item>
                    <Typography variant="h1">
                        {user.username}'s Cart
                    </Typography>
                </Grid>
                <Grid item container>
                    <CartItems/>
                    <CheckoutPortal user={user} />
                </Grid> 
            </Grid>
        </Layout>
    )
}