import React, { useState }  from "react"
import clsx from 'clsx'
import Grid from "@material-ui/core/Grid"
import Typography from "@material-ui/core/Typography"

import { makeStyles } from "@material-ui/core/styles"

import frame from "../../images/product-frame-grid.svg"

import QuickView from "./QuickView"

const useStyles = makeStyles(theme => ({
    frame: {
        backgroundImage: `url(${frame})`,
        backgroundPostion: 'center',
        backgroundSize:'contain',
        backgroundRepeat: 'no-repeat',
        height: '25rem',
        width: '25rem',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',

    },
    product: {
        height: '20rem',
        width: '20rem'
    },
    productNameContainer: {
        backgroundColor: theme.palette.primary.main,
        height: '5rem',
        width: '25rem',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: '-0.17rem'
    },
    invisibility: {
        visibility: 'hidden',
    },
    frameContainer: {
        "&:hover": {
            cursor: "pointer",
        },
    }
}))

export const colorIndex = (product, variant, color) => {
    return product.node.variants.indexOf( 
        product.node.variants.filter( item => item.color === color && item.style === variant.style)[0]
        )
}

export default function ProductFrameGrid({ 
    product, 
    variant, 
    sizes, 
    colors, 
    selectedSize, 
    selectedColor, 
    setSelectedSize, 
    setSelectedColor }) {
    const classes = useStyles()
    const [open, setOpen] = useState(false)

    const imageIndex = colorIndex(product, variant, selectedColor)

    const imageURL = process.env.GATSBY_STRAPI_URL + (imageIndex !== -1 ? 
        product.node.variants[imageIndex].images[0].url : 
        variant.images[0].url)
    const name = product.node.name.split(" ")[0]
    return  (
        <Grid item classes={{root: clsx(classes.frameContainer,
            {[classes.invisibility]: open === true})}}>
            <Grid container direction="column" onClick={() => setOpen(true)}>
                <Grid item classes={{root: classes.frame}}>
                    <img src={imageURL} alt={product.node.name} 
                    className={classes.product} />
                </Grid>
                <Grid item classes={{root: classes.productNameContainer}}>
                    <Typography variant="h5">{name}</Typography>
                </Grid>
            </Grid>
            {/* QuickView */}
            <QuickView 
            open={open} 
            setOpen={setOpen} 
            url={imageURL} 
            name={name} 
            price={variant.price}
            product={product}
            sizes= {sizes} 
            colors= {colors} 
            selectedSize= {selectedSize} 
            selectedColor= {selectedColor} 
            setSelectedSize={setSelectedSize} 
            setSelectedColor={setSelectedColor}
            />
        </Grid>
    
    )
}