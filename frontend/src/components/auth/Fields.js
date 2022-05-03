import React, { useState }  from "react"
import Grid from "@material-ui/core/Grid"
import TextField from "@material-ui/core/TextField"
import InputAdornment from "@material-ui/core/InputAdornment"

import validate from "../ui/Validate"


import { makeStyles } from "@material-ui/core/styles"


const useStyles = makeStyles(theme => ({
    textField: {
        width: ({ fullWidth, settings }) => (fullWidth ? undefined : settings ? "15rem" : '20rem'),
        [theme.breakpoints.down('xs')]: {
            width: ({ fullWidth }) => (fullWidth ? undefined : '15rem'),
        },
        [theme.breakpoints.up('xs')]: {
            width: ({ xs }) => (xs ? "10rem" : undefined),
        },
    },
    input: {
        color: ({ isWhite }) => isWhite ? "#fff" : theme.palette.secondary.main,
        fontSize: ({ xs }) => (xs ? "1.25rem" : undefined),
    },
}))

export default function Fields({ fields, 
    errors, 
    setErrors, 
    values, 
    setValues,
    isWhite,
    disabled,
    fullWidth,
    settings,
    xs
}) {
    const classes = useStyles({ isWhite, fullWidth, settings, xs })

    return  (
        Object.keys(fields).map(field => {
            const validateHelper = event => {
                return validate({[field]: event.target.value})
            }
            return !fields[field].hidden ? (
                <Grid item key={field}>
                    <TextField 
                    value={values[field]} 
                    onChange={e => {
                        const valid = validateHelper(e)
                        if (errors[field] || valid[field] === true) {
                            setErrors({...errors, [field]: !valid[field]})
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
                            {fields[field].endAdornment}
                        </InputAdornment>
                    ) : undefined , 
                    classes: {input: classes.input}
                    }}
                    onBlur={e => {
                        const valid = validateHelper(e)
                        setErrors({...errors, [field]: !valid[field]})
                    }}
                    error={errors[field]}
                    helperText={errors[field] && fields[field].helperText}
                    disabled={disabled}
                    fullWidth={fullWidth}
                />
            </Grid>
            ) : null
        })
    )
}