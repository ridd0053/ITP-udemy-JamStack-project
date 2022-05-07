import React, { useState, useContext }  from "react"
import axios from "axios"
import clsx from "clsx"
import CircularProgress from "@material-ui/core/CircularProgress"
import IconButton from "@material-ui/core/IconButton"

import { UserContext, FeedbackContext } from "../../contexts"
import { setSnackbar, setUser } from "../../contexts/actions"

import FavoriteIcon from "../../images/Favorite"

import { makeStyles } from "@material-ui/core/styles"


const useStyles = makeStyles(theme => ({
    icon: {
        width: ({ size }) => `${size || 2}rem`,
        height: ({ size }) => `${size || 2}rem`,
    },
    iconButton: {
        padding: ({ noPadding }) => noPadding ? 0 : undefined,
        "&:hover": {
            backgroundColor: "transparent",
        },
    },
}))

export default function Favorite({ color, size, variant, buttonClass, noPadding }) {
    const classes = useStyles({size, noPadding})
    const [loading, setLoading] = useState(false)
    const { user, dispatchUser } = useContext(UserContext)
    const { dispatchFeedback } = useContext(FeedbackContext)

    const existingFavorite = user.favorites?.find(favorite => favorite.variant === variant)
    const handleFavorite = () => {
        if (user.username === "Guest") {
            dispatchFeedback(setSnackbar({status: "error", message: "You must be logged to add an item to favorites"}))
            return
        } 
        setLoading(true)

        const asxiosFunction = existingFavorite ? axios.delete : axios.post
        const route = existingFavorite ? `/favorites/${existingFavorite.id}` : "/favorites"
        const auth = { Authorization: `Bearer ${user.jwt}`}
        asxiosFunction(process.env.GATSBY_STRAPI_URL + route,
            {variant, headers: existingFavorite ? auth : undefined},
            {headers: auth
        }).then(response => {
            setLoading(false)
            dispatchFeedback(setSnackbar({status: "success", message: `${existingFavorite ? "Removed" : "Added"} variant ${existingFavorite ? "from" : "to"} favorites`}))
            let newFavorites = [...user.favorites]
            if ( existingFavorite ) {
                newFavorites = newFavorites.filter(favorite => favorite.id !== existingFavorite.id)
            } else {
                newFavorites.push({ id: response.data.id, variant: response.data.variant.id })
            }
            dispatchUser(setUser({...user, favorites: newFavorites}))
        }).catch(error => {
            setLoading(false)
            console.error(error)
            dispatchFeedback(setSnackbar({status: "error", message: `There was a problem ${existingFavorite ? "removing" : "adding"} this item ${existingFavorite ? "from" : "to"} favorites. Please try again.`}))
        })
   }
   if (loading) return <CircularProgress size={`${size || 2}rem`} />

    return  (
        <IconButton onClick={handleFavorite} classes={{root: clsx(classes.iconButton, buttonClass)}}>
            <span className={classes.icon}>
                <FavoriteIcon color={color} filled={existingFavorite} />
            </span>
        </IconButton>
    )
}