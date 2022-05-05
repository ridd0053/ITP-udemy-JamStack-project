import React, { useEffect } from "react"
import Grid from "@material-ui/core/Grid"
import Typography from "@material-ui/core/Typography"
import Dialog  from "@material-ui/core/Dialog"
import DialogContent  from "@material-ui/core/DialogContent"
import Button from  "@material-ui/core/Button"
import Chip from  "@material-ui/core/Chip"
import { Link } from "gatsby"

import { makeStyles } from "@material-ui/core/styles"

import frame from '../../images/selected-frame.svg'
import explore from '../../images/explore.svg'

import Rating from '../home/Rating'
import Sizes from "./Sizes"
import Swatches from "./Swatches"
import QtyButton from "./QtyButton"
import { getStockDisplay } from "../product-detail/ProductInfo"


const useStyles = makeStyles(theme => ({
    selectedFrame: {
        backgroundImage: `url(${frame})`,
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundSize: "55rem ",
        height: '40rem',
        width: '48.5rem',
        padding: "0 !important",   
    },

    dialog: {
        maxWidth: '100%',
    },
    productImage: {
        height: "20rem",
        width: "20rem",
        marginTop: "3rem"

    },
    toolbar: {
        backgroundColor: theme.palette.primary.main,
        height: "13rem",
        marginTop: "3rem",
        padding: '0.5rem 1rem',
        position: "relative",
        
    },
    stock: {
        color: '#fff'
    },
    details: {
        color: '#fff',
        textTransform: 'none',
        fontSize: '1.5rem',
    },
    exploreIcon: {
        width: '2rem',
        height: '1.5rem',
        marginLeft: '0.5rem',
    },
    detailButton: {
        padding: 0,
    },
    infoContainer: {
        height: '100%',
    },
    chipRoot: {
        textTransform: 'scale(1.5)',
    },
    chipContainer: {
        display: 'flex',
        alignItems: 'center'
    },
    qtyContainer: {
        marginTop: "2.25rem",
    },
    infoItem: {
        position: "absolute",
        left: '1rem',
        height: 'calc(100% - 1rem)',
    },
    actionsItem: {
        position: "absolute",
        right: '1rem',
    },
}))

export default function QuickView({ open, 
    setOpen, 
    url, 
    name, 
    price, 
    product, 
    sizes, 
    colors,
    variant,
    stock,
    imageIndex,
    hasStyles, 
    selectedSize, 
    selectedColor, 
    setSelectedSize, 
    setSelectedColor,
    rating }) {
    const classes = useStyles()

    const selectedVariant = imageIndex  === -1 ? product.node.variants.indexOf(variant) : imageIndex;
    const stockDisplay = getStockDisplay(stock, selectedVariant)
    

    const productDetailLink = `/${product.node.category.name.toLowerCase()}/${product.node.name.split(" ")[0].toLowerCase()}${`?color=${encodeURIComponent(selectedColor ? selectedColor : variant.color)}`}${hasStyles ? `&style=${variant.style}` : ''}`
    
    return  (
        <Dialog classes={{ root: classes.dialogRoot, paper: classes.dialog}} open={open} onClose={() => setOpen(false)}>
            <DialogContent classes={{root: classes.selectedFrame}}>
                <Grid container direction="column" alignItems="center">
                    <Grid item component={Link} 
                    to={productDetailLink}>
                        <img src={url} alt="product" className={classes.productImage}  
                        />
                    </Grid>
                    <Grid item container justifyContent="center" classes={{root: classes.toolbar}}>
                        <Grid item classes={{root: classes.infoItem}}>
                            <Grid container 
                            direction="column" 
                            classes={{root: classes.infoContainer}} 
                            justifyContent="space-between"
                            component={Link} 
                            to={productDetailLink} >
                                <Grid item>
                                    <Typography variant="h4">{name}</Typography>
                                    <Rating number={rating} />
                                </Grid>
                                <Grid item>
                                    <Typography variant="h3" classes={{root: classes.stock}}>
                                        {stockDisplay}
                                    </Typography>
                                    <Button classes={{root: classes.detailButton}}>
                                        <Typography variant="h3" classes={{root: classes.details}}>
                                            Details
                                        </Typography>
                                        <img src={explore} className={classes.exploreIcon} alt="explore"/>
                                    </Button>
                                </Grid> 
                            </Grid>
                        </Grid>
                        <Grid item classes={{root: classes.chipContainer}}>
                                <Chip label={`€ ${price}`} classes={{root: classes.chipRoot}} />
                        </Grid>
                        <Grid item classes={{root: classes.actionsItem}}>
                            <Grid container direction="column">
                                <Sizes sizes={sizes} selectedSize={selectedSize} setSelectedSize={setSelectedSize} />
                                <Swatches colors={colors} selectedColor={selectedColor} setSelectedColor={setSelectedColor} />
                                <span className={classes.qtyContainer}>
                                    <QtyButton variants={product.node.variants} name={name} stock={stock} selectedVariant={selectedVariant} />
                                </span>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </DialogContent>
        </Dialog>
    )
}