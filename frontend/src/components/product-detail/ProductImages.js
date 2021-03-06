import React, { useState }  from "react"
import Grid from "@material-ui/core/Grid"
import Typography from "@material-ui/core/Typography"
import IconButton from "@material-ui/core/IconButton"


import { makeStyles } from "@material-ui/core/styles"


const useStyles = makeStyles(theme => ({
    selected: {
        height:'25rem',
        width:'25rem',
        [theme.breakpoints.down("sm")]: {
            height:'20rem',
            width:'20rem',
        },
    },
    small: {
        height:'5rem',
        width:'5rem',
        [theme.breakpoints.down("sm")]: {
            height:'3rem',
            width:'3rem',
        },  
    },
    imageItemContainer: {
        margin: '1rem',
    }
}))

export default function ProductImages({ images, selectedImage, setSelectedImage }) {
    const classes = useStyles()
    return  (
        <Grid item container direction="column" alignItems="center" lg={6}>
            <Grid item>
                {/* main image */}
                <img 
                src={process.env.GATSBY_STRAPI_URL + images[selectedImage].url} 
                alt="product_large"
                className={classes.selected} />
            </Grid>
            <Grid item container justifyContent="center">
                {images.map((image, i) => (
                    <Grid item key={image.url} classes={{root: classes.imageItemContainer}}>
                        <IconButton onClick={() => setSelectedImage(i)}>
                            <img 
                            src={process.env.GATSBY_STRAPI_URL + image.url} 
                            alt={`product_small_${i}`}
                            className={classes.small}/>
                        </IconButton>
                    </Grid>
            ))}
            </Grid>
        </Grid>
    )
}