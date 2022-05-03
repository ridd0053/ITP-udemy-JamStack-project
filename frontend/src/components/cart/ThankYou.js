import React, { useState }  from "react"
import Grid from "@material-ui/core/Grid"
import Typography from "@material-ui/core/Typography"
import Button  from "@material-ui/core/Button"
import { Link } from "gatsby"

import complete from '../../images/order-placed.svg'

import { makeStyles } from "@material-ui/core/styles"


const useStyles = makeStyles(theme => ({
    detailsButton: {
        padding: '0.25rem 0',
        textTransform: 'none',
    },
    order: {
        fontWeight: 600,
    },
    shopText: {
        fontSize: '2rem',
        fontWeight: 600, 
        textTransform: 'none',
    },
    mainContainer: {
        height: "100%",
        position: "relative",
    },
    shopButtonWrapper: {
        position: "absolute",
        bottom: '1rem',
        right: '1rem',
    },
    icon: {
        marginTop:"-3rem",
    },
}))

export default function ThankYou({ order, selectedShipping }) {
    const classes = useStyles()

    const addToDate = days => {
        var date = new Date()
        date.setDate(date.getDate() + days)

        const day = date.getDate()
        const month = date.getMonth() + 1
        const year = date.getFullYear()

        return `${day}/${month}/${year}`
    }

    const getExpected = () => {
        switch (selectedShipping) {
            case "2-DAY SHIPPING":
                return addToDate(2)
            case "OVERNIGHT SHIPPING":
                return addToDate(1)
            default:
                return addToDate(14)
        }
    }

    return  (
        <Grid item container direction="column" alignItems="center" justifyContent="center" classes={{root: classes.mainContainer}}>
            <Grid item>
                <img src={complete} alt="order placed" className={classes.icon} />
            </Grid>
            <Grid item>
                <Typography variant="h4">
                    Expected by { getExpected() }
                </Typography>
                <Grid item container justifyContent="space-between" alignItems="center">
                    <Grid item>
                        <Typography variant="body2" classes={{root: classes.order}}>
                            Order #{order.id.slice(order.id.length - 10, order.id.length)}
                        </Typography>
                    </Grid>
                    <Grid item>
                        <Button classes={{root: classes.detailsButton}}>
                            <Typography variant="body2">
                                Details {">"}
                            </Typography>
                        </Button>
                    </Grid>
                </Grid>
            </Grid>
            <Grid item classes={{root: classes.shopButtonWrapper}}>
                <Button component={Link} to="/hats">
                    <Typography variant="body2" classes={{root: classes.shopText}}>
                        Shop {">"}
                    </Typography>
                </Button>
            </Grid>
        </Grid>
    )
}