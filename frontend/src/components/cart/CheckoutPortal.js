import React, { useState, useEffect }  from "react"
import Grid from "@material-ui/core/Grid"
import Typography from "@material-ui/core/Typography"
import Button  from "@material-ui/core/Button"
import IconButton from "@material-ui/core/IconButton"


import CheckoutNavigation from "./CheckoutNavigation"
import Details from "../settings/Details"
import Location from "../settings/Location"
import Shipping from "./Shipping"
import Payments from "../settings/Payments"
import Confirmation from "./Confirmation"
import validate from "../ui/Validate"

import { makeStyles } from "@material-ui/core/styles"


const useStyles = makeStyles(theme => ({
    stepContainer: {
        backgroundColor: theme.palette.primary.main,
        width: "40rem",
        height: "25rem",
    },
    "@global": {
        ".MuiInput-underline:before, .MuiInput-underline:hover:not(.Mui-disabled):before": {
          borderBottom: "2px solid #fff",
        },
        ".MuiInput-underline:after": {
          borderBottom: `2px solid ${theme.palette.secondary.main}`,
        },
      },
}))

export default function CheckoutPortal({ user }) {
    const classes = useStyles()
    const [selectedStep, setSelectedStep] = useState(0)

    const [detailValues, setDetailValues] = useState({name: "", email: "", phone:""})
    const [detailSlot, setDetailSlot] = useState(0)
    const [detailBilling, setDetailBilling] = useState(false)

    const [locationValues, setLocationValues] = useState({street: "", zip: "", city:"", state:""})
    const [locationSlot, setLocationSlot] = useState(0)
    const [locationBilling, setLocationBilling] = useState(false)

    const [billingSlot, setBillingSlot] = useState(0)
    const [ saveCard, setSaveCard ] = useState(false)

    const [selectedShipping, setSelectedShipping] = useState(null)
    const shippingOptions = [
        {label: "FREE SHIPPING", price: 0},
        {label: "2-DAY SHIPPING", price: 9.99},
        {label: "OVERNIGHT SHIPPING", price: 29.99},
    ]


    const [errors, setErrors] = useState({})
    
    const errorHelper = values => {
        const valid = validate(values)
        return Object.keys(valid).some(value => !valid[value]);
    }

    const steps = [
        {
            title: 'Contact info', 
            component: (
                <Details
                    user={user}
                    values={detailValues}
                    setValues={setDetailValues}
                    slot={detailSlot}
                    setSlot={setDetailSlot}
                    errors={errors}
                    setErrors={setErrors}
                    billing={detailBilling}
                    setBilling={setDetailBilling}
                    checkout
                />
            ),
            error: errorHelper(detailValues)},
        {
            title: 'Address', 
            component: (
                <Location
                    user={user}
                    values={locationValues}
                    setValues={setLocationValues}
                    slot={locationSlot}
                    setSlot={setLocationSlot}
                    errors={errors}
                    setErrors={setErrors}
                    billing={locationBilling}
                    setBilling={setLocationBilling}   
                    checkout   
                />
            ),
            error: errorHelper(locationValues)  
        },
        {
        title: 'Shipping',
        component: (
            <Shipping 
                selectedShipping={selectedShipping}
                setSelectedShipping={setSelectedShipping}
                shippingOptions={shippingOptions}
            />
            ),
            error: selectedShipping === null
        },
        {
            title: 'Payment',
            component: (
                <Payments 
                    user={user}
                    slot={billingSlot}
                    setSlot={setBillingSlot}
                    saveCard={saveCard}
                    setSaveCard={setSaveCard}
                    checkout
                />
            ),
            error: false
        },
        {title: 'Confirmation', 
        component: (<Confirmation />)},
        {title: `Thanks, ${user.username}`}
    ]

    useEffect(() => {
        setErrors({})
    }, [detailSlot, locationSlot, billingSlot])

    return  (
        <Grid item container direction="column" xs={6} alignItems="flex-end">
            <CheckoutNavigation steps={steps} selectedStep={selectedStep} setSelectedStep={setSelectedStep} />
            <Grid item container direction="column" alignItems="center" classes={{root: classes.stepContainer}}>
                {steps[selectedStep].component}
            </Grid>
        </Grid>
    )
}