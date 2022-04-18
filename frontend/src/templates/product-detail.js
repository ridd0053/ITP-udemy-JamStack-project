import React, {useState, useEffect} from "react";
import Grid from "@material-ui/core/Grid"
import useMediaQuery  from "@material-ui/core/useMediaQuery"

import Layout from "../components/ui/layout";
import ProductImages from "../components/product-detail/ProductImages";
import ProductInfo from "../components/product-detail/ProductInfo";
import RecentlyViewed from "../components/product-detail/RecentlyViewed";

import { makeStyles } from "@material-ui/core/styles"
import { Typography } from "@material-ui/core";


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
    const [selectedVariant, setSelectedVariant] = useState(0) // index of variant
    const [selectedImage, setSelectedImage] = useState(0) // To change the images
    
    

    const params = new URLSearchParams(window.location.search)
    const color = params.get("color")
    const style = params.get("style")
  
    useEffect(() => {
        const styledVariant = variants.filter(variant => variant.style === style && variant.color === color)[0]
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