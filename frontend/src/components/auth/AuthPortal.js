import React, { useState, useContext, useEffect }  from "react"
import axios from "axios"
import Grid from "@material-ui/core/Grid"
import  Paper  from "@material-ui/core/Paper"

import { UserContext, FeedbackContext } from "../../contexts"
import { setUser, setSnackbar } from "../../contexts/actions"

import Login from "./Login"
import SignUp from "./SignUp"
import Complete from "./Complete"
import Reset from "./Reset"


import { makeStyles } from "@material-ui/core/styles"

const useStyles = makeStyles(theme => ({
    paper: {
        border: `2rem solid ${theme.palette.secondary.main}`,
        width: '50rem',
        height: '40rem',
        borderRadius: 0,
        [theme.breakpoints.down('md')]: {
            width: '30rem',
        },
        [theme.breakpoints.down('xs')]: {
            width: 'calc(100vw - 2rem)',
        },
        [theme.breakpoints.down('xs')]: {
            borderWith: '1rem'
        },
    },
    inner: {
        border: `2rem solid ${theme.palette.primary.main}`,
        width: '100%',
        height: '40rem',
        [theme.breakpoints.down('xs')]: {
            borderWith: '1rem'
        },

    },
    container: {
        marginBottom: '8rem',
        [theme.breakpoints.down('md')]: {
            marginTop: '5rem',
        }
    }

}))

export default function AuthPortal() {
    const classes = useStyles()

    const [selectedStep, setSelectedStep] = useState(0)
    const {user, dispatchUser} = useContext(UserContext)
    const {feedback, dispatchFeedback} = useContext(FeedbackContext)
    

    const steps = [
        {component: Login, label:"Login"},
        {component: SignUp, label:"Sign Up"},
        {component: Complete, label:"Complete"},
        {component: Reset, label:"Reset"},
    ]
    useEffect(() => {
        const params = new URLSearchParams(window.location.search)
        const code = params.get("code")
        const access_token = params.get("access_token")
        if( code ) {
            const resetStep = steps.find(step => step.label === "Reset")
            setSelectedStep(steps.indexOf(resetStep))
        }
        else if( access_token  ) {
            axios.get(process.env.GATSBY_STRAPI_URL + '/auth/facebook/callback', {
                params: { access_token }
            }).then(response => {
                dispatchUser(setUser(
                    { 
                    ...response.data.user, 
                    jwt: response.data.jwt, 
                    onboarding: true }
                ))
                // Removes parameters, so the code of facebook
                window.history.replaceState(null, null, window.location.pathname)  
            }).catch(error => {
                console.log(error)
                dispatchFeedback(setSnackbar({status: "error", message: "Connecting to Facebook failed, please try again"}))
            })
        }
    }, [])

    return  (
        <Grid container justifyContent="center" classes={{root: classes.container}}>
            <Grid item>
                <Paper elevation={6} classes={{root: classes.paper}}>
                    <Grid container direction="column" justifyContent="space-between"  alignItems="center" classes={{root: classes.inner}}>
                        {steps.map((Step, i) =>(
                            selectedStep === i ? <Step.component
                            user={user} 
                            dispatchUser={dispatchUser}
                            feedback={feedback}
                            dispatchFeedback={dispatchFeedback}
                            setSelectedStep={setSelectedStep} 
                            steps={steps} 
                            key={Step.label} /> : null
                        ))}
                    </Grid>
                </Paper>
            </Grid>
        </Grid>
    )
}