import React, { useState }  from "react"
import clsx from 'clsx'
import Grid from "@material-ui/core/Grid"
import Typography from "@material-ui/core/Typography"
import useMediaQuery  from "@material-ui/core/useMediaQuery"
import { navigate } from "gatsby"

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
        [theme.breakpoints.down('xs')]: {
            height: '20rem',
            width: '20rem',
        },
        [theme.breakpoints.up('xs')]: {
            height: ({ small }) => small ? "15rem" : undefined,
            width: ({ small }) => small ? "15rem" : undefined,
        }

    },
    product: {
        height: '20rem',
        width: '20rem',
        [theme.breakpoints.down('xs')]: {
            height: '15rem',
            width: '15rem',
        },
        [theme.breakpoints.up('xs')]: {
            height: ({ small }) => small ? "12rem" : undefined,
            width: ({ small }) => small ? "12rem" : undefined,
        }
    },
    productNameContainer: {
        backgroundColor: theme.palette.primary.main,
        height: '5rem',
        width: '25rem',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: '-0.17rem',
        [theme.breakpoints.down('xs')]: {
            width: '20rem',
        },
        [theme.breakpoints.up('xs')]: {
            width: ({ small }) => small ? "15rem" : undefined,
        }
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
    hasStyles,
    disableQuickView,
    small, 
    selectedSize, 
    selectedColor, 
    setSelectedSize, 
    setSelectedColor }) {
    const classes = useStyles({ small })

    // To open up the quickview for website
    const [open, setOpen] = useState(false)
    const matchesMD = useMediaQuery(theme => theme.breakpoints.down('md'))
    if( matchesMD && open) {
        setOpen(false)
    }

    const imageIndex = colorIndex(product, variant, selectedColor)

    const imageURL = process.env.GATSBY_STRAPI_URL + (imageIndex !== -1 ? 
        product.node.variants[imageIndex].images[0].url : 
        variant.images[0].url)
    const name = product.node.name.split(" ")[0]
    const productDetailLink = `/${product.node.category.name.toLowerCase()}/${product.node.name.split(" ")[0].toLowerCase()}${`?color=${encodeURIComponent(selectedColor ? selectedColor : variant.color)}`}${hasStyles ? `&style=${variant.style}` : ''}`
    return  (
        <Grid item classes={{root: clsx(classes.frameContainer,
            {[classes.invisibility]: open === true})}}>
            <Grid container direction="column" 
            onClick={() => matchesMD || disableQuickView ? 
            navigate(productDetailLink) :
            setOpen(true) }>
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
            variant={variant}
            colors= {colors} 
            selectedSize= {selectedSize} 
            selectedColor= {selectedColor} 
            setSelectedSize={setSelectedSize} 
            setSelectedColor={setSelectedColor}
            hasStyles={hasStyles}
            />
        </Grid>
    
    )
}