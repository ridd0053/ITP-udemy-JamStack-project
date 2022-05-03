import React, { useState, useEffect, useRef }  from "react"
import clsx from "clsx"
import Grid from "@material-ui/core/Grid"
import FormControlLabel from "@material-ui/core/FormControlLabel"
import Switch from "@material-ui/core/Switch"
import useMediaQuery from "@material-ui/core/useMediaQuery"

import Fields from '../auth/Fields'
import Slots from "./Slots"
import { EmailPassword } from '../auth/Login'

import fingerprint from '../../images/fingerprint.svg'
import NameAdornment from '../../images/NameAdornment'
import PhoneAdornment from '../../images/PhoneAdornment'

import { makeStyles } from "@material-ui/core/styles"


const useStyles = makeStyles(theme => ({
    phoneAdornment: {
        width: 25.173,
        height: 25.122,
    },
    visibleIcon: {
        padding: 0,
    },
    emailAdornment: {
        width: 22,
        height: 17,
        marginBottom: 10,
    },
    icon: {
        marginTop: ({ checkout }) => checkout ? '-2rem' : undefined,
        marginBottom: ({ checkout }) => checkout ? '1rem' : '3rem',
        [theme.breakpoints.down('xs')]: { 
            marginBottom: '1rem',
        },
    },
    fieldContainer: {
        marginBottom: "2rem",
        "& > :not(:first-child)": {
            marginLeft: '5rem',
        },
        [theme.breakpoints.down('xs')]: { 
            marginBottom: "1rem",
            "& > :not(:first-child)": {
                marginLeft: 0,
                marginTop: "1rem",
            },
        },
    },
    fieldContainerCart: {
       "& > *": {
        marginBottom: "1rem",
       },
    },
    slotContainer: {
        position: "absolute",
        bottom: ({checkout}) => checkout ? -8 : 0,
    },
    detailsContainer: {
        position:"relative",
        [theme.breakpoints.down('md')]: { 
            borderBottom: '4px solid #fff',
            height: '30rem',
        },
    },
    switchWrapper: {
        marginRight: 4,
    },
    switchLabel: {
        color: "#fff",
        fontWeight: 600,
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

export default function Details({ 
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
    noSlots 
}) {
    const classes = useStyles({ checkout })
    const isMounted = useRef(false)

    const matchesXS = useMediaQuery(theme => theme.breakpoints.down('xs'))

    const [visible, setVisible] = useState(false)
        
    useEffect(() => {
        if (noSlots || user.username === "Guest") return
        if (checkout) {
            console.log(slot)
            setValues({... user.contactInfo[slot]})
        } else {
            setValues({... user.contactInfo[slot], password:"********"})
        }
    }, [slot])

    useEffect(() => {
        if (checkout) return
        const changed = Object.keys(user.contactInfo[slot]).some(field => 
            values[field] !== user.contactInfo[slot][field])
        setChangesMade(changed)
        
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
        if ( billing === false && isMounted.current) {
            setValues(billingValues)
        } else {
           setBillingValues(values)
        }
       }, [billing])
    
    const email_password = EmailPassword(false, false, visible, setVisible, true)
    const name_phone = {
        name: {
            helperText: "you must enter a name",
            placeholder: "Name",
            startAdornment: (
                <NameAdornment color="#fff" />
            )
        },
        phone: {
            helperText: "Invalid phone number",
            placeholder: "Phone number",
            startAdornment: (
                <div className={classes.phoneAdornment}>
                    <PhoneAdornment color="#fff" />
                </div>
            )
        },
        
    }
    let fields = [name_phone, email_password]
    if (checkout) {
        fields = [ {name: name_phone.name, email: email_password.email, phone: name_phone.phone} ]
    }


    return  (
        <Grid item container direction="column" lg={checkout ? 12 : 6} xs={12} alignItems="center" justifyContent="center" classes={{root: classes.detailsContainer}}>
            <Grid item>
                <img src={fingerprint} alt="details settings" className={classes.icon} />
            </Grid>
            {fields.map((pair, i) => (
                <Grid container justifyContent="center" key={i} classes={{root: clsx({
                    [classes.fieldContainerCart] : checkout,
                    [classes.fieldContainer]: !checkout,
                })}} direction={matchesXS || checkout ? "column": "row"} alignItems={matchesXS || checkout ? "center": undefined}>
                    <Fields
                    fields={pair} 
                    values={billing === slot && !noSlots ? billingValues : values} 
                    setValues={billing === slot && !noSlots ? setBillingValues : setValues} 
                    errors={errors} 
                    setErrors={setErrors}
                    isWhite={true}
                    disabled={ checkout ? false : !edit}
                    settings={!checkout}
                    />
                </Grid>
            ))}
            {noSlots ? null : (          
            <Grid item container justifyContent={checkout ? "space-between" : undefined} classes={{root: classes.slotContainer}}>
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