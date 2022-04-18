import React, {useState, useEffect} from "react";
import Grid from "@material-ui/core/Grid"
import useMediaQuery  from "@material-ui/core/useMediaQuery"
import { Typography } from "@material-ui/core";
import { useQuery } from "@apollo/client";


import Layout from "../components/ui/layout";
import ProductImages from "../components/product-detail/ProductImages";
import ProductInfo from "../components/product-detail/ProductInfo";
import RecentlyViewed from "../components/product-detail/RecentlyViewed";
import { GET_DETAILS } from "../Apollo/Queries";

import { makeStyles } from "@material-ui/core/styles"



const useStyles = makeStyles(theme => ({
    recentlyViewed: {
        margin:'5rem 0',
        display:"flex",
        justifyContent:"center",
    },
    recentlyViewedText: {
        color: theme.palette.secondary.main,
    }
}))


export default function ProductDetail({ 
    pageContext: {product, name, id, category, description, variants} 

}) {
    const classes = useStyles()

    const params = new URLSearchParams(window.location.search)
    const color = params.get("color")
    const style = params.get("style")

    const findIndexVariantCriteria = variant => variant.style === style && variant.color === color

    const [selectedVariant, setSelectedVariant] = useState(variants.findIndex(variant => findIndexVariantCriteria(variant))) // index of variant
    const [selectedImage, setSelectedImage] = useState(0) // To change the images
    const [stock, setStock] = useState(null)
    



    const { loading, error, data } = useQuery(GET_DETAILS, {
        variables: { id }
    })

  
    useEffect(() => {
        const styledVariant = variants.filter(variant => findIndexVariantCriteria(variant))[0]
        const variantIndex = variants.indexOf(styledVariant)
        setSelectedVariant(variantIndex)
    }, [color, style])


    useEffect(() => {
        var recentlyViewed = JSON.parse(window.localStorage.getItem("recentlyViewed"))
        if( recentlyViewed ) {
            if( recentlyViewed.length === 10) {
                recentlyViewed.shift()
            } 
            if (!recentlyViewed.some(product => product?.node?.name === name && product.selectedVariant === selectedVariant)) {
                recentlyViewed.push({...product, selectedVariant: selectedVariant})
            }
        } else {
            recentlyViewed = [ {...product, selectedVariant: selectedVariant} ]
        }
        window.localStorage.setItem("recentlyViewed", JSON.stringify(recentlyViewed))

    }    , [selectedVariant])

    useEffect(() => {
        if ( error ) {
            setStock(-1)
        } else if(data) {
            setStock(data.product.variants)
        }
    }, [error, data])

    const matchesMD = useMediaQuery(theme => theme.breakpoints.down('md'))
    
    return (
    <Layout>
        <Grid container direction="column">
            <Grid item container direction={matchesMD ? "column" : "row"}>
                <ProductImages 
                images={variants[selectedVariant].images} 
                selectedImage={selectedImage} 
                setSelectedImage={setSelectedImage}/>
                <ProductInfo
                name={name}
                description={description}
                variants={variants}
                selectedVariant={selectedVariant}
                setSelectedVariant={setSelectedVariant}
                setSelectedImage={setSelectedImage}
                stock={stock}
                />
                
            </Grid>
            <Grid item container classes={{root: classes.recentlyViewed}} >
                <Typography classes={{root: classes.recentlyViewedText}} variant="h3" align="center" gutterBottom>Recently Viewed products</Typography>
                <RecentlyViewed products={JSON.parse(window.localStorage.getItem("recentlyViewed"))} />
            </Grid>
        </Grid>
    </Layout>
    )
}