import React, { useContext, useState, useEffect }  from "react"
import axios from "axios"
import Grid from "@material-ui/core/Grid"
import Typography from "@material-ui/core/Typography"
import Chip  from "@material-ui/core/Chip"
import IconButton from "@material-ui/core/IconButton"
import { DataGrid } from "@material-ui/data-grid"

import { UserContext, FeedbackContext } from "../../contexts"
import { setSnackbar } from "../../contexts/actions"
import Sizes from "../products-list/Sizes"
import Swatches from "../products-list/Swatches"
import QtyButton from "../products-list/QtyButton"
import Delete from "../../images/Delete"

import { makeStyles } from "@material-ui/core/styles"


const useStyles = makeStyles(theme => ({
    container: {
        height: "100%",
        width: "100%",
    },
    image: {
        height: "10rem",
        width: "10rem",
    },
    name: {
        color: "#fff",
    },
    chipRoot: {
        height: '3rem',
        width: '10rem',
        borderRadius: 50,
    },
    deleteWrapper: {
        height: '2rem',
        width: '2rem',
    }
}))

export default function Favorites() {
    const classes = useStyles()
    const { user  } = useContext(UserContext)
    const [products, setProducts] = useState([])
    const { dispatchFeedback } = useContext(FeedbackContext)

    const createData = data => 
        data.map(item => ({
            item: { name: item.variants[0].product.name.split("-")[0], image: item.variant.images[0].url },
            variant: { all: item.variants, current: item.variant },
            quantity: item.variants,
            price: item.variant.price,
            id: item.id,
        }))
    

    const columns = [
        {field: "item", headerName: "Item", width: 250, renderCell: ({value}) => (
            <Grid container direction="column">
                <Grid item>
                    <img src={process.env.GATSBY_STRAPI_URL + value.image} alt={value.name} className={classes.image} />
                </Grid>
                <Grid item>
                    <Typography variant="h3" classes={{root: classes.name}}>
                        {value.name}
                    </Typography>
                </Grid>
            </Grid>
        )},
        {field: "variant", headerName: "Variant", width: 275, sortable: false, renderCell: ({value}) => (
            <Grid container direction="column">
                {value.current.id}
            </Grid>
        )},
        {field: "quantity", headerName: "Quantity", width: 250, sortable: false, renderCell: ({value}) => (
            <div>{value.id}</div>
        )},
        {field: "price", headerName:"Price", width: 250, renderCell: ({value}) => (
            <Chip classes={{root: classes.chipRoot}} label={`€ ${value}`} />
        )},
        {field: "", width: 500, sortable: false, renderCell: ({value}) => (
            <IconButton>
                <span className={classes.deleteWrapper}>
                    <Delete  />
                </span>
            </IconButton>
        )},
    ]

    const rows = createData(products)
    useEffect(() => {
        axios
          .get(process.env.GATSBY_STRAPI_URL + "/favorites/userFavorites", {
            headers: { Authorization: `Bearer ${user.jwt}` },
          })
          .then(response => {
            setProducts(response.data)
          })
          .catch(error => {
            console.error(error)
            dispatchFeedback(setSnackbar({status: "error", message: "There was a problem retrieving your favorite products. Please try again."}))
          })
      }, [])

    console.log(rows)

    return  (
        <Grid item container classes={{root: classes.container}}>
            <DataGrid hideFooterSelectedRowCount columns={columns} rows={rows} pageSize={5} />
        </Grid>
    )
}