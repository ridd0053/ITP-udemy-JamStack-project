import React, { useState, useContext, useEffect }  from "react"
import axios from "axios"
import Grid from "@material-ui/core/Grid"
import Typography from "@material-ui/core/Typography"
import Chip  from "@material-ui/core/Chip"
import IconButton from "@material-ui/core/IconButton"
import { DataGrid } from "@material-ui/data-grid"

import { UserContext } from "../../contexts"

import OderDetails from "./OrderDetails"

import BackwardsIcon from "../../images/BackwardsOutline"
import detailsIcon from "../../images/details.svg"


import { makeStyles } from "@material-ui/core/styles"



const useStyles = makeStyles(theme => ({
    item: {
        height: '100%',
        width: '100%',
    },
    chipLabel: {
        fontWeight: 600,
    },
    header: {
        height: "5rem",
        width: "100%",
        backgroundColor: theme.palette.secondary.main,
      },
      icon: {
        height: "4rem",
        width: "4rem",
      },
    "@global": {
        ".MuiDataGrid-root .MuiDataGrid-columnHeaderTitle": {
            fontWeight: 600,
        },
        ".MuiDataGrid-root .MuiDataGrid-iconSeparator": { 
            display: 'none',
        },
        ".MuiDataGrid-root .MuiDataGrid-columnHeaderTitleContainer": {
            "justify-content": "center",
        },
        ".MuiDataGrid-root .MuiDataGrid-columnHeader--moving": {
            "background-color": "transparent"
        },
        ".MuiDataGrid-root .MuiDataGrid-cell": {
            "white-space": "pre-wrap",
            "max-height": "100% !important",
            "line-height": "initial !important",
            padding: "1rem",
            "padding-right": "calc(1rem + 26px)",
            display: "flex",
            "justify-content": "center",
            "font-weight": 600,
            "border-bottom": "2px solid #fff",
            
        },
        ".MuiDataGrid-root .MuiDataGrid-renderingZone": {
            "max-height": "100% !important",
        },
        ".MuiDataGrid-root .MuiDataGrid-row": {
            "max-height": "100% !important"
        },
        ".MuiDataGrid-root .MuiDataGrid-footerContainer": {
            "margin-top": "-8.5rem",
          },
        ".MuiTablePagination-caption": {
            color: "#fff",
         },
         ".MuiSvgIcon-root": {
            fill: "#fff",
          },
          ".MuiDataGrid-root .MuiDataGrid-columnsContainer": {
            "background-color": theme.palette.secondary.main,
            border: "none",
          },
          ".MuiDataGrid-root": {
            border: "none",
          },
          ".MuiDataGrid-root .MuiDataGrid-overlay": {
            bottom: "5rem",
          },
    }
}))

export default function OrderHistory({ setSelectedSetting }) {
    const classes = useStyles()
    const [orders, setOrders] = useState([])
    const [open, setOpen] = useState(null)
    const { user } = useContext(UserContext)

    useEffect(() => {
        axios
          .get(process.env.GATSBY_STRAPI_URL + "/orders/history", {
            headers: { Authorization: `Bearer ${user.jwt}` },
          })
          .then(response => {
            setOrders(response.data.orders)
          })
          .catch(error => {
            console.error(error)
          })
      }, [])

      const createData = data => data.map(item => ({
          shipping: `${item.shippingInfo.name}\n${item.shippingAddress.street}\n${item.shippingAddress.zip} ${item.shippingAddress.city}, ${item.shippingAddress.state}`,
          order: `#${item.id.slice(item.id.length - 10, item.id.length).toUpperCase()}`,
          status: item.status,
          date: `${item.createdAt.split("-")[2].split("T")[0]}/${item.createdAt.split("-")[1]}/${item.createdAt.split("-")[0]}`,
          total: item.total,
          id: item.id,
      }))

    const columns = [
        {field: "shipping", headerName:"Shipping", width: 350, sortable: false}, 
        {field: "order", headerName:"Order", width: 250}, 
        {field: "status", headerName:"Status", width: 250, renderCell: ({ value }) => (<Chip label={value} classes={{label: classes.chipLabel}} />)}, 
        {field: "date", headerName:"Date", width: 250, type:'date'}, 
        {field: "total", headerName:"Total", width: 250, renderCell: ({ value }) => (<Chip label={`€ ${value}`} classes={{label: classes.chipLabel}} />)},
        {field: "", headerName:"", width: 150, sortable: false, renderCell: () => (
            <IconButton>
                <img src={detailsIcon} alt="order details" />
            </IconButton>
        )}
    ]

    const rows = createData(orders)
    console.log("rows", rows)

    return  (
        <Grid item container classes={{root: classes.item}}>
            <Grid item classes={{root: classes.header}}>
                <IconButton onClick={() => setSelectedSetting(null)} >
                    <div className={classes.icon}>
                        <BackwardsIcon color="#fff" />
                    </div>
                </IconButton>
            </Grid>
            <DataGrid hideFooterSelectedRowCount onRowClick={event => setOpen(event.row.id)} rows={rows} columns={columns} pageSize={5} />
            <OderDetails orders={orders} open={open} setOpen={setOpen} />
        </Grid>
    )
}