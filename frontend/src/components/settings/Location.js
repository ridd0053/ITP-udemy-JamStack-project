import React, { useState, useEffect, useContext, useRef }  from "react"
import axios from 'axios'
import Grid from "@material-ui/core/Grid"
import CircularProgress  from "@material-ui/core/CircularProgress"
import FormControlLabel from "@material-ui/core/FormControlLabel"
import Switch from "@material-ui/core/Switch"
import Chip from "@material-ui/core/Chip"

import Fields from "../auth/Fields"
import Slots from "./Slots"
import { FeedbackContext } from '../../contexts'
import { setSnackbar } from "../../contexts/actions"

import locationIcon from '../../images/location.svg'
import streetAdornment from '../../images/street-adornment.svg' 
import zipAdornment from '../../images/zip-adornment.svg'

import { makeStyles } from "@material-ui/core/styles"


const useStyles = makeStyles(theme => ({
    icon: {
        marginBottom: ({ checkout }) => checkout ? "1rem" : '3rem',
        [theme.breakpoints.down('xs')]: { 
            marginBottom: '1rem',
        },
    },
    chipWrapper: {
        marginTop: '2rem',
        marginBottom: '3rem',
    },
    fieldContainer: {
        "& > :not(:first-child)": {
            marginTop: '2rem',
        },
    },
    slotContainer: {
        position: "absolute",
        bottom: ({checkout}) => checkout ? -8 : 0,
    },
    locationContainer: {
        height: "100%",
        display: ({checkout, selectedStep, stepNumber}) => checkout && selectedStep !== stepNumber ? "none" : "flex",
        position:"relative",
        [theme.breakpoints.down('md')]: { 
            borderBottom: '4px solid #fff',
            height: ({checkout}) => !checkout ? '30rem' : "100%",
        },
    },
    switchWrapper: {
        marginRight: 4,
    },
    switchLabel: {
        color: "#fff",
        fontWeight: 600,
        [theme.breakpoints.down('xs')]: {
            fontSize: "1rem",
        }, 
    },
}))



export default function Location({ 
    user, 
    edit, 
    setChangesMade, 
    values, 
    setValues, 
    slot, 
    setSlot, 
    errors, 
    setErrors, 
    billing, 
    setBilling, 
    checkout,
    billingValues,
    setBillingValues,
    selectedStep,
    stepNumber,
    noSlots,
    }) {
    const classes = useStyles({ checkout, selectedStep, stepNumber })
    const isMounted = useRef(false)
    const [loading, setLoading] = useState(false)
    const { dispatchFeedback } = useContext(FeedbackContext)

    const handleValues = values  => {
        if (billing === slot && !noSlots) {
            setBillingValues(values)
        }
        setValues(values)
    }

    const getLocation = () => {
        setLoading(true)

        axios.get(`https://data.opendatasoft.com/api/records/1.0/search/?dataset=geonames-postal-code%40public&q=&rows=1&facet=country_code&facet=admin_name1&facet=place_name&facet=postal_code&refine.country_code=NL&refine.postal_code=${values.zip.substring(0, 4)}`
        ).then( response => {
            setLoading(false)
            const {place_name, admin_name1} = response.data.records[0].fields
            handleValues({...values, city: place_name, state: admin_name1})

        }).catch(error => {
            setLoading(false)
            dispatchFeedback(setSnackbar({status: 'error', message: 'There was a problem with your zip code, please try again.'}))
            console.error(error)
        })
    }

    useEffect(() => {
        if (noSlots || user.username === "Guest") return
        setValues({... user.locations[slot]})
    }, [slot])

    useEffect(() => {
        if (!checkout) {        
        const changed = Object.keys(user.locations[slot]).some(field => 
            values[field] !== user.locations[slot][field])
        setChangesMade(changed)
        }

        if (values.zip.length >= 4 && values.zip.length <= 7) {
            if (values.city) return
            getLocation()
        } else if ( values.zip.length < 4 && values.city) {
            handleValues({...values, city:"", state:""})
        }
        
    }, [values])

    useEffect(() => {
        if ( noSlots ) {
            isMounted.current = false
            return
        }
        if (isMounted.current === false) {
            isMounted.current = true
            return
        }
        if ( billing === false && isMounted.current ) {
            setValues(billingValues)
        } else {
           setBillingValues(values)
        }
       }, [billing])
    
    
    const fields = {
        street: {
            placeholder: 'Street',
            helperText: 'invalid address',
            startAdornment: <img src={streetAdornment} alt="street" />,
        },
        zip: {
            placeholder: 'Zip Code',
            helperText: 'invalid zip code',
            startAdornment: <img src={zipAdornment} alt="zip code" />,
        },
    }

    return  (
        <Grid item container direction="column" lg={checkout ? 12 : 6} xs={12}  alignItems="center" justifyContent="center" classes={{root: classes.locationContainer}}>
            <Grid item>
                <img src={locationIcon} alt="locations settings" className={classes.icon} />
            </Grid>
            <Grid item container direction="column" alignItems="center" classes={{root: classes.fieldContainer}}>
            <Fields 
                fields={fields} 
                values={billing === slot && !noSlots ? billingValues : values} 
                setValues={handleValues} 
                errors={errors} 
                setErrors={setErrors}
                isWhite={true}
                disabled={checkout ? false : !edit} />
            </Grid>
            <Grid item classes={{root: classes.chipWrapper}}>
                {loading ? <CircularProgress color="secondary" /> : (
                    <Chip label={ values.city ? `${values.city}, ${values.state}` : "City, State"}/>
                )}
            </Grid>
            {noSlots ? null : (        
            <Grid item container classes={{root: classes.slotContainer}} justifyContent={checkout ? "space-between" : undefined}>
                <Slots slot={slot} setSlot={setSlot} checkout={checkout} />
                {checkout && (
                    <Grid item>
                        <FormControlLabel classes={{root: classes.switchWrapper, label: classes.switchLabel}} label="Billing" labelPlacement="start" control={<Switch checked={billing === slot} onChange={() => setBilling(billing === slot ? false : slot)} color="secondary" />} />
                    </Grid>
                )}
            </Grid>
            )}
        </Grid>
    )
}