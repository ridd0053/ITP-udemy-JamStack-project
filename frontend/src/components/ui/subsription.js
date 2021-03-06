import React, { useState, useContext }  from "react"
import axios from "axios"
import clsx from "clsx"
import Typography from "@material-ui/core/Typography"
import Grid from "@material-ui/core/Grid"
import Button  from "@material-ui/core/Button"
import IconButton from "@material-ui/core/IconButton"
import Dialog  from "@material-ui/core/Dialog"
import CircularProgress from "@material-ui/core/CircularProgress"

import QtyButton from "../products-list/QtyButton"
import SelectFrequency from "./select-frequency"

import { CartContext, UserContext, FeedbackContext } from "../../contexts"
import { setSnackbar, addToCart, toggleSubscription } from "../../contexts/actions"

import SubscriptionIcon from "../../images/Subscription"


import { makeStyles } from "@material-ui/core/styles"
import  useMediaQuery  from '@material-ui/core/useMediaQuery';



const useStyles = makeStyles(theme => ({
    iconWrapper: {
        height: ({ size }) => `${size || 2}rem`,
        width: ({ size }) => `${size || 2}rem`
    },
    row: {
        height: "4rem",
        padding: "0 0.5rem",
        [theme.breakpoints.down("xs")]: {
            height: "auto",
            padding: "0.5rem 0.5rem",
        },
    },
    dark: {
        backgroundColor: theme.palette.secondary.main,
    },
    light: {
        backgroundColor: theme.palette.primary.main,
    },
    iconButton: {
        padding: ({ noPadding }) => noPadding ? 0 : undefined,
    },
    cartButton: {
        height: "8rem",
        borderRadius: 0,
        width: '100%',
        [theme.breakpoints.down("xs")]: {
            height: "auto",
        },
    },
    cartText: {
        color: "#fff",
        fontSize: "4rem",
        [theme.breakpoints.down("sm")]: {
            fontSize: "3.25rem",
        },
        [theme.breakpoints.down("xs")]: {
            fontSize: "2rem",
        },

    },
    buttonWrapper: {
        width: "100%",
      },
    dialog: {
        borderRadius: 0,
        backgroundColor: theme.palette.primary.main,
    },

    disabled: {
        backgroundColor: `${theme.palette.grey[500]} !important`,   
    },
}))

export default function Subscription({ size, 
    stock, 
    selectedVariant, 
    variant, 
    name, 
    color, 
    isCart,
    cartFrequency,
    noPadding  }) {
    const classes = useStyles({ size, noPadding })
    const matchesXS = useMediaQuery(theme => theme.breakpoints.down('xs'))
    const [open, setOpen] = useState(false)
    const [frequency, setFrequency] = useState("Month")
    const [qty, setQty] = useState(1)
    const { dispatchFeedback } = useContext(FeedbackContext)
    const { dispatchCart } = useContext(CartContext)
    const { user } = useContext(UserContext)


    const handleOpen = () => {
        if (isCart) {
            dispatchCart(toggleSubscription(isCart.variant, cartFrequency))
            return
          }
        if (user.username === "Guest") {
            dispatchFeedback(setSnackbar({status:"error", message:"You must be logged in to create a subscription"}))
            return
        } else {
            setOpen(true)
        }  
    } 

    const handleCart = ( ) => {
        dispatchCart(addToCart(variant, qty, name, stock[selectedVariant].qty, frequency))
        setOpen(false)
        dispatchFeedback(setSnackbar({status:"success", message:"Subscription Added To Cart"}))
    }

    return  (
        <>
            <IconButton onClick={handleOpen} classes={{root: classes.iconButton}}>
                <span className={classes.iconWrapper}>
                    <SubscriptionIcon color={color} />
                </span>
            </IconButton>
            <Dialog fullWidth fullScreen={matchesXS} maxWidth="md" open={open} onClose={() => setOpen(false)} classes={{paper: classes.dialog}}>
                <Grid container direction="column" alignItems="center">
                    <Grid item container justifyContent="space-between" alignItems="center" classes={{root: clsx(classes.row, classes.dark)}}>
                        <Grid item>
                            <Typography variant="h4">Quantity</Typography>
                        </Grid>
                        <Grid item>
                            <QtyButton stock={stock} selectedVariant={selectedVariant} white hideCartButton round override={{value: qty, setValue: setQty}} />
                        </Grid>
                    </Grid>
                    <Grid 
                    item 
                    container 
                    alignItems={matchesXS ? "flex-start" : "center"} 
                    justifyContent="space-between" 
                    direction={matchesXS ? "column" : "row"}
                    classes={{root: clsx(classes.row, classes.light)}}>
                        <Grid item>
                            <Typography variant="h4">Deliver Every</Typography>
                        </Grid>
                        <Grid item>
                            <SelectFrequency value={frequency} setValue={setFrequency} />
                        </Grid>
                    </Grid>
                    <Grid item classes={{ root: classes.buttonWrapper }}>
                            <Button 
                            onClick={handleCart} 
                            variant="contained" 
                            color="secondary"
                            disabled={qty === 0} 
                            classes={{root: classes.cartButton, disabled: classes.disabled}}>
                                <Typography variant="h1" classes={{root: classes.cartText}}>
                                        Add Subscription To Cart
                                </Typography>
                            </Button>
                    </Grid>
                    {matchesXS && (
                    <Grid item>
                        <Button onClick={() => setOpen(false)}>
                            <Typography variant="body2">
                                Cancel
                            </Typography>
                        </Button>
                    </Grid>)}
                </Grid>
            </Dialog>
        </>
    )
}