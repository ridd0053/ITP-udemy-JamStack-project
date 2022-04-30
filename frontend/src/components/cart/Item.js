import React, { useState, useContext }  from "react"
import Grid from "@material-ui/core/Grid"
import Typography from "@material-ui/core/Typography"
import Button  from "@material-ui/core/Button"
import Chip  from "@material-ui/core/Chip"
import IconButton from "@material-ui/core/IconButton"

import QtyButton from '../products-list/QtyButton'

import { CartContext } from "../../contexts"
import { removeFromCart } from "../../contexts/actions"

import FavoriteIcon from '../../images/Favorite'
import SubscribeIcon from '../../images/Subscription'
import DeleteIcon from '../../images/Delete'

import { makeStyles, useTheme } from "@material-ui/core/styles"


const useStyles = makeStyles(theme => ({
    productImage: {
        height: '10rem',
        width: '10rem',
    },
    name: {
        color: theme.palette.secondary.main,
    },
    id: {
        color: theme.palette.secondary.main,
        fontSize: '1rem',
    },
    actionWrapper: {
        height:"3rem",
        width:"3rem",
        marginBottom: -8,   
    },
    infoContainer: {
        width:'35rem',
        position:"relative",
        height: "8rem",
        marginLeft:'1rem',
    },
    chipWrapper: {
        position:"absolute",
        top: "3.5rem",
        
    },
    itemContainer: {
        margin: "2rem 0 2rem 2rem",
    },
    actionButton: {
        "&:hover": {
            backgroundColor: "transparent",
        }
    }
}))

export default function Item({ item }) {
    const classes = useStyles();
    const theme = useTheme();
    const { dispatchCart } = useContext(CartContext)

    const handleDelete = () => {
        dispatchCart(removeFromCart(item.variant, item.qty))
    }

    const actions = [
        {icon: FavoriteIcon, color: theme.palette.secondary.main},
        {icon: SubscribeIcon, color: theme.palette.secondary.main},
        {icon: DeleteIcon, color: theme.palette.error.main, size:"2.5rem", onClick: handleDelete},
    ]

    return  (
        <Grid item container classes={{root: classes.itemContainer}}>
            <Grid item>
                <img className={classes.productImage} src={process.env.GATSBY_STRAPI_URL + item.variant.images[0].url} alt={item.variant.id} />
            </Grid>
            <Grid item container direction="column" justifyContent="space-between" classes={{root: classes.infoContainer}}>
                <Grid item container justifyContent="space-between">
                    <Grid item>
                        <Typography variant="h5" classes={{root: classes.name}}>
                            {item.name}
                        </Typography>
                    </Grid>
                    <Grid item>
                        <QtyButton 
                        stock={[{qty: item.stock}]} 
                        selectedVariant={0} 
                        variants={[item.variant]} 
                        name={item.name}
                        isCart />
                    </Grid>
                </Grid>
                <Grid item classes={{root: classes.chipWrapper}}>
                    <Chip label={`€${item.variant.price}`} />
                </Grid>
                <Grid item container justifyContent="space-between" alignItems="flex-end" >
                    <Grid item xs>
                        <Typography variant="body1" classes={{root: classes.id}}>
                            ID: {item.variant.id}
                        </Typography>
                    </Grid>
                    <Grid item container justifyContent="flex-end" xs>
                        {actions.map((action, i) => (
                            <Grid item key={i}>
                                <IconButton onClick={() => action.onClick()} disableRipple classes={{root: classes.actionButton}}>
                                    <span className={classes.actionWrapper} style={{height: action.size, width: action.size}}>
                                      <action.icon color={action.color} />  
                                    </span>
                                </IconButton>
                            </Grid>
                        ))}
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    )
}