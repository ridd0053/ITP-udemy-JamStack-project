import React, { useState }  from "react"
import Grid from "@material-ui/core/Grid"
import Typography from "@material-ui/core/Typography"
import Button  from "@material-ui/core/Button"
import IconButton from "@material-ui/core/IconButton"

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
    },
    fieldContainer: {
        marginBottom: "2rem",
        "& > :not(:first-child)": {
            marginLeft: '5rem',
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

export default function Details() {
    const classes = useStyles()

    const [visible, setVisible] = useState(false)
    const [values, setValues] = useState({name: "", phone: "", email: "", password: ""})
    const [errors, setErrors] = useState({})
    
    const email_password = EmailPassword(classes, false, false, visible, setVisible, true)
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
        <Grid item container direction="column" xs={6} alignItems="center">
            <Grid item>
                <img src={fingerprint} alt="details settings" className={classes.icon} />
            </Grid>
            {fields.map((pair, i) => (
                <Grid container justifyContent="center" key={i} classes={{root: classes.fieldContainer}}>
                    <Fields 
                    fields={pair} 
                    values={values} 
                    setValues={setValues} 
                    errors={errors} 
                    setErrors={setErrors}
                    isWhite={true} />
                </Grid>
            ))}
            <Grid container>
                <Slots />
            </Grid>
        </Grid>
    )
}