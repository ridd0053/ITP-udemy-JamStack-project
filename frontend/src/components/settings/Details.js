import React, { useState, useEffect }  from "react"
import Grid from "@material-ui/core/Grid"
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
        marginBottom: '3rem',
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
    slotContainer: {
        position: "absolute",
        bottom: 0,
    },
    detailsContainer: {
        position:"relative",
        [theme.breakpoints.down('md')]: { 
            borderBottom: '4px solid #fff',
            height: '30rem',
        },
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
    setErrors 
}) {
    const classes = useStyles()
    const matchesXS = useMediaQuery(theme => theme.breakpoints.down('xs'))

    const [visible, setVisible] = useState(false)
        
    useEffect(() => {
        setValues({... user.contactInfo[slot], password:"********"})
    }, [slot])

    useEffect(() => {
        const changed = Object.keys(user.contactInfo[slot]).some(field => 
            values[field] !== user.contactInfo[slot][field])
        setChangesMade(changed)
        
    }, [values])
    
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
    const fields = [name_phone, email_password]

    return  (
        <Grid item container direction="column" lg={6} xs={12} alignItems="center" justifyContent="center" classes={{root: classes.detailsContainer}}>
            <Grid item>
                <img src={fingerprint} alt="details settings" className={classes.icon} />
            </Grid>
            {fields.map((pair, i) => (
                <Grid container justifyContent="center" key={i} classes={{root: classes.fieldContainer}} direction={matchesXS ? "column": "row"} alignItems={matchesXS ? "center": undefined}>
                    <Fields
                    fields={pair} 
                    values={values} 
                    setValues={setValues} 
                    errors={errors} 
                    setErrors={setErrors}
                    isWhite={true}
                    disabled={!edit}
                    settings
                    />
                </Grid>
            ))}
            <Grid item container classes={{root: classes.slotContainer}}>
                <Slots slot={slot} setSlot={setSlot} />
            </Grid>
        </Grid>
    )
}