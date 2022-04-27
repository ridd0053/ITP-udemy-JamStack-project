import React, { useContext, useState }  from "react"
import clsx from 'clsx'
import Grid from "@material-ui/core/Grid"
import Typography from "@material-ui/core/Typography"

import Details from "./Details"
import Payments from "./Payments"
import Location from "./Location"
import Edit from "./Edit"

import { UserContext } from '../../contexts'

import { makeStyles } from "@material-ui/core/styles"


const useStyles = makeStyles(theme => ({
    bottomRow: {
        borderTop: '4px solid #fff'
    },
    sectionContainer: {
        height: '50%'
    }
}))

export default function Settings({ setSelectedSetting }) {
    const classes = useStyles()

    const [edit, setEdit] = useState(false)
    const [changesMade, setChangesMade] = useState(false)

    const [detailValues, setDetailValues] = useState({
        name: "", 
        phone: "", 
        email: "", 
        password: "********"
    })

    const [detailSlot, setDetailSlot] = useState(0)

    const [locationValues, setLocationValues] = useState({
        street:"", 
        zip:"",
        city: "",
        zip: "",
    })
    const [locationSlot, setLocationSlot] = useState(0)

    const { user, dispatchUser  } = useContext(UserContext)

    return  (
        <>
            <Grid container classes={{root: classes.sectionContainer}}>
                <Details user={user} edit={edit} setChangesMade={setChangesMade} values={detailValues} setValues={setDetailValues} slot={detailSlot} setSlot={setDetailSlot} />
                <Payments user={user} edit={edit} />
            </Grid>
            <Grid container classes={{root: clsx(classes.bottomRow, classes.sectionContainer)}}>
                <Location user={user} edit={edit} setChangesMade={setChangesMade} values={locationValues} setValues={setLocationValues} slot={locationSlot} setSlot={setLocationSlot} />
                <Edit user={user} dispatchUser={dispatchUser} edit={edit} setEdit={setEdit} setSelectedSetting={setSelectedSetting} changesMade={changesMade} details={detailValues} locations={locationValues} detailSlot={detailSlot} locationSlot={locationSlot}/>
            </Grid>
        </>
    )
}