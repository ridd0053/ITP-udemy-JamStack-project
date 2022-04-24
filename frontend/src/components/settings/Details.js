import React, { useState }  from "react"
import Grid from "@material-ui/core/Grid"
import Typography from "@material-ui/core/Typography"
import Button  from "@material-ui/core/Button"
import IconButton from "@material-ui/core/IconButton"

import Fields from '../auth/Fields'
import { EmailPassword } from '../auth/Login'

import fingerprint from '../../images/fingerprint.svg'
import nameAdornment from '../../images/name-adornment.svg'
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
    }

}))

export default function Details() {
    const classes = useStyles()

    const [visible, setVisible] = useState(false)
    const [values, setValues] = useState({name: "", phone: "", email: "", password: ""})
    const [errors, setErrors] = useState({})
    
    const email_password = EmailPassword(classes, false, false, visible, setVisible)
    const name_phone = {
        name: {
            helperText: "you must enter a name",
            placeholder: "Name",
            startAdornment: <img src={nameAdornment} alt="name" />
        },
        phone: {
            helperText: "Invalid phone number",
            placeholder: "Phone number",
            startAdornment: (
                <div className={classes.phoneAdornment}>
                    <PhoneAdornment />
                </div>
            )
        },
    }
    const fields = [name_phone, email_password]

    return  (
        <Grid item container direction="column" xs={6} alignItems="center">
            <Grid item>
                <img src={fingerprint} alt="details settings" />
            </Grid>
            {fields.map((pair, i) => (
                <Grid container justifyContent="center" key={i}>
                    <Fields 
                    fields={pair} 
                    values={values} 
                    setValues={setValues} 
                    errors={errors} 
                    setErrors={setErrors} />
                </Grid>
            ))}
            <Grid container>
                <Grid item>
                    {[1, 2, 3].map( slot => (
                        <Button key={slot}>
                            {slot}
                        </Button>
                    ))}
                </Grid>
            </Grid>
        </Grid>
    )
}