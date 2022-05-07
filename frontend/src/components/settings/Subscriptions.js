import React, { useState, useEffect, useContext }  from "react"
import axios from 'axios'
import clsx from 'clsx'
import Grid from "@material-ui/core/Grid"
import Typography from "@material-ui/core/Typography"
import Chip  from "@material-ui/core/Chip"
import Button  from "@material-ui/core/Button"
import IconButton from "@material-ui/core/IconButton"

import { userContext, FeedbackContext, UserContext } from '../../contexts'
import  { setSnackbar } from '../../contexts/actions'

import SettingsGrid from "./SettingsGrid"
import QtyButton from "../products-list/QtyButton"

import DeleteIcon from '../../images/Delete'
import pauseIcon from '../../images/pause.svg'

import { makeStyles } from "@material-ui/core/styles"


const useStyles = makeStyles(theme => ({
    bold: {
        fontWeight: 600,
        fontSize: '1.25rem',
    },
    productImage: {
        height: "10rem",
        width: "10rem",
    },
    method: {
        color: "#fff",
        textTransform: "uppercase",
        fontSize: '1.30rem',
        marginTop: "1rem",
    },
    lineHeight: {
        lineHeight: 1.1,
    },
    deleteWrapper: {
        height: '2.5rem',
        width: '2rem',
    },
    pause: {
        height: '2.5rem',
        width: '2.5rem',
    },
    iconButton: {
        "&:hover": {
            backgroundColor: "transparent",
        },
    }
    
}))

export default function Subscriptions({ setSelectedSetting }) {
    const classes = useStyles()
    const { user } = useContext(UserContext)
    const { dispatchFeedback } = useContext(FeedbackContext)
    const [subscriptions, setSubscriptions] = useState([])
    const options = { year: 'numeric', month: 'long', day: 'numeric' };

    useEffect(() => {
        axios.get(process.env.GATSBY_STRAPI_URL + "/subscriptions/me", 
        {headers: {Authorization: `Bearer ${user.jwt}`}}
        ).then(response => {
            setSubscriptions(response.data)
        }).catch(error => {
            console.error(error)
            dispatchFeedback(setSnackbar({status: "error", message:"There was a problem retrieving you subscriptions. Please try again."}))
        })
    }, [])

    const createDate = data => data.map(({
        shippingInfo, 
        shippingAddress,
        billingInfo,
        billingAddress,
        paymentMethod,
        name,
        variant,
        quantity,
        frequency,
        next_delivery,
         id}) => ({

        details: {
            shippingInfo, 
            shippingAddress,
            billingInfo,
            billingAddress,
            paymentMethod,
        },
        item: {name, variant },
        quantity: {quantity , variant, name, frequency},
        frequency,
        next_delivery,
        total: Math.round(variant.price * 1.21),
        id,
    }))

    const columns = [
        {field: "details", headerName: "Details", width: 320, sortable: false,
        renderCell: ({value}) => 
         (
             <Grid container>
                 <Grid item>
                    <Typography variant="body2" classes={{root: clsx(classes.bold, classes.lineHeight)}}>
                        {`${value.shippingInfo.name}`}
                        <br />
                        {`${value.shippingAddress.street}`}
                        <br />
                        {`${value.shippingAddress.zip}, ${value.shippingAddress.city}`}
                        <br />
                        {`${value.shippingAddress.state}`}
                    </Typography>
                 </Grid>
                 <Grid item>
                     <Typography variant="h3" classes={{root: classes.method}}>
                        {value.paymentMethod.brand} {value.paymentMethod.last4}
                     </Typography>
                 </Grid>
             </Grid>

        )},
        {field: "item", headerName: "Item", width: 190, sortable: false, 
        renderCell:({ value }) => 
        (
            <Grid container direction="column" alignItems="center">
                <Grid item>
                    <img src={process.env.GATSBY_STRAPI_URL + value.variant.images[0].url} alt={value.name} className={classes.productImage} />
                </Grid>
                <Grid item>
                    <Typography variant="body2" classes={{root: classes.bold}}>
                        {value.name}
                    </Typography>
                </Grid>
            </Grid>
        )},
        {field: "quantity", headerName: "Quantity", width: 170, sortable: false, 
        renderCell: ({value}) => (
            <Grid container justifyContent="center">
                <Grid item>
                    <QtyButton 
                    stock={[{qty: value.variant.qty}]}
                    variant={value.variant}
                    selectedVariant={0}
                    name={value.name}
                    white
                    hideCartButton
                    round />
                </Grid>
            </Grid>
        )},
        {field: "frequency", headerName: "Frequency", width: 220, sortable: false,
        renderCell: ({ value }) => (
            <Chip label={value.split("_").join(" ")} classes={{label: classes.bold}} />
        )},
        {field: "next_delivery", headerName: "Next Delivery", width: 280,
        renderCell: ({ value }) => (
            new Date(value).toLocaleDateString('en-GB', options)
        )},
        {field: "total", headerName: "Total", width: 140,
        renderCell: ({ value }) => (
            <Chip label={`€ ${value.toFixed(2)}`} classes={{label: classes.bold}} />
        )},
        {field: "", width: 190, sortable: false,
        renderCell: () => (

            <Grid container>
                <Grid item>
                    <IconButton classes={{root: classes.iconButton}}>
                        <span className={classes.deleteWrapper}>
                            <DeleteIcon color="#fff" />
                        </span>
                    </IconButton>
                </Grid>
                <Grid item>
                    <IconButton classes={{root: classes.iconButton}}>
                        <img src={pauseIcon} alt="pause subscription" className={classes.pause} />
                    </IconButton>
                </Grid>
            </Grid>

        )
        },
        
    ]

    const rows = createDate(subscriptions)

    console.log(rows)
    return  (
        <SettingsGrid setSelectedSetting={setSelectedSetting} rows={rows} columns={columns} rowsPerPage={3} />
    )
}