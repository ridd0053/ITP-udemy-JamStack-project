import React, { useState } from "react"
import Grid from "@material-ui/core/Grid"
import useMediaQuery  from "@material-ui/core/useMediaQuery"

import { makeStyles } from "@material-ui/core/styles"
import ProductFrameGrid from "./ProductFrameGrid"
import ProductFrameList from "./ProductFrameList"


const useStyles = makeStyles(theme => ({
    productContainer: {
        width: '95%',
        [theme.breakpoints.only('xl')]: {
            // every child in this class & > *
            "& > *": {
            marginRight: ({layout}) => layout === "grid" ? 'calc((100% - (25rem * 4) / 3))' : 0,
            marginBottom: '5rem'
            },
            "& > :nth-child(4n)": {
            marginRight: 0
            } 
        },
        [theme.breakpoints.only('lg')]: {
            // every child in this class & > *
            "& > *": {
            marginRight: ({layout}) => layout === "grid" ? 'calc((100% - (25rem * 3) / 0.9))' : 0,
            marginBottom: '5rem',
            },
            "& > :nth-child(3n)": {
            marginRight: 0
            } 
        },
        [theme.breakpoints.only('md')]: {
            // every child in this class & > *
            "& > *": {
            marginRight: ({layout}) => layout === "grid" ? 'calc(100% - (25rem * 2))' : 0,
            marginBottom: '5rem'
            },
            "& > :nth-child(2n)": {
            marginRight: 0
            } 
        },
        [theme.breakpoints.down('sm')]: {
            // every child in this class & > *
            "& > *": {
            marginBottom: '5rem'
            },
        },
    }
}))

export default function ListOfProducts({ products, layout, page, productsPerPage }) {
    const classes = useStyles({layout})
    const matchesSM = useMediaQuery(theme => theme.breakpoints.down('sm'))

    const FrameHelper = ({Frame, product, variant}) => {
        const [selectedColor, setSelectedColor] = useState(null)
        const [selectedSize, setSelectedSize] = useState(null)
    
        var sizes = []
        var colors = []
        product.node.variants.map(variant => {
            sizes.push(variant.size)
            if(! colors.includes(variant.color)) {
                colors.push(variant.color)
            }
            
        })

        return <Frame variant={variant} 
        product={product} 
        sizes={sizes} 
        colors={colors} 
        selectedColor={selectedColor} 
        selectedSize={selectedSize}
        setSelectedColor={setSelectedColor}
        setSelectedSize={setSelectedSize}
         />
    }

    var content = []
    products.map((product, i) => 
    product.node.variants.map(variant => 
        content.push({product: i, variant})))


    return  (
        <Grid item 
        container classes={{root: classes.productContainer}}
        direction={matchesSM ? 'column' : 'row'}
        alignItems={matchesSM ? 'center' : undefined}>
            {content.slice((page - 1) * productsPerPage, page * productsPerPage).map(item => (
                <FrameHelper
                    Frame={layout === "grid" ? ProductFrameGrid : ProductFrameList} 
                    key={item.variant.id}
                    variant={item.variant}
                    product={products[item.product]} />
                ))}
        </Grid>
    )
}