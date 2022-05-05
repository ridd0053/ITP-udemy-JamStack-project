import React, { useState, useRef, useEffect } from "react"
import Fab from "@material-ui/core/Fab"
import Pagination from "@material-ui/lab/Pagination"
import PaginationItem from "@material-ui/lab/PaginationItem"
import Grid from "@material-ui/core/Grid"
import { graphql } from "gatsby"

import Layout from "../components/ui/layout"
import DynamicToolbar from "../components/products-list/DynamicToolbar";
import ListOfProducts from "../components/products-list/ListOfProducts";
import { alphabetic, time, price } from "../components/products-list/SortFunctions"


import { makeStyles, styled } from "@material-ui/core/styles"



const useStyles = makeStyles(theme => ({
  fab: {
    alignSelf: "flex-end",
    marginRight: "2rem",
    marginBottom: "2rem",
    color: "#fff",
    fontFamily: "Montserrat",
    fontSize: "5rem",
    width: "5rem",
    height: "5rem",
  },
  pagination: {
    alignSelf: "flex-end",
    marginRight: "2%",
    marginTop: "-3rem",
    marginBottom: "4rem",
    [theme.breakpoints.only('md')]: {
      marginTop: '1rem',
  },
  },
}))

export const StyledPagination = props => {
   const StylePaginationItem = styled(PaginationItem)(({ theme }) => ({
    fontFamily: "Montserrat",
    fontSize: "2rem",
    color: theme.palette.primary.main,
    "&.Mui-selected": {
      color: "#fff",
    },
  }))

  return <Pagination {...props} renderItem={item => <StylePaginationItem {...item}  />} />
}



export default function ProductList({
  pageContext: { filterOptions: options, name, description },
  data: {
    allStrapiProduct: { edges: products },
  },
}) {
  const classes = useStyles()
  const [layout, setLayout] = useState("grid")
  const [filterOptions, setFilterOptions] = useState(options)
  const [sortOptions, setSortOptions] = useState([
    {label: "A-Z", active: true, function: (data) => alphabetic(data, "asc")},
    {label: "Z-A", active: false, function: (data) => alphabetic(data, "desc")},
    {label: "NEWEST", active: false, function: (data) => time(data, "asc")},
    {label: "OLDEST", active: false, function: (data) => time(data, "desc")},
    {label: "PRICE ↑", active: false, function: (data) => price(data, "asc")},
    {label: "PRICE ↓", active: false,  function: (data) => price(data, "desc")},
    // Reviews will be implemented later
    {label: "REVIEWS", active: false, function: data => data},
])


  const [page, setPage] = useState(1)
  const scrollRef = useRef(null)
 
  const scroll = () => {
    scrollRef.current.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    setPage(1)
  }, [filterOptions, layout])

  const productsPerPage = layout === "grid" ? 16 : 6
  var numVariants = 0

  var content = []

  const selectedSort = sortOptions.filter(option => option.active)[0]
  const sortedProducts = selectedSort.function(products)

  sortedProducts.map((product, i) => 
  product.node.variants.map(variant => 
      content.push({product: i, variant})))

  var isFiltered = false;
  var filters = {}
  var filteredProducts = []
      Object.keys(filterOptions).filter(option => filterOptions[option] !== null).map(
          option => {
              filterOptions[option].forEach(value => {
                  if (value.checked) {
                      isFiltered = true

                      if(filters[option] === undefined) {
                          filters[option] = []
                      }
                      if( !filters[option].includes(value) ) {
                          filters[option].push(value)
                      }
                      content.forEach(item => {
                          if (option === 'Color' ) {
                              if(item.variant.ColorLabel === value.label && !filteredProducts.includes(item)) {
                                  filteredProducts.push(item)
                              }
                          } else if (item.variant[option.toLocaleLowerCase()] === value.label && !filteredProducts.includes(item)) {
                              filteredProducts.push(item)
                          }
                      }) 
                  }
              })
          })

  Object.keys(filters).forEach(filter => {
      filteredProducts = filteredProducts.filter( item => {
          let valid
          filters[filter].some(value => {
              if(filter === "Color") {
                  if (item.variant.ColorLabel === value.label ) {
                      valid = item
                  }
              } else if ( item.variant[filter.toLocaleLowerCase()] === value.label) {
                  valid = item
              }
          })

          return valid
      } )
  })
  if( isFiltered ) {
      content= filteredProducts;
  }

  const numPages = Math.ceil(content.length / productsPerPage)


  return (
    <Layout>
      <Grid container direction="column" alignItems="center">
        <div ref={scrollRef} />
        <DynamicToolbar
          filterOptions={filterOptions}
          setFilterOptions={setFilterOptions}
          name={name}
          description={description}
          layout={layout}
          setLayout={setLayout}
          sortOptions={sortOptions}
          setSortOptions={setSortOptions}
        />
        <ListOfProducts
          page={page}
          productsPerPage={productsPerPage}
          layout={layout}
          products={products}
          content={content}
          filterOptions={filterOptions}
        />
        <StyledPagination
          count={numPages}
          page={page}
          onChange={(e, newPage) => setPage(newPage)}
          color="primary"
          classes={{ root: classes.pagination }}
        />
        <Fab onClick={scroll} color="primary" classes={{ root: classes.fab }}>
          ^
        </Fab>
      </Grid>
    </Layout>
  )
}

export const query = graphql`
  query GetCategoryProducts($id: String!) {
    allStrapiProduct(filter: { category: { id: { eq: $id } } }) {
      edges {
        node {
          strapiId
          createdAt
          name
          category {
            name
          }
          variants {
            color
            id
            price
            size
            style
            ColorLabel
            images {
              url
            }
          }
        }
      }
    }
  }
`