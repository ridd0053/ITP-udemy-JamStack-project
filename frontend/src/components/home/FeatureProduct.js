import React, { useState, useEffect }  from "react"
import clsx from 'clsx'
import Grid from "@material-ui/core/Grid"
import Typography from "@material-ui/core/Typography"
import Button  from "@material-ui/core/Button"
import IconButton from "@material-ui/core/IconButton"
import Chip from "@material-ui/core/Chip"
import { useQuery } from "@apollo/client"
import { Link } from "gatsby"

import explore from "../../images/explore.svg"
import frame from "../../images/product-frame-grid.svg"

import Rating from "./Rating"
import { GET_DETAILS } from "../../Apollo/Queries"

import { makeStyles } from "@material-ui/core/styles"


const useStyles = makeStyles(theme => ({
    featured: {
        height: '20rem',
        width: '20rem',
        [theme.breakpoints.down('md')] : {
            height: '15rem',
            width: '15rem',
          },
    },
    featureFrame: {
        backgroundImage: `url(${frame})`,
        backgroundPosition: 'top',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        borderRadius: 0,
        height: '24.8rem',
        width: '25rem',
        boxShadow: theme.shadows[5],
        position: 'absolute',
        zIndex: 1,
        [theme.breakpoints.down('md')] : {
            height: '19.8rem',
            width: '20rem',
          },
    },
    slide: {
        backgroundColor: theme.palette.primary.main,
        height: '20rem',
        width: '24.5rem',
        transition: 'transform 0.5s ease',
        zIndex: 0,
        padding: '1rem 2rem',
        [theme.breakpoints.down('md')] : {
            height: '15.2rem',
            width: '19.5rem',
          },
    },
    slideLeft: {
        transform: 'translate(-24.5rem, 0px)',
    },
    slideRight: {
        transform: 'translate(24.5rem, 0px)'
    },
    slideDown: {
        transform: 'translate(0px, 17rem)'
    },
    productContainer: {
        margin: '5rem 0',
    },
    exploreContainer: {
        marginTop: "3rem",
        [theme.breakpoints.down('md')] : {
            marginTop: "auto",
        },
    },
    exploreButton: {
        textTransform: "none",
    },
    exploreIcon: {
        height: '1.5rem',
        width: '2rem',
        marginLeft: '1rem',
    },
    chipLabel: {
        ...theme.typography.h5
    },
    chipRoot: {
        marginTop: '2rem',
        backgroundColor: theme.palette.secondary.main,
        [theme.breakpoints.down('md')] : {
            marginTop: "0px",
        },
    }
}))

export default function FeatureProduct({ node, index, matchesMD, expandend, setExpandend }) {
    const classes = useStyles()
    const [rating, setRating] = useState(0)
    const alignment = matchesMD ? "center" :
    index === 0 || index === 3 ? 'flex-start' : index === 1 || index === 4 ? "center" : "flex-end";

    const { data } = useQuery(GET_DETAILS, 
      {
        variables: { id: node.strapiId}
      }
    )
  
    useEffect(() => {
        if (data) {
            setRating(data.product.rating)
        }
    }, [data])

    const hasStyles = node.variants.some(variant => variant.style !== null)

    return (
      <Grid item container
      classes={{root: classes.productContainer}} 
      justifyContent={alignment}
      alignItems="center" 
      key={node.strapiId}>
      <IconButton
          onClick={() => expandend === index ? setExpandend(null) : setExpandend(index)} 
          classes={{root: classes.featureFrame}}>
          <img src={process.env.GATSBY_STRAPI_URL + node.variants[0].images[0].url}
              alt={node.name}
              className={classes.featured}/>
      </IconButton>
      <Grid container direction="column" classes={{
          root: clsx(classes.slide, {
          [classes.slideLeft]: !matchesMD && expandend === index && alignment === "flex-end",
          [classes.slideRight]: !matchesMD && expandend === index && (alignment === "flex-start" || alignment === "center"),
          [classes.slideDown]: matchesMD && expandend === index
          })}}>
              <Grid item>
                  <Typography variant="h4">{node.name.split(" ")[0]}</Typography>
                  <Rating number={rating}/>
                  <Grid item>
                      <Chip classes={{root: classes.chipRoot, label: classes.chipLabel}} label={`€ ${node.variants[0].price}`}/>
                  </Grid>
                  <Grid item classes={{root: classes.exploreContainer}}>
                      <Button component={Link} to={`/${node.category.name.toLowerCase()}/${node.name.split(" ")[0].toLowerCase()}?color=${encodeURIComponent(node.variants[0].color)}${hasStyles ? `&style=${node.variants[0].style}` :""}`} classes={{root: classes.exploreButton}}>
                          <Typography variant="h5">
                              Details
                          </Typography>
                          <img src={explore} alt="Go to product details" className={classes.exploreIcon}/>       
                      </Button>
                  </Grid>
              </Grid>
      </Grid>
      </Grid>
    )
}