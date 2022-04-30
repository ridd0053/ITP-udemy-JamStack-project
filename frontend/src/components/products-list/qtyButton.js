import React, { useState, useEffect, useContext }  from "react"
import clsx from "clsx"
import Grid from "@material-ui/core/Grid"
import Typography from "@material-ui/core/Typography"
import Button from "@material-ui/core/Button"
import Badge from "@material-ui/core/Badge"
import ButtonGroup from "@material-ui/core/ButtonGroup"

import { CartContext } from "../../contexts"
import { addToCart } from "../../contexts/actions"


import { makeStyles } from "@material-ui/core/styles"

import Cart from "../../images/Cart"

const useStyles = makeStyles(theme => ({
    qtyText: {
        color: '#fff',
    },
    mainGroup: {
        height: '3rem',
    },
    editButtons: {
        height: '1.525rem',
        borderRadius: 0,
        backgroundColor: theme.palette.secondary.main,
        borderLeft: '2px solid #fff',
        borderRight: '2px solid #fff',
        borderBottom: "none",
        borderTop: "none",
    },
    endButtons: {
        borderRadius: 50,
        backgroundColor: theme.palette.secondary.main,
        border: "none",
    },
    minusButton: {
        borderTop: '2px solid #fff',
    },
    minus: {
        marginTop: "-0.25rem"
    },
    cartButton: {
        marginLeft: '0 !important',
        transition: "background-color 1s ease"
    },
    qtyButton: {
        "&:hover": {
            backgroundColor: theme.palette.secondary.main,
        }
    },
    badgeClass: {
        color: '#fff',
        fontSize: '1.5rem',
        backgroundColor: theme.palette.secondary.main,
        padding: 0,
    },
    disabledButton: {
        backgroundColor: theme.palette.common.grey,
        "&:hover": {
            backgroundColor: theme.palette.common.grey,
        }
    },
    success: {
        backgroundColor: theme.palette.success.main,
        "&:hover": {
            backgroundColor: theme.palette.success.main,
        }
    }
}))


export default function QtyButton({stock, variants, selectedVariant, name }) {
    const classes = useStyles()
    const [qty, setQty] = useState(1);
    const [success, setSuccess] = useState(false)
    const { cart, dispatchCart } = useContext(CartContext)

    const [disableDownButton, setDisableDownButton] = useState(false);
    const [disableUpButton, setDisableUpButton] = useState(false);


    const handleChange = direction => {
        if (qty === stock[selectedVariant].qty && direction === "up") {
            return null
        }
        if (qty === 1 && direction === "down") {
            return null
        }
        const newQty = direction === "up" ? qty + 1 : qty - 1 
        
        setQty(newQty)
    }

    const handleCart = () => {
        setSuccess(true)
        
        dispatchCart(
            addToCart(
                variants[selectedVariant], 
                qty, 
                name, 
                stock[selectedVariant].qty
            )
        )
    }

    useEffect(() => {
        if(qty === 1 || stock === null || stock === -1) {
            setDisableDownButton(true)
        }
        else if(qty === stock[selectedVariant].qty || stock === null || stock === -1) {
            setDisableUpButton(true)
        }
        else {
            setDisableDownButton(false)
            setDisableUpButton(false)
        }
        }, [qty, stock, selectedVariant])

    useEffect(() => {
    if(stock === null || stock === -1) {
        return undefined
    }
    else if(qty > stock[selectedVariant].qty) {
        setQty(stock[selectedVariant].qty)
    }
    }, [stock, selectedVariant])

    useEffect(() => {
        let timer
        if (success) {
            timer = setTimeout(() => setSuccess(false), 1500)
        }
        return () => clearTimeout(timer)
    }, [success])
    return  (
        <Grid item>
            <ButtonGroup classes={{root: classes.mainGroup}}>
                <Button classes={{root: clsx(classes.endButtons, classes.qtyButton)}}>
                    <Typography variant="h3" classes={{root: classes.qtyText}}>
                        {qty}
                    </Typography>
                </Button>
                <ButtonGroup orientation="vertical">
                    <Button
                    onClick={() => handleChange("up")}
                    classes={{root: clsx(classes.editButtons , {
                        [classes.disabledButton]: disableUpButton
                    })}}>
                        <Typography variant="h3" classes={{root: classes.qtyText}}>
                            +
                        </Typography>
                    </Button>
                    <Button
                    onClick={() => handleChange("down")}
                    classes={{root: clsx(classes.editButtons, classes.minusButton, {
                        [classes.disabledButton]: disableDownButton
                    })}}>
                        <Typography variant="h3" classes={{root: clsx(classes.qtyText, classes.minus)}}>
                            -
                        </Typography>
                    </Button>
                </ButtonGroup>
                <Button onClick={handleCart} classes={{root: clsx(classes.endButtons, classes.cartButton, {
                    [classes.success]: success
                })}}>
                    {success ? 
                    (<Typography variant="h3" classes={{root: classes.qtyText}}>
                        ✓
                    </Typography> ): 
                    (
                        <Badge overlap="circular" badgeContent="+" classes={{badge: classes.badgeClass}}>
                        <Cart color="#fff" />
                    </Badge>
                    )
                    
                    }

                </Button>
            </ButtonGroup>
        </Grid>
    )
}