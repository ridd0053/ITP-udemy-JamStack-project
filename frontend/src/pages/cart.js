import React, { useState, useContext }  from "react"
import Grid from "@material-ui/core/Grid"
import Typography from "@material-ui/core/Typography"
import useMediaQuery  from "@material-ui/core/useMediaQuery"


import Layout from "../components/ui/layout"
import CartItems from "../components/cart/CartItems"
import CheckoutPortal from "../components/cart/CheckoutPortal"

import { UserContext } from "../contexts"


import { makeStyles } from "@material-ui/core/styles"


const useStyles = makeStyles(theme => ({
    cartContainer: {
        minHeight: "90vh",
    },
    name: {
        [theme.breakpoints.down('xs')]: { 
            fontSize: '3rem',
        },
    }
}))

export default function Cart() {
    const classes = useStyles()
    const { user } = useContext(UserContext)
    const matchesMD = useMediaQuery(theme => theme.breakpoints.down('md'))

    const items = <CartItems/>
    const checkoutPortal = <CheckoutPortal user={user} />

    return  (
        <Layout>
            <Grid container direction="column" alignItems="center" classes={{root: classes.cartContainer}}>
                <Grid item>
                    <Typography variant="h1" align="center" classes={{root: classes.name}}>
                        {user.username}'s Cart
                    </Typography>
                </Grid>
                <Grid item container>
                    {matchesMD ? checkoutPortal : items}
                    {matchesMD ? items : checkoutPortal}
                </Grid> 
            </Grid>
        </Layout>
    )
}