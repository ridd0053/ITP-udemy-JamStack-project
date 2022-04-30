import React, { useState, useContext }  from "react"
import Grid from "@material-ui/core/Grid"
import Typography from "@material-ui/core/Typography"
import Button  from "@material-ui/core/Button"
import IconButton from "@material-ui/core/IconButton"

import Item from "./Item"

import { CartContext } from  '../../contexts'

import { makeStyles } from "@material-ui/core/styles"


const useStyles = makeStyles(theme => ({

}))

export default function CartItems({ variant }) {
    const classes = useStyles()
    const { cart } = useContext(CartContext)

    return  (
        <Grid item container direction="column" xs={6}>
            {cart.map(item => (
                <Item item={item} key={item.variant.id} />
            ))}
        </Grid>
    )
}