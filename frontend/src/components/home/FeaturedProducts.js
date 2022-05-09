import React, { useState } from "react"
import Grid from "@material-ui/core/Grid"


import { useStaticQuery, graphql } from 'gatsby';
import { makeStyles } from "@material-ui/core/styles";
import  useMediaQuery  from '@material-ui/core/useMediaQuery';

import featuredAdornment from "../../images/featured-adornment.svg"


import FeatureProduct from "./FeatureProduct"

const useStyles = makeStyles(theme => ({
    background: {
        backgroundImage: `url(${featuredAdornment})`,
        backgroundPosition: 'top',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        width: '100%',
        height: '180rem',
        padding: '0 2.5rem',
        [theme.breakpoints.down('md')] : {
            height: '220rem',
          },
    },

}))

export default function FeaturedProducts() {
    const classes = useStyles();
    const [expandend, setExpandend] = useState(0);
    const matchesMD = useMediaQuery(theme => theme.breakpoints.down('md'))

    const data = useStaticQuery(graphql`
    query GetFeatured {
      allStrapiProduct(filter: { featured: { eq: true } }) {
        edges {
          node {
            name
            strapiId
            category {
              name
            }
            variants {
              price
              style
              color
              images {
                url
              }
            }
          }
        }
      }
    }
  `)
  
  return (
  <Grid container direction="column" 
  justifyContent={matchesMD ? "space-between" : "center"} 
  classes={{root: classes.background}}>
      {data.allStrapiProduct.edges.map(({node}, index) => (
          <FeatureProduct key={index} node={node} index={index} matchesMD={matchesMD} expandend={expandend} setExpandend={setExpandend} />
      ))}

  </Grid>
  )
}