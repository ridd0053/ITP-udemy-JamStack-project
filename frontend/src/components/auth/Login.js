import React, { useState, useEffect }  from "react"
import clsx from "clsx"
import Grid from "@material-ui/core/Grid"
import Button from "@material-ui/core/Button"
import IconButton from "@material-ui/core/IconButton"
import Typography from "@material-ui/core/Typography"
import axios from  "axios"
import CircularProgress from "@material-ui/core/CircularProgress"

import Fields from "./Fields"
import { setUser, setSnackbar } from "../../Contexts/actions"

import accountIcon from '../../images/account.svg'
import EmailAdornment from '../../images/EmailAdornment'
import passWordAdornment from '../../images/password-adornment.svg'
import showPasswordIcon from '../../images/show-password.svg'
import hidePasswordIcon from '../../images/hide-password.svg'
import addUserIcon from '../../images/add-user.svg'
import forgotPasswordIcon from '../../images/forgot.svg'
import close from '../../images/close.svg'

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
    login: {
        width: '20rem',
        borderRadius: 50,
        textTransform: 'none',
        [theme.breakpoints.down('xs')]: {
            width: '15rem',
        },
    },
    facebookButton: {
        marginTop: '-1rem',
    },
    passwordError: {
        marginTop: 0,
    },
    facebookText: {
        fontSize: '1.5rem',
        fontWeight: 600,
        textTransform: 'none',
    },
    visibleIcon: {
        padding: 0,
    },
    close: {
        paddingTop: 5
    },
    reset: {
        marginTop: '-4rem'
    },
    buttonText: {
        [theme.breakpoints.down('xs')]: {
            fontSize: '1.5rem',
        },
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

export const EmailPassword = (classes, hideEmail, hidePassword, visible, setVisible) => (
    {
        email: {
            helperText: "invalid email",
            placeholder: "Email",
            hidden: hideEmail,
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
            hidden: hidePassword,
            startAdornment: <img src={passWordAdornment} alt="password" />,
            endAdornment: (
                <IconButton classes={{root: classes.visibleIcon}} onClick={() => setVisible(!visible)}>
                    <img src={visible ? showPasswordIcon : hidePasswordIcon} alt={`${visible ? "Show" : "Hide"} Password`}/>
                </IconButton>
            ),
            type: visible ? "text" : "Password",
        },
     
    }
)
export default function Login({ steps, setSelectedStep, user, dispatchUser, dispatchFeedback }) {
    const classes = useStyles()
    const [values, setValues] = useState({
        email: "",
        password: "",
    })
    const [errors, setErrors]  = useState({})
    const [visible, setVisible]  = useState(false)
    const [forgot, setForgot]  = useState(false)
    const [loading, setLoading] = useState(false)
    const [success, setSuccess] = useState(false)

  

    const fields = EmailPassword(classes, false, forgot, visible, setVisible)

    const navigateSignUp = () => {
        const signUp = steps.find(step => step.label === "Sign Up")
        setSelectedStep(steps.indexOf(signUp))
    }

    const handleLogin = () => {
        setLoading(true)
        axios.post(process.env.GATSBY_STRAPI_URL + '/auth/local', {
            identifier: values.email,
            password: values.password,
        }).then(response => {
            setLoading(false)
            dispatchUser(setUser({...response.data.user, jwt: response.data.jwt, onboarding: true}))
        }).catch(error => {
            const { message } = error.response.data.message[0].messages[0]
            setLoading(false)
            console.log(error)
            dispatchFeedback(setSnackbar({ status: "error", message,  }))
        })
    }

    const handleForgot = () => {
        setLoading(true)
        axios.post(process.env.GATSBY_STRAPI_URL + '/auth/forgot-password', {
            email: values.email,
        }).then(response => {
            setLoading(false)
            setSuccess(true)
            dispatchFeedback(setSnackbar({ status: "success", message: "Reset code sent"  }))
            
        }).catch(error => {
            const { message } = error.response.data.message[0].messages[0]
            setLoading(false)
            console.log(error)
            dispatchFeedback(setSnackbar({ status: "error", message }))
        })

    }

    useEffect(() => {
        if(!success) return 
        const timer = setTimeout(() => {
            setForgot(false)
        }, 6000)
        return () => clearTimeout(timer)
    }, [success])

    const disabeld = Object.keys(errors).some(error => errors[error] === true) 
    || Object.keys(errors).length !== Object.keys(values).length
    return  (
        <>
            <Grid item classes={{root: classes.accountIcon}}>
                <img src={accountIcon} alt="login page"/>
            </Grid>
            <Fields fields={fields} 
            errors={errors} 
            setErrors={setErrors} 
            values={values} 
            setValues={setValues} />
            <Grid item>
                <Button
                disabled={loading || (!forgot && disabeld)}
                onClick={() => forgot ? handleForgot() : handleLogin()} 
                variant="contained" 
                color="secondary" 
                classes={{root: clsx(classes.login, {
                    [classes.reset] : forgot
                })}}>
                    {loading ? <CircularProgress /> : (
                        <Typography variant="h5" classes={{root: classes.reset}}>
                            {forgot ? "Forgot password" : "Login"}
                        </Typography>
                    )}
       
                </Button>
            </Grid>
            {forgot ? null : (          
            <Grid item>
                <Button
                component="a"
                href={`${process.env.GATSBY_STRAPI_URL }/connect/facebook`}
                classes={{root: classes.facebookButton}}>
                    <Typography variant="h3" 
                    classes={{root: clsx(classes.facebookText, {
                        [classes.passwordError]: errors.password
                    })}}>
                        Login with Facebook
                    </Typography>
                </Button>
            </Grid>
            )}
            <Grid item container justifyContent="space-between">
                <Grid item>
                    <IconButton onClick={navigateSignUp}>
                        <img src={addUserIcon} alt="sign up"/>
                    </IconButton>
                </Grid>
                <Grid item classes={{root: clsx({
                    [classes.close]: forgot
                })}}>
                    <IconButton onClick={() => setForgot(!forgot)}>
                        <img src={forgot ? close : forgotPasswordIcon} alt={forgot ? "back to login" : "forgot password"}/>
                    </IconButton>
                </Grid>
            </Grid>
        </>
    )
}