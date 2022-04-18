import React, { useState, useEffect } from "react"
import Grid from "@material-ui/core/Grid"
import useMediaQuery  from "@material-ui/core/useMediaQuery"
import { useQuery } from "@apollo/client";

import { makeStyles } from "@material-ui/core/styles"
import ProductFrameGrid from "./ProductFrameGrid"
import ProductFrameList from "./ProductFrameList"
import { GET_DETAILS } from "../../Apollo/Queries";


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

export default function ListOfProducts({ products, content, layout, page, productsPerPage }) {
    const classes = useStyles({layout})
    const matchesSM = useMediaQuery(theme => theme.breakpoints.down('sm'))

      const FrameHelper = ({Frame, product, variant}) => {
        const [selectedColor, setSelectedColor] = useState( null )
        const [selectedSize, setSelectedSize] = useState(null)
        const [selectedVariant, setSelectedVariant] = useState( null )
        const [stock, setStock] = useState(null)

        const { loading, error, data } = useQuery(GET_DETAILS, {
            variables: { id: product.node.strapiId }
        })

        useEffect(() => {
            if ( error ) {
                setStock(-1)
            } else if(data) {
                setStock(data.product.variants)
            }
          }, [error, data])

        
          useEffect(() => {
            if(selectedSize === null) return undefined

            setSelectedColor(null)
            const newVariant = product.node.variants.find(item => item.size === selectedSize 
                && item.style === variant.style
                && item.color === colors[0])
            setSelectedVariant(newVariant)
        }, [selectedSize])
    
        var sizes = []
        var colors = []
        product.node.variants.map(item => {

            sizes.push(item.size)
            if(!colors.includes(item.color) 
            && item.size === (selectedSize || variant.size) 
            && item.style === variant.style) {
                colors.push(item.color)
            }
            
        })
        const hasStyles = !product.node.variants.some(variant => variant.style == null );

        return <Frame 
        variant={selectedVariant || variant} 
        product={product} 
        sizes={sizes} 
        colors={colors} 
        selectedColor={selectedColor} 
        selectedSize={selectedSize || variant.size}
        setSelectedColor={setSelectedColor}
        setSelectedSize={setSelectedSize}
        hasStyles={hasStyles}
        stock={stock}
         />
    }

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