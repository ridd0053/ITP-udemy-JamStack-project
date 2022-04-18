import React from "react"
import Grid from "@material-ui/core/Grid"
import Typography from "@material-ui/core/Typography"
import Chip from '@material-ui/core/Chip'
import { Link } from "gatsby"

import { makeStyles } from "@material-ui/core/styles"

import Rating from '../home/Rating'
import Sizes from "./Sizes"
import Swatches from "./Swatches"
import QtyButton from "./qtyButton"
import { colorIndex } from './ProductFrameGrid'
import { getStockDisplay } from "../product-detail/ProductInfo"


import frame from "../../images/product-frame-list.svg"

const useStyles = makeStyles(theme => ({
    frame: {
        backgroundImage:`url(${frame})`,
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        backgroundSize: "cover",
        height: "28rem",
    },
    info: {
        backgroundColor: theme.palette.primary.main,
        height: '100%',
        width: '100%',
        padding: '1rem',
        [theme.breakpoints.down('md')]: {
            height: '50%',
        },
        [theme.breakpoints.down('sm')]: {
            height: '26rem',
        },
    },
    productImage: {
        height: '15rem', 
        width: '15rem',
    },
    stock: {
        color: "#fff"
    },
    sizesAndSwatches: {
        maxWidth: '13rem',
    },
    chipLabel: {
        fontSize: '2rem',
        "&:hover": {
            cursor: "pointer",
        },
    }
}))

export default function ProductFrameList({
    product, 
    variant,
    sizes, 
    colors, 
    selectedSize,
    hasStyles,
    stock,
    selectedColor, 
    setSelectedSize, 
    setSelectedColor
    }) {
    const classes = useStyles()
    const imageIndex = colorIndex(product, variant, selectedColor)

    const images = imageIndex !== -1 ? product.node.variants[imageIndex].images : variant.images
    const productDetailLink = `/${product.node.category.name.toLowerCase()}/${product.node.name.split(" ")[0].toLowerCase()}${`?color=${encodeURIComponent(selectedColor ? selectedColor : variant.color)}`}${hasStyles ? `&style=${variant.style}` : ''}`
    
    const selectedVariant = imageIndex  === -1 ? product.node.variants.indexOf(variant) : imageIndex;
    
    const stockDisplay = getStockDisplay(stock, selectedVariant)

    return  (
        <Grid item container>
            <Grid item lg={9} container alignItems="center" justifyContent="space-around" classes={{root: classes.frame}}>
                {images.slice(0, 4).map(image => (
                    <Grid item key={image.url} component={Link} to={productDetailLink}>
                        <img src={process.env.GATSBY_STRAPI_URL + image.url} alt={image.url}
                        className={classes.productImage} />
                    </Grid>
                ))}
            </Grid>
            <Grid item lg={3} 
            container 
            direction="column"
            justifyContent="space-between" 
            classes={{root: classes.info}}>
                <Grid item container direction="column"
                component={Link} 
                to={productDetailLink}>
                    <Grid item>
                        <Typography variant="h4">
                            {product.node.name.split(" ")[0]}
                        </Typography>
                    </Grid>
                    <Grid item>
                        <Rating number={3.5} />
                    </Grid>
                    <Grid item>
                        <Chip label={`€ ${variant.price}`} classes={{label: classes.chipLabel}} />
                    </Grid>
                    <Grid item>
                        <Typography variant="h3" classes={{root: classes.stock}}>
                            {stockDisplay}
                        </Typography>
                    </Grid>
                </Grid>
                <Grid item container direction="column">
                    <Grid item classes={{root: classes.sizesAndSwatches}}>
                        <Sizes sizes={sizes} selectedSize={selectedSize} setSelectedSize={setSelectedSize} />
                        <Swatches colors={colors} selectedColor={selectedColor} setSelectedColor={setSelectedColor} />
                    </Grid>
                </Grid>
                <QtyButton stock={stock} selectedVariant={selectedVariant} />
            </Grid>
        </Grid>
    )
}