import React, { useState }  from "react"
import clsx from "clsx"
import Grid from "@material-ui/core/Grid"
import Typography from "@material-ui/core/Typography"
import Button  from "@material-ui/core/Button"

import shippingIcon from '../../images/shipping.svg'

import { makeStyles } from "@material-ui/core/styles"


const useStyles = makeStyles(theme => ({
    button: {
        backgroundColor: theme.palette.secondary.main,
        borderRadius: 15,
        height: "10rem",
        width: "10rem",
        "&:hover":{
            backgroundColor: theme.palette.secondary.light,
        },
    },
    selected: {
        backgroundColor: "#fff",
        "&:hover":{
            backgroundColor: "#fff",
        },
    },
    label: {
        fontSize: '1.5rem',
    },
    price: {
        color: "#fff",
    },
    selectedText: {
        color: theme.palette.secondary.main,
    },
    container: {
        height:"100%",
    },
    icon: {
        marginTop: '-2rem',
        marginBottom: '1rem',
    }
}))

export default function Shipping({ selectedShipping, setSelectedShipping, shippingOptions }) {
    const classes = useStyles()

    return  (
        <Grid item container classes={{root: classes.container}} direction="column" alignItems="center" justifyContent="center">
            <Grid item>
                <img className={classes.icon} src={shippingIcon} alt="Shipping" />
            </Grid>
            <Grid item container justifyContent="space-around">
                {shippingOptions.map( option => (
                    <Grid item key={option.label}>
                        <Button onClick={() => setSelectedShipping(option.label)} classes={{root: clsx(classes.button, {
                            [classes.selected]: selectedShipping === option.label
                        })}}>
                            <Grid container direction="column">
                                <Grid item>
                                    <Typography variant="h5" classes={{root: clsx(classes.label, {
                                        [classes.selectedText]: selectedShipping === option.label
                                    })}}> 
                                        {option.label} 
                                    </Typography>
                                </Grid>
                                <Grid item>
                                    <Typography variant="body1" classes={{root: clsx(classes.price, {
                                        [classes.selectedText]: selectedShipping === option.label
                                    })}} > 
                                        {`€ ${option.price.toFixed(2)}`} 
                                    </Typography>
                                </Grid>
                            </Grid>
                        </Button>
                    </Grid>
                ))}
            </Grid>
        </Grid>
    )
}