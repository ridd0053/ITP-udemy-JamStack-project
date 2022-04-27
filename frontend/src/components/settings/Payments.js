import React, { useState }  from "react"
import Grid from "@material-ui/core/Grid"
import Typography from "@material-ui/core/Typography"
import Button  from "@material-ui/core/Button"
import IconButton from "@material-ui/core/IconButton"

import Slots from "./Slots"

import cardIcon from '../../images/card.svg'

import { makeStyles } from "@material-ui/core/styles"


const useStyles = makeStyles(theme => ({
    number: {
        color: "#fff",
        marginBottom: '5rem',
    },
    removeCard: {
        backgroundColor: "#fff",
        paddingLeft: 5,
        paddingRight: 5,
        marginLeft: '2rem',
        "&:hover": {
            backgroundColor: '#fff',
        },
    },
    removeCardText: {
        fontSize: '1rem',
        color: theme.palette.primary.main,
        fontFamily: 'Philosopher',
        fontStyle: 'italic',
    },
    icon: {
        marginBottom: '3rem',
    },
    paymentContainer: {
        borderLeft: '4px solid #fff',
        position:"relative",
    },
    slotContainer: {
        position: "absolute",
        bottom: 0,
    },
}))

export default function Payments({ user, edit }) {
    const classes = useStyles()
    const [slot, setSlot] = useState(0)

    const card = user.paymentMethods[slot]

    return  (
        <Grid item container direction="column" xs={6} alignItems="center" classes={{root: classes.paymentContainer}} justifyContent="center">
            <Grid item>
                <img src={cardIcon} alt="payment settings" className={classes.icon} />
            </Grid>
            <Grid item container justifyContent="center">
                <Grid item>
                    <Typography variant="h3" classes={{root: classes.number}}>
                        { card.last4 ? `${card.brand.toUpperCase()} **** **** **** ${card.last4}` : "Add A New Card During Checkout"}
                    </Typography>
                </Grid>
                {   card.last4 && 
                    <Grid item>
                        <Button variant='contained' classes={{root: classes.removeCard}}>
                            <Typography variant="h6" classes={{root: classes.removeCardText}}>
                                remove card 
                            </Typography>
                        </Button>
                </Grid>
                }
            </Grid>
            <Grid item container classes={{root: classes.slotContainer}}>
                <Slots slot={slot} setSlot={setSlot}  />
            </Grid>
        </Grid>
    )
}