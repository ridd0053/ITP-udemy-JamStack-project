import React, { useState }  from "react"
import clsx from "clsx"
import Grid from "@material-ui/core/Grid"
import Typography from "@material-ui/core/Typography"
import Chip  from "@material-ui/core/Chip"
import Button from "@material-ui/core/Button"
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer"
import Hidden from "@material-ui/core/Hidden"

import OrderDetailItem from "./OrderDetailItem"

import { makeStyles } from "@material-ui/core/styles"
import  useMediaQuery  from '@material-ui/core/useMediaQuery'


const useStyles = makeStyles(theme => ({
    drawer: {
        height: "100%",
        width: "30rem",
        backgroundColor: "transparent",
        [theme.breakpoints.down('xs')]: {
            width: '100%',
        },
      },
      id: {
        fontSize: "2.5rem",
        fontWeight: 600,
        marginTop: "1rem",
        marginLeft: "1rem",
      },
      bold: {
        fontWeight: 600,
      },
      date: {
        fontWeight: 600,
        marginLeft: "1rem",
        marginBottom: "1rem",
      },
      padding: {
          padding: "1rem",
      },
      status: {
        marginLeft: "1rem",
      },
      dark: {
        backgroundColor: theme.palette.secondary.main,
      },
      light: {
        backgroundColor: theme.palette.primary.main,
      },
      prices: {
          padding: '0.5rem 1rem',
      },
      text: {
        [theme.breakpoints.down('xs')]: {
            fontSize: '1.25rem',
        },
      },
      spacer: {
          minHeight: '5rem',
      },
}))

export default function OderDetails({ orders, open, setOpen }) {
    const classes = useStyles()
    const matchesXS = useMediaQuery(theme => theme.breakpoints.down('xs'))

    const iOS = process.browser && /iPad|iPhone|iPod/.test(navigator.userAgent)
    const order = orders.find(order => order.id === open)

    const prices = [
        {label: "Subtotal", value: order?.subtotal},
        {label: "Shipping", value: order?.shippingOption.price},
        {label: "Tax", value: order?.tax},
        {label: "Total", value: order?.total},
        {label: "Payment", string: `${order?.paymentMethod.brand.toUpperCase()} ${order?.paymentMethod.last4}`},
        {label: "Transaction", string: order?.transaction}
    ]

    return  (
        <SwipeableDrawer
        open={!!open}
        onOpen={() => null}
        onClose={() => setOpen(null)}
        anchor={matchesXS ? "bottom" : "right"}
        classes={{ paper: classes.drawer }}
        disableBackdropTransition={!iOS}
        disableDiscovery={iOS}
      >
        <Hidden smUp >
          <Grid 
            item 
            classes={{root: classes.spacer}} 
            component={Button} 
            disableRipple 
            onClick={() => setOpen(null)}>
          </Grid>
        </Hidden>
        <Grid container direction="column" classes={{root: classes.light}}>
          <Grid item classes={{root: classes.dark}}>
            <Typography
              variant="h2"
              classes={{ root: classes.id }}
            >
              Order #
              {order?.id
                .slice(order.id.length - 10, order.id.length)
                .toUpperCase()}
            </Typography>
          </Grid>
          <Grid item container classes={{root: classes.dark}}>
            <Grid item classes={{root: classes.status}}>
              <Chip label={order?.status} classes={{ label: classes.bold, root: classes.light }} />
            </Grid>
            <Grid item>
              <Typography variant="body2" classes={{ root: classes.date }}>
                {`${order?.createdAt.split("-")[2].split("T")[0]}/${order?.createdAt.split("-")[1]}/${order?.createdAt.split("-")[0]}`}
              </Typography>
            </Grid>
          </Grid>
          <Grid item classes={{root: classes.padding}}>
            <Typography variant="body2" classes={{ root: clsx(classes.bold) }}>
                Billing
            </Typography>
            <Typography variant="body2" classes={{root: classes.text}} >
                {order?.billingInfo.name}
                <br />
                {order?.billingInfo.email}
                <br />
                {order?.billingInfo.phone}
                <br />
                <br />
                {order?.billingAddress.street} 
                <br />
                {order?.billingAddress.zip} {order?.billingAddress.city}, {order?.billingAddress.state}
              </Typography>
          </Grid>
          <Grid item classes={{root: clsx(classes.padding, classes.dark)}}>
            <Typography variant="body2" classes={{ root: clsx(classes.bold) }}>
                Shipping
            </Typography>
            <Typography variant="body2" classes={{root: classes.text}}>
                {order?.shippingInfo.name}
                <br />
                {order?.shippingInfo.email}
                <br />
                {order?.shippingInfo.phone}
                <br />
                <br />
                {order?.shippingAddress.street} 
                <br />
                {order?.shippingAddress.zip} {order?.shippingAddress.city}, {order?.shippingAddress.state}
              </Typography>
          </Grid>
          {prices.map(price => (
          <Grid item container key={price.label} justifyContent="space-between" classes={{root: classes.prices}}>
            <Grid item>
                <Typography variant="body2" classes={{ root: classes.bold }}>
                    {price.label}
                </Typography>
            </Grid>
            <Grid item>
                {price.string ? 
                (
                <Typography variant="body2" classes={{root: classes.text}}>{price.string}</Typography>
                ) 
                : 
                (
                <Chip label={`€ ${price.value?.toFixed(2)}`} classes={{label: classes.bold}} />
                )}
            </Grid>
          </Grid> ))}
          <Grid item classes={{root: clsx(classes.dark, classes.padding)}}>
            <Typography variant="body2" gutterBottom classes={{root: classes.bold}}>
                Items
            </Typography>
            {order?.items.map(item => (
                <OrderDetailItem item={item} key={item.variant.key} />
            ))}
          </Grid>
        </Grid>
      </SwipeableDrawer>
    )
}