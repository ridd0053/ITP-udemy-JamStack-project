import React, { useState, useEffect }  from "react"
import Grid from "@material-ui/core/Grid"
import Typography from "@material-ui/core/Typography"
import clsx from "clsx"
import Button from "@material-ui/core/Button"
import Chip from "@material-ui/core/Chip"
import useMediaQuery  from "@material-ui/core/useMediaQuery"

import factorite from '../../images/favorite.svg'
import subscription from '../../images/subscription.svg'

import Rating from "../home/Rating"
import Sizes from "../products-list/Sizes"
import Swatches from "../products-list/Swatches"
import QtyButton from "../products-list/qtyButton"
import { colorIndex } from "../products-list/ProductFrameGrid"

import { makeStyles } from "@material-ui/core/styles"


const useStyles = makeStyles(theme => ({
    background: {
        backgroundColor: theme.palette.secondary.main,
        height: '45rem',
        width: '35rem',
        [theme.breakpoints.down("md")]: {
            width: "100%",
        },
        [theme.breakpoints.down("xs")]: {
            height: "58rem",
        }
    },
    center: {
        backgroundColor: theme.palette.primary.main,
        height: "35rem",
        width: "45rem",
        position: "absolute",
        marginBottom: "4.5rem",
        [theme.breakpoints.down("lg")]: {
            width: "40rem",
        },
        [theme.breakpoints.down("md")]: {
            width: "100%",
        },
        [theme.breakpoints.down("xs")]: {
            height: "48rem",
        }
    },
    icon: {
        height: '4rem',
        width: '4rem',
        margin: "0.5rem 1rem"
    },
    sectionContainer: {
        height: "calc(100% / 3)",
    },
    descriptionContainer: {
        backgroundColor: theme.palette.secondary.main,
        overflowY: "auto",
        padding: "0.5rem 1rem",
    },
    name: {
        color: "#fff",
    },
    reviewButton: {
        textTransform: "none",
        marginLeft: '-8px',
    },
    detailsContainer: {
        padding: "0.5rem 1rem",
    },
    chipContainer: {
        margin: "1rem",
        [theme.breakpoints.down("xs")]: {
            margin: "0",
            marginBottom: "1.5rem",
        }
    },
    chipRoot: {
        height: '3rem',
        width: 'auto',
        borderRadius: 50,
        [theme.breakpoints.down("xs")]: {
            height: "2rem"
        }

    },
    chipLabel: {
        fontSize: '2rem',
        [theme.breakpoints.down("xs")]: {
            fontSize: "1.5rem"
        }
    },
    stock: {
        color: "#fff",
    },
    sizesAndSwatches: {
        maxWidth: "13rem",
    },
    actionsContainer: {
        padding: "0 1rem"
    },
    "@global": {
        ".MuiButtonGroup-groupedOutlinedVertical:not(:first-child)": {
          marginTop: 0,
        },
    },
}))

export const getStockDisplay = (stock, variant) => {
    switch( stock ) {
        case undefined:
        case null:
             return "Loading inventory"
        case -1:
            return "Error loading inventory"
        default:
            if(stock[variant].qty === 0) {
                return "Out of stock"
            }else {
                return `${stock[variant].qty} currently in stock`
            }

    }
}

export default function ProductInfo({ name, description, variants, selectedVariant, setSelectedVariant , stock, setSelectedImage }) {
    const classes = useStyles()

    const matchesXS = useMediaQuery(theme => theme.breakpoints.down('xs'))

    

    const [selectedSize, setSelectedSize] = useState(variants[selectedVariant].size);
    const [selectedColor, setSelectedColor] = useState(null);

    const imageIndex = colorIndex({node: {variants} }, variants[selectedVariant], selectedColor)
    const sizes = []
    const colors = []


    variants.map(variant => {
        sizes.push(variant.size)
        if(!colors.includes(variant.color) 
        && variant.size === selectedSize 
        && variant.style === variants[selectedVariant].style) {
            colors.push(variant.color)
        }
    })

    useEffect(() => {
        if (imageIndex !== -1) {
            setSelectedVariant(imageIndex)
        }
    }, [imageIndex])

    useEffect(() => {
        setSelectedColor(null)
        const newVariant = variants.find(variant => variant.size === selectedSize 
            && variant.style === variants[selectedVariant].style
            && variant.color === colors[0])
        setSelectedVariant(variants.indexOf(newVariant))
    }, [selectedSize])

    useEffect(() => {
        setSelectedImage(0)
    }, [selectedColor])

    const stockDisplay = getStockDisplay(stock, selectedVariant)

    return  (
        <Grid item container justifyContent="center" alignItems="flex-end" direction="columns" lg={6}>
            <Grid item container justifyContent="flex-end" classes={{root: classes.background}}>
                <Grid item>
                    <img src={factorite} alt="add item to favorite" className={classes.icon} />
                </Grid>
                <Grid item>
                    <img src={subscription} alt="subsribe to item" className={classes.icon} />
                </Grid>
            </Grid>
            <Grid item container direction="column" classes={{root: classes.center}}>
                <Grid 
                item
                container
                justifyContent="space-between" 
                direction={matchesXS ? "column" : "row"} 
                classes={{root: clsx(classes.sectionContainer, classes.detailsContainer)}}>
                    <Grid item>
                        <Grid container direction="column">
                            <Grid item>
                                <Typography variant="h1" classes={{root: classes.name}}>
                                    {name.split(" ")[0]}
                                </Typography>
                            </Grid>
                            <Grid item>
                                <Rating number={2.5} />
                            </Grid>
                            <Grid item>
                                <Button>
                                    <Typography variant="body2" classes={{root: classes.reviewButton}}>
                                        Leave a review {'>'}
                                    </Typography>
                                </Button>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item classes={{root: classes.chipContainer}}>
                        <Chip label={`€ ${variants[selectedVariant].price}`} classes={{root: classes.chipRoot, label: classes.chipLabel}} />
                    </Grid>
                </Grid>
                <Grid item container classes={{root: clsx(classes.sectionContainer, classes.descriptionContainer)}}>
                    <Grid item>
                        <Typography variant="h5">Description</Typography>
                        <Typography variant="body2">{description}</Typography>
                    </Grid>
                </Grid>
                <Grid item container 
                justifyContent={matchesXS ? "space-around" :"space-between"} 
                alignItems={matchesXS ? "flex-start" : "center"}
                direction={matchesXS ? "column" : "row"} 
                classes={{root: clsx(classes.sectionContainer, classes.actionsContainer)}}>
                    <Grid item>
                        <Grid container direction="column">
                            <Grid item classes={{root: classes.sizesAndSwatches}}>
                                <Sizes sizes={sizes} selectedSize={selectedSize} setSelectedSize={setSelectedSize} />
                                <Swatches colors={colors} selectedColor={selectedColor} setSelectedColor={setSelectedColor}  />
                            </Grid>
                            <Grid item>
                                <Typography variant="h3" classes={{root: classes.stock}}>
                                    {stockDisplay}
                                </Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item>
                        <QtyButton variants={variants} stock={stock} selectedVariant={selectedVariant} name={name} />
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    )
}