import React, { useState }  from "react"
import Grid from "@material-ui/core/Grid"
import Typography from "@material-ui/core/Typography"
import  Paper  from "@material-ui/core/Paper"

import Login from "./Login"
import SignUp from "./SignUp"
import Complete from "./Complete"


import { makeStyles } from "@material-ui/core/styles"

const useStyles = makeStyles(theme => ({
    paper: {
        border: `2rem solid ${theme.palette.secondary.main}`,
        width: '50rem',
        height: '40rem',
        borderRadius: 0
    },
    inner: {
        border: `2rem solid ${theme.palette.primary.main}`,
        width: '100%',
        height: '40rem',

    },
    container: {
        marginBottom: '8rem',
    }

}))

export default function AuthPortal() {
    const classes = useStyles()

    const [selectedStep, setSelectedStep] = useState(0)

    const steps = [
        {component: Login, label:"Login"},
        {component: SignUp, label:"Sign Up"},
        {component: Complete, label:"Complete"},
    ]

    return  (
        <Grid container justifyContent="center" classes={{root: classes.container}}>
            <Grid item>
                <Paper elevation={6} classes={{root: classes.paper}}>
                    <Grid container direction="column" justifyContent="space-between"  alignItems="center" classes={{root: classes.inner}}>
                        {steps.map((Step, i) =>(
                            selectedStep === i ? <Step.component setSelectedStep={setSelectedStep} steps={steps} key={Step.label} /> : null
                        ))}
                    </Grid>
                </Paper>
            </Grid>
        </Grid>
    )
}