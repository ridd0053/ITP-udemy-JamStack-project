import React, { useState, useEffect, useContext }  from "react"
import Grid from "@material-ui/core/Grid"
import { useQuery } from "@apollo/client"
import Typography from "@material-ui/core/Typography"
import Button  from "@material-ui/core/Button"
import IconButton from "@material-ui/core/IconButton"

import ProductReview from "./ProductReview"
import { GET_REVIEWS } from "../../Apollo/Queries"

import { UserContext } from "../../contexts"

import { makeStyles } from "@material-ui/core/styles"


const useStyles = makeStyles(theme => ({
    reviews: {
        padding: "5rem 3rem 0 3rem"  
    },
}))

export default function ProductReviews({ product, edit, setEdit }) {
    const classes = useStyles()
    const [reviews, setReviews] = useState([])

    const { data } = useQuery(GET_REVIEWS, { variables: {id: product} })
    const { user } = useContext(UserContext)

    useEffect(() => {
        if ( data) {
            setReviews(data.product.reviews)
        }
    }, [data])


    return  (
        <Grid id="reviews" item container direction="column" classes={{root: classes.reviews}}>
            {/* a single productreview to add or edit reviews */}
            {edit && <ProductReview reviews={reviews} product={product} setEdit={setEdit} user={user} setReviews={setReviews} />}
            {/* filter out the review that is an existing review from the user in the messages */}
            {reviews.filter(review => edit ? review.user.username !== user.username : review).map( review => (
            <ProductReview key={review.id} reviews={reviews} product={product} review={review} /> 
            ))}
            
        </Grid>
    )
}