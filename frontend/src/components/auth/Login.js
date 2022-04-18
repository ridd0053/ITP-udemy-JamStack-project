import React, { useState }  from "react"
import Grid from "@material-ui/core/Grid"
import Button from "@material-ui/core/Button"
import IconButton from "@material-ui/core/IconButton"
import TextField from "@material-ui/core/TextField"
import InputAdornment from "@material-ui/core/InputAdornment"
import Typography from "@material-ui/core/Typography"

import validate from "../ui/Validate"

import accountIcon from '../../images/account.svg'
import EmailAdornment from '../../images/EmailAdornment'
import passWordAdornment from '../../images/password-adornment.svg'
import showPassword from '../../images/show-password.svg'
import hidePassword from '../../images/hide-password.svg'
import addUserIcon from '../../images/add-user.svg'
import forgotPasswordIcon from '../../images/forgot.svg'

import { makeStyles } from "@material-ui/core/styles"


const useStyles = makeStyles(theme => ({
    emailAdornment:{
        height: 17,
        width: 22,
        marginBottom: 10,
    },
    accountIcon: {
        marginTop: '2rem',
    },
    textField: {
        width: '20rem',
    },
    input: {
        color: theme.palette.secondary.main,
    },
    login: {
        width: '20rem',
        borderRadius: 50,
        textTransform: 'none',
    },
    facebookButton: {
        marginTop: '-1rem',
    },
    facebookText: {
        fontSize: '1.5rem',
        fontWeight: 700,
        textTransform: 'none',
    },
    visibleIcon: {
        padding: 0,
    },
    "@global": {
        ".MuiInput-underline:before, .MuiInput-underline:hover:not(.Mui-disabled):before": {
          borderBottom: `2px solid ${theme.palette.secondary.main}`,
        },
        ".MuiInput-underline:after": {
          borderBottom: `2px solid ${theme.palette.primary.main}`,
        },
      },

}))

export default function Login({ 
    setSelectedStep,
    steps

 }) {
    const classes = useStyles()
    const [values, setValues] = useState({
        email: "",
        password: "",
    })
    const [errors, setErrors]  = useState({})
    const [visible, setVisible]  = useState(false)

    const fields ={
        email: {
            helperText: "invalid email",
            placeholder: "Email",
            startAdornment: (
                <span className={classes.emailAdornment}>
                    <EmailAdornment />
                </span>
            ),
            type: 'text',
        },
        password: {
            helperText: "Your password must be at least 8 characters and include one uppercase letter, one number and one special character",
            placeholder: "Password",
            startAdornment: <img src={passWordAdornment} alt="password" />,
            endAdornment: (
                    <img src={visible ? showPassword : hidePassword} alt={`${visible ? "Show" : "Hide"} Password`}/>
            ),
            type: visible ? "text" : "Password",
        },
    }

    return  (
        <>
            <Grid item classes={{root: classes.accountIcon}}>
                <img src={accountIcon} alt="login page"/>
            </Grid>
            {Object.keys(fields).map(field => {
                const validateHelper = event => {
                    const valid = validate({[field]: event.target.value})
                    setErrors({...errors, [field]: !valid[field]})
                }
                return (
                    <Grid item key={field}>
                        <TextField 
                        value={values[field]} 
                        onChange={e => {
                            if (errors[field]) {
                                validateHelper(e)
                            }
                            setValues({ ...values, [field]: e.target.value })
                        }}
                        classes={{root: classes.textField}} 
                        placeholder={fields[field].placeholder}
                        type={fields[field].type}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                {fields[field].startAdornment}
                            </InputAdornment>
                        ),
                        endAdornment: fields[field].endAdornment ? (
                            <InputAdornment position="end">
                                <IconButton 
                                classes={{root: classes.visibleIcon}}
                                onClick={() => setVisible(!visible)}>
                                    {fields[field].endAdornment}
                                </IconButton>
                            </InputAdornment>
                        ) : undefined , 
                        classes: {input: classes.input}
                        }}
                        onBlur={e => validateHelper(e)}
                        error={errors[field]}
                        helperText={errors[field] && fields[field].helperText}

                    />
                </Grid>
                )
            })}
     
            <Grid item>
                <Button variant="contained" color="secondary" classes={{root: classes.login}}>
                    <Typography variant="h5">
                        Login
                    </Typography>
                </Button>
            </Grid>
            <Grid item>
                <Button classes={{root: classes.facebookButton}}>
                    <Typography variant="h3" classes={{root: classes.facebookText}}>
                        Login with Facebook
                    </Typography>
                </Button>
            </Grid>
            <Grid item container justifyContent="space-between">
                <Grid item>
                    <img src={addUserIcon} alt="sign up"/>
                </Grid>
                <Grid item>
                    <img src={forgotPasswordIcon} alt="forgot password"/>
                </Grid>
            </Grid>
        </>
    )
}