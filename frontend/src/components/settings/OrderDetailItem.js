import React, { useState }  from "react"
import Grid from "@material-ui/core/Grid"
import Typography from "@material-ui/core/Typography"
import Chip  from "@material-ui/core/Chip"
import IconButton from "@material-ui/core/IconButton"


import { makeStyles } from "@material-ui/core/styles"


const useStyles = makeStyles(theme => ({
    container: {
        height: '10rem',
    },
    product: {
        height: '8rem',
        width: '8rem',
    },
    chipRoot: {
        backgroundColor: theme.palette.primary.main,
      },
      itemInfo: {
          textAlign: "right",
      }
}))

export default function OrderDetailItem({ item }) {
    const classes = useStyles()

    return  (
        <Grid item container classes={{root: classes.container}} justifyContent="space-between" alignItems="center">
            <Grid item>
                <img src={process.env.GATSBY_STRAPI_URL + item.variant.images[0].url} alt={item.name} className={classes.product}  />
            </Grid>
            <Grid item classes={{root: classes.itemInfo}}>
                <Typography variant="body2">
                    {item.name} x{item.qty}
                </Typography>
                {
                item.variant.style ? (
                <Typography variant="body2">
                Style:  {item.variant.style}
                </Typography>
                ) : null }
                {
                item.variant.size ? (
                <Typography variant="body2">
                Size:  {item.variant.size}
                </Typography>
                ): null }
                <Chip label={`€ ${item.variant.price}`} classes={{root: classes.chipRoot}} />
            </Grid>
        </Grid>
    )
}